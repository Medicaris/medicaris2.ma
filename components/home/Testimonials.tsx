'use client'

import { useT } from '@/lib/i18n/LocaleContext'
import { Reveal } from '@/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import type { Testimonial } from '@/lib/supabase/types'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const t = useT()

  if (testimonials.length === 0) return null

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
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <StaggerItem key={item.id} className="rounded-2xl border border-line bg-paper-alt p-7">
              <p className="text-sm leading-relaxed text-ink">{t(item.quote_fr, item.quote_en)}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-semibold text-paper">
                  {item.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">{t(item.name_fr, item.name_en)}</div>
                  <div className="text-xs text-muted">{t(item.role_fr, item.role_en)}</div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
