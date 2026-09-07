'use client'

import { useT } from '@/lib/i18n/LocaleContext'
import type { ClinicalDomain } from '@/lib/supabase/types'
import { Reveal } from '@/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { DomainIcon } from './DomainIcon'

export function ClinicalDomains({ domains }: { domains: ClinicalDomain[] }) {
  const t = useT()

  return (
    <section id="domaines" className="bg-paper-alt py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-navy/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-navy">
            {t('Domaines cliniques', 'Clinical Fields')}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t('Nos spécialités, une même logique', 'Our specialties, one principle')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {t(
              "Traiter la lésion par l'énergie plutôt que par l'exérèse : moins de douleur postopératoire, une récupération plus courte, un geste réalisable en ambulatoire.",
              'Treating the lesion with energy rather than excision: less postoperative pain, shorter recovery, procedures that can be performed as day surgery.'
            )}
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2">
          {domains.map((domain) => (
            <StaggerItem
              key={domain.id}
              className="group rounded-2xl border border-line bg-paper p-8 shadow-card transition-shadow hover:shadow-lift"
            >
              <DomainIcon iconKey={domain.icon_key} className="h-9 w-9 text-navy" />
              <div className="mt-5 text-xs font-semibold uppercase tracking-widest text-rf-ink">
                {t(domain.tag_fr, domain.tag_en)}
              </div>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">{t(domain.title_fr, domain.title_en)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t(domain.body_fr, domain.body_en)}</p>
              <div className="mt-5 text-xs font-medium text-muted/80">{t(domain.audience_fr, domain.audience_en)}</div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
