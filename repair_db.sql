-- SCRIPT DE REPARACIÓN PARA APP CALMA
-- Ejecuta esto en el Editor SQL de Supabase para arreglar triggers faltantes

-- 1. Actualizar la Función (Seguro de ejecutar múltiples veces)
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

-- 2. Re-crear el Trigger (Lo elimina primero para evitar error de "ya existe")
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Asegurar que tabla de Progreso del Usuario exista
create table if not exists public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  exercise_id text not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, exercise_id)
);

-- 4. Asegurar que RLS esté habilitado
alter table public.user_progress enable row level security;
