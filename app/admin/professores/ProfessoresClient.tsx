'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/types'

export default function ProfessoresClient({ professores: initial, escolaId }: { professores: Profile[], escolaId: string }) {
  const [professores, setProfessores] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nome: '', email: '', telefone: '' })
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  async function convidarProfessor(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErro('')
    const supabase = createClient()
    // Verifica se já existe perfil com esse email
    const { data: existing } = await supabase
      .from('profiles')
      .select('id, nome, email, role')
      .eq('email', form.email)
      .single()

    if (existing) {
      if (existing.role === 'professor' || existing.role === 'admin') {
        setErro('Este e-mail já está cadastrado como professor ou admin.')
        setLoading(false)
        return
      }
      // Atualiza o role e a escola do usuário existente
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'professor', escola_id: escolaId, nome: form.nome || existing.nome })
        .eq('id', existing.id)
      if (error) { setErro(error.message); setLoading(false); return }
      setProfessores(prev => [...prev, { ...existing, nome: form.nome || existing.nome, role: 'professor', escola_id: escolaId, telefone: form.telefone }])
    } else {
      setErro('Usuário não encontrado. O professor deve criar uma conta primeiro e depois ser vinculado.')
    }
    setForm({ nome: '', email: '', telefone: '' })
    setShowForm(false)
    setLoading(false)
  }

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
        <div>
          <h1 style={{fontSize:'24px',fontWeight:'700',color:'#0f172a',margin:0}}>Professores</h1>
          <p style={{color:'#64748b',fontSize:'14px',marginTop:'4px'}}>{professores.length} professor(es) cadastrado(s)</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setErro('') }}
          style={{background:'linear-gradient(135deg,#3b82f6,#6366f1)',color:'white',border:'none',padding:'10px 18px',borderRadius:'10px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>
          + Vincular professor
        </button>
      </div>

      {showForm && (
        <form onSubmit={convidarProfessor} style={{background:'white',borderRadius:'16px',padding:'24px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',border:'1px solid #f1f5f9',marginBottom:'24px'}}>
          <h2 style={{fontWeight:'600',color:'#1e293b',margin:'0 0 8px 0'}}>Vincular professor existente</h2>
          <p style={{color:'#64748b',fontSize:'13px',margin:'0 0 16px 0'}}>O professor precisa ter criado uma conta no sistema primeiro.</p>
          {erro && <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:'8px',padding:'10px 14px',marginBottom:'16px',color:'#dc2626',fontSize:'13px'}}>{erro}</div>}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px',marginBottom:'16px'}}>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Nome</label>
              <input value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} placeholder="Nome do professor"
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>E-mail *</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required placeholder="professor@email.com"
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Telefone</label>
              <input value={form.telefone} onChange={e => setForm(f => ({ ...f, telefone: e.target.value }))} placeholder="(11) 99999-9999"
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
          </div>
          <div style={{display:'flex',gap:'12px'}}>
            <button type="submit" disabled={loading}
              style={{background:'#3b82f6',color:'white',border:'none',padding:'10px 18px',borderRadius:'8px',fontSize:'14px',fontWeight:'600',cursor:loading?'not-allowed':'pointer',opacity:loading?0.6:1}}>
              {loading ? 'Buscando...' : 'Vincular'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              style={{background:'none',border:'1.5px solid #e2e8f0',padding:'10px 18px',borderRadius:'8px',fontSize:'14px',cursor:'pointer',color:'#64748b'}}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div style={{display:'grid',gap:'12px'}}>
        {professores.map(prof => (
          <div key={prof.id} style={{background:'white',borderRadius:'16px',padding:'20px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',border:'1px solid #f1f5f9',display:'flex',alignItems:'center',gap:'16px'}}>
            <div style={{width:'48px',height:'48px',borderRadius:'50%',background:'linear-gradient(135deg,#f093fb,#f5576c)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'700',fontSize:'18px',flexShrink:0}}>
              {prof.nome[0]}
            </div>
            <div style={{flex:1}}>
              <p style={{fontWeight:'600',color:'#1e293b',margin:0}}>{prof.nome}</p>
              <p style={{fontSize:'13px',color:'#64748b',margin:'2px 0 0 0'}}>{prof.email}</p>
              {prof.telefone && <p style={{fontSize:'12px',color:'#94a3b8',margin:'2px 0 0 0'}}>{prof.telefone}</p>}
            </div>
            <span style={{padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'500',background:'#f0fdf4',color:'#16a34a'}}>
              Professor
            </span>
          </div>
        ))}
        {professores.length === 0 && (
          <div style={{textAlign:'center',padding:'48px 0',color:'#94a3b8'}}>
            <p style={{fontSize:'40px',margin:'0 0 12px 0'}}>👩‍🏫</p>
            <p>Nenhum professor vinculado ainda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
