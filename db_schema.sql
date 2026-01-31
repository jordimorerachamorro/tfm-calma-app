-- CALMA APP SCHEMA

-- 1. Profiles Table
-- Stores additional user information not held in auth.users
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone,

  primary key (id)
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );


-- 2. Auth Trigger
-- Automatically creates a profile entry when a new user signs up
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'avatar_url');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 3. User Progress Table
-- Tracks exercise completion status
create table public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  exercise_id text not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Ensure only one completion record per exercise per user
  unique(user_id, exercise_id)
);

alter table public.user_progress enable row level security;

create policy "Users can view own progress."
  on user_progress for select
  using ( auth.uid() = user_id );

create policy "Users can insert own progress."
  on user_progress for insert
  with check ( auth.uid() = user_id );
