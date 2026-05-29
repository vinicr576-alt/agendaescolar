'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Comunicado, Turma } from '@/types'

export default function ComunicadosClient({ comunicados: initial, turmas, escolaId, autorId }: {
  comunicados: Comunicado[], turmas: Turma[], escolaId: string, autorId: string
}) {
  const [comunicados, setComunicados] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ titulo: '', conteudo: '', turma_id: '', tipo: 'geral' })
  const [loading, setLoading] = useState(false)

  async function enviarComunicado(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('comunicados')
      .insert({ ...form, escola_id: escolaId, autor_id: autorId, turma_id: form.turma_id || null })
      .select('*, autor:profiles(nome), turma:turmas(nome)')
      .single()
    if (data) setComunicados(prev => [data, ...prev])
    setForm({ titulo: '', conteudo: '', turma_id: '', tipo: 'geral' })
    setShowForm(false)
    setLoading(false)
  }

  const tipoColors: Record<string, string> = {
    geral: 'bg-blue-100 text-blue-700',
    urgente: 'bg-red-100 text-red-700',
    informativo: 'bg-green-100 text-green-700',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Comunicados</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition">
          + Novo comunicado
        </button>
      </div>

      {showForm && (
        <form onSubmit={enviarComunicado} className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-4">
          <h2 className="font-semibold text-gray-800">Novo comunicado</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
              <input value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ex: Lembrete: reunião de pais sexta-feira" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Para a turma</label>
              <select value={form.turma_id} onChange={e => setForm(f => ({ ...f, turma_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="">Escola toda</option>
                {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="geral">Geral</option>
                <option value="urgente">Urgente</option>
                <option value="informativo">Informativo</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem *</label>
              <textarea value={form.conteudo} onChange={e => setForm(f => ({ ...f, conteudo: e.target.value }))} required
                rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Escreva o comunicado aqui..." />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-60">
              {loading ? 'Enviando...' : '📢 Publicar comunicado'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100">Cancelar</button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {comunicados.map(c => (
          <div key={c.id} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-800">{c.titulo}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tipoColors[c.tipo] ?? 'bg-gray-100 text-gray-600'}`}>
                {c.tipo}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{c.conteudo}</p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>👤 {(c as any).autor?.nome}</span>
              {(c as any).turma && <span>🏫 {(c as any).turma.nome}</span>}
              <span>{new Date(c.created_at).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        ))}
        {comunicados.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">📢</p>
            <p>Nenhum comunicado ainda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
