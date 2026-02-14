-- ESQUEMA APP CALMA

-- 1. Tabla de Perfiles
-- Almacena información adicional del usuario no contenida en auth.users
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone,

  primary key (id)
);

-- Habilitar RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Perfiles públicos son visibles por todos."
  on profiles for select
  using ( true );

create policy "Usuarios pueden insertar su propio perfil."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Usuarios pueden actualizar su propio perfil."
  on profiles for update
  using ( auth.uid() = id );


-- 2. Trigger de Autenticación
-- Crea automáticamente una entrada de perfil cuando un nuevo usuario se registra
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


-- 3. Tabla de Progreso del Usuario
-- Rastrea el estado de finalización de los ejercicios
create table public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  exercise_id text not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Asegura solo un registro de finalización por ejercicio y usuario
  unique(user_id, exercise_id)
);

alter table public.user_progress enable row level security;

create policy "Usuarios pueden ver su propio progreso."
  on user_progress for select
  using ( auth.uid() = user_id );

create policy "Usuarios pueden insertar su propio progreso."
  on user_progress for insert
  with check ( auth.uid() = user_id );
