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
  const [erro, setErro] = useState('')
  const [copiado, setCopiado] = useState<string | null>(null)

  async function criarAluno(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErro('')
    const supabase = createClient()
    const payload = {
      nome: form.nome,
      data_nascimento: form.data_nascimento || null,
      turma_id: form.turma_id || null,
      observacoes: form.observacoes || null,
      escola_id: escolaId,
    }
    const { data, error } = await supabase
      .from('alunos')
      .insert(payload)
      .select('*, turma:turmas(nome)')
      .single()
    if (error) {
      setErro(error.message)
    } else if (data) {
      setAlunos(prev => [...prev, data])
      setForm({ nome: '', data_nascimento: '', turma_id: '', observacoes: '' })
      setShowForm(false)
    }
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
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
        <div>
          <h1 style={{fontSize:'24px',fontWeight:'700',color:'#0f172a',margin:0}}>Alunos</h1>
          <p style={{color:'#64748b',fontSize:'14px',marginTop:'4px'}}>{alunos.length} aluno(s) cadastrado(s)</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setErro('') }}
          style={{background:'linear-gradient(135deg,#3b82f6,#6366f1)',color:'white',border:'none',padding:'10px 18px',borderRadius:'10px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>
          + Novo aluno
        </button>
      </div>

      {showForm && (
        <form onSubmit={criarAluno} style={{background:'white',borderRadius:'16px',padding:'24px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',border:'1px solid #f1f5f9',marginBottom:'24px'}}>
          <h2 style={{fontWeight:'600',color:'#1e293b',margin:'0 0 16px 0'}}>Novo aluno</h2>
          {erro && <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:'8px',padding:'10px 14px',marginBottom:'16px',color:'#dc2626',fontSize:'13px'}}>{erro}</div>}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px'}}>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Nome completo *</label>
              <input value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} required
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Data de nascimento</label>
              <input type="date" value={form.data_nascimento} onChange={e => setForm(f => ({ ...f, data_nascimento: e.target.value }))}
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Turma</label>
              <select value={form.turma_id} onChange={e => setForm(f => ({ ...f, turma_id: e.target.value }))}
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box',background:'white'}}>
                <option value="">Selecione a turma</option>
                {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
              </select>
            </div>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Observações</label>
              <input value={form.observacoes} onChange={e => setForm(f => ({ ...f, observacoes: e.target.value }))}
                placeholder="Alergias, necessidades especiais..."
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
          </div>
          <div style={{display:'flex',gap:'12px'}}>
            <button type="submit" disabled={loading}
              style={{background:'#3b82f6',color:'white',border:'none',padding:'10px 18px',borderRadius:'8px',fontSize:'14px',fontWeight:'600',cursor:loading?'not-allowed':'pointer',opacity:loading?0.6:1}}>
              {loading ? 'Salvando...' : 'Cadastrar aluno'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              style={{background:'none',border:'1.5px solid #e2e8f0',padding:'10px 18px',borderRadius:'8px',fontSize:'14px',cursor:'pointer',color:'#64748b'}}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div style={{marginBottom:'16px'}}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar aluno..."
          style={{padding:'10px 14px',border:'1.5px solid #e2e8f0',borderRadius:'10px',fontSize:'14px',outline:'none',width:'280px'}} />
      </div>

      <div style={{background:'white',borderRadius:'16px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',border:'1px solid #f1f5f9',overflow:'hidden'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'#f8fafc',borderBottom:'1px solid #f1f5f9'}}>
              <th style={{textAlign:'left',fontSize:'12px',fontWeight:'600',color:'#64748b',padding:'12px 20px'}}>Aluno</th>
              <th style={{textAlign:'left',fontSize:'12px',fontWeight:'600',color:'#64748b',padding:'12px 20px'}}>Turma</th>
              <th style={{textAlign:'left',fontSize:'12px',fontWeight:'600',color:'#64748b',padding:'12px 20px'}}>Código de convite</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(aluno => (
              <tr key={aluno.id} style={{borderBottom:'1px solid #f8fafc'}}>
                <td style={{padding:'14px 20px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                    <div style={{width:'36px',height:'36px',background:'#eff6ff',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#3b82f6',fontWeight:'600',fontSize:'14px'}}>
                      {aluno.nome[0]}
                    </div>
                    <div>
                      <p style={{fontWeight:'500',color:'#1e293b',margin:0,fontSize:'14px'}}>{aluno.nome}</p>
                      {aluno.data_nascimento && (
                        <p style={{fontSize:'12px',color:'#94a3b8',margin:'2px 0 0 0'}}>{new Date(aluno.data_nascimento).toLocaleDateString('pt-BR')}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td style={{padding:'14px 20px',fontSize:'14px',color:'#64748b'}}>{aluno.turma?.nome ?? '—'}</td>
                <td style={{padding:'14px 20px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <code style={{fontFamily:'monospace',fontSize:'13px',background:'#f1f5f9',padding:'4px 8px',borderRadius:'6px',color:'#475569'}}>{aluno.codigo_convite}</code>
                    <button onClick={() => copiarCodigo(aluno.codigo_convite)}
                      style={{fontSize:'12px',color:'#3b82f6',background:'none',border:'none',cursor:'pointer'}}>
                      {copiado === aluno.codigo_convite ? '✓ Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr><td colSpan={3} style={{textAlign:'center',padding:'40px',color:'#94a3b8',fontSize:'14px'}}>Nenhum aluno encontrado</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
