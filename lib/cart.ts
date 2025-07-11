// lib/cart.ts
"use client"

// Types
export interface AddToCartData {
  id: string
  title: string
  instructor: string
  price: number
  image: string
  instructorImage?: string
  originalPrice?: number; // <-- EKLENDİ
}

export interface CartItem {
  id: string
  title: string
  instructor: string
  price: number
  image: string
  instructorImage?: string
  quantity: number
  addedAt: string
  originalPrice?: number; // <-- EKLENDİ
  couponCode?: string; // <-- EKLENDİ (eğer kupon kodu sepetteki ürüne özgü ise)
}

// Event emitter for cart updates
class CartEventEmitter {
  private listeners: { [key: string]: Function[] } = {}

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event: string, callback: Function) {
    if (!this.listeners[event]) return
    this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback)
  }

  emit(event: string, data?: any) {
    if (!this.listeners[event]) return
    this.listeners[event].forEach((callback) => callback(data))
  }
}

export const cartEmitter = new CartEventEmitter()

// Get cart items from localStorage
export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return []

  try {
    const cart = localStorage.getItem("cart")
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    console.error("Error getting cart items:", error)
    return []
  }
}

// Save cart items to localStorage
export function saveCartItems(items: CartItem[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("cart", JSON.stringify(items))
    cartEmitter.emit("cartChanged", items)
  } catch (error) {
    console.error("Error saving cart items:", error)
  }
}

// Check if item is in cart
export function isInCart(id: string): boolean {
  const cartItems = getCartItems()
  return cartItems.some((item) => item.id === id)
}

// Add item to cart
export function addToCart(data: AddToCartData): boolean {
  try {
    const cartItems = getCartItems()

    // Check if already in cart
    const existingItem = cartItems.find((item) => item.id === data.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      const newCartItem: CartItem = {
        ...data,
        quantity: 1,
        addedAt: new Date().toISOString(),
        // originalPrice ve couponCode için varsayılan değerler veya kontrol
        originalPrice: data.originalPrice, // Eğer data'da varsa
        couponCode: undefined, // Yeni eklendiğinde kupon kodu yok
      }
      cartItems.push(newCartItem)
    }

    saveCartItems(cartItems)
    return true
  } catch (error) {
    console.error("Error adding to cart:", error)
    return false
  }
}

// Remove item from cart (Dönüş tipi CartItem[] olarak değiştirildi)
export function removeFromCart(id: string): CartItem[] { // <-- Dönüş tipi değiştirildi
  try {
    const favorites = getCartItems() // Değişken adı favorites değil cartItems olmalı
    const updatedItems = favorites.filter((item) => item.id !== id)
    saveCartItems(updatedItems)
    return updatedItems // <-- Güncellenmiş diziyi döndür
  } catch (error) {
    console.error("Error removing from cart:", error)
    return getCartItems() // Hata durumunda mevcut sepeti döndür
  }
}

// Update item quantity in cart (Dönüş tipi CartItem[] olarak değiştirildi)
export function updateCartItemQuantity(id: string, newQuantity: number): CartItem[] { // <-- Dönüş tipi değiştirildi
  try {
    const cartItems = getCartItems()
    const item = cartItems.find((item) => item.id === id)

    if (item) {
      if (newQuantity <= 0) {
        return removeFromCart(id) // Miktar 0 veya altındaysa kaldır
      } else {
        item.quantity = newQuantity
        saveCartItems(cartItems)
        return cartItems // <-- Güncellenmiş diziyi döndür
      }
    }
    return cartItems; // Öğeyi bulamazsa mevcut sepeti döndür
  } catch (error) {
    console.error("Error updating cart item quantity:", error)
    return getCartItems() // Hata durumunda mevcut sepeti döndür
  }
}

// Get cart count
export function getCartCount(): number {
  const cartItems = getCartItems()
  return cartItems.reduce((total, item) => total + item.quantity, 0)
}

// Get cart total
export function getCartTotal(): number {
  const cartItems = getCartItems()
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
}

// Clear cart
export function clearCart(): void {
  saveCartItems([])
}