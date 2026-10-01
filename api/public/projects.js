import { getSupabaseServerClient } from "../_supabase.js"

function safePublicProject(project, photos) {
  return {
    id: project.id,
    slug: `public-${project.id}`,
    client: project.clients?.trade_name || project.clients?.legal_name || "Grupo Industrial DOXA",
    title: project.name,
    service: project.service || "Servicio industrial",
    description: project.public_description || project.description || project.service || "Proyecto industrial realizado por Grupo Industrial DOXA.",
    location: [project.work_locations?.city, project.work_locations?.state].filter(Boolean).join(", ") || "Altamira, Tamaulipas",
    completedAt: project.completed_at,
    image: photos[0]?.url || null,
    photos,
  }
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=900")
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")
    return res.status(405).json({ projects: [] })
  }

  try {
    const supabase = getSupabaseServerClient()
    let query = supabase.from("projects")
      .select("id, name, service, description, public_description, completed_at, published_at, clients(legal_name, trade_name), work_locations(city, state)")
      .eq("is_public", true)
      .eq("status", "completed")
      .order("published_at", { ascending: false })

    if (req.query?.id) query = query.eq("id", req.query.id).limit(1)
    const { data: projectRows, error: projectError } = await query
    if (projectError) throw projectError
    if (!projectRows?.length) return res.status(200).json({ projects: [] })

    const projectIds = projectRows.map((project) => project.id)
    const { data: photoRows, error: photoError } = await supabase.from("documents")
      .select("id, project_id, storage_path, description, created_at")
      .in("project_id", projectIds)
      .eq("category", "work_evidence")
      .eq("is_public", true)
      .order("created_at", { ascending: true })
    if (photoError) throw photoError

    const photos = await Promise.all((photoRows || []).map(async (photo) => {
      const { data } = await supabase.storage.from("project-media").createSignedUrl(photo.storage_path, 3600)
      return { id: photo.id, projectId: photo.project_id, description: photo.description || "", createdAt: photo.created_at, url: data?.signedUrl || "" }
    }))
    const projects = projectRows.map((project) => safePublicProject(project, photos.filter((photo) => photo.projectId === project.id && photo.url)))
    return res.status(200).json({ projects })
  } catch (error) {
    console.error("Unable to load public projects", error)
    return res.status(200).json({ projects: [] })
  }
}
