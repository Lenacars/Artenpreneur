// Sepet öğesi tipi
export type CartItem = {
  id: string
  title: string
  price: string
  instructor?: string
  quantity: number
  couponCode?: string
  originalPrice?: string
}

// Sepete ürün ekleme
export const addToCart = (item: CartItem) => {
  // Mevcut sepeti localStorage'dan al
  const cartItems = getCartItems()

  // Ürün zaten sepette var mı kontrol et
  const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id)

  if (existingItemIndex !== -1) {
    // Ürün zaten sepette, miktarını güncelle
    cartItems[existingItemIndex] = {
      ...cartItems[existingItemIndex],
      quantity: cartItems[existingItemIndex].quantity + (item.quantity || 1),
      price: item.price, // Fiyatı güncelle (indirim uygulanmış olabilir)
      couponCode: item.couponCode, // Kupon kodunu güncelle
      originalPrice: item.originalPrice, // Orijinal fiyatı güncelle
    }
  } else {
    // Ürün sepette yok, yeni ekle
    cartItems.push({
      ...item,
      quantity: item.quantity || 1,
    })
  }

  // Güncellenmiş sepeti localStorage'a kaydet
  localStorage.setItem("cart", JSON.stringify(cartItems))

  // Sepet güncellendiğinde custom event tetikle
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"))
  }

  return cartItems
}

// Sepetten ürün çıkarma
export const removeFromCart = (itemId: string) => {
  const cartItems = getCartItems()
  const updatedCart = cartItems.filter((item) => item.id !== itemId)
  localStorage.setItem("cart", JSON.stringify(updatedCart))

  // Sepet güncellendiğinde custom event tetikle
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"))
  }

  return updatedCart
}

// Sepetteki ürün miktarını güncelleme
export const updateCartItemQuantity = (itemId: string, quantity: number) => {
  if (quantity < 1) return removeFromCart(itemId)

  const cartItems = getCartItems()
  const updatedCart = cartItems.map((item) => (item.id === itemId ? { ...item, quantity } : item))

  localStorage.setItem("cart", JSON.stringify(updatedCart))

  // Sepet güncellendiğinde custom event tetikle
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"))
  }

  return updatedCart
}

// Sepeti temizleme
export const clearCart = () => {
  localStorage.removeItem("cart")

  // Sepet güncellendiğinde custom event tetikle
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"))
  }

  return []
}

// Sepetteki tüm ürünleri getirme
export const getCartItems = (): CartItem[] => {
  if (typeof window === "undefined") return []

  const cartData = localStorage.getItem("cart")
  return cartData ? JSON.parse(cartData) : []
}

// Sepetteki ürün sayısını getirme
export const getCartItemCount = (): number => {
  const cartItems = getCartItems()
  return cartItems.reduce((total, item) => total + (item.quantity || 1), 0)
}

// Sepet toplamını hesaplama
export const getCartTotal = (): number => {
  const cartItems = getCartItems()
  return cartItems.reduce((total, item) => {
    // Fiyatı sayıya dönüştür (₺90,00 -> 90.00)
    const price = Number.parseFloat(item.price.replace("₺", "").replace(",", ".")) || 0
    const quantity = item.quantity || 1
    return total + price * quantity
  }, 0)
}
