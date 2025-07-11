"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn, getSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/hesabim"

  useEffect(() => {
    // Zaten giriş yapmış kullanıcıyı kontrol et
    const checkSession = async () => {
      try {
        const session = await getSession()
        if (session) {
          console.log("Zaten giriş yapmış, yönlendiriliyor:", callbackUrl)
          setRedirecting(true)
          // Force redirect with window.location
          setTimeout(() => {
            window.location.href = callbackUrl
          }, 100)
        }
      } catch (error) {
        console.error("Session kontrol hatası:", error)
      }
    }
    checkSession()
  }, [callbackUrl])

  const validateForm = () => {
    if (!email || !password) {
      setError("E-posta ve şifre alanları zorunludur.")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Geçerli bir e-posta adresi girin.")
      return false
    }

    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.")
      return false
    }

    return true
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    console.log("Giriş işlemi başlatılıyor:", { email })

    if (!validateForm()) {
      setLoading(false)
      return
    }

    try {
      // NextAuth credentials provider ile giriş yap
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      console.log("SignIn result:", result)

      if (result?.error) {
        console.error("Giriş hatası:", result.error)
        setError("E-posta veya şifre hatalı.")
        setLoading(false)
        return
      }

      if (result?.ok) {
        console.log("Giriş başarılı!")
        toast.success("Giriş başarılı! Yönlendiriliyor...")
        setRedirecting(true)

        // Force page reload and redirect
        setTimeout(() => {
          window.location.href = callbackUrl
        }, 1000)
      } else {
        setError("Giriş işlemi başarısız. Lütfen tekrar deneyin.")
        setLoading(false)
      }
    } catch (err: any) {
      console.error("Giriş hatası:", err)
      setError("Giriş yapılırken bir hata oluştu.")
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      console.log("Google ile giriş başlatılıyor...")
      await signIn("google", {
        callbackUrl,
        redirect: true,
      })
    } catch (err) {
      console.error("Google giriş hatası:", err)
      setError("Google ile giriş yapılırken hata oluştu.")
      setLoading(false)
    }
  }

  if (redirecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Yönlendiriliyor...</h2>
            <p className="text-slate-600">Hesap sayfanıza yönlendiriliyorsunuz.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <Image src="/logo.png" alt="Artenpreneur Logo" width={150} height={60} priority />
          </div>
          <div className="text-center">
            <CardTitle className="text-2xl font-bold">Üye Girişi</CardTitle>
            <CardDescription className="text-slate-600">
              Hesabınıza giriş yapın ve eğitimlerinize devam edin
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label htmlFor="remember" className="text-sm text-slate-600">
                  Beni hatırla
                </label>
              </div>
              <Link href="/sifremi-unuttum" className="text-sm text-teal-600 hover:text-teal-700">
                Şifremi unuttum?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={loading}>
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Giriş yapılıyor...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span>Giriş Yap</span>
                </div>
              )}
            </Button>
          </form>

          <div className="relative">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-2 text-xs text-slate-500">VEYA</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google ile Giriş
            </Button>
          </div>

          <div className="text-center text-sm text-slate-600">
            Hesabınız yok mu?{" "}
            <Link href="/kayit" className="text-teal-600 hover:text-teal-700 font-medium">
              Kayıt olun
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
