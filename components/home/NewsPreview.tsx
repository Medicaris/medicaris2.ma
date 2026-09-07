'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useT } from '@/lib/i18n/LocaleContext'
import type { ArticleMeta } from '@/lib/articles'
import { Reveal } from '@/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'

export function NewsPreview({ articles }: { articles: ArticleMeta[] }) {
  const t = useT()

  if (articles.length === 0) return null

  return (
    <section id="actualites-apercu" className="bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-navy/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-navy">
            {t('Actualités', 'News')}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t('Les dernières nouvelles de Medicaris', 'Latest news from Medicaris')}
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <StaggerItem key={article.id}>
              <Link
                href={`/actualites/${article.slug}`}
                className="group block overflow-hidden rounded-2xl border border-line bg-paper-alt"
              >
                <div className="aspect-[16/10] overflow-hidden bg-navy-soft">
                  {article.cover_image_url && (
                    <Image
                      src={article.cover_image_url}
                      alt={t(article.title_fr, article.title_en)}
                      width={400}
                      height={250}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-base font-semibold leading-snug text-ink">{t(article.title_fr, article.title_en)}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{t(article.excerpt_fr, article.excerpt_en)}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-12 text-center">
          <Link
            href="/actualites"
            className="rounded-full border border-navy px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-paper"
          >
            {t('Voir toutes les actualités', 'View all news')}
          </Link>
        </div>
      </div>
    </section>
  )
}
