import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Champions Draft',
  description: 'Monte seu time dos sonhos com lendas da Champions League',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
