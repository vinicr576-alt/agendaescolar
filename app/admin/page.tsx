import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('escola_id').eq('id', user!.id).single()
  const escola_id = profile?.escola_id

  const [{ count: totalTurmas }, { count: totalAlunos }, { count: totalProfessores }, { count: totalComunicados }] = await Promise.all([
    supabase.from('turmas').select('*', { count: 'exact', head: true }).eq('escola_id', escola_id).eq('ativa', true),
    supabase.from('alunos').select('*', { count: 'exact', head: true }).eq('escola_id', escola_id).eq('ativo', true),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('escola_id', escola_id).eq('role', 'professor'),
    supabase.from('comunicados').select('*', { count: 'exact', head: true }).eq('escola_id', escola_id),
  ])

  const stats = [
    { label: 'Turmas Ativas', value: totalTurmas ?? 0, icon: '🎓', gradient: 'linear-gradient(135deg,#667eea,#764ba2)' },
    { label: 'Alunos', value: totalAlunos ?? 0, icon: '👦', gradient: 'linear-gradient(135deg,#11998e,#38ef7d)' },
    { label: 'Professores', value: totalProfessores ?? 0, icon: '👩‍🏫', gradient: 'linear-gradient(135deg,#f093fb,#f5576c)' },
    { label: 'Comunicados', value: totalComunicados ?? 0, icon: '📢', gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
  ]

  const quickLinks = [
    { href: '/admin/turmas', label: 'Turmas', icon: '🎓', desc: 'Criar e editar turmas' },
    { href: '/admin/alunos', label: 'Alunos', icon: '👦', desc: 'Cadastrar alunos' },
    { href: '/admin/professores', label: 'Professores', icon: '👩‍🏫', desc: 'Equipe pedagógica' },
    { href: '/admin/comunicados', label: 'Comunicados', icon: '📢', desc: 'Avisos para os pais' },
    { href: '/admin/eventos', label: 'Agenda', icon: '📅', desc: 'Eventos e atividades' },
  ]

  return (
    <div>
      <div style={{marginBottom:'32px'}}>
        <h1 style={{fontSize:'28px',fontWeight:'700',color:'#0f172a',margin:0}}>Visão Geral</h1>
        <p style={{color:'#64748b',marginTop:'6px',fontSize:'15px'}}>Bem-vindo ao painel administrativo</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'20px',marginBottom:'40px'}}>
        {stats.map((s) => (
          <div key={s.label} style={{background:'white',borderRadius:'16px',padding:'24px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',border:'1px solid #f1f5f9',display:'flex',alignItems:'center',gap:'16px'}}>
            <div style={{width:'56px',height:'56px',borderRadius:'14px',background:s.gradient,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',flexShrink:0}}>
              {s.icon}
            </div>
            <div>
              <p style={{fontSize:'32px',fontWeight:'800',color:'#0f172a',margin:0,lineHeight:'1'}}>{s.value}</p>
              <p style={{fontSize:'13px',color:'#64748b',marginTop:'4px',fontWeight:'500'}}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{background:'white',borderRadius:'16px',padding:'28px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',border:'1px solid #f1f5f9'}}>
        <h2 style={{fontSize:'17px',fontWeight:'700',color:'#0f172a',margin:'0 0 20px 0'}}>Acesso Rápido</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'12px'}}>
          {quickLinks.map((l) => (
            <Link key={l.href} href={l.href} style={{textDecoration:'none',display:'flex',flexDirection:'column',gap:'6px',padding:'16px',borderRadius:'12px',border:'1.5px solid #e2e8f0',background:'#f8fafc'}}>
              <span style={{fontSize:'22px'}}>{l.icon}</span>
              <span style={{fontSize:'14px',fontWeight:'600',color:'#1e293b'}}>{l.label}</span>
              <span style={{fontSize:'12px',color:'#94a3b8'}}>{l.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
