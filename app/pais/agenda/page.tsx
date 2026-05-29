import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const tipoColors: Record<string, string> = {
  prova: 'bg-red-100 text-red-700',
  trabalho: 'bg-orange-100 text-orange-700',
  reuniao: 'bg-blue-100 text-blue-700',
  excursao: 'bg-green-100 text-green-700',
  feriado: 'bg-purple-100 text-purple-700',
  outro: 'bg-gray-100 text-gray-600',
}

export default async function PaisAgendaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('escola_id').eq('id', user!.id).single()

  const { data: eventos } = await supabase
    .from('eventos')
    .select('*')
    .eq('escola_id', profile?.escola_id)
    .gte('data_inicio', new Date().toISOString())
    .order('data_inicio')
    .limit(20)

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Agenda 📅</h1>
      <div className="space-y-3">
        {eventos?.map(evento => (
          <div key={evento.id} className="bg-white rounded-2xl p-5 shadow-sm flex gap-4">
            <div className="bg-blue-50 rounded-xl p-3 text-center min-w-[60px]">
              <p className="text-xs text-blue-400 font-medium uppercase">
                {format(new Date(evento.data_inicio), 'MMM', { locale: ptBR })}
              </p>
              <p className="text-2xl font-bold text-blue-700">
                {format(new Date(evento.data_inicio), 'd')}
              </p>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-800">{evento.titulo}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tipoColors[evento.tipo] ?? tipoColors.outro}`}>
                  {evento.tipo}
                </span>
              </div>
              {evento.descricao && <p className="text-sm text-gray-600 mt-1">{evento.descricao}</p>}
              <div className="flex gap-4 mt-2 text-xs text-gray-400">
                <span>⏰ {format(new Date(evento.data_inicio), 'HH:mm')}</span>
                {evento.local && <span>📍 {evento.local}</span>}
              </div>
            </div>
          </div>
        ))}
        {!eventos?.length && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📅</p>
            <p>Nenhum evento próximo.</p>
          </div>
        )}
      </div>
    </div>
  )
}
