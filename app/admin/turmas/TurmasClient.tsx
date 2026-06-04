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
  const [erro, setErro] = useState('')

  async function criarTurma(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErro('')
    const supabase = createClient()
    const { data, error } = await supabase
      .from('turmas')
      .insert({ nome, descricao, escola_id: escolaId, ano_letivo: new Date().getFullYear(), ativa: true })
      .select()
      .single()
    if (error) {
      setErro(error.message)
    } else if (data) {
      setTurmas(prev => [...prev, data])
      setNome('')
      setDescricao('')
      setShowForm(false)
    }
    setLoading(false)
  }

  async function toggleAtiva(turma: Turma) {
    const supabase = createClient()
    const { error } = await supabase.from('turmas').update({ ativa: !turma.ativa }).eq('id', turma.id)
    if (!error) setTurmas(prev => prev.map(t => t.id === turma.id ? { ...t, ativa: !t.ativa } : t))
  }

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
        <div>
          <h1 style={{fontSize:'24px',fontWeight:'700',color:'#0f172a',margin:0}}>Turmas</h1>
          <p style={{color:'#64748b',fontSize:'14px',marginTop:'4px'}}>{turmas.length} turma(s) cadastrada(s)</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setErro('') }}
          style={{background:'linear-gradient(135deg,#3b82f6,#6366f1)',color:'white',border:'none',padding:'10px 18px',borderRadius:'10px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>
          + Nova turma
        </button>
      </div>

      {showForm && (
        <form onSubmit={criarTurma} style={{background:'white',borderRadius:'16px',padding:'24px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',border:'1px solid #f1f5f9',marginBottom:'24px'}}>
          <h2 style={{fontWeight:'600',color:'#1e293b',margin:'0 0 16px 0'}}>Nova turma</h2>
          {erro && <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:'8px',padding:'10px 14px',marginBottom:'16px',color:'#dc2626',fontSize:'13px'}}>{erro}</div>}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px'}}>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Nome *</label>
              <input value={nome} onChange={e => setNome(e.target.value)} required placeholder="Ex: 3º Ano A"
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Descrição</label>
              <input value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Opcional"
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
          </div>
          <div style={{display:'flex',gap:'12px'}}>
            <button type="submit" disabled={loading}
              style={{background:'#3b82f6',color:'white',border:'none',padding:'10px 18px',borderRadius:'8px',fontSize:'14px',fontWeight:'600',cursor:loading?'not-allowed':'pointer',opacity:loading?0.6:1}}>
              {loading ? 'Salvando...' : 'Criar turma'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              style={{background:'none',border:'1.5px solid #e2e8f0',padding:'10px 18px',borderRadius:'8px',fontSize:'14px',cursor:'pointer',color:'#64748b'}}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div style={{display:'grid',gap:'12px'}}>
        {turmas.map(turma => (
          <div key={turma.id} style={{background:'white',borderRadius:'16px',padding:'20px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',border:'1px solid #f1f5f9',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
              <div style={{width:'48px',height:'48px',background:'#eff6ff',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px'}}>🏫</div>
              <div>
                <p style={{fontWeight:'600',color:'#1e293b',margin:0}}>{turma.nome}</p>
                {turma.descricao && <p style={{fontSize:'13px',color:'#64748b',margin:'2px 0 0 0'}}>{turma.descricao}</p>}
                <p style={{fontSize:'12px',color:'#94a3b8',margin:'2px 0 0 0'}}>Ano letivo {turma.ano_letivo}</p>
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <span style={{padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'500',background:turma.ativa?'#dcfce7':'#f1f5f9',color:turma.ativa?'#16a34a':'#64748b'}}>
                {turma.ativa ? 'Ativa' : 'Inativa'}
              </span>
              <button onClick={() => toggleAtiva(turma)}
                style={{fontSize:'13px',color:'#94a3b8',background:'none',border:'none',cursor:'pointer'}}>
                {turma.ativa ? 'Desativar' : 'Ativar'}
              </button>
            </div>
          </div>
        ))}
        {turmas.length === 0 && (
          <div style={{textAlign:'center',padding:'48px 0',color:'#94a3b8'}}>
            <p style={{fontSize:'40px',margin:'0 0 12px 0'}}>🏫</p>
            <p>Nenhuma turma cadastrada ainda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
