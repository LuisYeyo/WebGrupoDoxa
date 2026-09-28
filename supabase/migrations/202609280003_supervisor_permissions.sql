create or replace function public.can_manage_records()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_app_role() in ('admin', 'manager', 'supervisor'), false);
$$;

create or replace function public.can_edit_operations()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_app_role() in ('admin', 'manager', 'supervisor', 'staff'), false);
$$;
