import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'

const moodEmoji: Record<string, string> = { otimo: '😄', bom: '🙂', regular: '😐', ruim: '😕' }
const moodLabel: Record<string, string> = { otimo: 'Ótimo', bom: 'Bom', regular: 'Regular', ruim: 'Ruim' }
const mealLabel: Record<string, string> = { comeu_tudo: 'Comeu tudo ✅', comeu_bem: 'Comeu bem 👍', comeu_pouco: 'Comeu pouco ⚠️', nao_comeu: 'Não comeu ❌' }

export default async function PaisHome() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const hoje = format(new Date(), 'yyyy-MM-dd')

  // Alunos vinculados
  const { data: vinculos } = await supabase
    .from('aluno_responsaveis')
    .select('aluno:alunos(id, nome, foto_url, turma:turmas(nome))')
    .eq('responsavel_id', user!.id)

  const alunos = vinculos?.map((v: any) => v.aluno).filter(Boolean) ?? []
  const alunoIds = alunos.map((a: any) => a.id)

  // Relatórios de hoje
  const { data: relatoriosHoje } = await supabase
    .from('relatorios_diarios')
    .select('*, aluno:alunos(nome)')
    .in('aluno_id', alunoIds)
    .eq('data', hoje)

  // Próximos eventos (próximos 7 dias)
  const { data: proximosEventos } = await supabase
    .from('eventos')
    .select('*')
    .gte('data_inicio', new Date().toISOString())
    .lte('data_inicio', new Date(Date.now() + 7 * 86400000).toISOString())
    .order('data_inicio')
    .limit(3)

  // Comunicados não lidos (últimos 5)
  const { data: comunicados } = await supabase
    .from('comunicados')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  // Fotos recentes
  const turmaIds = alunos.map((a: any) => a.turma?.id).filter(Boolean)
  const { data: fotosRecentes } = await supabase
    .from('fotos')
    .select('id, url, caption, data')
    .in('turma_id', turmaIds.length ? turmaIds : ['none'])
    .order('created_at', { ascending: false })
    .limit(4)

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })} 👋
        </h1>
      </div>

      {/* Cards dos filhos */}
      <section>
        <h2 className="font-semibold text-gray-700 mb-3">Meus filhos</h2>
        <div className="grid gap-3">
          {alunos.map((aluno: any) => {
            const rel = relatoriosHoje?.find((r: any) => r.aluno_id === aluno.id)
            return (
              <div key={aluno.id} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-blue-600">
                    {aluno.foto_url ? (
                      <Image src={aluno.foto_url} alt={aluno.nome} width={56} height={56} className="rounded-2xl object-cover" />
                    ) : aluno.nome[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{aluno.nome}</h3>
                    <p className="text-sm text-gray-400">{aluno.turma?.nome}</p>
                  </div>
                </div>

                {rel ? (
                  <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-3 gap-3">
                    {rel.humor && (
                      <div className="text-center">
                        <p className="text-2xl">{moodEmoji[rel.humor]}</p>
                        <p className="text-xs text-gray-500 mt-1">Humor</p>
                        <p className="text-xs font-medium text-gray-700">{moodLabel[rel.humor]}</p>
                      </div>
                    )}
                    {rel.alimentacao && (
                      <div className="text-center">
                        <p className="text-2xl">🍽️</p>
                        <p className="text-xs text-gray-500 mt-1">Alimentação</p>
                        <p className="text-xs font-medium text-gray-700">{mealLabel[rel.alimentacao]}</p>
                      </div>
                    )}
                    {rel.dormiu_bem !== null && (
                      <div className="text-center">
                        <p className="text-2xl">{rel.dormiu_bem ? '😴' : '😵'}</p>
                        <p className="text-xs text-gray-500 mt-1">Descanso</p>
                        <p className="text-xs font-medium text-gray-700">{rel.dormiu_bem ? 'Descansou' : 'Não descansou'}</p>
                      </div>
                    )}
                    {rel.atividades && (
                      <div className="col-span-3 mt-2 pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Atividades</p>
                        <p className="text-sm text-gray-700">{rel.atividades}</p>
                      </div>
                    )}
                    {rel.observacoes && (
                      <div className="col-span-3">
                        <p className="text-xs text-gray-500 mb-1">Observações</p>
                        <p className="text-sm text-gray-700">{rel.observacoes}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-yellow-50 rounded-xl p-3 text-center">
                    <p className="text-sm text-yellow-700">⏳ Relatório de hoje ainda não foi preenchido</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Fotos recentes */}
      {(fotosRecentes?.length ?? 0) > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-700">Fotos recentes 📷</h2>
            <Link href="/pais/fotos" className="text-sm text-blue-600 hover:underline">Ver todas</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {fotosRecentes?.slice(0, 4).map(foto => (
              <div key={foto.id} className="rounded-xl overflow-hidden aspect-square relative shadow-sm">
                <Image src={foto.url} alt={foto.caption ?? 'Foto'} fill className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Próximos eventos */}
      {(proximosEventos?.length ?? 0) > 0 && (
        <section>
          <h2 className="font-semibold text-gray-700 mb-3">Próximos eventos 📅</h2>
          <div className="space-y-2">
            {proximosEventos?.map(evento => (
              <div key={evento.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
                <div className="bg-blue-100 rounded-xl p-3 text-center min-w-[50px]">
                  <p className="text-xs text-blue-500 font-medium">
                    {format(new Date(evento.data_inicio), 'MMM', { locale: ptBR }).toUpperCase()}
                  </p>
                  <p className="text-xl font-bold text-blue-700">
                    {format(new Date(evento.data_inicio), 'd')}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{evento.titulo}</p>
                  {evento.local && <p className="text-xs text-gray-400">📍 {evento.local}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Comunicados */}
      {(comunicados?.length ?? 0) > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-700">Comunicados 📢</h2>
            <Link href="/pais/comunicados" className="text-sm text-blue-600 hover:underline">Ver todos</Link>
          </div>
          <div className="space-y-2">
            {comunicados?.slice(0, 3).map(c => (
              <div key={c.id} className="bg-white rounded-xl p-4 shadow-sm">
                <p className="font-medium text-gray-800 text-sm">{c.titulo}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(c.created_at).toLocaleDateString('pt-BR')}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
