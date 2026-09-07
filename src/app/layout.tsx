import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'

export const metadata: Metadata = {
  title: 'SMP Integral Hidayatullah Kebumen',
  description: 'Website Resmi SMP Integral Hidayatullah Kebumen – Membentuk Generasi Berbasis Tauhid, Cerdas, dan Mandiri.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      </head>
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
