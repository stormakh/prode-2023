import "./globals.css"
import type { Metadata } from "next"
import { Barlow } from "next/font/google"
import AuthContextProvider, { AuthContext } from "./contexts/AuthContext"
import HistoryContextProvider from "./contexts/HistoryContext"

const barlow = Barlow({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "ProdeArg",
  description: "Prode Arg 2023",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <HistoryContextProvider>
        <body className={barlow.className}>{children}</body>
        </HistoryContextProvider>
      </AuthContextProvider>
    </html>
  )
}
