import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kasameri EOOD - Натурални Плодове и Зеленчуци от Ловешко',
  description: '12+ години традиция в отглеждането на качествени плодове и зеленчуци. Произвеждаме 100% натурален ябълков сок. Александрово, Ловеч, България.',
  keywords: 'ябълки, череши, круши, зеленчуци, ябълков сок, натурални продукти, Ловеч, Александрово, органични плодове',
  openGraph: {
    title: 'Kasameri EOOD - От градината в бутилката',
    description: '12+ години отглеждаме качествени плодове и зеленчуци в сърцето на Ловешко',
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
      <body>{children}</body>
    </html>
  )
}
