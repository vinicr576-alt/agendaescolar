'use client'

import { usePWA } from '@/hooks/usePWA'

export function InstallBanner() {
  const { isInstallable, isInstalled, install } = usePWA()

  if (isInstalled || !isInstallable) return null

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-6 lg:w-80 bg-blue-600 text-white rounded-2xl p-4 shadow-xl z-50 flex items-center gap-3">
      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
        📱
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">Instalar Agenda Escolar</p>
        <p className="text-xs text-blue-200">Acesse direto da tela inicial</p>
      </div>
      <button
        onClick={install}
        className="bg-white text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-50 flex-shrink-0"
      >
        Instalar
      </button>
    </div>
  )
}
