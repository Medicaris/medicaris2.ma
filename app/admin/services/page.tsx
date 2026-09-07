import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Service } from '@/lib/supabase/types'

export default async function AdminServicesPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('services').select('*').order('order_index')
  const services = (data ?? []) as Service[]

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Services</h1>
      <p className="mt-1 text-sm text-muted">Les 4 étapes affichées sur la page d&apos;accueil — nombre fixe, édition seulement.</p>

      <div className="mt-8 space-y-3">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/admin/services/${service.id}`}
            className="flex items-center justify-between rounded-2xl border border-line bg-paper p-5 shadow-card transition-shadow hover:shadow-lift"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-rf/50">{String(service.step_number).padStart(2, '0')}</span>
              <div>
                <div className="font-medium text-ink">{service.title_fr}</div>
                <div className="text-sm text-muted">{service.title_en}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
