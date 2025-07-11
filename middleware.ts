import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  // NEXTAUTH_SECRET'ı environment variable'dan al
  const secret = process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-only"

  try {
    const token = await getToken({ req, secret })

    console.log("Middleware - Path:", req.nextUrl.pathname, "Token:", !!token)

    // Admin sayfaları için kontrol
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!token) {
        console.log("Admin sayfası - token yok, login'e yönlendiriliyor")
        return NextResponse.redirect(new URL("/giris", req.url))
      }
    }

    // Hesabım sayfaları için kontrol
    if (req.nextUrl.pathname.startsWith("/hesabim")) {
      if (!token) {
        console.log("Hesabım sayfası - token yok, giriş'e yönlendiriliyor")
        return NextResponse.redirect(new URL("/giris?callbackUrl=" + encodeURIComponent(req.url), req.url))
      }
    }

    // Giriş yapmış kullanıcıları giriş/kayıt sayfalarından yönlendir
    if (token && (req.nextUrl.pathname === "/giris" || req.nextUrl.pathname === "/kayit")) {
      console.log("Token var, hesabım'a yönlendiriliyor")
      return NextResponse.redirect(new URL("/hesabim", req.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: ["/admin/:path*", "/hesabim/:path*", "/giris", "/kayit"],
}
