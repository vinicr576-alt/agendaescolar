'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('E-mail ou senha incorretos')
      setLoading(false)
    } else {
      router.push('/')
    }
  }

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f172a 100%)',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
      <div style={{width:'100%',maxWidth:'420px'}}>
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <div style={{width:'64px',height:'64px',borderRadius:'18px',background:'linear-gradient(135deg,#3b82f6,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',margin:'0 auto 16px',boxShadow:'0 20px 40px rgba(99,102,241,0.4)'}}>🎒</div>
          <h1 style={{color:'white',fontSize:'26px',fontWeight:'800',margin:0,letterSpacing:'-0.5px'}}>Agenda Escolar</h1>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginTop:'6px'}}>Acesse sua conta</p>
        </div>
        <div style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(20px)',borderRadius:'20px',padding:'36px',border:'1px solid rgba(255,255,255,0.1)',boxShadow:'0 25px 50px rgba(0,0,0,0.3)'}}>
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:'20px'}}>
              <label style={{display:'block',color:'rgba(255,255,255,0.7)',fontSize:'13px',fontWeight:'500',marginBottom:'8px'}}>E-mail</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required style={{width:'100%',padding:'13px 16px',borderRadius:'12px',border:'1.5px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.07)',color:'white',fontSize:'15px',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div style={{marginBottom:'28px'}}>
              <label style={{display:'block',color:'rgba(255,255,255,0.7)',fontSize:'13px',fontWeight:'500',marginBottom:'8px'}}>Senha</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={{width:'100%',padding:'13px 16px',borderRadius:'12px',border:'1.5px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.07)',color:'white',fontSize:'15px',outline:'none',boxSizing:'border-box'}} />
            </div>
            {error && (<div style={{background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:'10px',padding:'12px 16px',marginBottom:'20px',color:'#fca5a5',fontSize:'14px'}}>{error}</div>)}
            <button type="submit" disabled={loading} style={{width:'100%',padding:'14px',borderRadius:'12px',background:'linear-gradient(135deg,#3b82f6,#6366f1)',color:'white',fontSize:'15px',fontWeight:'600',border:'none',cursor:loading?'not-allowed':'pointer',opacity:loading?0.7:1,boxShadow:'0 8px 20px rgba(99,102,241,0.4)'}}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
        <p style={{textAlign:'center',color:'rgba(255,255,255,0.4)',fontSize:'13px',marginTop:'20px'}}>
          Não tem conta?{' '}
          <Link href="/auth/signup" style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontWeight:'500'}}>Criar conta</Link>
        </p>
        <p style={{textAlign:'center',color:'rgba(255,255,255,0.3)',fontSize:'12px',marginTop:'12px'}}>© 2025 Agenda Escolar. Todos os direitos reservados.</p>
      </div>
    </div>
  )
}
