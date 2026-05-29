'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Autorizacao } from '@/types'

interface Aluno { id: string; nome: string }

export default function AutorizacoesClient({ autorizacoes, alunos, userId }: {
  autorizacoes: Autorizacao[], alunos: Aluno[], userId: string
}) {
  const [respostas, setRespostas] = useState<Record<string, boolean | null>>({})
  const [salvando, setSalvando] = useState<string | null>(null)

  async function responder(autorizacaoId: string, alunoId: string, autorizado: boolean) {
    const key = `${autorizacaoId}-${alunoId}`
    setSalvando(key)
    const supabase = createClient()
    await supabase.from('autorizacao_respostas').upsert({
      autorizacao_id: autorizacaoId,
      responsavel_id: userId,
      aluno_id: alunoId,
      autorizado,
    }, { onConflict: 'autorizacao_id,responsavel_id,aluno_id' })
    setRespostas(prev => ({ ...prev, [key]: autorizado }))
    setSalvando(null)
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Autorizações ✍️</h1>
      <div className="space-y-4">
        {autorizacoes.map(aut => (
          <div key={aut.id} className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-1">{aut.titulo}</h3>
            <p className="text-sm text-gray-600 mb-4">{aut.descricao}</p>
            {aut.data_limite && (
              <p className="text-xs text-orange-600 mb-3">
                ⏰ Prazo: {new Date(aut.data_limite).toLocaleDateString('pt-BR')}
              </p>
            )}
            <div className="space-y-3">
              {alunos.map(aluno => {
                const key = `${aut.id}-${aluno.id}`
                const resp = respostas[key]
                return (
                  <div key={aluno.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                    <span className="text-sm font-medium text-gray-700">{aluno.nome}</span>
                    {resp !== undefined ? (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${resp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {resp ? '✅ Autorizado' : '❌ Não autorizado'}
                      </span>
                    ) : (
                      <div className="flex gap-2">
                        <button onClick={() => responder(aut.id, aluno.id, true)}
                          disabled={salvando === key}
                          className="px-4 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 disabled:opacity-60">
                          Autorizar
                        </button>
                        <button onClick={() => responder(aut.id, aluno.id, false)}
                          disabled={salvando === key}
                          className="px-4 py-1.5 bg-red-100 text-red-600 rounded-lg text-xs font-medium hover:bg-red-200 disabled:opacity-60">
                          Recusar
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        {!autorizacoes.length && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">✍️</p>
            <p>Nenhuma autorização pendente.</p>
          </div>
        )}
      </div>
    </div>
  )
}
