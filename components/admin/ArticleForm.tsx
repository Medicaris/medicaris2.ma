'use client'

import { useState, useTransition, type ChangeEvent, type FormEvent } from 'react'
import { Loader2, Upload, X, Eye } from 'lucide-react'
import slugify from 'slugify'
import type { Article } from '@/lib/supabase/types'
import { createClient } from '@/lib/supabase/client'
import { TiptapEditor } from './TiptapEditor'

interface ArticleFormProps {
  article?: Article
  action: (formData: FormData) => Promise<void>
  submitLabel: string
}

export function ArticleForm({ article, action, submitLabel }: ArticleFormProps) {
  const [isPending, startTransition] = useTransition()
  const [titleFr, setTitleFr] = useState(article?.title_fr ?? '')
  const [slug, setSlug] = useState(article?.slug ?? '')
  const [slugManual, setSlugManual] = useState(!!article)
  const [contentFr, setContentFr] = useState(article?.content_fr ?? '')
  const [contentEn, setContentEn] = useState(article?.content_en ?? '')
  const [imageUrl, setImageUrl] = useState(article?.cover_image_url ?? '')
  const [published, setPublished] = useState(article?.published ?? false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  function handleTitleFrChange(val: string) {
    setTitleFr(val)
    if (!slugManual) setSlug(slugify(val, { lower: true, strict: true, locale: 'fr' }))
  }

  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { data, error } = await supabase.storage.from('article-images').upload(filename, file, { contentType: file.type })
    if (error) {
      setError("Erreur lors de l'upload de l'image.")
    } else {
      const {
        data: { publicUrl },
      } = supabase.storage.from('article-images').getPublicUrl(data.path)
      setImageUrl(publicUrl)
    }
    setUploading(false)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (!titleFr.trim()) return setError('Le titre (FR) est requis.')
    if (!slug.trim()) return setError('Le slug est requis.')
    if (!contentFr.trim() || contentFr === '<p></p>') return setError('Le contenu (FR) est requis.')
    if (!contentEn.trim() || contentEn === '<p></p>') return setError('Le contenu (EN) est requis.')

    const fd = new FormData(e.currentTarget)
    fd.set('content_fr', contentFr)
    fd.set('content_en', contentEn)
    fd.set('cover_image_url', imageUrl)
    fd.set('published', String(published))
    startTransition(() => action(fd))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {article && <input type="hidden" name="id" value={article.id} />}

      {error && <div className="rounded-xl border border-rf/30 bg-rf-soft px-4 py-3 text-sm text-rf-ink">{error}</div>}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="space-y-4 rounded-2xl border border-line bg-paper p-5 shadow-card">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Titre (FR) *</label>
              <input
                value={titleFr}
                onChange={(e) => handleTitleFrChange(e.target.value)}
                name="title_fr"
                placeholder="Titre de l'article"
                required
                className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm font-medium outline-none focus:border-navy"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Titre (EN) *</label>
              <input
                name="title_en"
                defaultValue={article?.title_en}
                placeholder="Article title"
                required
                className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm font-medium outline-none focus:border-navy"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Slug (URL) *</label>
              <div className="flex gap-2">
                <span className="flex items-center rounded-l-xl border border-r-0 border-line bg-paper-alt px-3 text-xs text-muted">/actualites/</span>
                <input
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value)
                    setSlugManual(true)
                  }}
                  name="slug"
                  placeholder="mon-article"
                  required
                  className="flex-1 rounded-r-xl border border-line px-3 py-2.5 font-mono text-sm text-ink outline-none focus:border-navy"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Extrait (FR)</label>
                <textarea
                  name="excerpt_fr"
                  defaultValue={article?.excerpt_fr}
                  rows={3}
                  required
                  placeholder="Résumé affiché dans la liste (2-3 phrases)"
                  className="w-full resize-none rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-navy"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Extrait (EN)</label>
                <textarea
                  name="excerpt_en"
                  defaultValue={article?.excerpt_en}
                  rows={3}
                  required
                  placeholder="Summary shown in the list (2-3 sentences)"
                  className="w-full resize-none rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-navy"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-5 shadow-card">
            <label className="mb-3 block text-xs font-semibold uppercase tracking-wide text-muted">Contenu (FR) *</label>
            <TiptapEditor content={contentFr} onChange={setContentFr} placeholder="Rédigez le contenu en français…" />
          </div>

          <div className="rounded-2xl border border-line bg-paper p-5 shadow-card">
            <label className="mb-3 block text-xs font-semibold uppercase tracking-wide text-muted">Contenu (EN) *</label>
            <TiptapEditor content={contentEn} onChange={setContentEn} placeholder="Write the content in English…" />
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-line bg-paper p-5 shadow-card">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">Publication</p>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink">Statut</p>
                <p className="mt-0.5 text-xs text-muted">{published ? 'Visible sur le site' : 'Brouillon — non visible'}</p>
              </div>
              <button
                type="button"
                onClick={() => setPublished((p) => !p)}
                className={`relative h-6 w-11 rounded-full transition-colors ${published ? 'bg-navy' : 'bg-line'}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper shadow transition-transform ${published ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-navy-deep disabled:opacity-60"
            >
              {isPending && <Loader2 size={15} className="animate-spin" />}
              {isPending ? 'Enregistrement…' : submitLabel}
            </button>

            {article && (
              <a
                href={`/actualites/${article.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-line py-2 text-xs font-medium text-muted transition-colors hover:bg-paper-alt"
              >
                <Eye size={13} />
                Voir sur le site
              </a>
            )}
          </div>

          <div className="rounded-2xl border border-line bg-paper p-5 shadow-card">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Image de couverture</p>

            {imageUrl ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="Couverture" className="h-40 w-full rounded-xl object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-paper text-muted shadow hover:text-rf-ink"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div className="rounded-xl border-2 border-dashed border-line p-6 text-center transition-colors hover:border-navy/40">
                  {uploading ? <Loader2 size={22} className="mx-auto mb-2 animate-spin text-muted" /> : <Upload size={22} className="mx-auto mb-2 text-line" />}
                  <p className="text-xs text-muted">{uploading ? 'Upload en cours…' : 'Cliquer pour uploader'}</p>
                  <p className="mt-1 text-[10px] text-muted/70">JPG, PNG, WEBP · max 5 Mo</p>
                </div>
                <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={handleImageUpload} disabled={uploading} />
              </label>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
