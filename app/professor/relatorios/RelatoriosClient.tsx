'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { MoodType, MealType } from '@/types'

const moodOptions: { value: MoodType; label: string; emoji: string }[] = [
  { value: 'otimo', label: 'Ótimo', emoji: '😄' },
  { value: 'bom', label: 'Bom', emoji: '🙂' },
  { value: 'regular', label: 'Regular', emoji: '😐' },
  { value: 'ruim', label: 'Ruim', emoji: '😕' },
]

const mealOptions: { value: MealType; label: string }[] = [
  { value: 'comeu_tudo', label: 'Comeu tudo' },
  { value: 'comeu_bem', label: 'Comeu bem' },
  { value: 'comeu_pouco', label: 'Comeu pouco' },
  { value: 'nao_comeu', label: 'Não comeu' },
]

interface Aluno { id: string; nome: string; turma?: { nome: string } | null }

export default function RelatoriosClient({ alunos, professorId }: { alunos: Aluno[], professorId: string }) {
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null)
  const [form, setForm] = useState({
    humor: '' as MoodType | '',
    alimentacao: '' as MealType | '',
    dormiu_bem: null as boolean | null,
    atividades: '',
    observacoes: '',
  })
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  async function salvarRelatorio(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedAluno) return
    setLoading(true)

    const supabase = createClient()
    const hoje = new Date().toISOString().split('T')[0]

    await supabase.from('relatorios_diarios').upsert({
      aluno_id: selectedAluno.id,
      professor_id: professorId,
      data: hoje,
      humor: form.humor || null,
      alimentacao: form.alimentacao || null,
      dormiu_bem: form.dormiu_bem,
      atividades: form.atividades || null,
      observacoes: form.observacoes || null,
    }, { onConflict: 'aluno_id,data' })

    // Cria notificação para pais (simplificado)
    await supabase.rpc('notify_parents_relatorio', { p_aluno_id: selectedAluno.id }).catch(() => {})

    setLoading(false)
    setSucesso(true)
    setSelectedAluno(null)
    setForm({ humor: '', alimentacao: '', dormiu_bem: null, atividades: '', observacoes: '' })
    setTimeout(() => setSucesso(false), 3000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Relatórios Diários</h1>

      {sucesso && (
        <div className="bg-green-50 text-green-700 border border-green-200 rounded-xl p-4 mb-6">
          ✅ Relatório salvo com sucesso! Os pais serão notificados.
        </div>
      )}

      {!selectedAluno ? (
        <div>
          <p className="text-gray-500 mb-4">Selecione o aluno para preencher o relatório de hoje:</p>
          <div className="grid gap-3">
            {alunos.map(aluno => (
              <button key={aluno.id} onClick={() => setSelectedAluno(aluno)}
                className="bg-white rounded-xl p-4 shadow-sm text-left hover:shadow-md hover:border-blue-200 border border-transparent transition flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-lg">
                  {aluno.nome[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{aluno.nome}</p>
                  <p className="text-sm text-gray-400">{aluno.turma?.nome}</p>
                </div>
                <span className="ml-auto text-blue-600 text-sm">Preencher →</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={salvarRelatorio} className="bg-white rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 text-lg">
              Relatório de <span className="text-purple-600">{selectedAluno.nome}</span>
            </h2>
            <button type="button" onClick={() => setSelectedAluno(null)}
              className="text-sm text-gray-400 hover:text-gray-600">← Voltar</button>
          </div>

          {/* Humor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Como estava o humor? 😊</label>
            <div className="flex gap-3">
              {moodOptions.map(opt => (
                <button key={opt.value} type="button"
                  onClick={() => setForm(f => ({ ...f, humor: opt.value }))}
                  className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border-2 transition ${form.humor === opt.value ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="text-xs text-gray-600">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Alimentação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Alimentação 🍽️</label>
            <div className="grid grid-cols-2 gap-2">
              {mealOptions.map(opt => (
                <button key={opt.value} type="button"
                  onClick={() => setForm(f => ({ ...f, alimentacao: opt.value }))}
                  className={`px-4 py-2.5 rounded-lg border-2 text-sm transition ${form.alimentacao === opt.value ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Descansou bem? 😴</label>
            <div className="flex gap-3">
              {[{ label: 'Sim', value: true }, { label: 'Não', value: false }].map(opt => (
                <button key={String(opt.value)} type="button"
                  onClick={() => setForm(f => ({ ...f, dormiu_bem: opt.value }))}
                  className={`px-6 py-2.5 rounded-lg border-2 text-sm transition ${form.dormiu_bem === opt.value ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600'}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Atividades */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Atividades do dia 🎨</label>
            <textarea value={form.atividades} onChange={e => setForm(f => ({ ...f, atividades: e.target.value }))}
              rows={3} placeholder="Descreva as atividades realizadas..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Observações gerais 📝</label>
            <textarea value={form.observacoes} onChange={e => setForm(f => ({ ...f, observacoes: e.target.value }))}
              rows={2} placeholder="Algo que os pais precisam saber..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-60">
            {loading ? 'Salvando...' : '✅ Salvar relatório'}
          </button>
        </form>
      )}
    </div>
  )
}
