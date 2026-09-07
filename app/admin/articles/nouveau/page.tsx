import { ArticleForm } from '@/components/admin/ArticleForm'
import { createArticleAction } from '../actions'

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Nouvel article</h1>
      <div className="mt-8">
        <ArticleForm action={createArticleAction} submitLabel="Publier" />
      </div>
    </div>
  )
}
