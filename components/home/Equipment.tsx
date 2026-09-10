'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useT } from '@/lib/i18n/LocaleContext'
import { useAudience } from '@/lib/audience/AudienceContext'
import type { Equipment as EquipmentType } from '@/lib/supabase/types'
import { Reveal } from '@/components/motion/Reveal'

function EquipmentCard({ item }: { item: EquipmentType }) {
  const t = useT()
  const { audience } = useAudience()
  const [specsOpen, setSpecsOpen] = useState(audience === 'professionnel')
  const isRf = item.energy_type === 'rf'

  return (
    <Reveal className="rounded-3xl border border-line bg-paper p-8 shadow-card lg:p-10">
      <div>
        <div className={`text-xs font-semibold uppercase tracking-widest ${isRf ? 'text-rf-ink' : 'text-laser-ink'}`}>
          {t(item.eyebrow_fr, item.eyebrow_en)}
        </div>
        <h3 className="mt-2 text-xl font-semibold text-ink">{t(item.name_fr, item.name_en)}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{t(item.description_fr, item.description_en)}</p>

        {item.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag.fr}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  isRf ? 'bg-rf-soft text-rf-ink' : 'bg-laser-soft text-laser-ink'
                }`}
              >
                {t(tag.fr, tag.en)}
              </span>
            ))}
          </div>
        )}

        {item.spec_sheet && item.spec_sheet.length > 0 && (
          <div className="mt-6 border-t border-line pt-5">
            <button
              type="button"
              onClick={() => setSpecsOpen((o) => !o)}
              className="flex items-center gap-1.5 text-sm font-semibold text-navy"
            >
              {t('Fiche technique', 'Technical specifications')}
              <ChevronDown size={16} className={`transition-transform ${specsOpen ? 'rotate-180' : ''}`} />
            </button>
            {specsOpen && (
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {item.spec_sheet.map((spec) => (
                  <div key={spec.label_fr} className="contents">
                    <dt className="text-muted">{t(spec.label_fr, spec.label_en)}</dt>
                    <dd className="font-medium text-ink">{t(spec.value_fr, spec.value_en)}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}

        <a href="#contact" className="mt-6 inline-block text-sm font-semibold text-navy hover:underline">
          {t('En savoir plus +', 'Learn more +')}
        </a>
      </div>
    </Reveal>
  )
}

export function Equipment({ equipment }: { equipment: EquipmentType[] }) {
  const t = useT()

  return (
    <section id="equipements" className="bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-navy/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-navy">
            {t('Équipements', 'Equipment')}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t('Une gamme sélectionnée, un interlocuteur unique', 'A curated range, a single point of contact')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {t(
              'Chaque système est choisi pour sa fiabilité clinique. Distributeur exclusif au Maroc, Medicaris est votre seul contact, du devis au support technique.',
              'Each system is selected for its clinical reliability. As the exclusive distributor in Morocco, Medicaris is your single point of contact, from quotation to technical support.'
            )}
          </p>
          <Image
            src="/img/equipements.webp"
            alt={t('Équipements Medicaris', 'Medicaris equipment')}
            width={896}
            height={1195}
            className="mx-auto mt-8 h-auto w-full max-w-md rounded-2xl"
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {equipment.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          {t(
            'Fiches techniques complètes et gammes additionnelles disponibles sur demande.',
            'Full technical datasheets and additional product lines available on request.'
          )}
        </p>
        <div className="mt-6 text-center">
          <a
            href="#contact"
            className="inline-block rounded-full border border-navy px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-paper"
          >
            {t('Nous contacter pour en savoir plus', 'Contact us to learn more')}
          </a>
        </div>
      </div>
    </section>
  )
}
