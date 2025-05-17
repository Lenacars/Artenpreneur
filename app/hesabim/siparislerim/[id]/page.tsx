"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { formatPrice } from "@/lib/coupons"
import { generateInvoicePDF } from "@/lib/invoice-generator"
import { toast } from "sonner"
import { FileText, ArrowLeft, Mail, Printer } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getInstructorImage } from "@/lib/getInstructorImage"
import { format } from "date-fns"
import { tr } from "date-fns/locale"

// Sipariş tipi
type Order = {
  id: string
  orderNumber: string
  orderDate: string
  paymentMethod: string
  status: "completed" | "processing" | "cancelled"
  total: number
  courses: Array<{
    id: string
    title: string
    instructor: string
    price: string
    originalPrice?: string
    image?: string
  }>
  customerInfo?: {
    name?: string
    email?: string
    address?: string
    city?: string
    country?: string
    postalCode?: string
  }
}

export default function OrderDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string

  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  // Siparişi yükle
  useEffect(() => {
    const loadOrder = () => {
      setIsLoading(true)

      try {
        // localStorage'dan siparişleri al
        const storedOrders = localStorage.getItem("orders")

        if (storedOrders) {
          const orders: Order[] = JSON.parse(storedOrders)
          const foundOrder = orders.find((o) => o.id === orderId)

          if (foundOrder) {
            setOrder(foundOrder)
          } else {
            toast.error("Sipariş bulunamadı.")
          }
        } else {
          toast.error("Sipariş bulunamadı.")
        }
      } catch (error) {
        console.error("Sipariş yüklenirken hata oluştu:", error)
        toast.error("Sipariş yüklenirken bir hata oluştu.")
      } finally {
        setIsLoading(false)
      }
    }

    if (orderId) {
      loadOrder()
    }
  }, [orderId])

  // Fatura oluştur ve indir
  const downloadInvoice = async () => {
    if (!order) return

    try {
      setIsGeneratingPdf(true)
      toast.loading("Fatura oluşturuluyor...")

      // PDF oluştur
      const doc = await generateInvoicePDF({
        orderNumber: order.orderNumber,
        orderDate: order.orderDate,
        orderTotal: order.total,
        paymentMethod: order.paymentMethod,
        courses: order.courses,
        customerInfo: order.customerInfo,
      })

      // PDF'i indir
      doc.save(`ARTENPRENEUR-Fatura-${order.orderNumber}.pdf`)

      toast.dismiss()
      toast.success("Fatura başarıyla oluşturuldu")
    } catch (error) {
      console.error("PDF oluşturma hatası:", error)
      toast.dismiss()
      toast.error("Fatura oluşturulurken bir hata oluştu")
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  // E-posta gönder
  const sendOrderEmail = async () => {
    if (!order) return

    try {
      setIsSendingEmail(true)
      toast.loading("Sipariş onay e-postası gönderiliyor...")

      // E-posta gönderme API'sine istek at
      const response = await fetch("/api/send-order-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderDetails: {
            orderNumber: order.orderNumber,
            orderDate: order.orderDate,
            orderTotal: order.total,
            paymentMethod: order.paymentMethod,
            courses: order.courses,
            customerInfo: order.customerInfo,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "E-posta gönderilirken bir hata oluştu")
      }

      toast.dismiss()
      toast.success("Sipariş onay e-postası gönderildi")
    } catch (error: any) {
      console.error("E-posta gönderme hatası:", error)
      toast.dismiss()
      toast.error(error.message || "E-posta gönderilirken bir hata oluştu")
    } finally {
      setIsSendingEmail(false)
    }
  }

  // Durum badge'i
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Tamamlandı</Badge>
      case "processing":
        return <Badge className="bg-blue-500">İşleniyor</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">İptal Edildi</Badge>
      default:
        return <Badge className="bg-gray-500">Bilinmiyor</Badge>
    }
  }

  // Tarih formatla
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "d MMMM yyyy, HH:mm", { locale: tr })
    } catch (e) {
      return dateString
    }
  }

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <Alert>
          <AlertDescription>
            Sipariş bulunamadı. Lütfen{" "}
            <Link href="/hesabim/siparislerim" className="underline">
              siparişlerim sayfasına
            </Link>{" "}
            dönün.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <Button
            variant="ghost"
            className="mb-2 -ml-4 flex items-center gap-1"
            onClick={() => router.push("/hesabim/siparislerim")}
          >
            <ArrowLeft className="h-4 w-4" />
            Siparişlerime Dön
          </Button>
          <h1 className="text-3xl font-bold">Sipariş Detayları</h1>
          <p className="text-gray-500 mt-1">Sipariş #{order.orderNumber}</p>
        </div>

        <div className="flex items-center">{getStatusBadge(order.status)}</div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Satın Alınan Kurslar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.courses.map((course) => (
                  <div key={course.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={course.image || getInstructorImage(course.instructor) || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.instructor}</p>
                    </div>
                    <div className="font-medium">
                      {course.originalPrice && course.originalPrice !== course.price ? (
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-500 line-through">{course.originalPrice}</span>
                          <span>{course.price}</span>
                        </div>
                      ) : (
                        <span>{course.price}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <span className="font-medium">Toplam</span>
              <span className="font-bold text-lg">{formatPrice(order.total)}</span>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sipariş Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Sipariş Tarihi</p>
                <p>{formatDate(order.orderDate)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Ödeme Yöntemi</p>
                <p>{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Müşteri</p>
                <p>{order.customerInfo?.name || "N/A"}</p>
                <p className="text-sm text-gray-500">{order.customerInfo?.email || "N/A"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>İşlemler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                className="w-full flex items-center gap-2 justify-center"
                onClick={downloadInvoice}
                disabled={isGeneratingPdf || order.status !== "completed"}
              >
                <FileText className="h-4 w-4" />
                Fatura İndir
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center gap-2 justify-center"
                onClick={sendOrderEmail}
                disabled={isSendingEmail || order.status !== "completed"}
              >
                <Mail className="h-4 w-4" />
                E-posta Gönder
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center gap-2 justify-center"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4" />
                Yazdır
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
