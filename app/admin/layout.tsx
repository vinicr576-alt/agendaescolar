import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Visão Geral', icon: '📊' },
  { href: '/admin/turmas', label: 'Turmas', icon: '🏫' },
  { href: '/admin/alunos', label: 'Alunos', icon: '👨‍🎓' },
  { href: '/admin/professores', label: 'Professores', icon: '👩‍🏫' },
  { href: '/admin/comunicados', label: 'Comunicados', icon: '📢' },
  { href: '/admin/eventos', label: 'Agenda', icon: '📅' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('nome, role, escola_id')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/pais')

  const { data: escola } = await supabase
    .from('escolas')
    .select('nome')
    .eq('id', profile.escola_id)
    .single()

  async function logout() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/auth/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              {escola?.nome?.[0] ?? 'E'}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm leading-tight">{escola?.nome ?? 'Escola'}</p>
              <p className="text-xs text-gray-400">Administrador</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <form action={logout}>
            <button className="w-full text-sm text-gray-500 hover:text-red-500 text-left px-3 py-2">
              🚪 Sair
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
