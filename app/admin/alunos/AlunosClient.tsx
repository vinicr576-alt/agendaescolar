'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Aluno, Turma } from '@/types'

interface AlunoComTurma extends Aluno { turma?: { nome: string } | null }

export default function AlunosClient({ alunos: initial, turmas, escolaId }: {
  alunos: AlunoComTurma[], turmas: Turma[], escolaId: string
}) {
  const [alunos, setAlunos] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nome: '', data_nascimento: '', turma_id: '', observacoes: '' })
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [copiado, setCopiado] = useState<string | null>(null)

  async function criarAluno(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('alunos')
      .insert({ ...form, escola_id: escolaId })
      .select('*, turma:turmas(nome)')
      .single()
    if (data) setAlunos(prev => [...prev, data])
    setForm({ nome: '', data_nascimento: '', turma_id: '', observacoes: '' })
    setShowForm(false)
    setLoading(false)
  }

  function copiarCodigo(codigo: string) {
    navigator.clipboard.writeText(codigo)
    setCopiado(codigo)
    setTimeout(() => setCopiado(null), 2000)
  }

  const filtrados = alunos.filter(a => a.nome.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alunos</h1>
          <p className="text-gray-500 text-sm">{alunos.length} aluno(s) cadastrado(s)</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
          + Novo aluno
        </button>
      </div>

      {showForm && (
        <form onSubmit={criarAluno} className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-4">
          <h2 className="font-semibold text-gray-800">Novo aluno</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo *</label>
              <input value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de nascimento</label>
              <input type="date" value={form.data_nascimento} onChange={e => setForm(f => ({ ...f, data_nascimento: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Turma</label>
              <select value={form.turma_id} onChange={e => setForm(f => ({ ...f, turma_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Selecione a turma</option>
                {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
              <input value={form.observacoes} onChange={e => setForm(f => ({ ...f, observacoes: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Alergias, necessidades especiais..." />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60">
              {loading ? 'Salvando...' : 'Cadastrar aluno'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100">Cancelar</button>
          </div>
        </form>
      )}

      <div className="mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)}
          className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Buscar aluno..." />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Aluno</th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Turma</th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Código de convite</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtrados.map(aluno => (
              <tr key={aluno.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm">
                      {aluno.nome[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{aluno.nome}</p>
                      {aluno.data_nascimento && (
                        <p className="text-xs text-gray-400">{new Date(aluno.data_nascimento).toLocaleDateString('pt-BR')}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{aluno.turma?.nome ?? '—'}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-700">
                      {aluno.codigo_convite}
                    </code>
                    <button onClick={() => copiarCodigo(aluno.codigo_convite)}
                      className="text-xs text-blue-600 hover:underline">
                      {copiado === aluno.codigo_convite ? '✓ Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr><td colSpan={3} className="text-center py-10 text-gray-400 text-sm">Nenhum aluno encontrado</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
