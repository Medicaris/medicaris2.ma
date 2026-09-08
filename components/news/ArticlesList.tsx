'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useT } from '@/lib/i18n/LocaleContext'
import type { ArticleMeta } from '@/lib/articles'
import { Reveal } from '@/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'

export function ArticlesList({ articles }: { articles: ArticleMeta[] }) {
  const t = useT()

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <Reveal className="max-w-2xl">
        <span className="inline-block rounded-full bg-navy/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-navy">
          {t('Actualités', 'News')}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t('Les dernières nouvelles de Medicaris', 'Latest news from Medicaris')}
        </h1>
        <p className="mt-4 text-lg text-muted">
          {t("Nouvelles configurations, retours d'expérience et vie de l'entreprise.", 'New configurations, field feedback and company life.')}
        </p>
      </Reveal>

      {articles.length === 0 ? (
        <p className="mt-14 text-sm text-muted">{t('Aucune actualité publiée pour le moment.', 'No news published yet.')}</p>
      ) : (
        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
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
                  <h2 className="text-base font-semibold leading-snug text-ink">{t(article.title_fr, article.title_en)}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{t(article.excerpt_fr, article.excerpt_en)}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                    {t('Lire la suite', 'Read more')}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  )
}
