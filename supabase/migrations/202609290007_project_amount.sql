-- Commercial amount agreed for each project or job.
alter table public.projects
  add column if not exists amount numeric(14,2) check (amount is null or amount >= 0),
  add column if not exists currency text not null default 'MXN' check (currency in ('MXN', 'USD'));
