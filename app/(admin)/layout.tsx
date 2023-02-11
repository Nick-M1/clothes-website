import '../../styles/globals.css'
import {Montserrat} from "@next/font/google"

const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-montserrat'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full bg-gray-50 scrollbar'>
      <head />
      <body className={`${montserrat.className} h-full`}>{children}</body>
    </html>
  )
}
