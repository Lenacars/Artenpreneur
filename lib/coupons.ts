// Kupon kodları ve indirim oranları
export type Coupon = {
  code: string
  discountPercentage: number
  description: string
}

// Örnek kupon kodları - gerçek uygulamada veritabanından gelecek
export const availableCoupons: Coupon[] = [
  {
    code: "LETSLEARNNOW",
    discountPercentage: 15,
    description: "Udemy kuponu",
  },
  {
    code: "ARTENPRENEUR25",
    discountPercentage: 25,
    description: "Artenpreneur özel indirim",
  },
  {
    code: "SANAT2023",
    discountPercentage: 20,
    description: "Sanat etkinliği özel kuponu",
  },
]

// Kupon kodunu doğrulama ve indirim oranını döndürme
export const validateCoupon = (couponCode: string): Coupon | null => {
  const coupon = availableCoupons.find((coupon) => coupon.code.toLowerCase() === couponCode.toLowerCase())
  return coupon || null
}

// Fiyattan indirim miktarını hesaplama
export const calculateDiscount = (price: number, discountPercentage: number): number => {
  return (price * discountPercentage) / 100
}

// Fiyatı sayıya dönüştürme (₺90,00 -> 90.00)
export const parsePrice = (priceString: string): number => {
  return Number.parseFloat(priceString.replace("₺", "").replace(",", ".")) || 0
}

// Sayıyı fiyat formatına dönüştürme (90.00 -> ₺90,00)
export const formatPrice = (price: number): string => {
  return price.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
  })
}
