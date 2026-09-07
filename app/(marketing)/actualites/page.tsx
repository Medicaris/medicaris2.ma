import type { Metadata } from 'next'
import { getPublishedArticles } from '@/lib/articles'
import { ArticlesList } from '@/components/news/ArticlesList'

export const metadata: Metadata = {
  title: 'Actualités — Medicaris',
  description: "Nouvelles configurations, retours d'expérience et vie de l'entreprise Medicaris.",
  alternates: { canonical: '/actualites' },
}

export default async function ActualitesPage() {
  const articles = await getPublishedArticles()
  return <ArticlesList articles={articles} />
}
