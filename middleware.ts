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

  function getRoleFromUser(u: typeof user) {
    if (!u) return 'pai'
    return (u.user_metadata as Record<string, string>)?.role
      ?? (u.app_metadata as Record<string, string>)?.role
      ?? 'pai'
  }

  // Redirect logged-in users away from auth pages or root
  if (path.startsWith('/auth') || path === '/') {
    if (user) {
      const role = getRoleFromUser(user)
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
  const role = getRoleFromUser(user)

  if (path.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL(roleRedirects[role] ?? '/pais', request.url))
  }
  if (path.startsWith('/professor') && !['admin', 'professor'].includes(role)) {
    return NextResponse.redirect(new URL('/pais', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
