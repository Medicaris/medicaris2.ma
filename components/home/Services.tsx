'use client'

import { useT } from '@/lib/i18n/LocaleContext'
import type { Service } from '@/lib/supabase/types'
import { Reveal } from '@/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'

export function Services({ services }: { services: Service[] }) {
  const t = useT()

  return (
    <section id="services" className="bg-paper-alt py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-navy/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-navy">
            {t('Nos services', 'Our Services')}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t("Un équipement ne s'achète pas, il se met en service", 'Equipment is not just bought, it is commissioned')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {t(
              'Nous prenons en charge la chaîne complète, du choix de la configuration jusqu’au réapprovisionnement en consommables.',
              'We handle the full chain, from choosing the configuration to consumable resupply.'
            )}
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <div className="text-4xl font-bold text-rf/50">{String(service.step_number).padStart(2, '0')}</div>
              <h3 className="mt-3 text-base font-semibold text-ink">{t(service.title_fr, service.title_en)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(service.body_fr, service.body_en)}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
