"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { createPaytrPayment } from "@/app/actions/payment-actions"
import Image from "next/image"
import { getCartItems, clearCart, type CartItem } from "@/lib/cart"
import { validateCoupon, calculateDiscount, parsePrice, formatPrice, type Coupon } from "@/lib/coupons"
import { toast } from "sonner"
import { Tag, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    // Sepeti localStorage'dan yükle
    const cartData = getCartItems()
    if (cartData.length > 0) {
      setCart(cartData)
    } else {
      router.push("/egitimler")
    }

    // Daha önce uygulanmış bir kupon var mı kontrol et
    const savedCoupon = localStorage.getItem("appliedCoupon")
    if (savedCoupon) {
      try {
        setAppliedCoupon(JSON.parse(savedCoupon))
      } catch (error) {
        console.error("Saved coupon parsing error:", error)
        localStorage.removeItem("appliedCoupon")
      }
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Kupon kodu uygulama
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Lütfen bir kupon kodu girin")
      return
    }

    setIsApplyingCoupon(true)

    // Gerçek uygulamada bu bir API çağrısı olabilir
    setTimeout(() => {
      const coupon = validateCoupon(couponCode)

      if (coupon) {
        setAppliedCoupon(coupon)
        localStorage.setItem("appliedCoupon", JSON.stringify(coupon))
        toast.success("Kupon kodu uygulandı", {
          description: `%${coupon.discountPercentage} indirim kazandınız!`,
        })
        setCouponCode("") // Kupon kodu alanını temizle
      } else {
        toast.error("Geçersiz kupon kodu", {
          description: "Girdiğiniz kupon kodu geçerli değil veya süresi dolmuş.",
        })
      }

      setIsApplyingCoupon(false)
    }, 500) // Simüle edilmiş gecikme
  }

  // Kupon kodunu kaldırma
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    localStorage.removeItem("appliedCoupon")
    toast.info("Kupon kodu kaldırıldı")
  }

  // Fiyat hesaplamaları
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = parsePrice(item.price)
      return total + price * item.quantity
    }, 0)
  }

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.18 // %18 KDV
  }

  const calculateDiscountAmount = (subtotal: number) => {
    return appliedCoupon ? calculateDiscount(subtotal, appliedCoupon.discountPercentage) : 0
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const tax = calculateTax(subtotal)
    const discount = calculateDiscountAmount(subtotal)
    return subtotal + tax - discount
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (paymentMethod === "credit_card") {
      try {
        // Sepet öğelerini PayTR formatına dönüştür
        const basketItems = cart.map((item) => ({
          name: item.title,
          price: parsePrice(item.price),
          quantity: item.quantity || 1,
        }))

        // Toplam tutarı hesapla (indirim dahil)
        const totalAmount = calculateTotal()

        // Ödeme verilerini hazırla
        const paymentData = {
          userId: "user123", // Gerçek uygulamada kullanıcı ID'si
          courseId: cart[0]?.id || "", // İlk kursun ID'si
          amount: totalAmount,
          userEmail: formData.email,
          userName: formData.name,
          userAddress: formData.address,
          userPhone: formData.phone,
          basketItems,
          couponCode: appliedCoupon?.code, // Kupon kodu bilgisini ekle
          discountAmount: calculateDiscountAmount(calculateSubtotal()), // İndirim miktarını ekle
        }

        const result = await createPaytrPayment(paymentData)

        if (result.success) {
          // PayTR iframe URL'sine yönlendir
          if (result.iframeUrl) {
            // Ödeme başarılı olduğunda sepeti temizle
            clearCart()
            localStorage.removeItem("appliedCoupon")

            // Ödeme yöntemini ve toplam tutarı localStorage'a kaydet (teşekkür sayfası için)
            localStorage.setItem("paymentMethod", "credit_card")
            localStorage.setItem("orderTotal", calculateTotal().toString())

            // Gerçek uygulamada PayTR iframe URL'sine yönlendirilir
            // Ancak bu örnekte doğrudan teşekkür sayfasına yönlendiriyoruz
            router.push("/odeme/tesekkurler")
          } else {
            toast.error(result.error || "Ödeme işlemi başlatılamadı.")
            setLoading(false)
          }
        } else {
          toast.error(result.error || "Ödeme işlemi başlatılamadı.")
          setLoading(false)
        }
      } catch (error) {
        console.error("Payment error:", error)
        toast.error("Ödeme işlemi sırasında bir hata oluştu.")
        setLoading(false)
      }
    } else if (paymentMethod === "bank_transfer") {
      // Havale/EFT için teşekkür sayfasına yönlendir
      localStorage.setItem("paymentMethod", "bank_transfer")
      localStorage.setItem("orderTotal", calculateTotal().toString())

      // Ödeme başarılı olduğunda sepeti temizle
      clearCart()
      localStorage.removeItem("appliedCoupon")

      router.push("/odeme/tesekkurler")
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Sepetiniz Boş</CardTitle>
            <CardDescription>Sepetinizde ürün bulunmamaktadır.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/egitimler")}>Kurslara Göz At</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const subtotal = calculateSubtotal()
  const tax = calculateTax(subtotal)
  const discountAmount = calculateDiscountAmount(subtotal)
  const total = calculateTotal()

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Ödeme Bilgileri</CardTitle>
              <CardDescription>Lütfen ödeme bilgilerinizi girin.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ad Soyad</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Ad Soyad"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="E-posta adresiniz"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Telefon numaranız"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Adres</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Adresiniz"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Kupon Kodu Bölümü */}
                  <div className="space-y-2">
                    <Label>Kupon Kodu</Label>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                        <div className="flex items-start gap-2">
                          <Tag className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">{appliedCoupon.code}</p>
                            <p className="text-sm text-gray-600">
                              {appliedCoupon.description} - %{appliedCoupon.discountPercentage} indirim
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={handleRemoveCoupon}
                          type="button"
                        >
                          Kaldır
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Kupon kodunuzu girin"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button onClick={handleApplyCoupon} disabled={isApplyingCoupon} type="button">
                          {isApplyingCoupon ? "Uygulanıyor..." : "Uygula"}
                        </Button>
                      </div>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <Label>Ödeme Yöntemi</Label>
                    <RadioGroup
                      defaultValue="credit_card"
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem value="credit_card" id="credit_card" />
                        <Label htmlFor="credit_card" className="flex-1 cursor-pointer">
                          Kredi Kartı / Banka Kartı
                        </Label>
                        <div className="flex space-x-1">
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                        <Label htmlFor="bank_transfer" className="flex-1 cursor-pointer">
                          Havale / EFT
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "credit_card" && (
                    <div className="border p-4 rounded-md bg-gray-50">
                      <div className="flex justify-center mb-4">
                        <Image src="/paytr-logo.png" alt="PayTR" width={120} height={40} />
                      </div>
                      <p className="text-sm text-center text-gray-600">
                        Kredi kartı bilgileriniz PayTR güvenli ödeme sayfasında alınacaktır.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "bank_transfer" && (
                    <div className="border p-4 rounded-md bg-gray-50">
                      <h3 className="font-medium mb-2">Banka Hesap Bilgileri</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Banka:</span> Örnek Banka
                        </p>
                        <p>
                          <span className="font-medium">Hesap Sahibi:</span> Artenpreneur Eğitim Ltd. Şti.
                        </p>
                        <p>
                          <span className="font-medium">IBAN:</span> TR00 0000 0000 0000 0000 0000 00
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          * Havale/EFT açıklama kısmına e-posta adresinizi yazmayı unutmayınız.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "İşleminiz Gerçekleştiriliyor..." : "Ödemeyi Tamamla"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Sipariş Özeti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-start py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.instructor}</p>

                      {/* Orijinal fiyat ve indirimli fiyat gösterimi */}
                      {item.originalPrice && item.originalPrice !== item.price && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-500 line-through text-sm">{item.originalPrice}</span>
                          <span className="text-sm">{item.price}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.price}</p>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                    </div>
                  </div>
                ))}

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between">
                    <span>Ara Toplam</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>KDV (%18)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>

                  {/* İndirim gösterimi */}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        İndirim ({appliedCoupon?.code})
                      </span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Toplam</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Bilgilendirme */}
                {discountAmount > 0 && (
                  <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      %{appliedCoupon?.discountPercentage} indirim uygulandı. {formatPrice(discountAmount)} tasarruf
                      ettiniz!
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
