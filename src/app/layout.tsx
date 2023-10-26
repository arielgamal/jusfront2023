import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import './globals.css'
import Header from './components/header'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jusbrasil',
  description: 'Consulta Processual',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
