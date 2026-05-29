import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default async function ProfessorHome() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: turmas } = await supabase
    .from('turma_professores')
    .select('turma:turmas(id, nome, escola_id)')
    .eq('professor_id', user!.id)

  const turmaIds = turmas?.map((t: any) => t.turma?.id).filter(Boolean) ?? []

  const { data: alunosSemRelatorio } = await supabase
    .from('alunos')
    .select('id, nome, turma:turmas(nome)')
    .in('turma_id', turmaIds)
    .eq('ativo', true)
    .not('id', 'in',
      `(SELECT aluno_id FROM relatorios_diarios WHERE data = '${format(new Date(), 'yyyy-MM-dd')}')`
    )

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Bom dia! 👋</h1>
      <p className="text-gray-500 mb-8">{format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-3xl font-bold text-purple-600">{turmaIds.length}</p>
          <p className="text-sm text-gray-500 mt-1">Turma(s)</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-3xl font-bold text-orange-500">{alunosSemRelatorio?.length ?? 0}</p>
          <p className="text-sm text-gray-500 mt-1">Alunos sem relatório hoje</p>
        </div>
      </div>

      {(alunosSemRelatorio?.length ?? 0) > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
          <h2 className="font-semibold text-orange-800 mb-3">⚠️ Relatórios pendentes hoje</h2>
          <div className="space-y-2">
            {alunosSemRelatorio?.slice(0, 5).map((aluno: any) => (
              <div key={aluno.id} className="flex items-center justify-between bg-white rounded-lg px-4 py-2">
                <span className="text-sm text-gray-700">{aluno.nome}</span>
                <a href="/professor/relatorios" className="text-xs text-blue-600 hover:underline">Preencher</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
