import { createClient } from '@/lib/supabase/server'
import type { Article } from '@/lib/supabase/types'

export type { Article }
export type ArticleMeta = Omit<Article, 'content_fr' | 'content_en'>

export async function getPublishedArticles(): Promise<ArticleMeta[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('id,slug,title_fr,title_en,excerpt_fr,excerpt_en,cover_image_url,published,published_at,created_at,updated_at')
    .eq('published', true)
    .order('published_at', { ascending: false })
  return (data ?? []) as ArticleMeta[]
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createClient()
  const { data } = await supabase.from('articles').select('*').eq('slug', slug).eq('published', true).single()
  return data ?? null
}
