'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheck, Layers, GraduationCap, Clock } from 'lucide-react'
import { useT } from '@/lib/i18n/LocaleContext'
import { MOTION } from '@/lib/motion/tokens'
import { HeroBackground } from './HeroBackground'

const TRUST_ITEMS = [
  { icon: ShieldCheck, fr: 'Société marocaine enregistrée', en: 'Registered Moroccan company' },
  { icon: Layers, fr: 'Distributeur exclusif au Maroc', en: 'Exclusive distributor in Morocco' },
  { icon: GraduationCap, fr: 'Installation & formation incluses', en: 'Installation & training included' },
  { icon: Clock, fr: 'Réponse sous 24 h', en: 'Reply within 24h' },
]

export function Hero() {
  const t = useT()
  const reduce = useReducedMotion()

  return (
    <section id="hero" className="relative flex min-h-[80vh] items-center overflow-hidden border-b border-paper/10 text-paper sm:min-h-[92vh]">
      <HeroBackground />

      <div className="relative z-2 mx-auto max-w-6xl px-6 py-8 sm:py-16">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: MOTION.duration.slow, ease: MOTION.ease }}
          className="text-[7vw] font-bold leading-[1.1] tracking-tight sm:text-[clamp(2.2rem,5.5vw,3.75rem)] sm:leading-[1.08]"
        >
          {t('Des gestes moins lourds,', 'Lighter procedures,')}
          <br />
          <em className="text-rf not-italic">{t('des patients debout plus vite.', 'patients back on their feet faster.')}</em>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: MOTION.duration.slow, delay: 0.1, ease: MOTION.ease }}
          className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-paper/75 sm:text-base lg:max-w-none lg:text-lg"
        >
          {t(
            'Laser et radiofréquence pour la proctologie, la phlébologie, l’urologie et l’ablation tissulaire.',
            'Laser and radiofrequency for proctology, phlebology, urology and tissue ablation.'
          )}
          <span aria-hidden="true" className="mx-1.5 inline-flex text-paper/40">
            <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13">
              <path d="M10 1.5l2.35 5.36 5.85.6-4.4 3.94 1.28 5.75L10 14.9l-5.08 2.25 1.28-5.75-4.4-3.94 5.85-.6L10 1.5z" />
            </svg>
          </span>
          <br className="hidden lg:block" />
          {t(
            'Medicaris équipe et accompagne les chirurgiens et les cliniques au Maroc.',
            'Medicaris equips and supports surgeons and clinics across Morocco.'
          )}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: MOTION.duration.slow, delay: 0.2, ease: MOTION.ease }}
          className="mt-9 flex flex-nowrap gap-2.5 sm:gap-4"
        >
          <a
            href="#contact"
            className="whitespace-nowrap rounded-lg bg-rf px-3.5 py-2.5 text-[0.8125rem] font-semibold text-navy-deep shadow-[0_2px_8px_oklch(0.7_0.16_55/0.35)] transition-all duration-200 hover:-translate-y-px hover:bg-[oklch(0.65_0.17_53)] hover:shadow-[0_4px_16px_oklch(0.7_0.16_55/0.4)] sm:px-7 sm:py-3.25 sm:text-[0.9375rem]"
          >
            {t('Demander un devis', 'Request a Quote')}
          </a>
          <a
            href="#equipements"
            className="whitespace-nowrap rounded-lg border-2 border-paper/55 px-3.5 py-2.5 text-[0.8125rem] font-semibold text-paper transition-all duration-200 hover:bg-paper hover:text-navy-deep sm:px-7 sm:py-3.25 sm:text-[0.9375rem]"
          >
            {t('Voir les équipements', 'View Equipment')}
          </a>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: MOTION.duration.slow, delay: 0.3, ease: MOTION.ease }}
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-paper/10 pt-6 sm:mt-16 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-5 sm:pt-8"
        >
          {TRUST_ITEMS.map((item) => (
            <div key={item.fr} className="flex items-start gap-2 text-[0.78rem] text-paper/70 sm:gap-2.5 sm:text-sm">
              <item.icon size={16} className="mt-0.5 shrink-0 text-rf" />
              <span>{t(item.fr, item.en)}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
