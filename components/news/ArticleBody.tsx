'use client'

import Image from 'next/image'
import { useT } from '@/lib/i18n/LocaleContext'
import type { Article } from '@/lib/supabase/types'
import { Reveal } from '@/components/motion/Reveal'

export function ArticleBody({ article }: { article: Article }) {
  const t = useT()

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Reveal>
        <span className="inline-block rounded-full bg-navy/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-navy">
          {t('Actualités', 'News')}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t(article.title_fr, article.title_en)}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{t(article.excerpt_fr, article.excerpt_en)}</p>

        {article.cover_image_url && (
          <div className="mt-8 overflow-hidden rounded-2xl">
            <Image
              src={article.cover_image_url}
              alt={t(article.title_fr, article.title_en)}
              width={900}
              height={520}
              className="w-full object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-neutral mt-10 max-w-none prose-headings:font-semibold prose-headings:text-ink prose-p:text-ink/85 prose-a:text-navy"
          dangerouslySetInnerHTML={{ __html: t(article.content_fr, article.content_en) }}
        />
      </Reveal>
    </article>
  )
}
