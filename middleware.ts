import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Önizleme modunda middleware kontrolünü atla
  const isPreviewMode =
    process.env.NODE_ENV === "development" ||
    req.headers.get("host")?.includes("localhost") ||
    req.headers.get("host")?.includes("vercel.app")

  if (isPreviewMode) {
    return res
  }

  try {
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Kullanıcı oturum açmamışsa login sayfasına yönlendir
    if (!session && req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Kullanıcı oturum açmış ama admin değilse ana sayfaya yönlendir
    if (session && req.nextUrl.pathname.startsWith("/admin")) {
      // Admin kullanıcısı olup olmadığını kontrol et
      const { data, error } = await supabase.from("admin_users").select().eq("id", session.user.id).single()

      if (error || !data) {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }
  } catch (error) {
    console.error("Middleware hatası:", error)
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
