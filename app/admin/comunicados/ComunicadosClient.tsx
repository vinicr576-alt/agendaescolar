'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Comunicado {
  id: string; escola_id: string; turma_id?: string | null; autor_id: string;
  titulo: string; conteudo: string; tipo?: string | null; fixado?: boolean; created_at: string
}
interface Turma { id: string; nome: string }

export default function ComunicadosClient({ comunicados: initial, turmas, escolaId, autorId }: {
  comunicados: Comunicado[], turmas: Turma[], escolaId: string, autorId: string
}) {
  const [comunicados, setComunicados] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ titulo: '', conteudo: '', turma_id: '', tipo: 'geral', fixado: false })
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  async function criarComunicado(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErro('')
    const supabase = createClient()
    const { data, error } = await supabase
      .from('comunicados')
      .insert({
        titulo: form.titulo,
        conteudo: form.conteudo,
        turma_id: form.turma_id || null,
        tipo: form.tipo,
        fixado: form.fixado,
        escola_id: escolaId,
        autor_id: autorId,
      })
      .select()
      .single()
    if (error) {
      setErro(error.message)
    } else if (data) {
      setComunicados(prev => [data, ...prev])
      setForm({ titulo: '', conteudo: '', turma_id: '', tipo: 'geral', fixado: false })
      setShowForm(false)
    }
    setLoading(false)
  }

  const turmaMap = Object.fromEntries(turmas.map(t => [t.id, t.nome]))

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
        <div>
          <h1 style={{fontSize:'24px',fontWeight:'700',color:'#0f172a',margin:0}}>Comunicados</h1>
          <p style={{color:'#64748b',fontSize:'14px',marginTop:'4px'}}>{comunicados.length} comunicado(s)</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setErro('') }}
          style={{background:'linear-gradient(135deg,#3b82f6,#6366f1)',color:'white',border:'none',padding:'10px 18px',borderRadius:'10px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>
          + Novo comunicado
        </button>
      </div>

      {showForm && (
        <form onSubmit={criarComunicado} style={{background:'white',borderRadius:'16px',padding:'24px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',border:'1px solid #f1f5f9',marginBottom:'24px'}}>
          <h2 style={{fontWeight:'600',color:'#1e293b',margin:'0 0 16px 0'}}>Novo comunicado</h2>
          {erro && <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:'8px',padding:'10px 14px',marginBottom:'16px',color:'#dc2626',fontSize:'13px'}}>{erro}</div>}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px'}}>
            <div style={{gridColumn:'1/-1'}}>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Título *</label>
              <input value={form.titulo} onChange={e => setForm(f=>({...f,titulo:e.target.value}))} required
                placeholder="Ex: Reunião de pais — 3º Ano"
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Turma (opcional)</label>
              <select value={form.turma_id} onChange={e => setForm(f=>({...f,turma_id:e.target.value}))}
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box',background:'white'}}>
                <option value="">Todas as turmas</option>
                {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
              </select>
            </div>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Tipo</label>
              <select value={form.tipo} onChange={e => setForm(f=>({...f,tipo:e.target.value}))}
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box',background:'white'}}>
                <option value="geral">Geral</option>
                <option value="urgente">Urgente</option>
                <option value="evento">Evento</option>
                <option value="financeiro">Financeiro</option>
              </select>
            </div>
            <div style={{gridColumn:'1/-1'}}>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Conteúdo *</label>
              <textarea value={form.conteudo} onChange={e => setForm(f=>({...f,conteudo:e.target.value}))} required rows={4}
                placeholder="Escreva o comunicado aqui..."
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box',resize:'vertical'}} />
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <input type="checkbox" id="fixado" checked={form.fixado} onChange={e => setForm(f=>({...f,fixado:e.target.checked}))} />
              <label htmlFor="fixado" style={{fontSize:'13px',color:'#374151',cursor:'pointer'}}>Fixar comunicado no topo</label>
            </div>
          </div>
          <div style={{display:'flex',gap:'12px'}}>
            <button type="submit" disabled={loading}
              style={{background:'#3b82f6',color:'white',border:'none',padding:'10px 18px',borderRadius:'8px',fontSize:'14px',fontWeight:'600',cursor:loading?'not-allowed':'pointer',opacity:loading?0.6:1}}>
              {loading ? 'Enviando...' : 'Publicar'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              style={{background:'none',border:'1.5px solid #e2e8f0',padding:'10px 18px',borderRadius:'8px',fontSize:'14px',cursor:'pointer',color:'#64748b'}}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
        {comunicados.map(c => {
          const tipoColor: Record<string, string> = { urgente:'#fef2f2,#fecaca,#dc2626', evento:'#eff6ff,#bfdbfe,#2563eb', financeiro:'#fefce8,#fde68a,#b45309', geral:'#f8fafc,#e2e8f0,#475569' }
          const [bg, border, text] = (tipoColor[c.tipo ?? 'geral'] ?? tipoColor.geral).split(',')
          return (
            <div key={c.id} style={{background:'white',borderRadius:'16px',padding:'20px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',border:'1px solid #f1f5f9'}}>
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'12px',marginBottom:'10px'}}>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'6px'}}>
                    {c.fixado && <span style={{fontSize:'11px',background:'#fef3c7',color:'#b45309',padding:'2px 8px',borderRadius:'10px',fontWeight:'600'}}>📌 Fixado</span>}
                    <span style={{fontSize:'11px',background:bg,color:text,border:'1px solid '+border,padding:'2px 8px',borderRadius:'10px',fontWeight:'500'}}>{c.tipo ?? 'geral'}</span>
                    {c.turma_id && <span style={{fontSize:'11px',background:'#eff6ff',color:'#2563eb',padding:'2px 8px',borderRadius:'10px'}}>{turmaMap[c.turma_id] ?? 'Turma'}</span>}
                  </div>
                  <h3 style={{fontWeight:'600',color:'#1e293b',margin:0,fontSize:'16px'}}>{c.titulo}</h3>
                </div>
                <span style={{fontSize:'12px',color:'#94a3b8',flexShrink:0}}>{new Date(c.created_at).toLocaleDateString('pt-BR')}</span>
              </div>
              <p style={{fontSize:'14px',color:'#475569',margin:0,lineHeight:'1.6'}}>{c.conteudo}</p>
            </div>
          )
        })}
        {comunicados.length === 0 && (
          <div style={{textAlign:'center',padding:'48px 0',color:'#94a3b8'}}>
            <p style={{fontSize:'40px',margin:'0 0 12px 0'}}>📢</p>
            <p>Nenhum comunicado publicado ainda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
