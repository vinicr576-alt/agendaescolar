import type { Metadata, Viewport } from "next"
import { InstallBanner } from "@/components/InstallBanner"
import "./globals.css"

export const metadata: Metadata = {
  title: "Agenda Escolar",
  description: "Conectando escola, professores e famílias",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Agenda Escolar",
  },
}

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* PWA iOS */}
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Agenda Escolar" />
        {/* Splash screen iOS (opcional, gerar com ferramentas como pwa-asset-generator) */}
      </head>
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
        <InstallBanner />
      </body>
    </html>
  )
}
