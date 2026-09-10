import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { SITE_URL } from '@/lib/constants'

export async function proxy(request: NextRequest) {
  // www.medicaris.ma servait le meme site que medicaris.ma : deux adresses pour
  // un seul contenu. Redirection permanente vers le domaine nu, celui que
  // designe la balise canonical. Placee avant tout appel a Supabase.
  const host = request.headers.get('host') ?? request.nextUrl.host
  if (host.toLowerCase().startsWith('www.')) {
    const target = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, SITE_URL)
    return NextResponse.redirect(target, 301)
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )

  const pathname = request.nextUrl.pathname
  const isAdminRoute = pathname.startsWith('/admin')
  const isMaintenancePage = pathname === '/maintenance'

  // Routes admin : toujours accessibles (auth uniquement) — sinon personne ne
  // peut désactiver la veille une fois activée.
  if (isAdminRoute) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const isLoginPage = pathname === '/admin/login'

    if (!isLoginPage && !user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }

    if (isLoginPage && user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  }

  const { data: setting } = await supabase.from('settings').select('value').eq('key', 'maintenance_mode').single()
  const maintenanceActive = setting?.value === 'true'

  if (isMaintenancePage) {
    if (!maintenanceActive) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
    return supabaseResponse
  }

  if (maintenanceActive) {
    const url = request.nextUrl.clone()
    url.pathname = '/maintenance'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
}
