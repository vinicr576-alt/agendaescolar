'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErro('')
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nome } },
    })
    if (error) {
      setErro(error.message)
      setLoading(false)
      return
    }
    // Create profile
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        nome,
        email,
        role: 'pai',
      })
    }
    setSucesso(true)
    setLoading(false)
  }

  if (sucesso) {
    return (
      <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f172a 100%)',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
        <div style={{textAlign:'center',color:'white',maxWidth:'400px'}}>
          <div style={{fontSize:'56px',marginBottom:'16px'}}>✅</div>
          <h1 style={{fontSize:'24px',fontWeight:'700',margin:'0 0 12px 0'}}>Conta criada!</h1>
          <p style={{color:'rgba(255,255,255,0.6)',fontSize:'15px',marginBottom:'24px'}}>
            Verifique seu e-mail para confirmar a conta, depois faça login.
          </p>
          <Link href="/auth/login" style={{background:'linear-gradient(135deg,#3b82f6,#6366f1)',color:'white',textDecoration:'none',padding:'12px 24px',borderRadius:'12px',fontWeight:'600',fontSize:'15px'}}>
            Ir para o login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f172a 100%)',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
      <div style={{width:'100%',maxWidth:'420px'}}>
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <div style={{width:'64px',height:'64px',borderRadius:'18px',background:'linear-gradient(135deg,#3b82f6,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',margin:'0 auto 16px',boxShadow:'0 20px 40px rgba(99,102,241,0.4)'}}>🎒</div>
          <h1 style={{color:'white',fontSize:'26px',fontWeight:'800',margin:0}}>Criar conta</h1>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',marginTop:'6px'}}>Agenda Escolar</p>
        </div>
        <div style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(20px)',borderRadius:'20px',padding:'36px',border:'1px solid rgba(255,255,255,0.1)',boxShadow:'0 25px 50px rgba(0,0,0,0.3)'}}>
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:'16px'}}>
              <label style={{display:'block',color:'rgba(255,255,255,0.7)',fontSize:'13px',fontWeight:'500',marginBottom:'8px'}}>Nome completo</label>
              <input value={nome} onChange={e=>setNome(e.target.value)} required placeholder="Seu nome"
                style={{width:'100%',padding:'13px 16px',borderRadius:'12px',border:'1.5px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.07)',color:'white',fontSize:'15px',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div style={{marginBottom:'16px'}}>
              <label style={{display:'block',color:'rgba(255,255,255,0.7)',fontSize:'13px',fontWeight:'500',marginBottom:'8px'}}>E-mail</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="seu@email.com"
                style={{width:'100%',padding:'13px 16px',borderRadius:'12px',border:'1.5px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.07)',color:'white',fontSize:'15px',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div style={{marginBottom:'28px'}}>
              <label style={{display:'block',color:'rgba(255,255,255,0.7)',fontSize:'13px',fontWeight:'500',marginBottom:'8px'}}>Senha</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Mínimo 6 caracteres" minLength={6}
                style={{width:'100%',padding:'13px 16px',borderRadius:'12px',border:'1.5px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.07)',color:'white',fontSize:'15px',outline:'none',boxSizing:'border-box'}} />
            </div>
            {erro && <div style={{background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:'10px',padding:'12px 16px',marginBottom:'20px',color:'#fca5a5',fontSize:'14px'}}>{erro}</div>}
            <button type="submit" disabled={loading}
              style={{width:'100%',padding:'14px',borderRadius:'12px',background:'linear-gradient(135deg,#3b82f6,#6366f1)',color:'white',fontSize:'15px',fontWeight:'600',border:'none',cursor:loading?'not-allowed':'pointer',opacity:loading?0.7:1,boxShadow:'0 8px 20px rgba(99,102,241,0.4)'}}>
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>
        </div>
        <p style={{textAlign:'center',color:'rgba(255,255,255,0.4)',fontSize:'13px',marginTop:'20px'}}>
          Já tem conta?{' '}
          <Link href="/auth/login" style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontWeight:'500'}}>Fazer login</Link>
        </p>
      </div>
    </div>
  )
}
