create extension if not exists pgcrypto;

create type public.app_role as enum ('admin', 'manager', 'staff', 'viewer');
create type public.record_status as enum ('active', 'inactive', 'archived');
create type public.project_status as enum ('lead', 'quoted', 'approved', 'in_progress', 'on_hold', 'completed', 'cancelled');
create type public.work_order_status as enum ('pending', 'scheduled', 'in_progress', 'blocked', 'completed', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 2 and 150),
  role public.app_role not null default 'viewer',
  phone text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  legal_name text not null,
  trade_name text,
  tax_id text,
  email text,
  phone text,
  notes text,
  status public.record_status not null default 'active',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.client_contacts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  full_name text not null,
  position text,
  email text,
  phone text,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.work_locations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  name text not null,
  kind text not null default 'company_workshop' check (kind in ('company_workshop', 'client_site', 'external_site')),
  workshop_number smallint check (workshop_number is null or workshop_number between 1 and 3),
  address_line text,
  city text,
  state text,
  postal_code text,
  notes text,
  status public.record_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((kind = 'company_workshop' and workshop_number is not null) or (kind <> 'company_workshop' and workshop_number is null))
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete restrict,
  location_id uuid references public.work_locations(id) on delete set null,
  manager_id uuid references public.profiles(id) on delete set null,
  code text not null unique,
  name text not null,
  service text,
  description text,
  status public.project_status not null default 'lead',
  start_date date,
  due_date date,
  completed_at timestamptz,
  estimated_amount numeric(14, 2) check (estimated_amount is null or estimated_amount >= 0),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (due_date is null or start_date is null or due_date >= start_date)
);

create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  request_code text not null unique,
  client_id uuid references public.clients(id) on delete set null,
  contact_id uuid references public.client_contacts(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  requester_name text not null,
  company_name text,
  email text not null,
  phone text,
  service text not null,
  message text not null,
  status public.project_status not null default 'lead',
  source text not null default 'manual',
  received_at timestamptz not null default now(),
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.work_orders (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  assigned_to uuid references public.profiles(id) on delete set null,
  code text not null unique,
  title text not null,
  description text,
  status public.work_order_status not null default 'pending',
  scheduled_date date,
  due_date date,
  completed_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (due_date is null or scheduled_date is null or due_date >= scheduled_date)
);

create table public.equipment (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references public.work_locations(id) on delete set null,
  internal_code text not null unique,
  name text not null,
  category text,
  brand text,
  model text,
  serial_number text,
  status public.record_status not null default 'active',
  last_maintenance_date date,
  next_maintenance_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_equipment (
  project_id uuid not null references public.projects(id) on delete cascade,
  equipment_id uuid not null references public.equipment(id) on delete restrict,
  assigned_by uuid references public.profiles(id) on delete set null,
  purpose text,
  planned_from date,
  planned_until date,
  notes text,
  created_at timestamptz not null default now(),
  primary key (project_id, equipment_id),
  check (planned_until is null or planned_from is null or planned_until >= planned_from)
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  work_order_id uuid references public.work_orders(id) on delete cascade,
  uploaded_by uuid references public.profiles(id) on delete set null,
  category text not null default 'other' check (category in ('quote', 'contract', 'purchase_order', 'drawing', 'work_evidence', 'inspection_report', 'safety', 'invoice', 'other')),
  description text,
  file_name text not null,
  storage_path text not null unique,
  mime_type text,
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  created_at timestamptz not null default now(),
  check (num_nonnulls(client_id, project_id, work_order_id) = 1)
);

create index client_contacts_client_id_idx on public.client_contacts(client_id);
create unique index client_contacts_one_primary_idx on public.client_contacts(client_id) where is_primary;
create index work_locations_client_id_idx on public.work_locations(client_id);
create index projects_client_id_idx on public.projects(client_id);
create index projects_status_idx on public.projects(status);
create index projects_manager_id_idx on public.projects(manager_id);
create index quote_requests_status_idx on public.quote_requests(status);
create index quote_requests_received_at_idx on public.quote_requests(received_at desc);
create index work_orders_project_id_idx on public.work_orders(project_id);
create index work_orders_assigned_to_idx on public.work_orders(assigned_to);
create index work_orders_status_idx on public.work_orders(status);
create index equipment_location_id_idx on public.equipment(location_id);
create index project_equipment_equipment_id_idx on public.project_equipment(equipment_id);
create index documents_client_id_idx on public.documents(client_id);
create index documents_project_id_idx on public.documents(project_id);
create index documents_work_order_id_idx on public.documents(work_order_id);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create function public.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = ''
as $$
  select role
  from public.profiles
  where id = (select auth.uid()) and active = true;
$$;

create function public.is_internal_user()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.current_app_role() is not null;
$$;

create function public.can_manage_records()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_app_role() in ('admin', 'manager'), false);
$$;

create function public.can_edit_operations()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_app_role() in ('admin', 'manager', 'staff'), false);
$$;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(
      nullif(new.raw_user_meta_data ->> 'full_name', ''),
      split_part(coalesce(new.email, 'usuario'), '@', 1)
    )
  );
  return new;
end;
$$;

