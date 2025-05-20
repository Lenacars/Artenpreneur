import { type NextRequest, NextResponse } from "next/server"
import { sendOrderConfirmationEmail } from "@/lib/email"
import type { OrderDetails } from "@/lib/invoice-generator"

export async function POST(request: NextRequest) {
  try {
    // İstek gövdesini al
    const body = await request.json()
    const orderDetails: OrderDetails = body.orderDetails

    // Sipariş detaylarını kontrol et
    if (!orderDetails || !orderDetails.orderNumber) {
      return NextResponse.json({ error: "Geçersiz sipariş detayları" }, { status: 400 })
    }

    // E-posta gönder
    const result = await sendOrderConfirmationEmail(orderDetails)

    return NextResponse.json({ success: true, result })
  } catch (error: any) {
    console.error("Sipariş e-postası gönderme hatası:", error)

    return NextResponse.json({ error: error.message || "E-posta gönderilirken bir hata oluştu" }, { status: 500 })
  }
}
