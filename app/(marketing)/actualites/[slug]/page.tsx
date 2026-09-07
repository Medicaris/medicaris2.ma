import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/lib/articles'
import { ArticleBody } from '@/components/news/ArticleBody'

interface PageParams {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}

  return {
    title: `${article.title_fr} — Medicaris`,
    description: article.excerpt_fr,
    alternates: { canonical: `/actualites/${slug}` },
  }
}

export default async function ArticlePage({ params }: PageParams) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  return <ArticleBody article={article} />
}
