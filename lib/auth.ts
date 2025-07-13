import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email ve şifre gerekli")
        }

        // Burada kendi backend API'na fetch ile istek atıyoruz:
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.message || "Giriş başarısız.")
          }

          // Beklenen format:
          // { id: string, email: string, name: string, image?: string, role: string }
          const user = await res.json()

          // Kullanıcı dönerse:
          if (user && user.id) {
            return user
          }
          return null
        } catch (error) {
          throw new Error("Giriş sırasında hata oluştu.")
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // İlk login'de user gelir, sonraki refreshlerde sadece token olur
      if (user) {
        token.id = user.id
        token.role = user.role
        token.email = user.email
        token.name = user.name
        token.image = user.image
      }
      return token
    },
    async session({ session, token }) {
      // Session'a kullanıcı bilgilerini ekle
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          image: token.image as string | undefined,
          role: token.role as string,
        }
      }
      return session
    },
  },
  pages: {
    signIn: "/giris",
    error: "/giris",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-key",
}
