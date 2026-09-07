'use client'

import { useState, useTransition, type ChangeEvent, type FormEvent } from 'react'
import { Loader2, Upload, X, Plus, Trash2 } from 'lucide-react'
import slugify from 'slugify'
import type { ClinicalDomain, Equipment, EquipmentSpec, EquipmentTag } from '@/lib/supabase/types'
import { createClient } from '@/lib/supabase/client'
import { BilingualField } from './BilingualField'

interface EquipmentFormProps {
  equipment?: Equipment
  domains: ClinicalDomain[]
  action: (formData: FormData) => Promise<void>
  submitLabel: string
}

export function EquipmentForm({ equipment, domains, action, submitLabel }: EquipmentFormProps) {
  const [isPending, startTransition] = useTransition()
  const [nameFr, setNameFr] = useState(equipment?.name_fr ?? '')
  const [slug, setSlug] = useState(equipment?.slug ?? '')
  const [slugManual, setSlugManual] = useState(!!equipment)
  const [active, setActive] = useState(equipment?.active ?? true)
  const [imageUrl, setImageUrl] = useState(equipment?.image_url ?? '')
  const [uploading, setUploading] = useState(false)
  const [tags, setTags] = useState<EquipmentTag[]>(equipment?.tags ?? [])
  const [specs, setSpecs] = useState<EquipmentSpec[]>(equipment?.spec_sheet ?? [])

  function handleNameFrChange(val: string) {
    setNameFr(val)
    if (!slugManual) setSlug(slugify(val, { lower: true, strict: true, locale: 'fr' }))
  }

  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { data, error } = await supabase.storage.from('equipment-images').upload(filename, file, { contentType: file.type })
    if (!error) {
      const {
        data: { publicUrl },
      } = supabase.storage.from('equipment-images').getPublicUrl(data.path)
      setImageUrl(publicUrl)
    }
    setUploading(false)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set('active', String(active))
    fd.set('image_url', imageUrl)
    fd.set('tags', JSON.stringify(tags.filter((t) => t.fr && t.en)))
    fd.set('spec_sheet', JSON.stringify(specs.filter((s) => s.label_fr && s.value_fr)))
    startTransition(() => action(fd))
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      {equipment && <input type="hidden" name="id" value={equipment.id} />}

      <div className="space-y-5 rounded-2xl border border-line bg-paper p-6 shadow-card">
        <div className="grid gap-4 sm:grid-cols-3">
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
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Type d&apos;énergie *</label>
            <select
              name="energy_type"
              defaultValue={equipment?.energy_type ?? 'rf'}
              className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy"
            >
              <option value="rf">Radiofréquence</option>
              <option value="laser">Laser</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Domaine clinique</label>
            <select
              name="clinical_domain_id"
              defaultValue={equipment?.clinical_domain_id ?? ''}
              className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy"
            >
              <option value="">—</option>
              {domains.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title_fr}
                </option>
              ))}
            </select>
          </div>
        </div>

        <BilingualField label="Sur-titre (eyebrow)" nameFr="eyebrow_fr" nameEn="eyebrow_en" defaultValueFr={equipment?.eyebrow_fr} defaultValueEn={equipment?.eyebrow_en} />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Nom</label>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={nameFr}
              onChange={(e) => handleNameFrChange(e.target.value)}
              name="name_fr"
              required
              className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy"
            />
            <input name="name_en" defaultValue={equipment?.name_en} required className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
          </div>
        </div>

        <BilingualField
          label="Description"
          nameFr="description_fr"
          nameEn="description_en"
          defaultValueFr={equipment?.description_fr}
          defaultValueEn={equipment?.description_en}
          multiline
        />

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Étiquettes</label>
          <div className="space-y-2">
            {tags.map((tag, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={tag.fr}
                  onChange={(e) => setTags(tags.map((t, j) => (j === i ? { ...t, fr: e.target.value } : t)))}
                  placeholder="FR"
                  className="flex-1 rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy"
                />
                <input
                  value={tag.en}
                  onChange={(e) => setTags(tags.map((t, j) => (j === i ? { ...t, en: e.target.value } : t)))}
                  placeholder="EN"
                  className="flex-1 rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy"
                />
                <button type="button" onClick={() => setTags(tags.filter((_, j) => j !== i))} className="rounded-lg p-2 text-muted hover:bg-rf-soft hover:text-rf-ink">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setTags([...tags, { fr: '', en: '' }])}
              className="flex items-center gap-1.5 text-sm font-medium text-navy hover:underline"
            >
              <Plus size={14} />
              Ajouter une étiquette
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
            Fiche technique <span className="font-normal normal-case text-muted/70">(visible en mode professionnel uniquement)</span>
          </label>
          <div className="space-y-2">
            {specs.map((spec, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2">
                <input
                  value={spec.label_fr}
                  onChange={(e) => setSpecs(specs.map((s, j) => (j === i ? { ...s, label_fr: e.target.value } : s)))}
                  placeholder="Libellé FR"
                  className="rounded-lg border border-line px-2.5 py-2 text-xs outline-none focus:border-navy"
                />
                <input
                  value={spec.label_en}
                  onChange={(e) => setSpecs(specs.map((s, j) => (j === i ? { ...s, label_en: e.target.value } : s)))}
                  placeholder="Label EN"
                  className="rounded-lg border border-line px-2.5 py-2 text-xs outline-none focus:border-navy"
                />
                <input
                  value={spec.value_fr}
                  onChange={(e) => setSpecs(specs.map((s, j) => (j === i ? { ...s, value_fr: e.target.value } : s)))}
                  placeholder="Valeur FR"
                  className="rounded-lg border border-line px-2.5 py-2 text-xs outline-none focus:border-navy"
                />
                <input
                  value={spec.value_en}
                  onChange={(e) => setSpecs(specs.map((s, j) => (j === i ? { ...s, value_en: e.target.value } : s)))}
                  placeholder="Value EN"
                  className="rounded-lg border border-line px-2.5 py-2 text-xs outline-none focus:border-navy"
                />
                <button type="button" onClick={() => setSpecs(specs.filter((_, j) => j !== i))} className="rounded-lg p-2 text-muted hover:bg-rf-soft hover:text-rf-ink">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setSpecs([...specs, { label_fr: '', label_en: '', value_fr: '', value_en: '' }])}
              className="flex items-center gap-1.5 text-sm font-medium text-navy hover:underline"
            >
              <Plus size={14} />
              Ajouter une ligne de spec
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Ordre d&apos;affichage</label>
            <input
              type="number"
              name="order_index"
              defaultValue={equipment?.order_index ?? 0}
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

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
            Photo <span className="font-normal normal-case text-muted/70">(optionnel — un diagramme animé s&apos;affiche par défaut)</span>
          </label>
          {imageUrl ? (
            <div className="relative w-48">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="" className="h-32 w-48 rounded-xl object-cover" />
              <button
                type="button"
                onClick={() => setImageUrl('')}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-paper text-muted shadow hover:text-rf-ink"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="block w-48 cursor-pointer">
              <div className="rounded-xl border-2 border-dashed border-line p-6 text-center transition-colors hover:border-navy/40">
                {uploading ? <Loader2 size={20} className="mx-auto mb-1.5 animate-spin text-muted" /> : <Upload size={20} className="mx-auto mb-1.5 text-line" />}
                <p className="text-xs text-muted">{uploading ? 'Upload…' : 'Uploader'}</p>
              </div>
              <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={handleImageUpload} disabled={uploading} />
            </label>
          )}
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
