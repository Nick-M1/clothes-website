import '../styles/globals.css'
import {Montserrat} from "next/font/google"
import {SessionProvider} from "../components/auth/SessionProvider";
import {getServerSession} from "next-auth";
import {authOptions} from "../pages/api/auth/[...nextauth]";
import {Metadata} from "next";

const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-montserrat'
})

export const metadata: Metadata = {
    title: {
        default: 'Shopping Website',
        template: '%s | Shopping Website',
    },
    description: 'Shopping Website, for users to purchase clothes online',
    keywords: ['Next.js', 'React', 'JavaScript', 'Clothes', 'Shopping', 'Online'],
    authors: [{name: 'Nick'}],
    icons: '/brand-logo.png'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    return (
        <html lang="en" className='scrollbar'>
            <body className={`${montserrat.className} h-full`}>
                <SessionProvider session={session}>
                    {children}
                </SessionProvider>
            </body>
        </html>
    )
}
