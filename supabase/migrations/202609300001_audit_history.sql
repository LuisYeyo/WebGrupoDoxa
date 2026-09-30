create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  table_name text not null,
  record_id uuid,
  action text not null check (action in ('INSERT', 'UPDATE', 'DELETE')),
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_logs_created_at_idx on public.audit_logs(created_at desc);
create index if not exists audit_logs_record_idx on public.audit_logs(table_name, record_id);

create or replace function public.record_audit_log()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'DELETE' then
    insert into public.audit_logs (actor_id, table_name, record_id, action, old_data)
    values (auth.uid(), tg_table_name, old.id, tg_op, to_jsonb(old));
    return old;
  elsif tg_op = 'UPDATE' then
    insert into public.audit_logs (actor_id, table_name, record_id, action, old_data, new_data)
    values (auth.uid(), tg_table_name, new.id, tg_op, to_jsonb(old), to_jsonb(new));
    return new;
  else
    insert into public.audit_logs (actor_id, table_name, record_id, action, new_data)
    values (auth.uid(), tg_table_name, new.id, tg_op, to_jsonb(new));
    return new;
  end if;
end;
$$;

alter table public.audit_logs enable row level security;
revoke all on public.audit_logs from anon, authenticated;
grant select on public.audit_logs to authenticated;

drop policy if exists audit_logs_select_managers on public.audit_logs;
create policy audit_logs_select_managers
  on public.audit_logs for select to authenticated
  using (public.can_manage_records());

drop trigger if exists clients_audit_log on public.clients;
create trigger clients_audit_log after insert or update or delete on public.clients for each row execute function public.record_audit_log();
drop trigger if exists projects_audit_log on public.projects;
create trigger projects_audit_log after insert or update or delete on public.projects for each row execute function public.record_audit_log();
drop trigger if exists quote_requests_audit_log on public.quote_requests;
create trigger quote_requests_audit_log after insert or update or delete on public.quote_requests for each row execute function public.record_audit_log();
drop trigger if exists work_orders_audit_log on public.work_orders;
create trigger work_orders_audit_log after insert or update or delete on public.work_orders for each row execute function public.record_audit_log();
drop trigger if exists equipment_audit_log on public.equipment;
create trigger equipment_audit_log after insert or update or delete on public.equipment for each row execute function public.record_audit_log();
drop trigger if exists work_locations_audit_log on public.work_locations;
create trigger work_locations_audit_log after insert or update or delete on public.work_locations for each row execute function public.record_audit_log();

revoke all on function public.record_audit_log() from public;
