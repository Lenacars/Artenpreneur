"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getCartItems, getCartItemCount, getCartTotal } from "@/lib/cart"
import { formatPrice } from "@/lib/coupons"
import Image from "next/image"
import { getInstructorImage } from "@/lib/getInstructorImage"
import { useRouter } from "next/navigation"

export default function CartWidget() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<ReturnType<typeof getCartItems>>([])
  const [itemCount, setItemCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  // Sepet verilerini yükle
  useEffect(() => {
    const loadCartData = () => {
      const items = getCartItems()
      const count = getCartItemCount()
      const total = getCartTotal()

      setCartItems(items)
      setItemCount(count)
      setCartTotal(total)
    }

    // İlk yükleme
    loadCartData()

    // localStorage değişikliklerini dinle
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        loadCartData()
      }
    }

    // Custom event için dinleyici
    const handleCustomEvent = () => {
      loadCartData()
    }

    // Event listener'ları ekle
    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("cartUpdated", handleCustomEvent)

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("cartUpdated", handleCustomEvent)
    }
  }, [])

  // Sepet boşsa widget'ı gösterme
  if (itemCount === 0) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Kapalı durumdaki sepet butonu */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 bg-purple-600 hover:bg-purple-700 shadow-lg"
        >
          <div className="relative">
            <ShoppingCart className="h-6 w-6 text-white" />
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white border-0 h-5 min-w-5 p-0 flex items-center justify-center">
              {itemCount}
            </Badge>
          </div>
        </Button>
      )}

      {/* Açık durumdaki sepet widget'ı */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl border w-80 max-h-[70vh] flex flex-col">
          <div className="p-3 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-gray-700" />
              <h3 className="font-medium">Sepetim ({itemCount})</h3>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsOpen(false)}>
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-y-auto flex-grow">
            {cartItems.length === 0 ? (
              <div className="p-4 text-center text-gray-500">Sepetiniz boş</div>
            ) : (
              <ul className="divide-y">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-3 hover:bg-gray-50">
                    <div className="flex gap-3">
                      <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={getInstructorImage(item.instructor || "") || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.title}</h4>
                        <p className="text-xs text-gray-500 truncate">{item.instructor}</p>
                        <div className="flex justify-between items-center mt-1">
                          <div className="text-sm font-medium">
                            {item.originalPrice && item.originalPrice !== item.price ? (
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500 line-through">{item.originalPrice}</span>
                                <span>{item.price}</span>
                              </div>
                            ) : (
                              <span>{item.price}</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">Adet: {item.quantity}</div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-3 border-t">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">Toplam</span>
              <span className="font-bold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  router.push("/sepet")
                  setIsOpen(false)
                }}
              >
                Sepete Git
              </Button>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  router.push("/odeme/checkout")
                  setIsOpen(false)
                }}
              >
                Ödeme Yap
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
