"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useAuthStore } from "@/store/auth-store"

interface AuthContextType {
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  user: any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { login, logout, isAuthenticated, user } = useAuthStore()

  return <AuthContext.Provider value={{ login, logout, isAuthenticated, user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

