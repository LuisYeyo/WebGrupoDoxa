-- Permanent DOXA workshops. External/client locations are managed from the app.
create unique index if not exists work_locations_company_workshop_number_uidx
  on public.work_locations(workshop_number)
  where kind = 'company_workshop';

insert into public.work_locations (name, kind, workshop_number, status)
select 'Taller DOXA 1', 'company_workshop', 1, 'active'
where not exists (
  select 1 from public.work_locations
  where kind = 'company_workshop' and workshop_number = 1
);

insert into public.work_locations (name, kind, workshop_number, status)
select 'Taller DOXA 2', 'company_workshop', 2, 'active'
where not exists (
  select 1 from public.work_locations
  where kind = 'company_workshop' and workshop_number = 2
);

insert into public.work_locations (name, kind, workshop_number, status)
select 'Taller DOXA 3', 'company_workshop', 3, 'active'
where not exists (
  select 1 from public.work_locations
  where kind = 'company_workshop' and workshop_number = 3
);
