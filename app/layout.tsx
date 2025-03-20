import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">

      <body className={`${inter.className} flex flex-col min-h-screen items-center justify-center`}>
        <div className="w-full fixed top-0 left-0 z-50 flex justify-center">
          <div className="container">
            <MainNav />
          </div>
        </div>
        <div className="flex-1 container px-4 md:px-6 py-8 mt-16">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  )
}



import './globals.css'
import { MainNav } from "@/components/main-nav"

export const metadata = {
      generator: 'ludgi'
    };
