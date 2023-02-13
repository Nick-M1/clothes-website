import '../styles/globals.css'
import {Montserrat} from "@next/font/google"
import {SessionProvider} from "../components/auth/SessionProvider";
import {getServerSession} from "next-auth";
import {authOptions} from "../pages/api/auth/[...nextauth]";
import SigninPage from "../components/auth/SigninPage";

const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-montserrat'
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    // const session = await getServerSession(authOptions)
    // session returns name, email and profile pic img

    return (
        <html lang="en" className='scrollbar'>
            <body className={`${montserrat.className} h-full`}>
                {/*<SessionProvider session={session}>*/}
                {/*    {*/}
                {/*        !session*/}
                {/*            ? <SigninPage/>*/}
                {/*            : children*/}
                {/*    }*/}
                {/*</SessionProvider>*/}
                {children}
            </body>
        </html>
    )
}


// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//
//     const session = await getServerSession(authOptions)
//
//     return (
//         <html lang="en" className='h-full bg-gray-50 scrollbar'>
//             <body className={`${montserrat.className} h-full`}>
//                 <SessionProvider session={session}>
//                     {children}
//                 </SessionProvider>
//             </body>
//         </html>
//     )
// }
