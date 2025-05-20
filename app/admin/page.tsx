"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
  if (status === "loading") return
  if (!session || !session.user || session.user.role !== "admin") {
    router.replace("/login")
  }
}, [session, status, router])

if (!session || !session.user || session.user.role !== "admin") {
  return <div>Yükleniyor...</div>
}

  return (
    <div className="flex min-h-screen">
      {/* Sol menü ileride eklenecek */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow-xl text-center">
            <h2 className="text-xl font-semibold mb-2">Kullanıcılar</h2>
            <p>Kullanıcı yönetimini buradan yapabilirsiniz.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-xl text-center">
            <h2 className="text-xl font-semibold mb-2">Videolar</h2>
            <p>Videoları ekle, sil, güncelle.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-xl text-center">
            <h2 className="text-xl font-semibold mb-2">Siparişler</h2>
            <p>Satın alma geçmişi burada yer alacak.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
