'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { MOTION } from '@/lib/motion/tokens'

/** Diagramme technique animé — tracé de signal RF + électrode. Remplace la photo produit absente. */
export function RFDiagram({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1 },
  }

  return (
    <svg viewBox="0 0 320 240" className={className} aria-hidden="true">
      <rect x="0" y="0" width="320" height="240" rx="20" className="fill-navy-deep" />
      <motion.circle
        cx="120"
        cy="120"
        r="48"
        fill="none"
        stroke="var(--color-rf)"
        strokeWidth="1.5"
        strokeOpacity="0.35"
        initial={reduce ? false : { scale: 0.7, opacity: 0 }}
        whileInView={reduce ? undefined : { scale: 1, opacity: 0.35 }}
        viewport={{ once: true }}
        transition={{ duration: MOTION.duration.slow, ease: MOTION.ease }}
      />
      <motion.circle
        cx="120"
        cy="120"
        r="30"
        fill="none"
        stroke="var(--color-rf)"
        strokeWidth="1.5"
        strokeOpacity="0.6"
        initial={reduce ? false : { scale: 0.7, opacity: 0 }}
        whileInView={reduce ? undefined : { scale: 1, opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: MOTION.duration.slow, delay: 0.1, ease: MOTION.ease }}
      />
      <circle cx="120" cy="120" r="5" fill="var(--color-rf)" />
      <motion.path
        d="M150 120h24l10-28 12 56 10-40 8 20h26"
        fill="none"
        stroke="var(--color-rf)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: MOTION.duration.slow, ease: MOTION.ease }}
      />
      <text x="120" y="180" textAnchor="middle" className="fill-paper/60 text-[11px]" fontFamily="var(--font-sans)">
        50°C
      </text>
    </svg>
  )
}
