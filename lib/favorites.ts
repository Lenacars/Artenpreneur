"use client"

import { toast } from "@/hooks/use-toast" // Bu toast'ın sonner toast ile uyumlu olduğu varsayılıyor

// Event emitter for favorites updates
class FavoritesEventEmitter {
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

export const favoritesEmitter = new FavoritesEventEmitter()

export interface FavoriteItem {
  id: string
  title: string
  instructor: string
  price: number
  image: string
  instructorImage?: string // <-- EKLENDİ
  addedAt: string
}

export interface AddToFavoritesData {
  id: string
  title: string
  instructor: string
  price: number
  image: string
  instructorImage?: string // <-- EKLENDİ
}

// Get favorites from localStorage
export function getFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") return []

  try {
    const favorites = localStorage.getItem("favorites")
    return favorites ? JSON.parse(favorites) : []
  } catch (error) {
    console.error("Favoriler alınırken hata oluştu:", error)
    return []
  }
}

// Save favorites to localStorage
export function saveFavorites(favorites: FavoriteItem[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("favorites", JSON.stringify(favorites))
    favoritesEmitter.emit("favoritesChanged", favorites)
  } catch (error) {
    console.error("Favoriler kaydedilirken hata oluştu:", error)
  }
}

// Check if item is in favorites
export function isFavorite(id: string): boolean {
  const favorites = getFavorites()
  return favorites.some((item) => item.id === id)
}

// Add item to favorites
export function addToFavorites(data: AddToFavoritesData): boolean {
  try {
    const favorites = getFavorites()

    // Check if already in favorites
    if (favorites.some((item) => item.id === data.id)) {
      return false
    }

    const newFavorite: FavoriteItem = {
      ...data,
      addedAt: new Date().toISOString(),
    }

    const updatedFavorites = [...favorites, newFavorite]
    saveFavorites(updatedFavorites)
    favoritesEmitter.emit("favoriteAdded", newFavorite)
    return true
  } catch (error) {
    console.error("Favorilere eklenirken hata oluştu:", error)
    return false
  }
}

// Remove item from favorites
export function removeFromFavorites(id: string): boolean {
  try {
    const favorites = getFavorites()
    const updatedFavorites = favorites.filter((item) => item.id !== id)
    saveFavorites(updatedFavorites)
    favoritesEmitter.emit("favoriteRemoved", id)
    return true
  } catch (error) {
    console.error("Favorilerden kaldırılırken hata oluştu:", error)
    return false
  }
}

// Get favorites count
export function getFavoritesCount(): number {
  return getFavorites().length
}

// Clear all favorites
export function clearFavorites(): void {
  saveFavorites([])
  favoritesEmitter.emit("favoritesCleared")
}