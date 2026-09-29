-- Knowledge captured at the end of a project and private photographic evidence.
create table if not exists public.project_lessons (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete restrict default auth.uid(),
  category text not null default 'challenge' check (category in ('success', 'challenge', 'improvement')),
  title text not null check (char_length(title) between 3 and 160),
  situation text not null check (char_length(situation) between 3 and 4000),
  lesson text not null check (char_length(lesson) between 3 and 4000),
  publish_to_site boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects
  add column if not exists publish_to_site boolean not null default false,
  add column if not exists public_summary text;

alter table public.documents
  add column if not exists publish_to_site boolean not null default false;

create index if not exists project_lessons_project_id_idx on public.project_lessons(project_id);
create index if not exists project_lessons_author_id_idx on public.project_lessons(author_id);

drop trigger if exists project_lessons_set_updated_at on public.project_lessons;
create trigger project_lessons_set_updated_at
  before update on public.project_lessons
  for each row execute function public.set_updated_at();

alter table public.project_lessons enable row level security;
revoke all on public.project_lessons from anon, authenticated;
grant select, insert, update, delete on public.project_lessons to authenticated;

create policy project_lessons_select_internal
  on public.project_lessons for select to authenticated
  using (public.is_internal_user());

create policy project_lessons_insert_operations
  on public.project_lessons for insert to authenticated
  with check (public.can_edit_operations() and author_id = auth.uid());

create policy project_lessons_update_author_or_managers
  on public.project_lessons for update to authenticated
  using (author_id = auth.uid() or public.can_manage_records())
  with check (author_id = auth.uid() or public.can_manage_records());

create policy project_lessons_delete_author_or_managers
  on public.project_lessons for delete to authenticated
  using (author_id = auth.uid() or public.can_manage_records());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-media',
  'project-media',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy project_media_select_internal
  on storage.objects for select to authenticated
  using (bucket_id = 'project-media' and public.is_internal_user());

create policy project_media_insert_operations
  on storage.objects for insert to authenticated
  with check (bucket_id = 'project-media' and public.can_edit_operations());

create policy project_media_update_operations
  on storage.objects for update to authenticated
  using (bucket_id = 'project-media' and public.can_edit_operations())
  with check (bucket_id = 'project-media' and public.can_edit_operations());

create policy project_media_delete_managers
  on storage.objects for delete to authenticated
  using (bucket_id = 'project-media' and public.can_manage_records());
