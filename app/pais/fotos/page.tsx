import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'

export default async function PaisFotosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: vinculos } = await supabase
    .from('aluno_responsaveis')
    .select('aluno:alunos(turma_id)')
    .eq('responsavel_id', user!.id)

  const turmaIds = vinculos?.map((v: any) => v.aluno?.turma_id).filter(Boolean) ?? []

  const { data: fotos } = await supabase
    .from('fotos')
    .select('*, turma:turmas(nome)')
    .in('turma_id', turmaIds.length ? turmaIds : ['none'])
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Fotos 📷</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {fotos?.map(foto => (
          <div key={foto.id} className="rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="relative aspect-square">
              <Image src={foto.url} alt={foto.caption ?? 'Foto'} fill className="object-cover" />
            </div>
            {foto.caption && <p className="text-xs text-gray-600 p-2">{foto.caption}</p>}
            <p className="text-xs text-gray-400 px-2 pb-2">{new Date(foto.data).toLocaleDateString('pt-BR')}</p>
          </div>
        ))}
        {!fotos?.length && (
          <div className="col-span-3 text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📷</p>
            <p>Nenhuma foto disponível ainda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
