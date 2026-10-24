-- WARHOLA GIN · Tienda en Supabase
-- Cómo usarlo: en Supabase abrí "SQL Editor", pegá TODO este texto, cambiá
-- TU_EMAIL@ejemplo.com por el email de tu usuario administrador (en las dos
-- líneas donde aparece) y tocá "Run".

create table if not exists public.tienda_productos (
  id text primary key,
  precio integer,
  formato text,
  disponible boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.tienda_productos enable row level security;

-- Cualquiera puede LEER precios y stock (lo necesita la tienda pública)
drop policy if exists "lectura publica" on public.tienda_productos;
create policy "lectura publica" on public.tienda_productos
  for select to anon, authenticated using (true);

-- SOLO tu usuario administrador puede MODIFICAR
drop policy if exists "escritura admin" on public.tienda_productos;
create policy "escritura admin" on public.tienda_productos
  for all to authenticated
  using ((auth.jwt() ->> 'email') = 'TU_EMAIL@ejemplo.com')
  with check ((auth.jwt() ->> 'email') = 'TU_EMAIL@ejemplo.com');

-- Datos iniciales (si ya existen, no se pisan)
insert into public.tienda_productos (id, precio, formato, disponible) values
  ('rose-cucumber-almond', 75000, '1125 ml', true),
  ('play', 75000, '900 ml · cantimplora', true),
  ('orange', 48000, null, true),
  ('coke', 48000, '750 ml', true),
  ('bloody', 53000, null, true),
  ('superstar', 40000, '500 ml', true)
on conflict (id) do nothing;
