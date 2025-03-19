import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserRole = "general" | "hospital" | "admin" | null

interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  role: UserRole

  // Actions
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  switchRole: (role: UserRole) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      role: null,

      login: async (email: string, password: string) => {
        // 테스트 계정 확인
        if (email === "test@naver.com" && password === "test") {
          const user = {
            id: "1",
            email: "test@naver.com",
            name: "테스트 사용자",
            role: "general" as UserRole,
            avatar: "/placeholder.svg?height=40&width=40",
          }

          set({
            user,
            isAuthenticated: true,
            role: "general",
          })

          return true
        }

        // 병원 계정 확인
        if (email === "hospital@example.com" && password === "test") {
          const user = {
            id: "2",
            email: "hospital@example.com",
            name: "서울동물병원",
            role: "hospital" as UserRole,
            avatar: "/placeholder.svg?height=40&width=40",
          }

          set({
            user,
            isAuthenticated: true,
            role: "hospital",
          })

          return true
        }

        // 관리자 계정 확인
        if (email === "admin@example.com" && password === "admin") {
          const user = {
            id: "3",
            email: "admin@example.com",
            name: "관리자",
            role: "admin" as UserRole,
            avatar: "/placeholder.svg?height=40&width=40",
          }

          set({
            user,
            isAuthenticated: true,
            role: "admin",
          })

          return true
        }

        return false
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          role: null,
        })
      },

      switchRole: (role) => {
        set({ role })
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)

