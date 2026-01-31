-- REPAIR SCRIPT FOR CALMA APP
-- Run this in Supabase SQL Editor to fix the missing triggers

-- 1. Update the Function (Safe to run multiple times)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'avatar_url')
  on conflict (id) do update set
    email = excluded.email,
    full_name = excluded.full_name;
  return new;
end;
$$;

-- 2. Re-create the Trigger (Drops it first to avoid "already exists" error)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Ensure User Progress table exists
create table if not exists public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  exercise_id text not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, exercise_id)
);

-- 4. Ensure RLS is enabled
alter table public.user_progress enable row level security;
