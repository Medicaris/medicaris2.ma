'use client'

import { useT } from '@/lib/i18n/LocaleContext'
import { Reveal } from '@/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'

const TESTIMONIALS = [
  {
    initials: 'PC',
    quoteFr:
      "La formation à l'installation nous a permis d'être opérationnels dès la première semaine, avec un accompagnement clair sur le réglage des paramètres.",
    quoteEn: 'The installation training got us operational within the first week, with clear guidance on parameter settings.',
    nameFr: 'Proctologue',
    nameEn: 'Proctologist',
    roleFr: 'Clinique privée · Casablanca',
    roleEn: 'Private clinic · Casablanca',
  },
  {
    initials: 'CV',
    quoteFr: "Le suivi sur les consommables est réactif : nous n'avons jamais eu de rupture qui ait retardé un bloc.",
    quoteEn: "Consumables follow-up is responsive: we've never had a shortage delay a procedure.",
    nameFr: 'Chirurgien vasculaire',
    nameEn: 'Vascular surgeon',
    roleFr: 'Établissement de santé · Rabat',
    roleEn: 'Healthcare facility · Rabat',
  },
  {
    initials: 'RI',
    quoteFr: 'Interlocuteur unique du devis à la livraison : ça simplifie vraiment les démarches administratives d’importation.',
    quoteEn: 'A single point of contact from quotation to delivery genuinely simplifies the import paperwork.',
    nameFr: 'Radiologue interventionnel',
    nameEn: 'Interventional radiologist',
    roleFr: 'Clinique privée · Marrakech',
    roleEn: 'Private clinic · Marrakech',
  },
]

export function Testimonials() {
  const t = useT()

  return (
    <section id="temoignages" className="bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-navy/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-navy">
            {t('Témoignages', 'Testimonials')}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t('Ce que nos partenaires en disent', 'What our partners say')}
          </h2>
          <p className="mt-4 text-sm text-muted">
            {t(
              'Format d’illustration : ces témoignages sont des exemples de mise en page, à remplacer par de vrais retours de praticiens partenaires.',
              'Layout example: these testimonials are placeholder content, to be replaced with real feedback from partner practitioners.'
            )}
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <StaggerItem key={item.initials} className="rounded-2xl border border-line bg-paper-alt p-7">
              <span className="text-xs font-medium uppercase tracking-wide text-muted/70">
                {t('Témoignage à titre d’exemple', 'Sample testimonial')}
              </span>
              <p className="mt-4 text-sm leading-relaxed text-ink">{t(item.quoteFr, item.quoteEn)}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-semibold text-paper">
                  {item.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">{t(item.nameFr, item.nameEn)}</div>
                  <div className="text-xs text-muted">{t(item.roleFr, item.roleEn)}</div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
