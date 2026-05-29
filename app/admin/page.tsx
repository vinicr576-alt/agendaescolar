import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('escola_id').eq('id', user!.id).single()
  const escola_id = profile?.escola_id

  const [{ count: totalTurmas }, { count: totalAlunos }, { count: totalProfessores }, { count: totalComunicados }] = await Promise.all([
    supabase.from('turmas').select('*', { count: 'exact', head: true }).eq('escola_id', escola_id).eq('ativa', true),
    supabase.from('alunos').select('*', { count: 'exact', head: true }).eq('escola_id', escola_id).eq('ativo', true),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('escola_id', escola_id).eq('role', 'professor'),
    supabase.from('comunicados').select('*', { count: 'exact', head: true }).eq('escola_id', escola_id),
  ])

  const stats = [
    { label: 'Turmas ativas', value: totalTurmas ?? 0, icon: '🏫', color: 'bg-blue-50 text-blue-600' },
    { label: 'Alunos', value: totalAlunos ?? 0, icon: '👨‍🎓', color: 'bg-green-50 text-green-600' },
    { label: 'Professores', value: totalProfessores ?? 0, icon: '👩‍🏫', color: 'bg-purple-50 text-purple-600' },
    { label: 'Comunicados', value: totalComunicados ?? 0, icon: '📢', color: 'bg-orange-50 text-orange-600' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Visão Geral</h1>
      <p className="text-gray-500 mb-8">Acompanhe os números da sua escola</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.color} text-2xl mb-4`}>
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-4">Acesso rápido</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { href: '/admin/alunos', label: 'Cadastrar aluno', icon: '➕' },
            { href: '/admin/turmas', label: 'Criar turma', icon: '🏫' },
            { href: '/admin/professores', label: 'Adicionar professor', icon: '👩‍🏫' },
            { href: '/admin/comunicados', label: 'Novo comunicado', icon: '📢' },
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition text-sm text-gray-700"
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
