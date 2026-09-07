'use client'

import { HeartHandshake, Layers, MapPin, GraduationCap } from 'lucide-react'
import { useT } from '@/lib/i18n/LocaleContext'
import { LEGAL } from '@/lib/constants'
import { Reveal } from '@/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'

const STAT_CARDS = [
  { icon: HeartHandshake, numFr: 'Ciblés', numEn: 'Focused', labelFr: 'Domaines cliniques couverts', labelEn: 'Clinical fields covered' },
  {
    icon: Layers,
    numFr: 'Exclusif',
    numEn: 'Exclusive',
    labelFr: 'Distributeur exclusif au Maroc, sans intermédiaire',
    labelEn: 'Exclusive distributor in Morocco, no middleman',
  },
  { icon: MapPin, numFr: 'Casa', numEn: 'Casa', labelFr: 'Basés à Casablanca, livraison nationale', labelEn: 'Based in Casablanca, nationwide delivery' },
  {
    icon: GraduationCap,
    numFr: 'Sur site',
    numEn: 'On site',
    labelFr: "Installation et formation de l'équipe",
    labelEn: 'Installation and team training',
  },
]

export function Company() {
  const t = useT()

  return (
    <section id="societe" className="bg-paper-alt py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <span className="inline-block rounded-full bg-navy/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-navy">
            {t('La société', 'Company Profile')}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Medicaris SARL</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {t(
              'Medicaris est une société marocaine basée à Casablanca, spécialisée dans la distribution de dispositifs de chirurgie par énergie. Nous travaillons en relation directe avec les fabricants et nous adressons aux chirurgiens, aux cliniques et aux établissements de santé au Maroc.',
              'Medicaris is a Moroccan company based in Casablanca, specialised in the distribution of energy-based surgery devices. We work in direct relationship with manufacturers and serve surgeons, clinics and healthcare institutions across Morocco.'
            )}
          </p>

          <div className="mt-8 rounded-2xl border border-line bg-paper p-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted">
              {t('Informations légales', 'Legal Information')}
            </div>
            <table className="mt-4 w-full text-sm">
              <tbody>
                <tr className="border-t border-line">
                  <td className="py-2.5 text-muted">{t('Raison sociale', 'Company name')}</td>
                  <td className="py-2.5 text-right font-medium text-ink">{LEGAL.raisonSociale}</td>
                </tr>
                <tr className="border-t border-line">
                  <td className="py-2.5 text-muted">RC</td>
                  <td className="py-2.5 text-right font-medium text-ink">{LEGAL.rc}</td>
                </tr>
                <tr className="border-t border-line">
                  <td className="py-2.5 text-muted">ICE</td>
                  <td className="py-2.5 text-right font-medium text-ink">{LEGAL.ice}</td>
                </tr>
                <tr className="border-t border-line">
                  <td className="py-2.5 text-muted">{t('Identifiant fiscal', 'Tax ID')}</td>
                  <td className="py-2.5 text-right font-medium text-ink">{LEGAL.if}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {STAT_CARDS.map((card) => (
            <StaggerItem key={card.labelFr} className="rounded-2xl border border-line bg-paper p-6">
              <card.icon size={22} className="text-rf" />
              <div className="mt-4 text-xl font-bold text-ink">{t(card.numFr, card.numEn)}</div>
              <div className="mt-1 text-sm text-muted">{t(card.labelFr, card.labelEn)}</div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
