'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Evento {
  id: string; escola_id: string; turma_id?: string | null; criado_por: string;
  titulo: string; descricao?: string | null; tipo?: string | null;
  data_inicio: string; data_fim?: string | null; local?: string | null; created_at: string
}
interface Turma { id: string; nome: string }

const TIPO_ICONS: Record<string, string> = { prova:'📝', trabalho:'📋', reuniao:'👥', excursao:'🚌', feriado:'🎉', outro:'📅' }
const TIPO_COLORS: Record<string, string> = { prova:'#fef2f2,#fecaca,#dc2626', trabalho:'#fefce8,#fde68a,#b45309', reuniao:'#eff6ff,#bfdbfe,#2563eb', excursao:'#f0fdf4,#bbf7d0,#16a34a', feriado:'#fdf4ff,#e9d5ff,#9333ea', outro:'#f8fafc,#e2e8f0,#475569' }

export default function EventosClient({ eventos: initial, turmas, escolaId, criadoPor }: {
  eventos: Evento[], turmas: Turma[], escolaId: string, criadoPor: string
}) {
  const [eventos, setEventos] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ titulo: '', descricao: '', tipo: 'outro', turma_id: '', data_inicio: '', data_fim: '', local: '' })
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  async function criarEvento(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErro('')
    const supabase = createClient()
    const { data, error } = await supabase
      .from('eventos')
      .insert({
        titulo: form.titulo,
        descricao: form.descricao || null,
        tipo: form.tipo,
        turma_id: form.turma_id || null,
        data_inicio: form.data_inicio,
        data_fim: form.data_fim || null,
        local: form.local || null,
        escola_id: escolaId,
        criado_por: criadoPor,
      })
      .select()
      .single()
    if (error) {
      setErro(error.message)
    } else if (data) {
      setEventos(prev => [...prev, data].sort((a, b) => new Date(a.data_inicio).getTime() - new Date(b.data_inicio).getTime()))
      setForm({ titulo: '', descricao: '', tipo: 'outro', turma_id: '', data_inicio: '', data_fim: '', local: '' })
      setShowForm(false)
    }
    setLoading(false)
  }

  const turmaMap = Object.fromEntries(turmas.map(t => [t.id, t.nome]))

  const hoje = new Date()
  const proximos = eventos.filter(e => new Date(e.data_inicio) >= hoje)
  const passados = eventos.filter(e => new Date(e.data_inicio) < hoje)

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
        <div>
          <h1 style={{fontSize:'24px',fontWeight:'700',color:'#0f172a',margin:0}}>Agenda</h1>
          <p style={{color:'#64748b',fontSize:'14px',marginTop:'4px'}}>{proximos.length} evento(s) próximo(s)</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setErro('') }}
          style={{background:'linear-gradient(135deg,#3b82f6,#6366f1)',color:'white',border:'none',padding:'10px 18px',borderRadius:'10px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>
          + Novo evento
        </button>
      </div>

      {showForm && (
        <form onSubmit={criarEvento} style={{background:'white',borderRadius:'16px',padding:'24px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',border:'1px solid #f1f5f9',marginBottom:'24px'}}>
          <h2 style={{fontWeight:'600',color:'#1e293b',margin:'0 0 16px 0'}}>Novo evento</h2>
          {erro && <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:'8px',padding:'10px 14px',marginBottom:'16px',color:'#dc2626',fontSize:'13px'}}>{erro}</div>}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px'}}>
            <div style={{gridColumn:'1/-1'}}>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Título *</label>
              <input value={form.titulo} onChange={e=>setForm(f=>({...f,titulo:e.target.value}))} required
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Tipo</label>
              <select value={form.tipo} onChange={e=>setForm(f=>({...f,tipo:e.target.value}))}
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box',background:'white'}}>
                {Object.entries(TIPO_ICONS).map(([k,v]) => <option key={k} value={k}>{v} {k.charAt(0).toUpperCase()+k.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Turma (opcional)</label>
              <select value={form.turma_id} onChange={e=>setForm(f=>({...f,turma_id:e.target.value}))}
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box',background:'white'}}>
                <option value="">Todas as turmas</option>
                {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
              </select>
            </div>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Data início *</label>
              <input type="datetime-local" value={form.data_inicio} onChange={e=>setForm(f=>({...f,data_inicio:e.target.value}))} required
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Data fim</label>
              <input type="datetime-local" value={form.data_fim} onChange={e=>setForm(f=>({...f,data_fim:e.target.value}))}
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Local</label>
              <input value={form.local} onChange={e=>setForm(f=>({...f,local:e.target.value}))} placeholder="Ex: Sala 3, Quadra..."
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div style={{gridColumn:'1/-1'}}>
              <label style={{display:'block',fontSize:'13px',fontWeight:'500',color:'#374151',marginBottom:'6px'}}>Descrição</label>
              <textarea value={form.descricao} onChange={e=>setForm(f=>({...f,descricao:e.target.value}))} rows={3}
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box',resize:'vertical'}} />
            </div>
          </div>
          <div style={{display:'flex',gap:'12px'}}>
            <button type="submit" disabled={loading}
              style={{background:'#3b82f6',color:'white',border:'none',padding:'10px 18px',borderRadius:'8px',fontSize:'14px',fontWeight:'600',cursor:loading?'not-allowed':'pointer',opacity:loading?0.6:1}}>
              {loading ? 'Salvando...' : 'Criar evento'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              style={{background:'none',border:'1.5px solid #e2e8f0',padding:'10px 18px',borderRadius:'8px',fontSize:'14px',cursor:'pointer',color:'#64748b'}}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {proximos.length > 0 && (
        <div style={{marginBottom:'32px'}}>
          <h2 style={{fontSize:'15px',fontWeight:'600',color:'#64748b',margin:'0 0 12px 0',textTransform:'uppercase',letterSpacing:'0.05em'}}>Próximos</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {proximos.map(ev => {
              const [bg,border,text] = (TIPO_COLORS[ev.tipo??'outro']??TIPO_COLORS.outro).split(',')
              return (
                <div key={ev.id} style={{background:'white',borderRadius:'14px',padding:'16px 20px',boxShadow:'0 1px 3px rgba(0,0,0,0.06)',border:'1px solid #f1f5f9',display:'flex',gap:'16px',alignItems:'flex-start'}}>
                  <div style={{width:'48px',height:'48px',borderRadius:'12px',background:bg,border:'1px solid '+border,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',flexShrink:0}}>
                    {TIPO_ICONS[ev.tipo??'outro']??'📅'}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px'}}>
                      <p style={{fontWeight:'600',color:'#1e293b',margin:0}}>{ev.titulo}</p>
                      <span style={{fontSize:'11px',background:bg,color:text,border:'1px solid '+border,padding:'2px 8px',borderRadius:'10px',fontWeight:'500'}}>{ev.tipo}</span>
                      {ev.turma_id && <span style={{fontSize:'11px',background:'#eff6ff',color:'#2563eb',padding:'2px 8px',borderRadius:'10px'}}>{turmaMap[ev.turma_id]}</span>}
                    </div>
                    <p style={{fontSize:'13px',color:'#64748b',margin:0}}>
                      📅 {new Date(ev.data_inicio).toLocaleString('pt-BR',{dateStyle:'short',timeStyle:'short'})}
                      {ev.local && <span> · 📍 {ev.local}</span>}
                    </p>
                    {ev.descricao && <p style={{fontSize:'13px',color:'#94a3b8',margin:'4px 0 0 0'}}>{ev.descricao}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {passados.length > 0 && (
        <div>
          <h2 style={{fontSize:'15px',fontWeight:'600',color:'#94a3b8',margin:'0 0 12px 0',textTransform:'uppercase',letterSpacing:'0.05em'}}>Passados</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'10px',opacity:0.6}}>
            {passados.slice(0,5).map(ev => (
              <div key={ev.id} style={{background:'white',borderRadius:'14px',padding:'14px 20px',border:'1px solid #f1f5f9',display:'flex',gap:'12px',alignItems:'center'}}>
                <span style={{fontSize:'20px'}}>{TIPO_ICONS[ev.tipo??'outro']??'📅'}</span>
                <div>
                  <p style={{fontWeight:'500',color:'#64748b',margin:0,fontSize:'14px'}}>{ev.titulo}</p>
                  <p style={{fontSize:'12px',color:'#94a3b8',margin:'2px 0 0 0'}}>{new Date(ev.data_inicio).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {eventos.length === 0 && (
        <div style={{textAlign:'center',padding:'48px 0',color:'#94a3b8'}}>
          <p style={{fontSize:'40px',margin:'0 0 12px 0'}}>📅</p>
          <p>Nenhum evento cadastrado ainda.</p>
        </div>
      )}
    </div>
  )
}
