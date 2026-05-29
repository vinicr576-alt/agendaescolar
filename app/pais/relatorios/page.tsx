import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const moodEmoji: Record<string, string> = { otimo: '😄', bom: '🙂', regular: '😐', ruim: '😕' }
const moodLabel: Record<string, string> = { otimo: 'Ótimo', bom: 'Bom', regular: 'Regular', ruim: 'Ruim' }
const mealLabel: Record<string, string> = { comeu_tudo: 'Comeu tudo', comeu_bem: 'Comeu bem', comeu_pouco: 'Comeu pouco', nao_comeu: 'Não comeu' }

export default async function PaisRelatoriosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: vinculos } = await supabase
    .from('aluno_responsaveis')
    .select('aluno:alunos(id, nome)')
    .eq('responsavel_id', user!.id)

  const alunoIds = vinculos?.map((v: any) => v.aluno?.id).filter(Boolean) ?? []

  const { data: relatorios } = await supabase
    .from('relatorios_diarios')
    .select('*, aluno:alunos(nome)')
    .in('aluno_id', alunoIds.length ? alunoIds : ['none'])
    .order('data', { ascending: false })
    .limit(30)

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Histórico de Relatórios 📋</h1>
      <div className="space-y-4">
        {relatorios?.map(rel => (
          <div key={rel.id} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-800">{(rel as any).aluno?.nome}</p>
                <p className="text-sm text-gray-400">
                  {format(new Date(rel.data), "EEEE, d 'de' MMMM", { locale: ptBR })}
                </p>
              </div>
              {rel.humor && (
                <span className="text-3xl">{moodEmoji[rel.humor]}</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {rel.alimentacao && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">🍽️ Alimentação</p>
                  <p className="font-medium text-gray-700">{mealLabel[rel.alimentacao]}</p>
                </div>
              )}
              {rel.dormiu_bem !== null && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">😴 Descanso</p>
                  <p className="font-medium text-gray-700">{rel.dormiu_bem ? 'Descansou bem' : 'Não descansou'}</p>
                </div>
              )}
              {rel.atividades && (
                <div className="col-span-2 bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-400 mb-1">🎨 Atividades</p>
                  <p className="text-gray-700">{rel.atividades}</p>
                </div>
              )}
              {rel.observacoes && (
                <div className="col-span-2 bg-yellow-50 rounded-lg p-3">
                  <p className="text-xs text-yellow-600 mb-1">📝 Observações</p>
                  <p className="text-gray-700">{rel.observacoes}</p>
                </div>
              )}
            </div>
          </div>
        ))}
        {!relatorios?.length && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📋</p>
            <p>Nenhum relatório disponível ainda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
