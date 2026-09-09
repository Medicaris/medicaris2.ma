import Link from 'next/link'
import { Newspaper, Stethoscope, Cpu, ListChecks, Quote, AlertTriangle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { isMaintenanceMode } from '@/lib/settings'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [articles, domains, equipment, services, testimonials, maintenance] = await Promise.all([
    supabase.from('articles').select('id', { count: 'exact', head: true }).eq('published', true),
    supabase.from('clinical_domains').select('id', { count: 'exact', head: true }).eq('active', true),
    supabase.from('equipment').select('id', { count: 'exact', head: true }).eq('active', true),
    supabase.from('services').select('id', { count: 'exact', head: true }),
    supabase.from('testimonials').select('id', { count: 'exact', head: true }).eq('active', true),
    isMaintenanceMode(),
  ])

  const cards = [
    { href: '/admin/articles', label: 'Actualités publiées', count: articles.count ?? 0, icon: Newspaper },
    { href: '/admin/domaines', label: 'Domaines cliniques actifs', count: domains.count ?? 0, icon: Stethoscope },
    { href: '/admin/equipements', label: 'Équipements actifs', count: equipment.count ?? 0, icon: Cpu },
    { href: '/admin/services', label: 'Étapes de service', count: services.count ?? 0, icon: ListChecks },
    { href: '/admin/temoignages', label: 'Témoignages actifs', count: testimonials.count ?? 0, icon: Quote },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Tableau de bord</h1>
      <p className="mt-1 text-sm text-muted">Vue d&apos;ensemble du contenu publié sur le site.</p>

      {maintenance && (
        <Link
          href="/admin/parametres"
          className="mt-6 flex items-center gap-2.5 rounded-xl bg-rf-soft px-4 py-3 text-sm font-medium text-rf-ink"
        >
          <AlertTriangle size={16} />
          Le site est actuellement en veille — les visiteurs voient une page de maintenance.
        </Link>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-line bg-paper p-6 shadow-card transition-shadow hover:shadow-lift"
          >
            <card.icon size={20} className="text-navy" />
            <div className="mt-4 text-2xl font-bold text-ink">{card.count}</div>
            <div className="mt-1 text-sm text-muted">{card.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
