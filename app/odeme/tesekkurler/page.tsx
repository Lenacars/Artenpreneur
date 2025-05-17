"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, BookOpen, ArrowRight, Printer, Mail, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/lib/coupons"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getInstructorImage } from "@/lib/getInstructorImage"
import { toast } from "sonner"
import Confetti from "react-confetti"
import { generateInvoicePDF } from "@/lib/invoice-generator"

export default function ThankYouPage() {
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState<{
    paymentMethod?: string
    orderTotal?: number
    orderDate?: string
    orderNumber?: string
    courses?: Array<{
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
  }>({})

  const [showConfetti, setShowConfetti] = useState(true)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Pencere boyutlarını al
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Konfeti efekti için
  useEffect(() => {
    if (showConfetti) {
      // 3 saniye sonra konfeti durumunu kapat
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  useEffect(() => {
    // localStorage'dan sipariş bilgilerini al
    const storedOrder = localStorage.getItem("lastOrder")
    if (storedOrder) {
      try {
        const parsedOrder = JSON.parse(storedOrder)
        setOrderDetails(parsedOrder)

        // Sipariş bilgileri yüklendikten sonra otomatik e-posta gönder
        if (parsedOrder.orderNumber && parsedOrder.customerInfo?.email) {
          sendOrderEmail(parsedOrder)
        }
      } catch (e) {
        console.error("Sipariş bilgileri çözümlenemedi:", e)
      }
    }
  }, [])

  const sendOrderEmail = async (order = orderDetails) => {
    // E-posta zaten gönderildiyse tekrar gönderme
    if (emailSent || isSendingEmail) return

    try {
      setIsSendingEmail(true)
      toast.loading("Sipariş onay e-postası gönderiliyor...")

      // E-posta gönderme API'sine istek at
      const response = await fetch("/api/send-order-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderDetails: order }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "E-posta gönderilirken bir hata oluştu")
      }

      setEmailSent(true)
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

  const generatePDF = async () => {
    try {
      setIsGeneratingPdf(true)
      toast.loading("Fatura oluşturuluyor...")

      // PDF oluştur
      const doc = await generateInvoicePDF(orderDetails)

      // PDF'i indir
      doc.save(`ARTENPRENEUR-Fatura-${orderDetails.orderNumber}.pdf`)

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

  if (!orderDetails.orderNumber) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <Alert>
          <AlertDescription>
            Sipariş bilgisi bulunamadı. Lütfen{" "}
            <Link href="/sepet" className="underline">
              sepet sayfasına
            </Link>{" "}
            dönün.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      {showConfetti && dimensions.width > 0 && (
        <Confetti width={dimensions.width} height={dimensions.height} recycle={false} numberOfPieces={500} />
      )}

      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Teşekkürler!</h1>
        <p className="text-gray-600 max-w-md">Siparişiniz başarıyla tamamlandı. Kurslarınıza hemen erişebilirsiniz.</p>

        {emailSent && (
          <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            <span>Sipariş onay e-postası ve fatura gönderildi</span>
          </div>
        )}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sipariş Detayları</CardTitle>
          <CardDescription>Sipariş #{orderDetails.orderNumber}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Sipariş Tarihi</p>
                <p>{orderDetails.orderDate || new Date().toLocaleDateString("tr-TR")}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Ödeme Yöntemi</p>
                <p>{orderDetails.paymentMethod || "Kredi Kartı"}</p>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium text-gray-500 mb-3">Satın Alınan Kurslar</p>
              <div className="space-y-4">
                {orderDetails.courses?.map((course) => (
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
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="font-medium">Toplam</span>
              <span className="font-bold text-lg">{formatPrice(orderDetails.orderTotal || 0)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Button variant="outline" className="flex gap-2" asChild>
          <Link href="/kurslarim">
            <BookOpen className="h-4 w-4" />
            Kurslarıma Git
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>

        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            className="flex gap-2 items-center justify-center"
            onClick={generatePDF}
            disabled={isGeneratingPdf}
          >
            <FileText className="h-4 w-4" />
            Fatura
          </Button>

          <Button variant="outline" className="flex gap-2 items-center justify-center" onClick={() => window.print()}>
            <Printer className="h-4 w-4" />
            Yazdır
          </Button>

          <Button
            variant={emailSent ? "outline" : "default"}
            className="flex gap-2 items-center justify-center"
            onClick={() => sendOrderEmail()}
            disabled={isSendingEmail || emailSent}
          >
            <Mail className="h-4 w-4" />
            {emailSent ? "Gönderildi" : "E-posta"}
          </Button>
        </div>
      </div>
    </div>
  )
}
