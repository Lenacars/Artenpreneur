"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2, Tag, AlertCircle } from "lucide-react"
import { getCartItems, updateCartItemQuantity, removeFromCart, clearCart, type CartItem, cartEmitter } from "@/lib/cart" // cartEmitter eklendi
import { validateCoupon, calculateDiscount, parsePrice, formatPrice, type Coupon } from "@/lib/coupons"
import { getInstructorImage } from "@/lib/course-data" // getInstructorImage'ın lib/course-data'dan geldiğini varsayıyorum
import { toast } from "sonner"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  // Sepeti localStorage'dan yükle
  useEffect(() => {
    const items = getCartItems()
    setCartItems(items)
    setLoading(false)

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

    // Sepet değişikliklerini dinle
    const handleCartChanged = () => {
      setCartItems(getCartItems());
    };
    cartEmitter.on("cartChanged", handleCartChanged);
    return () => {
      cartEmitter.off("cartChanged", handleCartChanged);
    };

  }, [])

  // Miktar güncelleme
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    const updatedItems = updateCartItemQuantity(itemId, newQuantity)
    setCartItems(updatedItems)
  }

  // Sepetten ürün kaldırma
  const handleRemoveItem = (itemId: string) => {
    const updatedItems = removeFromCart(itemId)
    setCartItems(updatedItems)
    toast.success("Ürün sepetten kaldırıldı")
  }

  // Sepeti temizleme
  const handleClearCart = () => {
    clearCart()
    setCartItems([])
    setAppliedCoupon(null)
    localStorage.removeItem("appliedCoupon")
    toast.success("Sepet temizlendi")
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
    return cartItems.reduce((total, item) => {
      // item.price zaten bir number olduğu için parsePrice çağırmaya gerek yok
      const price = item.price // <-- Düzeltme burada!
      return total + price * item.quantity
    }, 0)
  }

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.2 // %20 KDV
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

  // Ödeme sayfasına yönlendirme
  const handleCheckout = () => {
    router.push("/odeme/checkout")
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Sepetiniz Yükleniyor...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Sepetiniz Boş</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">Sepetinizde ürün bulunmamaktadır.</p>
          </CardContent>
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
      <h1 className="text-3xl font-bold mb-6">Sepetim</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sepetinizdeki Ürünler</CardTitle>
              <Button variant="outline" size="sm" onClick={handleClearCart}>
                Sepeti Temizle
              </Button>
            </CardHeader>
            <CardContent>
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row gap-4 py-4 border-b last:border-0">
                  <div className="relative w-full md:w-32 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.instructor}</p>

                        {/* Orijinal fiyat ve indirimli fiyat gösterimi */}
                        <div className="mt-1">
                          {item.originalPrice && item.originalPrice !== item.price ? (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500 line-through text-sm">{formatPrice(item.originalPrice)}</span>
                              <span className="font-medium">{formatPrice(item.price)}</span>
                              {item.couponCode && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                  {item.couponCode}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="font-medium">{formatPrice(item.price)}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <div className="h-8 px-3 flex items-center justify-center border-y border-input">
                            {item.quantity}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Kupon Kodu Bölümü */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Kupon Kodu</CardTitle>
            </CardHeader>
            <CardContent>
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleApplyCoupon()
                      }
                    }}
                  />
                  <Button onClick={handleApplyCoupon} disabled={isApplyingCoupon}>
                    {isApplyingCoupon ? "Uygulanıyor..." : "Uygula"}
                  </Button>
                </div>
              )}
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
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Ara Toplam</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>KDV (%20)</span>
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
                  <div className="flex justify-between font-bold text-lg">
                    <span>Toplam</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Bilgilendirme */}
                <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Ödeme sayfasında kredi kartı veya banka havalesi ile ödeme yapabilirsiniz.
                  </AlertDescription>
                </Alert>

                <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleCheckout}>
                  Ödemeye Geç
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <Link href="/egitimler" className="text-primary hover:underline">
                    Alışverişe Devam Et
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}