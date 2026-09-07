import Link from 'next/link'
import { Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { ClinicalDomain } from '@/lib/supabase/types'
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton'
import { deleteDomainAction } from './actions'

export default async function AdminDomainsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('clinical_domains').select('*').order('order_index')
  const domains = (data ?? []) as ClinicalDomain[]

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Domaines cliniques</h1>
          <p className="mt-1 text-sm text-muted">{domains.length} domaine(s)</p>
        </div>
        <Link
          href="/admin/domaines/nouveau"
          className="flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-paper hover:bg-navy-deep"
        >
          <Plus size={16} />
          Nouveau domaine
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-paper">
        {domains.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">Aucun domaine pour le moment.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-line bg-paper-alt text-left text-xs font-semibold uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3">Titre</th>
                <th className="px-5 py-3">Statut</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((domain) => (
                <tr key={domain.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-4">
                    <Link href={`/admin/domaines/${domain.id}`} className="font-medium text-ink hover:text-navy">
                      {domain.title_fr}
                    </Link>
                    <div className="text-xs text-muted">{domain.tag_fr}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${domain.active ? 'bg-navy/10 text-navy' : 'bg-line/60 text-muted'}`}>
                      {domain.active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <DeleteConfirmButton action={deleteDomainAction} id={domain.id} confirmMessage="Supprimer ce domaine ?" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
