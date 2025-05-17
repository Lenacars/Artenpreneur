"use server"

import crypto from "crypto"

interface PaymentData {
  userId: string
  courseId: string
  amount: number
  userEmail: string
  userName: string
  userAddress: string
  userPhone: string
  basketItems: {
    name: string
    price: number
    quantity: number
  }[]
}

export async function createPaytrPayment(data: PaymentData) {
  try {
    // PayTR API bilgileri
    const merchant_id = process.env.PAYTR_MERCHANT_ID || ""
    const merchant_key = process.env.PAYTR_MERCHANT_KEY || ""
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT || ""
    const merchant_ok_url = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/odeme/tesekkurler`
    const merchant_fail_url = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/odeme/checkout`

    // Sipariş bilgileri
    const user_ip = "127.0.0.1" // Gerçek uygulamada kullanıcının IP'si alınmalı
    const merchant_oid = `SP${Date.now()}` // Benzersiz sipariş numarası
    const email = data.userEmail
    const payment_amount = Math.round(data.amount * 100) // Kuruş cinsinden (örn: 100.50 TL için 10050)
    const currency = "TL"
    const test_mode = "1" // Test modu (1: açık, 0: kapalı)
    const user_name = data.userName
    const user_address = data.userAddress
    const user_phone = data.userPhone
    const timeout_limit = "30" // 30 dakika
    const debug_on = "1" // Debug modu (1: açık, 0: kapalı)
    const no_installment = "0" // Taksit seçeneği (0: aktif, 1: deaktif)
    const max_installment = "0" // Maksimum taksit sayısı

    // Sepet bilgileri
    const user_basket = JSON.stringify(
      data.basketItems.map((item) => [item.name, item.price.toFixed(2), item.quantity]),
    )

    // Hash oluşturma
    const hashStr = `${merchant_id}${user_ip}${merchant_oid}${email}${payment_amount}${user_basket}${no_installment}${max_installment}${currency}${test_mode}`
    const paytr_token = crypto
      .createHmac("sha256", merchant_key)
      .update(hashStr + merchant_salt)
      .digest("base64")

    // PayTR'ye gönderilecek form verileri
    const formData = new URLSearchParams()
    formData.append("merchant_id", merchant_id)
    formData.append("user_ip", user_ip)
    formData.append("merchant_oid", merchant_oid)
    formData.append("email", email)
    formData.append("payment_amount", payment_amount.toString())
    formData.append("paytr_token", paytr_token)
    formData.append("user_basket", user_basket)
    formData.append("debug_on", debug_on)
    formData.append("no_installment", no_installment)
    formData.append("max_installment", max_installment)
    formData.append("user_name", user_name)
    formData.append("user_address", user_address)
    formData.append("user_phone", user_phone)
    formData.append("merchant_ok_url", merchant_ok_url)
    formData.append("merchant_fail_url", merchant_fail_url)
    formData.append("timeout_limit", timeout_limit)
    formData.append("currency", currency)
    formData.append("test_mode", test_mode)

    // PayTR API'ye istek gönderme
    const response = await fetch("https://www.paytr.com/odeme/api/get-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })

    const result = await response.json()

    if (result.status === "success") {
      return {
        success: true,
        iframeUrl: `https://www.paytr.com/odeme/guvenli/${result.token}`,
        orderId: merchant_oid,
      }
    } else {
      console.error("PayTR error:", result.reason)
      return {
        success: false,
        error: result.reason || "Ödeme işlemi başlatılamadı.",
      }
    }
  } catch (error) {
    console.error("Payment action error:", error)
    return {
      success: false,
      error: "Ödeme işlemi sırasında bir hata oluştu.",
    }
  }
}

export async function savePaymentResult(orderId: string, status: "success" | "failed", details: any) {
  // Burada ödeme sonucunu veritabanına kaydedebilirsiniz
  console.log(`Payment ${status} for order ${orderId}`, details)
  return { success: true }
}
