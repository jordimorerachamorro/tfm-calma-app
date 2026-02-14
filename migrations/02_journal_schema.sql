-- 4. Tabla de Entradas del Diario
-- Almacena las entradas privadas del diario del usuario
create table public.journal_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  mood text, -- ej: 'Happy', 'Sad' (se guardan en inglés/código pero se muestran traducidos)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS
alter table public.journal_entries enable row level security;

-- Policies
create policy "Usuarios pueden ver sus propias entradas."
  on journal_entries for select
  using ( auth.uid() = user_id );

create policy "Usuarios pueden insertar sus propias entradas."
  on journal_entries for insert
  with check ( auth.uid() = user_id );

create policy "Usuarios pueden actualizar sus propias entradas."
  on journal_entries for update
  using ( auth.uid() = user_id );

create policy "Usuarios pueden eliminar sus propias entradas."
  on journal_entries for delete
  using ( auth.uid() = user_id );
