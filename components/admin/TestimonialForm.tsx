'use client'

import { useState, useTransition, type FormEvent } from 'react'
import { Loader2 } from 'lucide-react'
import type { Testimonial } from '@/lib/supabase/types'
import { BilingualField } from './BilingualField'

interface TestimonialFormProps {
  testimonial?: Testimonial
  action: (formData: FormData) => Promise<void>
  submitLabel: string
}

export function TestimonialForm({ testimonial, action, submitLabel }: TestimonialFormProps) {
  const [isPending, startTransition] = useTransition()
  const [active, setActive] = useState(testimonial?.active ?? true)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set('active', String(active))
    startTransition(() => action(fd))
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      {testimonial && <input type="hidden" name="id" value={testimonial.id} />}

      <div className="space-y-5 rounded-2xl border border-line bg-paper p-6 shadow-card">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Initiales (avatar) *</label>
          <input
            name="initials"
            defaultValue={testimonial?.initials}
            required
            maxLength={2}
            className="w-24 rounded-lg border border-line px-3 py-2 text-sm uppercase outline-none focus:border-navy"
          />
        </div>

        <BilingualField label="Citation" nameFr="quote_fr" nameEn="quote_en" defaultValueFr={testimonial?.quote_fr} defaultValueEn={testimonial?.quote_en} multiline />
        <BilingualField label="Nom / fonction" nameFr="name_fr" nameEn="name_en" defaultValueFr={testimonial?.name_fr} defaultValueEn={testimonial?.name_en} />
        <BilingualField label="Établissement" nameFr="role_fr" nameEn="role_en" defaultValueFr={testimonial?.role_fr} defaultValueEn={testimonial?.role_en} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Ordre d&apos;affichage</label>
            <input
              type="number"
              name="order_index"
              defaultValue={testimonial?.order_index ?? 0}
              className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy"
            />
          </div>
          <div className="flex items-end justify-between rounded-lg border border-line px-3 py-2">
            <span className="text-sm text-ink">Actif sur le site</span>
            <button
              type="button"
              onClick={() => setActive((a) => !a)}
              className={`relative h-6 w-11 rounded-full transition-colors ${active ? 'bg-navy' : 'bg-line'}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper shadow transition-transform ${active ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-navy-deep disabled:opacity-60"
      >
        {isPending && <Loader2 size={15} className="animate-spin" />}
        {isPending ? 'Enregistrement…' : submitLabel}
      </button>
    </form>
  )
}
