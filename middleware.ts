import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  const roleRedirects: Record<string, string> = {
    admin: '/admin',
    professor: '/professor',
    pai: '/pais',
    aluno: '/pais',
  }

  async function getRole(): Promise<string> {
    if (!user) return 'pai'
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    return data?.role ?? 'pai'
  }

  // Public routes — no auth required
  if (path.startsWith('/champions')) {
    return supabaseResponse
  }

  // Redirect logged-in users away from auth pages or root
  if (path.startsWith('/auth') || path === '/') {
    if (user) {
      const role = await getRole()
      const dest = roleRedirects[role] ?? '/pais'
      return NextResponse.redirect(new URL(dest, request.url))
    }
    return supabaseResponse
  }

  // Protect all other routes: require authentication
  if (!user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Role-based route protection
  const role = await getRole()

  if (path.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL(roleRedirects[role] ?? '/pais', request.url))
  }
  if (path.startsWith('/professor') && !['admin', 'professor'].includes(role)) {
    return NextResponse.redirect(new URL('/pais', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
