'use client'

import { useState, useTransition, type FormEvent } from 'react'
import { Loader2 } from 'lucide-react'
import slugify from 'slugify'
import type { ClinicalDomain } from '@/lib/supabase/types'
import { BilingualField } from './BilingualField'

const ICON_OPTIONS = ['proctologie', 'phlebologie', 'urologie', 'ablation']

interface DomainFormProps {
  domain?: ClinicalDomain
  action: (formData: FormData) => Promise<void>
  submitLabel: string
}

export function DomainForm({ domain, action, submitLabel }: DomainFormProps) {
  const [isPending, startTransition] = useTransition()
  const [titleFr, setTitleFr] = useState(domain?.title_fr ?? '')
  const [slug, setSlug] = useState(domain?.slug ?? '')
  const [slugManual, setSlugManual] = useState(!!domain)
  const [active, setActive] = useState(domain?.active ?? true)

  function handleTitleFrChange(val: string) {
    setTitleFr(val)
    if (!slugManual) setSlug(slugify(val, { lower: true, strict: true, locale: 'fr' }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set('active', String(active))
    startTransition(() => action(fd))
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      {domain && <input type="hidden" name="id" value={domain.id} />}

      <div className="space-y-5 rounded-2xl border border-line bg-paper p-6 shadow-card">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Slug *</label>
            <input
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value)
                setSlugManual(true)
              }}
              name="slug"
              required
              className="w-full rounded-lg border border-line px-3 py-2 font-mono text-sm outline-none focus:border-navy"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Icône</label>
            <select
              name="icon_key"
              defaultValue={domain?.icon_key ?? ICON_OPTIONS[0]}
              className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy"
            >
              {ICON_OPTIONS.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>

        <BilingualField label="Étiquette" nameFr="tag_fr" nameEn="tag_en" defaultValueFr={domain?.tag_fr} defaultValueEn={domain?.tag_en} />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Titre</label>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={titleFr}
              onChange={(e) => handleTitleFrChange(e.target.value)}
              name="title_fr"
              required
              className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy"
            />
            <input name="title_en" defaultValue={domain?.title_en} required className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
          </div>
        </div>
        <BilingualField label="Description" nameFr="body_fr" nameEn="body_en" defaultValueFr={domain?.body_fr} defaultValueEn={domain?.body_en} multiline />
        <BilingualField label="Public visé" nameFr="audience_fr" nameEn="audience_en" defaultValueFr={domain?.audience_fr} defaultValueEn={domain?.audience_en} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Ordre d&apos;affichage</label>
            <input
              type="number"
              name="order_index"
              defaultValue={domain?.order_index ?? 0}
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
