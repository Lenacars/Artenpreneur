"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
import { Home, Users, BookOpen, ShoppingCart, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Supabase bilgilerinizi buraya ekleyin
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  // Supabase istemcisini oluştur
  const supabase = createClient(supabaseUrl, supabaseKey)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        setUser(session.user)
      }
    }

    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Kullanıcılar", href: "/admin/kullanicilar", icon: Users },
    { name: "Eğitimler", href: "/admin/egitimler", icon: BookOpen },
    { name: "Siparişler", href: "/admin/siparisler", icon: ShoppingCart },
    { name: "Ayarlar", href: "/admin/ayarlar", icon: Settings },
  ]

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
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out`}
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
                <p className="text-sm font-medium truncate">{user.email}</p>
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
