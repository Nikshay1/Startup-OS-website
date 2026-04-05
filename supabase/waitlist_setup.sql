create table if not exists public.waitlist_signups (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null unique,
  company text,
  stage text not null check (stage in ('idea', 'validating', 'building', 'launched', 'scaling')),
  plan text not null check (plan in ('basic', 'pro', 'studio')),
  bottleneck text check (
    bottleneck is null
    or bottleneck in ('technical', 'validation', 'financial', 'legal', 'distribution', 'investors')
  ),
  created_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.waitlist_signups enable row level security;

drop policy if exists "public_can_insert_waitlist_signups" on public.waitlist_signups;

create policy "public_can_insert_waitlist_signups"
on public.waitlist_signups
for insert
to anon
with check (true);
