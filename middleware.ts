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

  // Rotas públicas
  if (path.startsWith('/auth') || path === '/') {
    if (user && path.startsWith('/auth')) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      const roleRedirects: Record<string, string> = {
        admin: '/admin',
        professor: '/professor',
        pai: '/pais',
        aluno: '/pais',
      }
      const role = profile?.role ?? (user.app_metadata?.role as string) ?? 'pai'
      const dest = roleRedirects[role] ?? '/pais'
      return NextResponse.redirect(new URL(dest, request.url))
    }
    return supabaseResponse
  }

  // Protege rotas autenticadas
  if (!user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Verifica role vs rota
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = profile?.role ?? (user.app_metadata?.role as string) ?? 'pai'

  if (path.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL(`/${role === 'professor' ? 'professor' : 'pais'}`, request.url))
  }
  if (path.startsWith('/professor') && !['admin', 'professor'].includes(role)) {
    return NextResponse.redirect(new URL('/pais', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
