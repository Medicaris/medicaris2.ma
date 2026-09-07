'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { MOTION } from '@/lib/motion/tokens'

/**
 * Fond plein cadre du hero : dégradé navy diagonal + grille discrète + anneaux
 * concentriques (motif radiofréquence, cohérent avec RFDiagram) — reprend la
 * composition du hero-placeholder.svg d'origine, sans dépendre d'une photo.
 */
export function HeroBackground() {
  const reduce = useReducedMotion()

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <linearGradient id="hero-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-navy-deep)" />
            <stop offset="55%" stopColor="var(--color-navy)" />
            <stop offset="100%" stopColor="var(--color-navy-soft)" />
          </linearGradient>
          <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M80 0H0V80" fill="none" stroke="#FFFFFF" strokeOpacity="0.05" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1920" height="1080" fill="url(#hero-bg)" />
        <rect width="1920" height="1080" fill="url(#hero-grid)" />

        <motion.g
          fill="none"
          stroke="var(--color-rf)"
          strokeOpacity="0.16"
          strokeWidth="1.5"
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: MOTION.duration.slow * 1.4, ease: MOTION.ease }}
          style={{ transformOrigin: '1540px 260px' }}
        >
          <circle cx="1540" cy="260" r="420" />
          <circle cx="1540" cy="260" r="300" />
          <circle cx="1540" cy="260" r="180" />
        </motion.g>

        <g fill="var(--color-rf)" fillOpacity="0.14">
          <rect x="220" y="760" width="64" height="16" rx="8" />
          <rect x="244" y="736" width="16" height="64" rx="8" />
        </g>
        <g fill="#FFFFFF" fillOpacity="0.045">
          <rect x="1120" y="120" width="48" height="12" rx="6" />
          <rect x="1138" y="102" width="12" height="48" rx="6" />
        </g>
      </svg>

      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, oklch(0.19 0.05 258 / 0.4) 0%, oklch(0.19 0.05 258 / 0.72) 100%)' }}
      />
    </div>
  )
}
