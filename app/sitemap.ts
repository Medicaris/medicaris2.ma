import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { getPublishedArticles } from '@/lib/articles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/actualites`, changeFrequency: 'weekly', priority: 0.7 },
  ]

  // Les actualités publiées sont ajoutées automatiquement : rien à maintenir
  // à la main quand le client publie un article depuis l'espace admin.
  let articleRoutes: MetadataRoute.Sitemap = []
  try {
    const articles = await getPublishedArticles()
    articleRoutes = articles.map((article) => {
      const date = article.updated_at ?? article.published_at ?? article.created_at
      return {
        url: `${SITE_URL}/actualites/${article.slug}`,
        lastModified: date ? new Date(date) : undefined,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }
    })
  } catch {
    // Supabase injoignable : on sert au moins les pages fixes plutôt qu'une erreur.
  }

  return [...staticRoutes, ...articleRoutes]
}
