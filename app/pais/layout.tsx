import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const navItems = [
  { href: '/pais', label: 'Início', icon: '🏠' },
  { href: '/pais/relatorios', label: 'Relatórios', icon: '📋' },
  { href: '/pais/fotos', label: 'Fotos', icon: '📷' },
  { href: '/pais/agenda', label: 'Agenda', icon: '📅' },
  { href: '/pais/comunicados', label: 'Comunicados', icon: '📢' },
  { href: '/pais/autorizacoes', label: 'Autorizações', icon: '✍️' },
]

export default async function PaisLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase.from('profiles').select('nome').eq('id', user.id).single()

  // Conta notificações não lidas
  const { count: naoLidas } = await supabase
    .from('notificacoes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('lida', false)

  async function logout() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header mobile */}
      <header className="bg-white shadow-sm sticky top-0 z-10 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">A</div>
            <span className="font-semibold text-gray-800 text-sm">Agenda Escolar</span>
          </div>
          <div className="flex items-center gap-3">
            {(naoLidas ?? 0) > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{naoLidas}</span>
            )}
            <span className="text-sm text-gray-600">{profile?.nome?.split(' ')[0]}</span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar desktop */}
        <aside className="hidden lg:flex w-64 bg-white shadow-sm flex-col min-h-screen">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                {profile?.nome?.[0] ?? 'R'}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{profile?.nome}</p>
                <p className="text-xs text-gray-400">Responsável</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map(item => (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition">
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

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>

      {/* Bottom nav mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t grid grid-cols-6">
        {navItems.map(item => (
          <Link key={item.href} href={item.href}
            className="flex flex-col items-center py-2 text-gray-500 hover:text-blue-600 text-xs gap-1">
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px]">{item.label.split(' ')[0]}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
