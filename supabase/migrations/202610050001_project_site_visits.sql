-- Visit tracking shown in each project's operational progress table.
alter table public.projects
  add column if not exists site_visit_completed_at timestamptz,
  add column if not exists site_visit_completed_by uuid references public.profiles(id) on delete set null;

create index if not exists projects_site_visit_completed_by_idx
  on public.projects(site_visit_completed_by);

comment on column public.projects.site_visit_completed_at is 'Date and time when the site visit was confirmed.';
comment on column public.projects.site_visit_completed_by is 'Internal user who confirmed the site visit.';
