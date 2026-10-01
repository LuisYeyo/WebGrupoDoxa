alter table public.projects
  add column if not exists is_public boolean not null default false,
  add column if not exists public_description text,
  add column if not exists published_at timestamptz;

alter table public.documents
  add column if not exists is_public boolean not null default false;

alter table public.projects
  drop constraint if exists projects_public_only_when_completed;

alter table public.projects
  add constraint projects_public_only_when_completed
  check (not is_public or status = 'completed');

create index if not exists projects_public_idx
  on public.projects (published_at desc)
  where is_public = true;

create index if not exists documents_public_evidence_idx
  on public.documents (project_id, created_at)
  where category = 'work_evidence' and is_public = true;

comment on column public.projects.is_public is 'Allows the project to appear on the public website after completion.';
comment on column public.projects.public_description is 'Approved description shown publicly; internal notes remain private.';
comment on column public.documents.is_public is 'Approves a work evidence image for public display.';
