import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Visão Geral', icon: '📊' },
  { href: '/admin/turmas', label: 'Turmas', icon: '🏫' },
  { href: '/admin/alunos', label: 'Alunos', icon: '👨‍🎓' },
  { href: '/admin/professores', label: 'Professores', icon: '👩‍🏫' },
  { href: '/admin/comunicados', label: 'Comunicados', icon: '📢' },
  { href: '/admin/eventos', label: 'Agenda', icon: '📅' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('nome, role, escola_id')
    .eq('id', user!.id)
    .single()

  const role = profile?.role ?? (user!.user_metadata as Record<string, string>)?.role ?? 'pai'
  if (role !== 'admin') redirect('/pais')

  const { data: escola } = profile?.escola_id ? await supabase
    .from('escolas')
    .select('nome')
    .eq('id', profile.escola_id)
    .single() : { data: null }

  async function logout() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/auth/login')
  }

  return (
    <div className="flex h-screen" style={{background:'#f1f5f9'}}>
      {/* Sidebar */}
      <aside style={{width:'256px',background:'#0f172a',display:'flex',flexDirection:'column',flexShrink:0}}>
        {/* Logo */}
        <div style={{padding:'24px',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <div style={{width:'40px',height:'40px',background:'linear-gradient(135deg,#3b82f6,#6366f1)',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',fontWeight:'800',color:'white',flexShrink:0}}>
              {(escola?.nome?.[0] ?? 'E').toUpperCase()}
            </div>
            <div>
              <p style={{fontWeight:'700',color:'white',fontSize:'14px',lineHeight:'1.2',margin:0}}>{escola?.nome ?? 'Minha Escola'}</p>
              <p style={{fontSize:'11px',color:'#64748b',margin:0,marginTop:'2px'}}>Administrador</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{flex:1,padding:'16px 12px',display:'flex',flexDirection:'column',gap:'2px'}}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 12px',borderRadius:'8px',fontSize:'13px',color:'#94a3b8',textDecoration:'none',transition:'all 0.15s'}}
              className="admin-nav-link"
            >
              <span style={{fontSize:'16px'}}>{item.icon}</span>
              <span style={{fontWeight:'500'}}>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div style={{padding:'16px',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
            <div style={{width:'32px',height:'32px',background:'linear-gradient(135deg,#3b82f6,#6366f1)',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:'700',color:'white',flexShrink:0}}>
              {(user?.email?.[0] ?? 'A').toUpperCase()}
            </div>
            <div style={{overflow:'hidden'}}>
              <p style={{fontSize:'12px',color:'white',fontWeight:'600',margin:0,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{user?.email}</p>
              <p style={{fontSize:'10px',color:'#64748b',margin:0}}>Admin</p>
            </div>
          </div>
          <form action={logout}>
            <button style={{width:'100%',fontSize:'12px',color:'#64748b',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'6px',padding:'7px 10px',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}>
              <span>🚪</span> Sair
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main style={{flex:1,overflow:'auto'}}>
        <div style={{padding:'32px'}}>{children}</div>
      </main>

      <style>{`
        .admin-nav-link:hover {
          background: rgba(255,255,255,0.06) !important;
          color: white !important;
        }
      `}</style>
    </div>
  )
}
