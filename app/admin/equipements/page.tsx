import Link from 'next/link'
import { Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Equipment } from '@/lib/supabase/types'
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton'
import { deleteEquipmentAction } from './actions'

export default async function AdminEquipmentPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('equipment').select('*').order('order_index')
  const equipment = (data ?? []) as Equipment[]

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Équipements</h1>
          <p className="mt-1 text-sm text-muted">{equipment.length} équipement(s)</p>
        </div>
        <Link
          href="/admin/equipements/nouveau"
          className="flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-paper hover:bg-navy-deep"
        >
          <Plus size={16} />
          Nouvel équipement
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-paper">
        {equipment.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">Aucun équipement pour le moment.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-line bg-paper-alt text-left text-xs font-semibold uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3">Nom</th>
                <th className="px-5 py-3">Énergie</th>
                <th className="px-5 py-3">Statut</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((item) => (
                <tr key={item.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-4">
                    <Link href={`/admin/equipements/${item.id}`} className="font-medium text-ink hover:text-navy">
                      {item.name_fr}
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.energy_type === 'rf' ? 'bg-rf-soft text-rf-ink' : 'bg-laser-soft text-laser-ink'}`}>
                      {item.energy_type === 'rf' ? 'Radiofréquence' : 'Laser'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.active ? 'bg-navy/10 text-navy' : 'bg-line/60 text-muted'}`}>
                      {item.active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <DeleteConfirmButton action={deleteEquipmentAction} id={item.id} confirmMessage="Supprimer cet équipement ?" />
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
