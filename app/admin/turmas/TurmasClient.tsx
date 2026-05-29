'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Turma } from '@/types'

export default function TurmasClient({ turmas: initial, escolaId }: { turmas: Turma[], escolaId: string }) {
  const [turmas, setTurmas] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [loading, setLoading] = useState(false)

  async function criarTurma(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('turmas')
      .insert({ nome, descricao, escola_id: escolaId })
      .select()
      .single()
    if (data) setTurmas(prev => [...prev, data])
    setNome('')
    setDescricao('')
    setShowForm(false)
    setLoading(false)
  }

  async function toggleAtiva(turma: Turma) {
    const supabase = createClient()
    await supabase.from('turmas').update({ ativa: !turma.ativa }).eq('id', turma.id)
    setTurmas(prev => prev.map(t => t.id === turma.id ? { ...t, ativa: !t.ativa } : t))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Turmas</h1>
          <p className="text-gray-500 text-sm">{turmas.length} turma(s) cadastrada(s)</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          + Nova turma
        </button>
      </div>

      {showForm && (
        <form onSubmit={criarTurma} className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-4">
          <h2 className="font-semibold text-gray-800">Nova turma</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
              <input value={nome} onChange={e => setNome(e.target.value)} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 3º Ano A" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <input value={descricao} onChange={e => setDescricao(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Opcional" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60">
              {loading ? 'Salvando...' : 'Criar turma'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {turmas.map(turma => (
          <div key={turma.id} className="bg-white rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">🏫</div>
              <div>
                <h3 className="font-semibold text-gray-800">{turma.nome}</h3>
                {turma.descricao && <p className="text-sm text-gray-500">{turma.descricao}</p>}
                <p className="text-xs text-gray-400">Ano letivo {turma.ano_letivo}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${turma.ativa ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {turma.ativa ? 'Ativa' : 'Inativa'}
              </span>
              <button onClick={() => toggleAtiva(turma)}
                className="text-sm text-gray-400 hover:text-gray-600">
                {turma.ativa ? 'Desativar' : 'Ativar'}
              </button>
            </div>
          </div>
        ))}
        {turmas.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">🏫</p>
            <p>Nenhuma turma cadastrada ainda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
