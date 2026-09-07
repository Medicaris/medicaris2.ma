import Link from 'next/link'
import { Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Article } from '@/lib/supabase/types'
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton'
import { deleteArticleAction, togglePublishedAction } from './actions'

export default async function AdminArticlesPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false })
  const articles = (data ?? []) as Article[]

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Actualités</h1>
          <p className="mt-1 text-sm text-muted">{articles.length} article(s)</p>
        </div>
        <Link
          href="/admin/articles/nouveau"
          className="flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-paper hover:bg-navy-deep"
        >
          <Plus size={16} />
          Nouvel article
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-paper">
        {articles.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">Aucun article pour le moment.</p>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-line bg-paper-alt text-left text-xs font-semibold uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3">Titre</th>
                <th className="px-5 py-3">Statut</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-4">
                    <Link href={`/admin/articles/${article.id}`} className="font-medium text-ink hover:text-navy">
                      {article.title_fr}
                    </Link>
                    <div className="text-xs text-muted">/{article.slug}</div>
                  </td>
                  <td className="px-5 py-4">
                    <form action={togglePublishedAction}>
                      <input type="hidden" name="id" value={article.id} />
                      <input type="hidden" name="published" value={String(!article.published)} />
                      <button
                        type="submit"
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          article.published ? 'bg-navy/10 text-navy' : 'bg-line/60 text-muted'
                        }`}
                      >
                        {article.published ? 'Publié' : 'Brouillon'}
                      </button>
                    </form>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <DeleteConfirmButton action={deleteArticleAction} id={article.id} confirmMessage="Supprimer cet article ?" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  )
}
