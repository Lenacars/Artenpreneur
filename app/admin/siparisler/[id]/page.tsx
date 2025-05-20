"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, Mail, User, CreditCard, CheckCircle, XCircle, Clock } from "lucide-react"

export default function SiparisDetayPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)

        // Örnek sipariş verisi
        const dummyOrder = {
          id: params.id,
          user: {
            id: "1",
            name: "Selçuk Nazik",
            email: "selcuk.nazik@gmail.com",
            phone: "+90 555 123 4567",
          },
          items: [
            { id: 1, title: "Yaratıcı Girişimcilik", price: 750, instructor: "Begüm Meriç" },
            { id: 2, title: "Dijital Pazarlama", price: 500, instructor: "Ceylan Karaca" },
          ],
          payment: {
            method: "credit_card",
            cardLast4: "4242",
            status: "completed",
          },
          status: "completed",
          subtotal: 1250,
          discount: 0,
          total: 1250,
          created_at: "2023-05-19T15:53:19.23019+00",
          updated_at: "2023-05-19T15:53:19.23019+00",
          notes: "",
        }

        // Veri yükleme simülasyonu
        setTimeout(() => {
          setOrder(dummyOrder)
          setLoading(false)
        }, 1000)
      } catch (err) {
        console.error("Sipariş detayları getirilirken hata:", err)
        setError("Sipariş detayları yüklenirken bir hata oluştu.")
        setLoading(false)
      }
    }

    fetchOrder()
  }, [params.id])

  // Sipariş durumuna göre renk ve ikon belirleme
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "completed":
        return { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-5 w-5 text-green-600" /> }
      case "pending":
        return { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-5 w-5 text-yellow-600" /> }
      case "processing":
        return { color: "bg-blue-100 text-blue-800", icon: <Clock className="h-5 w-5 text-blue-600" /> }
      case "cancelled":
        return { color: "bg-red-100 text-red-800", icon: <XCircle className="h-5 w-5 text-red-600" /> }
      default:
        return { color: "bg-gray-100 text-gray-800", icon: <Clock className="h-5 w-5 text-gray-600" /> }
    }
  }

  // Ödeme yöntemi metni
  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "credit_card":
        return "Kredi Kartı"
      case "bank_transfer":
        return "Banka Havalesi"
      case "paypal":
        return "PayPal"
      default:
        return method
    }
  }

  // Sipariş durumu metni
  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Tamamlandı"
      case "pending":
        return "Beklemede"
      case "processing":
        return "İşleniyor"
      case "cancelled":
        return "İptal Edildi"
      default:
        return status
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-2" onClick={() => router.push("/admin/siparisler")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Geri
        </Button>
        <h1 className="text-2xl font-bold">Sipariş Detayları</h1>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-teal-500 border-r-transparent"></div>
          <p className="mt-2">Sipariş detayları yükleniyor...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : order ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sol Sütun - Sipariş Özeti */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Sipariş #{order.id}</CardTitle>
                  <CardDescription>
                    {new Date(order.created_at).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </CardDescription>
                </div>
                <div className={`px-3 py-1 rounded-full flex items-center ${getStatusInfo(order.status).color}`}>
                  {getStatusInfo(order.status).icon}
                  <span className="ml-1 text-sm font-medium">{getStatusText(order.status)}</span>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">Sipariş Edilen Eğitimler</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Eğitim</TableHead>
                      <TableHead>Eğitmen</TableHead>
                      <TableHead className="text-right">Fiyat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>{item.instructor}</TableCell>
                        <TableCell className="text-right">{item.price.toLocaleString("tr-TR")} ₺</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ara Toplam:</span>
                    <span>{order.subtotal.toLocaleString("tr-TR")} ₺</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">İndirim:</span>
                      <span>-{order.discount.toLocaleString("tr-TR")} ₺</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Toplam:</span>
                    <span>{order.total.toLocaleString("tr-TR")} ₺</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Fatura İndir
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Sağ Sütun - Müşteri ve Ödeme Bilgileri */}
          <div>
            {/* Müşteri Bilgileri */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Müşteri Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">{order.user.name}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <a href={`mailto:${order.user.email}`} className="text-blue-600 hover:underline">
                      {order.user.email}
                    </a>
                  </div>
                  {order.user.phone && (
                    <div className="flex items-center">
                      <svg className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>{order.user.phone}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Ödeme Bilgileri */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Ödeme Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ödeme Yöntemi:</span>
                    <span>{getPaymentMethodText(order.payment.method)}</span>
                  </div>
                  {order.payment.cardLast4 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kart:</span>
                      <span>**** **** **** {order.payment.cardLast4}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ödeme Durumu:</span>
                    <span className={order.payment.status === "completed" ? "text-green-600" : "text-yellow-600"}>
                      {order.payment.status === "completed" ? "Tamamlandı" : "Beklemede"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ödeme Tarihi:</span>
                    <span>{new Date(order.created_at).toLocaleDateString("tr-TR")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <p>Sipariş bulunamadı.</p>
        </div>
      )}
    </div>
  )
}