revoke all on function public.current_app_role() from public;
revoke all on function public.is_internal_user() from public;
revoke all on function public.can_manage_records() from public;
revoke all on function public.can_edit_operations() from public;
revoke all on function public.handle_new_user() from public;
grant execute on function public.current_app_role() to authenticated;
grant execute on function public.is_internal_user() to authenticated;
grant execute on function public.can_manage_records() to authenticated;
grant execute on function public.can_edit_operations() to authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger clients_set_updated_at before update on public.clients for each row execute function public.set_updated_at();
create trigger client_contacts_set_updated_at before update on public.client_contacts for each row execute function public.set_updated_at();
create trigger work_locations_set_updated_at before update on public.work_locations for each row execute function public.set_updated_at();
create trigger projects_set_updated_at before update on public.projects for each row execute function public.set_updated_at();
create trigger quote_requests_set_updated_at before update on public.quote_requests for each row execute function public.set_updated_at();
create trigger work_orders_set_updated_at before update on public.work_orders for each row execute function public.set_updated_at();
create trigger equipment_set_updated_at before update on public.equipment for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.client_contacts enable row level security;
alter table public.work_locations enable row level security;
alter table public.projects enable row level security;
alter table public.quote_requests enable row level security;
alter table public.work_orders enable row level security;
alter table public.equipment enable row level security;
alter table public.project_equipment enable row level security;
alter table public.documents enable row level security;

revoke all on all tables in schema public from anon, authenticated;
grant select on all tables in schema public to authenticated;
grant insert, update, delete on public.clients, public.client_contacts, public.work_locations, public.quote_requests, public.equipment, public.documents to authenticated;
grant insert, update, delete on public.projects, public.work_orders, public.project_equipment to authenticated;
grant update on public.profiles to authenticated;

create policy profiles_select_internal on public.profiles for select to authenticated using (public.is_internal_user());
create policy profiles_update_admin on public.profiles for update to authenticated using (public.current_app_role() = 'admin') with check (public.current_app_role() = 'admin');

create policy clients_select_internal on public.clients for select to authenticated using (public.is_internal_user());
create policy clients_insert_managers on public.clients for insert to authenticated with check (public.can_manage_records());
create policy clients_update_managers on public.clients for update to authenticated using (public.can_manage_records()) with check (public.can_manage_records());
create policy clients_delete_managers on public.clients for delete to authenticated using (public.can_manage_records());

create policy contacts_select_internal on public.client_contacts for select to authenticated using (public.is_internal_user());
create policy contacts_insert_managers on public.client_contacts for insert to authenticated with check (public.can_manage_records());
create policy contacts_update_managers on public.client_contacts for update to authenticated using (public.can_manage_records()) with check (public.can_manage_records());
create policy contacts_delete_managers on public.client_contacts for delete to authenticated using (public.can_manage_records());

create policy work_locations_select_internal on public.work_locations for select to authenticated using (public.is_internal_user());
create policy work_locations_insert_managers on public.work_locations for insert to authenticated with check (public.can_manage_records());
create policy work_locations_update_managers on public.work_locations for update to authenticated using (public.can_manage_records()) with check (public.can_manage_records());
create policy work_locations_delete_managers on public.work_locations for delete to authenticated using (public.can_manage_records());

create policy projects_select_internal on public.projects for select to authenticated using (public.is_internal_user());
create policy projects_insert_operations on public.projects for insert to authenticated with check (public.can_edit_operations());
create policy projects_update_operations on public.projects for update to authenticated using (public.can_edit_operations()) with check (public.can_edit_operations());
create policy projects_delete_managers on public.projects for delete to authenticated using (public.can_manage_records());

create policy quotes_select_internal on public.quote_requests for select to authenticated using (public.is_internal_user());
create policy quotes_insert_managers on public.quote_requests for insert to authenticated with check (public.can_manage_records());
create policy quotes_update_managers on public.quote_requests for update to authenticated using (public.can_manage_records()) with check (public.can_manage_records());
create policy quotes_delete_managers on public.quote_requests for delete to authenticated using (public.can_manage_records());

create policy work_orders_select_internal on public.work_orders for select to authenticated using (public.is_internal_user());
create policy work_orders_insert_operations on public.work_orders for insert to authenticated with check (public.can_edit_operations());
create policy work_orders_update_operations on public.work_orders for update to authenticated using (public.can_edit_operations()) with check (public.can_edit_operations());
create policy work_orders_delete_managers on public.work_orders for delete to authenticated using (public.can_manage_records());

create policy equipment_select_internal on public.equipment for select to authenticated using (public.is_internal_user());
create policy equipment_insert_managers on public.equipment for insert to authenticated with check (public.can_manage_records());
create policy equipment_update_managers on public.equipment for update to authenticated using (public.can_manage_records()) with check (public.can_manage_records());
create policy equipment_delete_managers on public.equipment for delete to authenticated using (public.can_manage_records());

create policy project_equipment_select_internal on public.project_equipment for select to authenticated using (public.is_internal_user());
create policy project_equipment_insert_operations on public.project_equipment for insert to authenticated with check (public.can_edit_operations());
create policy project_equipment_update_operations on public.project_equipment for update to authenticated using (public.can_edit_operations()) with check (public.can_edit_operations());
create policy project_equipment_delete_operations on public.project_equipment for delete to authenticated using (public.can_edit_operations());

create policy documents_select_internal on public.documents for select to authenticated using (public.is_internal_user());
create policy documents_insert_operations on public.documents for insert to authenticated with check (public.can_edit_operations());
create policy documents_update_operations on public.documents for update to authenticated using (public.can_edit_operations()) with check (public.can_edit_operations());
create policy documents_delete_managers on public.documents for delete to authenticated using (public.can_manage_records());

