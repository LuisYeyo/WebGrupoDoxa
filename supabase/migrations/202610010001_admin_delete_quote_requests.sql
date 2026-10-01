-- Only administrators may permanently delete quote requests.
-- The existing audit trigger keeps the deleted record data in audit_logs.
drop policy if exists quotes_delete_managers on public.quote_requests;
drop policy if exists quotes_delete_admins on public.quote_requests;

create policy quotes_delete_admins
  on public.quote_requests
  for delete
  to authenticated
  using (public.current_app_role() = 'admin');
