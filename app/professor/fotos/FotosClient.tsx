'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

interface Turma { id: string; nome: string }
interface Foto { id: string; url: string; caption?: string; data: string; turma_id: string; professor?: { nome: string } }

export default function FotosClient({ fotos: initial, turmas, professorId }: {
  fotos: Foto[], turmas: Turma[], professorId: string
}) {
  const [fotos, setFotos] = useState(initial)
  const [turmaId, setTurmaId] = useState(turmas[0]?.id ?? '')
  const [caption, setCaption] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [progresso, setProgresso] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  async function enviarFotos(e: React.FormEvent) {
    e.preventDefault()
    if (!files.length || !turmaId) return
    setLoading(true)
    const supabase = createClient()

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const ext = file.name.split('.').pop()
      const path = `${turmaId}/${Date.now()}-${i}.${ext}`

      const { data: upload } = await supabase.storage
        .from('fotos-alunos')
        .upload(path, file, { cacheControl: '3600' })

      if (upload) {
        const { data: urlData } = supabase.storage.from('fotos-alunos').getPublicUrl(path)
        const { data: foto } = await supabase.from('fotos')
          .insert({ turma_id: turmaId, professor_id: professorId, url: urlData.publicUrl, caption })
          .select('*, professor:profiles(nome)')
          .single()
        if (foto) setFotos(prev => [foto, ...prev])
      }
      setProgresso(Math.round(((i + 1) / files.length) * 100))
    }

    setFiles([])
    setCaption('')
    setProgresso(0)
    setLoading(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Fotos da Turma</h1>

      <form onSubmit={enviarFotos} className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-4">
        <h2 className="font-semibold text-gray-800">Enviar fotos</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Turma</label>
            <select value={turmaId} onChange={e => setTurmaId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Legenda (opcional)</label>
            <input value={caption} onChange={e => setCaption(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ex: Aula de arte hoje!" />
          </div>
        </div>

        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-purple-400 transition">
          <p className="text-4xl mb-2">📷</p>
          <p className="text-gray-600 text-sm">Clique para selecionar fotos</p>
          <p className="text-gray-400 text-xs mt-1">JPG, PNG — várias de uma vez</p>
          {files.length > 0 && <p className="text-purple-600 text-sm mt-2 font-medium">{files.length} foto(s) selecionada(s)</p>}
          <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
            onChange={e => setFiles(Array.from(e.target.files ?? []))} />
        </div>

        {loading && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: `${progresso}%` }} />
          </div>
        )}

        <button type="submit" disabled={loading || !files.length}
          className="bg-purple-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-60">
          {loading ? `Enviando... ${progresso}%` : '📤 Enviar fotos'}
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {fotos.map(foto => (
          <div key={foto.id} className="bg-white rounded-xl overflow-hidden shadow-sm group">
            <div className="relative aspect-square">
              <Image src={foto.url} alt={foto.caption ?? 'Foto da turma'} fill className="object-cover" />
            </div>
            {foto.caption && (
              <p className="text-xs text-gray-600 p-2">{foto.caption}</p>
            )}
            <p className="text-xs text-gray-400 px-2 pb-2">
              {new Date(foto.data).toLocaleDateString('pt-BR')}
            </p>
          </div>
        ))}
        {fotos.length === 0 && (
          <div className="col-span-4 text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">📷</p>
            <p>Nenhuma foto enviada ainda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
