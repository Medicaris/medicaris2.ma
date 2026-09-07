import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Article } from '@/lib/supabase/types'
import { ArticleForm } from '@/components/admin/ArticleForm'
import { updateArticleAction } from '../actions'

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('articles').select('*').eq('id', id).single()
  const article = data as Article | null
  if (!article) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Modifier l&apos;article</h1>
      <div className="mt-8">
        <ArticleForm article={article} action={updateArticleAction} submitLabel="Enregistrer" />
      </div>
    </div>
  )
}
