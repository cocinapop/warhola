-- WARHOLA GIN · Tienda en Supabase
-- Cómo usarlo: en Supabase abrí "SQL Editor", pegá TODO este texto, cambiá
-- TU_EMAIL@ejemplo.com por el email de tu usuario administrador (en TODAS
-- las líneas donde aparece) y tocá "Run". Se puede correr de nuevo sin
-- problema: no pisa datos existentes.

create table if not exists public.tienda_productos (
  id text primary key,
  precio integer,
  formato text,
  disponible boolean not null default true,
  stock integer,
  updated_at timestamptz not null default now()
);

alter table public.tienda_productos add column if not exists stock integer;
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
  ('superstar', 40000, '500 ml', true),
  ('hop', 48000, '750 ml', true),
  ('pure-soap', null, 'Dispenser 600 ml · Refill 500 ml', true)
on conflict (id) do nothing;

-- ============================================================
-- VISITAS: cuenta cuánta gente entra, mira la tienda y manda pedidos
-- ============================================================
create table if not exists public.tienda_visitas (
  id bigint generated always as identity primary key,
  visitante text not null check (char_length(visitante) <= 40),
  tipo text not null check (tipo in ('visita','tienda','pedido','consulta')),
  detalle text check (char_length(detalle) <= 60),
  origen text check (char_length(origen) <= 30),
  creado timestamptz not null default now()
);

alter table public.tienda_visitas enable row level security;

-- Cualquiera puede ANOTAR una visita (pero no leerlas)
drop policy if exists "anotar visita" on public.tienda_visitas;
create policy "anotar visita" on public.tienda_visitas
  for insert to anon, authenticated with check (true);

-- SOLO tu usuario administrador puede LEER las visitas
drop policy if exists "leer visitas admin" on public.tienda_visitas;
create policy "leer visitas admin" on public.tienda_visitas
  for select to authenticated
  using ((auth.jwt() ->> 'email') = 'TU_EMAIL@ejemplo.com');
