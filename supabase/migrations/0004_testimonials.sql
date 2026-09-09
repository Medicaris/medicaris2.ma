-- Medicaris — témoignages personnalisables depuis l'admin
-- À coller dans Supabase Dashboard → SQL Editor → New query → Run

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  initials text not null,
  quote_fr text not null,
  quote_en text not null,
  name_fr text not null,
  name_en text not null,
  role_fr text not null,
  role_en text not null,
  order_index int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table testimonials enable row level security;

create policy "public read active testimonials" on testimonials
  for select using (active = true);
create policy "authenticated manage testimonials" on testimonials
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ── Contenu de départ : témoignages d'exemple, portés du composant Testimonials ──
insert into testimonials (initials, quote_fr, quote_en, name_fr, name_en, role_fr, role_en, order_index) values
('PC',
 'La formation à l''installation nous a permis d''être opérationnels dès la première semaine, avec un accompagnement clair sur le réglage des paramètres.',
 'The installation training got us operational within the first week, with clear guidance on parameter settings.',
 'Proctologue', 'Proctologist',
 'Clinique privée · Casablanca', 'Private clinic · Casablanca', 1),
('CV',
 'Le suivi sur les consommables est réactif : nous n''avons jamais eu de rupture qui ait retardé un bloc.',
 'Consumables follow-up is responsive: we''ve never had a shortage delay a procedure.',
 'Chirurgien vasculaire', 'Vascular surgeon',
 'Établissement de santé · Rabat', 'Healthcare facility · Rabat', 2),
('RI',
 'Interlocuteur unique du devis à la livraison : ça simplifie vraiment les démarches administratives d''importation.',
 'A single point of contact from quotation to delivery genuinely simplifies the import paperwork.',
 'Radiologue interventionnel', 'Interventional radiologist',
 'Clinique privée · Marrakech', 'Private clinic · Marrakech', 3);
