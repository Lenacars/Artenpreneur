import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { createClient } from "@supabase/supabase-js"

// Supabase client for authentication
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let supabase: any = null

if (supabaseUrl && supabaseServiceKey) {
  supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

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

        if (!supabase) {
          console.error("Supabase client not initialized")
          throw new Error("Veritabanı bağlantısı kurulamadı")
        }

        try {
          // Sign in with Supabase
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          })

          if (error) {
            console.error("Supabase auth error:", error)
            throw new Error("Giriş başarısız")
          }

          if (!data.user) {
            throw new Error("Kullanıcı bulunamadı")
          }

          console.log("Returning user:", data.user)

          // Get user profile from Supabase users table
          const { data: profile, error: profileError } = await supabase
            .from("users")
            .select("*")
            .eq("id", data.user.id)
            .single()

          if (profileError && profileError.code !== "PGRST116") {
            console.error("Profile fetch error:", profileError)
          }

          // Get user role from user_roles table
          const { data: roleData, error: roleError } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", data.user.id)
            .single()

          if (roleError && roleError.code !== "PGRST116") {
            console.error("Role fetch error:", roleError)
          }

          return {
            id: data.user.id,
            email: data.user.email!,
            name: profile?.full_name || data.user.email!.split("@")[0],
            image: profile?.avatar_url || null,
            role: roleData?.role || "user",
          }
        } catch (error) {
          console.error("Auth error:", error)
          throw error
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
      if (user) {
        token.role = user.role
      }

      // Fetch updated user role on each token refresh
      if (token.sub && supabase) {
        try {
          const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", token.sub).single()

          if (roleData) {
            token.role = roleData.role
          }
        } catch (error) {
          console.error("Error fetching user role:", error)
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
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
