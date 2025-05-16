"use server"

import crypto from "crypto"

// PayTR API bilgileri - bu bilgileri .env dosyasında saklamalısınız
const MERCHANT_ID = process.env.PAYTR_MERCHANT_ID || ""
const MERCHANT_KEY = process.env.PAYTR_MERCHANT_KEY || ""
const MERCHANT_SALT = process.env.PAYTR_MERCHANT_SALT || ""
const PAYTR_API_URL = "https://www.paytr.com/odeme/api/get-token"

interface PaymentData {
  userId: string
  courseId: string
  amount: number
  userEmail: string
  userName: string
  userAddress: string
  userPhone: string
  basketItems: Array<{
    name: string
    price: number
    quantity: number
  }>
}

export async function createPaytrPayment(data: PaymentData) {
  try {
    // Sipariş numarası oluştur (benzersiz olmalı)
    const orderId = `ART-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    // Sepet içeriğini JSON formatına çevir
    const basketJson = JSON.stringify(data.basketItems)

    // Ödeme tutarını kuruş cinsinden hesapla (1 TL = 100 kuruş)
    const paymentAmount = Math.round(data.amount * 100)

    // Kullanıcı IP adresi (gerçek uygulamada istemciden alınmalı)
    const userIp = "127.0.0.1"

    // Ödeme sonrası yönlendirilecek URL'ler
    const merchantOkUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/odeme/tesekkurler?course=${data.courseId}`
    const merchantFailUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/odeme/${data.courseId}?error=payment_failed`

    // Ödeme bildirimlerinin gönderileceği URL (webhook)
    const notificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment-callback`

    // Ödeme için gerekli parametreler
    const params = {
      merchant_id: MERCHANT_ID,
      user_ip: userIp,
      merchant_oid: orderId,
      email: data.userEmail,
      payment_amount: paymentAmount,
      currency: "TL",
      user_basket: basketJson,
      no_installment: 0, // Taksit seçeneği (0: aktif, 1: deaktif)
      max_installment: 0, // Maksimum taksit sayısı
      test_mode: process.env.NODE_ENV === "development" ? 1 : 0, // Test modu
      merchant_ok_url: merchantOkUrl,
      merchant_fail_url: merchantFailUrl,
      user_name: data.userName,
      user_address: data.userAddress,
      user_phone: data.userPhone,
      timeout_limit: 30, // Dakika cinsinden ödeme süresi
      debug_on: process.env.NODE_ENV === "development" ? 1 : 0,
      non_3d: 0, // 3D Secure (0: aktif, 1: deaktif)
      lang: "tr",
    }

    // Hash oluşturma
    let hashStr = `${MERCHANT_ID}${userIp}${orderId}${data.userEmail}${paymentAmount}${basketJson}${params.no_installment}${params.max_installment}${params.currency}${params.test_mode}`
    hashStr = `${hashStr}${MERCHANT_SALT}`
    const paytrToken = crypto.createHmac("sha256", MERCHANT_KEY).update(hashStr).digest("base64")

    // PayTR API'sine istek gönderme
    const response = await fetch(PAYTR_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        ...params,
        paytr_token: paytrToken,
        debug_on: params.debug_on.toString(),
        test_mode: params.test_mode.toString(),
        non_3d: params.non_3d.toString(),
        no_installment: params.no_installment.toString(),
        max_installment: params.max_installment.toString(),
      }),
    })

    const result = await response.json()

    if (result.status === "success") {
      // Ödeme sayfasına yönlendirme için iframe URL'i
      return {
        success: true,
        iframeUrl: `https://www.paytr.com/odeme/guvenli/${result.token}`,
        token: result.token,
      }
    } else {
      console.error("PayTR error:", result.reason)
      return {
        success: false,
        error: result.reason,
      }
    }
  } catch (error) {
    console.error("PayTR payment error:", error)
    return {
      success: false,
      error: "Ödeme işlemi sırasında bir hata oluştu.",
    }
  }
}

// Ödeme sonucunu veritabanına kaydetmek için kullanılacak fonksiyon
export async function savePaymentResult(orderId: string, status: "success" | "failed", paymentDetails: any) {
  // Burada ödeme sonucunu veritabanına kaydedebilirsiniz
  // Örnek: await db.payments.create({ orderId, status, details: paymentDetails })

  console.log(`Payment ${status} for order ${orderId}`, paymentDetails)
  return { success: true }
}
