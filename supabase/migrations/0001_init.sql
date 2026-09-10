-- Medicaris — schéma initial
-- À coller dans Supabase Dashboard → SQL Editor → New query → Run

create extension if not exists "pgcrypto";

-- ── Actualités ──────────────────────────────────────────────
create table articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_fr text not null,
  title_en text not null,
  excerpt_fr text not null,
  excerpt_en text not null,
  content_fr text not null default '',
  content_en text not null default '',
  cover_image_url text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Domaines cliniques ──────────────────────────────────────
create table clinical_domains (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  icon_key text not null,
  tag_fr text not null,
  tag_en text not null,
  title_fr text not null,
  title_en text not null,
  body_fr text not null,
  body_en text not null,
  audience_fr text not null,
  audience_en text not null,
  order_index int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Équipements ─────────────────────────────────────────────
create table equipment (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  energy_type text not null check (energy_type in ('rf', 'laser')),
  clinical_domain_id uuid references clinical_domains(id) on delete set null,
  eyebrow_fr text not null,
  eyebrow_en text not null,
  name_fr text not null,
  name_en text not null,
  description_fr text not null,
  description_en text not null,
  tags jsonb not null default '[]',
  spec_sheet jsonb,
  image_url text,
  order_index int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Services (4 lignes fixes) ───────────────────────────────
create table services (
  id uuid primary key default gen_random_uuid(),
  step_number int not null,
  title_fr text not null,
  title_en text not null,
  body_fr text not null,
  body_en text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Réglages divers ─────────────────────────────────────────
create table settings (
  key text primary key,
  value text
);

-- ── RLS ─────────────────────────────────────────────────────
alter table articles enable row level security;
alter table clinical_domains enable row level security;
alter table equipment enable row level security;
alter table services enable row level security;
alter table settings enable row level security;

create policy "public read published articles" on articles
  for select using (published = true);
create policy "authenticated manage articles" on articles
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read active domains" on clinical_domains
  for select using (active = true);
create policy "authenticated manage domains" on clinical_domains
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read active equipment" on equipment
  for select using (active = true);
create policy "authenticated manage equipment" on equipment
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read services" on services
  for select using (true);
create policy "authenticated manage services" on services
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read settings" on settings
  for select using (true);
create policy "authenticated manage settings" on settings
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ── Storage buckets ─────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('equipment-images', 'equipment-images', true)
on conflict (id) do nothing;

create policy "public read article images" on storage.objects
  for select using (bucket_id = 'article-images');
create policy "authenticated write article images" on storage.objects
  for insert with check (bucket_id = 'article-images' and auth.role() = 'authenticated');
create policy "authenticated update article images" on storage.objects
  for update using (bucket_id = 'article-images' and auth.role() = 'authenticated');
create policy "authenticated delete article images" on storage.objects
  for delete using (bucket_id = 'article-images' and auth.role() = 'authenticated');

create policy "public read equipment images" on storage.objects
  for select using (bucket_id = 'equipment-images');
create policy "authenticated write equipment images" on storage.objects
  for insert with check (bucket_id = 'equipment-images' and auth.role() = 'authenticated');
create policy "authenticated update equipment images" on storage.objects
  for update using (bucket_id = 'equipment-images' and auth.role() = 'authenticated');
create policy "authenticated delete equipment images" on storage.objects
  for delete using (bucket_id = 'equipment-images' and auth.role() = 'authenticated');

-- ── Contenu de départ : services (4 étapes fixes, portées de site/index.html) ──
insert into services (step_number, title_fr, title_en, body_fr, body_en, order_index) values
(1, 'Sélection', 'Selection',
 'Nous partons de votre pratique (volume d''actes, indications, plateau technique) pour définir la configuration utile, sans surdimensionner.',
 'We start from your practice (case volume, indications, facilities) to define the right configuration, without overspecifying.', 1),
(2, 'Importation', 'Import',
 'Commande auprès du fabricant, transport, formalités douanières et livraison à la clinique. Un interlocuteur unique du bon de commande à la réception.',
 'Order placed with the manufacturer, shipping, customs formalities and delivery to the clinic. One single contact from purchase order to delivery.', 2),
(3, 'Installation & formation', 'Installation & training',
 'Mise en service sur site, réglages, et prise en main avec le chirurgien et l''équipe de bloc.',
 'On-site commissioning, settings, and hands-on training with the surgeon and theatre team.', 3),
(4, 'Consommables & support', 'Consumables & support',
 'Réapprovisionnement en fibres, cathéters et électrodes, et assistance technique en cas de problème.',
 'Resupply of fibres, catheters and electrodes, plus technical assistance when needed.', 4);

insert into settings (key, value) values ('maintenance_mode', 'false');
