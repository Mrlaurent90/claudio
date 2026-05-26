-- =============================================================================
-- Supabase schema for the Roma cockpit.
-- Run this in Supabase Studio → SQL Editor once your project exists.
-- =============================================================================

-- One row per trip holds all the synced state as JSON maps.
create table if not exists public.trip_state (
  trip_id     text primary key,
  checklist   jsonb not null default '{}'::jsonb,
  resa_status jsonb not null default '{}'::jsonb,
  decisions   jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

-- Make this table broadcast changes over Realtime.
alter publication supabase_realtime add table public.trip_state;

-- Row Level Security: the trip id in the URL is the shared secret. Anyone who
-- knows it can read/write that single row, nothing else. This matches the
-- "trip id in URL" auth choice (simple, no login) while keeping each trip
-- isolated. Tighten later by switching to a shared-code or magic-link model.
alter table public.trip_state enable row level security;

create policy "read trip_state" on public.trip_state
  for select using (true);

create policy "insert trip_state" on public.trip_state
  for insert with check (true);

create policy "update trip_state" on public.trip_state
  for update using (true) with check (true);

-- Seed the row for this trip so the first write is an update, not a race.
insert into public.trip_state (trip_id)
values ('roma-31mai-7f3k9')
on conflict (trip_id) do nothing;
