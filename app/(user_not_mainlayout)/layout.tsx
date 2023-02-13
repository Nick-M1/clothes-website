import '../../styles/globals.css'
import {Montserrat} from "@next/font/google"


export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
}
