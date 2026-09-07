'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { MOTION } from '@/lib/motion/tokens'

/** Diagramme technique animé — fibre laser et point de contact. Remplace la photo produit absente. */
export function LaserDiagram({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1 },
  }

  return (
    <svg viewBox="0 0 320 240" className={className} aria-hidden="true">
      <rect x="0" y="0" width="320" height="240" rx="20" className="fill-paper-alt" />
      <motion.path
        d="M40 60c60 10 100 60 160 60"
        fill="none"
        stroke="var(--color-laser)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 8"
        variants={draw}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: MOTION.duration.slow, ease: MOTION.ease }}
      />
      <motion.circle
        cx="200"
        cy="120"
        r="6"
        fill="var(--color-laser)"
        initial={reduce ? false : { scale: 0 }}
        whileInView={reduce ? undefined : { scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: MOTION.duration.fast, delay: MOTION.duration.slow, ease: MOTION.ease }}
      />
      <motion.circle
        cx="200"
        cy="120"
        r="16"
        fill="none"
        stroke="var(--color-laser)"
        strokeWidth="1.5"
        initial={reduce ? false : { scale: 0.4, opacity: 0.8 }}
        whileInView={reduce ? undefined : { scale: 1.6, opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: MOTION.duration.slow, delay: MOTION.duration.slow, ease: MOTION.ease }}
      />
      <text x="60" y="180" className="fill-laser-ink text-[11px]" fontFamily="var(--font-sans)">
        1470 nm
      </text>
      <text x="60" y="196" className="fill-muted text-[11px]" fontFamily="var(--font-sans)">
        980 nm
      </text>
    </svg>
  )
}
