import Link from 'next/link'
import { Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Testimonial } from '@/lib/supabase/types'
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton'
import { deleteTestimonialAction } from './actions'

export default async function AdminTestimonialsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('testimonials').select('*').order('order_index')
  const testimonials = (data ?? []) as Testimonial[]

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Témoignages</h1>
          <p className="mt-1 text-sm text-muted">{testimonials.length} témoignage(s)</p>
        </div>
        <Link
          href="/admin/temoignages/nouveau"
          className="flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-paper hover:bg-navy-deep"
        >
          <Plus size={16} />
          Nouveau témoignage
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-paper">
        {testimonials.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">Aucun témoignage pour le moment.</p>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-line bg-paper-alt text-left text-xs font-semibold uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3">Auteur</th>
                <th className="px-5 py-3">Statut</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-4">
                    <Link href={`/admin/temoignages/${testimonial.id}`} className="font-medium text-ink hover:text-navy">
                      {testimonial.name_fr}
                    </Link>
                    <div className="text-xs text-muted">{testimonial.role_fr}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${testimonial.active ? 'bg-navy/10 text-navy' : 'bg-line/60 text-muted'}`}
                    >
                      {testimonial.active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <DeleteConfirmButton action={deleteTestimonialAction} id={testimonial.id} confirmMessage="Supprimer ce témoignage ?" />
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
