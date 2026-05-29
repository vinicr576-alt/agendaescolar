'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [codigoConvite, setCodigoConvite] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()

    // Verifica se o código de convite existe
    const { data: aluno, error: alunoError } = await supabase
      .from('alunos')
      .select('id, nome, escola_id')
      .eq('codigo_convite', codigoConvite.trim().toLowerCase())
      .single()

    if (alunoError || !aluno) {
      setError('Código de convite inválido. Verifique com a escola.')
      setLoading(false)
      return
    }

    // Cria conta
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nome, role: 'pai' }
      }
    })

    if (signUpError || !authData.user) {
      setError(signUpError?.message ?? 'Erro ao criar conta.')
      setLoading(false)
      return
    }

    // Atualiza escola_id no profile
    await supabase
      .from('profiles')
      .update({ escola_id: aluno.escola_id })
      .eq('id', authData.user.id)

    // Vincula responsável ao aluno
    await supabase
      .from('aluno_responsaveis')
      .insert({ aluno_id: aluno.id, responsavel_id: authData.user.id, parentesco: 'responsável' })

    router.push('/pais')
    router.refresh()
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Criar conta de responsável</h2>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
        <input
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Seu nome"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Mínimo 6 caracteres"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Código de convite do aluno
        </label>
        <input
          type="text"
          value={codigoConvite}
          onChange={e => setCodigoConvite(e.target.value)}
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono uppercase"
          placeholder="Ex: a1b2c3d4"
        />
        <p className="text-xs text-gray-400 mt-1">Fornecido pela escola no momento da matrícula</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60 text-sm"
      >
        {loading ? 'Criando conta...' : 'Criar conta'}
      </button>

      <p className="text-center text-sm text-gray-500">
        Já tem conta?{' '}
        <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
          Entrar
        </Link>
      </p>
    </form>
  )
}
