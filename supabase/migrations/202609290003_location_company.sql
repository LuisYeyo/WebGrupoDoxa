alter table public.work_locations
  add column if not exists company_name text;

alter table public.work_locations
  drop constraint if exists work_locations_company_name_length;

alter table public.work_locations
  add constraint work_locations_company_name_length
  check (company_name is null or char_length(company_name) between 2 and 150);
