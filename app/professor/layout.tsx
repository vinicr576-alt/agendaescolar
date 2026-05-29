import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const navItems = [
  { href: '/professor', label: 'Início', icon: '🏠' },
  { href: '/professor/relatorios', label: 'Relatórios Diários', icon: '📋' },
  { href: '/professor/fotos', label: 'Fotos', icon: '📷' },
  { href: '/professor/comunicados', label: 'Comunicados', icon: '📢' },
  { href: '/professor/eventos', label: 'Agenda', icon: '📅' },
  { href: '/professor/autorizacoes', label: 'Autorizações', icon: '✍️' },
]

export default async function ProfessorLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase.from('profiles').select('nome, role').eq('id', user.id).single()
  if (!['admin', 'professor'].includes(profile?.role ?? '')) redirect('/pais')

  async function logout() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/auth/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-sm flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
              {profile?.nome?.[0] ?? 'P'}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{profile?.nome}</p>
              <p className="text-xs text-gray-400">Professor(a)</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition">
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <form action={logout}>
            <button className="w-full text-sm text-gray-500 hover:text-red-500 text-left px-3 py-2">🚪 Sair</button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-auto"><div className="p-8">{children}</div></main>
    </div>
  )
}
