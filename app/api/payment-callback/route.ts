import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { savePaymentResult } from "@/app/actions/payment-actions"

// PayTR API bilgileri - bu bilgileri .env dosyasında saklamalısınız
const MERCHANT_KEY = process.env.PAYTR_MERCHANT_KEY || ""
const MERCHANT_SALT = process.env.PAYTR_MERCHANT_SALT || ""

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // PayTR'den gelen verileri al
    const merchantOid = formData.get("merchant_oid") as string
    const status = formData.get("status") as string
    const totalAmount = formData.get("total_amount") as string
    const hash = formData.get("hash") as string

    // Hash doğrulama
    const hashStr = `${merchantOid}${MERCHANT_SALT}${status}${totalAmount}`
    const calculatedHash = crypto.createHmac("sha256", MERCHANT_KEY).update(hashStr).digest("base64")

    // Hash doğrulama başarısızsa işlemi reddet
    if (hash !== calculatedHash) {
      console.error("Invalid hash in payment callback")
      return NextResponse.json({ status: "error", message: "Invalid hash" }, { status: 403 })
    }

    // Ödeme durumunu kontrol et
    if (status === "success") {
      // Başarılı ödeme işlemini kaydet
      await savePaymentResult(merchantOid, "success", {
        totalAmount: Number.parseFloat(totalAmount) / 100, // Kuruş -> TL dönüşümü
        paymentDate: new Date().toISOString(),
      })

      // PayTR'ye başarılı yanıt gönder
      return NextResponse.json({ status: "OK" })
    } else {
      // Başarısız ödeme işlemini kaydet
      await savePaymentResult(merchantOid, "failed", {
        totalAmount: Number.parseFloat(totalAmount) / 100,
        paymentDate: new Date().toISOString(),
        errorMessage: "Payment failed",
      })

      // PayTR'ye başarılı yanıt gönder (işlemi aldığımızı bildirmek için)
      return NextResponse.json({ status: "OK" })
    }
  } catch (error) {
    console.error("Error processing payment callback:", error)
    return NextResponse.json({ status: "error", message: "Internal server error" }, { status: 500 })
  }
}
