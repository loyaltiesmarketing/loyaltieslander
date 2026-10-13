-- Support + abuse tickets (created via create-ticket edge function)

create type public.ticket_channel as enum ('abuse', 'support');
create type public.ticket_status as enum ('open', 'in_progress', 'closed');

create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  channel public.ticket_channel not null,
  category text not null,
  name text,
  email text,
  message text not null,
  venue_name text,
  campaign_ref text,
  answers jsonb not null default '{}'::jsonb,
  client_ip_hash text,
  status public.ticket_status not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tickets_message_length check (char_length(message) between 1 and 8000),
  constraint tickets_category_length check (char_length(category) between 1 and 120),
  constraint tickets_name_length check (name is null or char_length(name) <= 200),
  constraint tickets_email_length check (email is null or char_length(email) <= 320),
  constraint tickets_venue_length check (venue_name is null or char_length(venue_name) <= 200),
  constraint tickets_campaign_length check (campaign_ref is null or char_length(campaign_ref) <= 200)
);

create index tickets_channel_created_at_idx
  on public.tickets (channel, created_at desc);

create index tickets_status_created_at_idx
  on public.tickets (status, created_at desc);

-- Rate limiting lookups: recent tickets from the same hashed IP
create index tickets_ip_hash_created_at_idx
  on public.tickets (client_ip_hash, created_at desc)
  where client_ip_hash is not null;

create or replace function public.set_tickets_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger tickets_set_updated_at
  before update on public.tickets
  for each row
  execute function public.set_tickets_updated_at();

alter table public.tickets enable row level security;

-- No anon/authenticated policies: inserts go through the edge function (service role).
-- Authenticated staff can read later via dashboard or a separate admin policy.

comment on table public.tickets is
  'Public support and abuse reports submitted from the marketing site.';
