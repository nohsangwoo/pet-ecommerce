import NextAuth from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Hospital Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is where you would validate the hospital credentials
        // For demo purposes, we're using a simple check
        if (credentials?.email === "hospital@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            name: "Seoul Vet Hospital",
            email: "hospital@example.com",
            role: "hospital",
          }
        }

        // Admin login
        if (credentials?.email === "admin@example.com" && credentials?.password === "admin") {
          return {
            id: "2",
            name: "System Admin",
            email: "admin@example.com",
            role: "admin",
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})

export { handler as GET, handler as POST }

