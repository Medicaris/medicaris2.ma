'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Newspaper, Stethoscope, Cpu, ListChecks, Settings, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const LINKS = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/admin/articles', label: 'Actualités', icon: Newspaper },
  { href: '/admin/domaines', label: 'Domaines cliniques', icon: Stethoscope },
  { href: '/admin/equipements', label: 'Équipements', icon: Cpu },
  { href: '/admin/services', label: 'Services', icon: ListChecks },
  { href: '/admin/parametres', label: 'Paramètres', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-line bg-paper px-4 py-6">
      <Link href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2">
        <Image src="/img/logo.webp" alt="Medicaris SARL" width={120} height={48} className="h-8 w-auto" />
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">Admin</span>
      </Link>
      <nav className="mt-8 flex-1 space-y-1">
        {LINKS.map((link) => {
          const active = link.exact ? pathname === link.href : pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active ? 'bg-navy text-paper' : 'text-muted hover:bg-paper-alt hover:text-ink'
              }`}
            >
              <link.icon size={17} />
              {link.label}
            </Link>
          )
        })}
      </nav>
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-paper-alt hover:text-ink"
      >
        <LogOut size={17} />
        Déconnexion
      </button>
    </aside>
  )
}
