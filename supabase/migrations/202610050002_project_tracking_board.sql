-- Simple project board used by operational staff without work orders.
alter table public.projects
  add column if not exists site_visit_completed_at timestamptz,
  add column if not exists site_visit_completed_by uuid references public.profiles(id) on delete set null,
  add column if not exists progress_percent smallint not null default 0 check (progress_percent between 0 and 100),
  add column if not exists quote_completed boolean not null default false,
  add column if not exists report_completed boolean not null default false,
  add column if not exists invoice_completed boolean not null default false;

create table if not exists public.project_assignees (
  project_id uuid not null references public.projects(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  assigned_by uuid references public.profiles(id) on delete set null default auth.uid(),
  primary key (project_id, profile_id)
);

alter table public.project_assignees enable row level security;
revoke all on public.project_assignees from anon, authenticated;
grant select, insert, delete on public.project_assignees to authenticated;

drop policy if exists project_assignees_select_internal on public.project_assignees;
create policy project_assignees_select_internal on public.project_assignees
  for select to authenticated using (public.is_internal_user());

drop policy if exists project_assignees_insert_operations on public.project_assignees;
create policy project_assignees_insert_operations on public.project_assignees
  for insert to authenticated with check (public.can_edit_operations());

drop policy if exists project_assignees_delete_operations on public.project_assignees;
create policy project_assignees_delete_operations on public.project_assignees
  for delete to authenticated using (public.can_edit_operations());

create index if not exists project_assignees_profile_idx on public.project_assignees(profile_id);
