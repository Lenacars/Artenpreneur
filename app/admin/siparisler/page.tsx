"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function SiparislerPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Örnek sipariş verileri
    const dummyOrders = [
      {
        id: "1",
        user_email: "selcuk.nazik@gmail.com",
        user_name: "Selçuk Nazik",
        total_amount: 1250,
        status: "completed",
        created_at: "2023-05-19T15:53:19.23019+00",
        items: [
          { id: 1, title: "Yaratıcı Girişimcilik", price: 750 },
          { id: 2, title: "Dijital Pazarlama", price: 500 },
        ],
      },
      {
        id: "2",
        user_email: "ornek@kullanici.com",
        user_name: "Örnek Kullanıcı",
        total_amount: 500,
        status: "pending",
        created_at: "2023-05-01T10:30:00.000Z",
        items: [{ id: 3, title: "İletişim 101", price: 500 }],
      },
      {
        id: "3",
        user_email: "test@kullanici.com",
        user_name: "Test Kullanıcı",
        total_amount: 1500,
        status: "cancelled",
        created_at: "2023-04-15T14:20:00.000Z",
        items: [{ id: 4, title: "Film Yapım", price: 1500 }],
      },
      {
        id: "4",
        user_email: "ahmet.yilmaz@example.com",
        user_name: "Ahmet Yılmaz",
        total_amount: 2000,
        status: "completed",
        created_at: "2023-03-10T09:15:00.000Z",
        items: [
          { id: 5, title: "Müzik Endüstrisi", price: 750 },
          { id: 6, title: "Telif Hakları", price: 1250 },
        ],
      },
      {
        id: "5",
        user_email: "ayse.demir@example.com",
        user_name: "Ayşe Demir",
        total_amount: 750,
        status: "processing",
        created_at: "2023-02-20T11:45:00.000Z",
        items: [{ id: 7, title: "Görsel Sanatlar", price: 750 }],
      },
    ]

    // Veri yükleme simülasyonu
    setTimeout(() => {
      setOrders(dummyOrders)
      setLoading(false)
    }, 1000)
  }, [])

  // Sipariş durumuna göre renk ve metin belirleme
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return { color: "bg-green-100 text-green-800", text: "Tamamlandı" }
      case "pending":
        return { color: "bg-yellow-100 text-yellow-800", text: "Beklemede" }
      case "processing":
        return { color: "bg-blue-100 text-blue-800", text: "İşleniyor" }
      case "cancelled":
        return { color: "bg-red-100 text-red-800", text: "İptal Edildi" }
      default:
        return { color: "bg-gray-100 text-gray-800", text: status }
    }
  }

  // Arama filtreleme fonksiyonu
  const filteredOrders = orders.filter(
    (order) =>
      order.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id?.toString().includes(searchTerm) ||
      order.status?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sipariş Yönetimi</h1>
      </div>

      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Sipariş ara..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-teal-500 border-r-transparent"></div>
          <p className="mt-2">Siparişler yükleniyor...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sipariş ID</TableHead>
                <TableHead>Müşteri</TableHead>
                <TableHead>Tutar</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const statusBadge = getStatusBadge(order.status)
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div>{order.user_name}</div>
                          <div className="text-sm text-gray-500">{order.user_email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{order.total_amount.toLocaleString("tr-TR")} ₺</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${statusBadge.color}`}>
                          {statusBadge.text}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(order.created_at).toLocaleDateString("tr-TR")}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Detaylar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                            İptal Et
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    {searchTerm ? "Arama kriterlerine uygun sipariş bulunamadı." : "Henüz sipariş bulunmuyor."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
