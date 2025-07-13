'use client'

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Users, BookOpen, ShoppingCart, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { parseJwt } from "@/utils/jwt"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Giriş yapan kullanıcıyı localStorage’daki JWT'den oku
    const token = localStorage.getItem("token")
    if (token) {
      const payload = parseJwt(token)
      setUser(payload)
    } else {
      setUser(null)
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("token")
    window.location.href = "/giris"
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Kullanıcılar", href: "/admin/kullanicilar", icon: Users },
    { name: "Eğitimler", href: "/admin/egitimler", icon: BookOpen },
    { name: "Siparişler", href: "/admin/siparisler", icon: ShoppingCart },
    { name: "Ayarlar", href: "/admin/ayarlar", icon: Settings },
  ]

  // Eğer user yoksa ve admin routes’ta ise girişe yönlendir (güvenlik için)
  useEffect(() => {
    if (!user && typeof window !== "undefined" && pathname.startsWith("/admin")) {
      window.location.href = "/giris"
    }
  }, [user, pathname])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobil Menü Butonu */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold">Admin Panel</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    isActive ? "bg-teal-50 text-teal-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t">
            {user && (
              <div className="mb-4 px-3 py-2">
                <p className="text-sm text-gray-500">Giriş yapan:</p>
                <p className="text-sm font-medium truncate">{user.email || user.username}</p>
                {/* Kullanıcı objesinde email veya username varsa göster */}
              </div>
            )}
            <Button variant="outline" className="w-full justify-start" onClick={handleSignOut}>
              <LogOut size={18} className="mr-2" />
              Çıkış Yap
            </Button>
          </div>
        </div>
      </aside>

      {/* Ana İçerik */}
      <main className={`lg:ml-64 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "ml-64" : "ml-0"}`}>
        {children}
      </main>

      {/* Mobil Menü Arkaplanı */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}
