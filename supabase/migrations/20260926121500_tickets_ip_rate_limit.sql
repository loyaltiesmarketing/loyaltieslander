-- If tickets already exists without client_ip_hash, run this after the base migration.

alter table public.tickets
  add column if not exists client_ip_hash text;

create index if not exists tickets_ip_hash_created_at_idx
  on public.tickets (client_ip_hash, created_at desc)
  where client_ip_hash is not null;

comment on column public.tickets.client_ip_hash is
  'SHA-256 hash of submitter IP for rate limiting (max 2 tickets / 15 minutes).';
