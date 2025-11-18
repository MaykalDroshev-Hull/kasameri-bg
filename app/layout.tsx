import './globals.css'
import type { Metadata } from 'next'
import { LanguageProvider } from '@/contexts/LanguageContext'
import CookieConsent from '@/components/CookieConsent'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: 'КАСАМЕРИ ЕООД - Собствено производство в село Александрово',
  description: 'Свежи ябълки, студено пресован сок и сезонни продукти директно от нашите градини в Александрово. Поръчайте лесно – доставяме до Вас.',
  keywords: 'ябълки, череши, круши, зеленчуци, ябълков сок, натурални продукти, Ловеч, Александрово, органични плодове',
  openGraph: {
    title: 'КАСАМЕРИ ЕООД - Собствено производство в село Александрово',
    description: 'Свежи ябълки, студено пресован сок и сезонни продукти директно от нашите градини в Александрово. Поръчайте лесно – доставяме до Вас.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body suppressHydrationWarning={true}>
        <LanguageProvider>
          {children}
          <CookieConsent />
          <Analytics />
          <SpeedInsights />
        </LanguageProvider>
      </body>
    </html>
  )
}
