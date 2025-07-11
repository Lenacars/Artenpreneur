"use client"

import { useState } from "react"
import { Heart, Share2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface CourseActionsProps {
  courseId: string
  title: string
  price: number
  slug: string
}

export default function CourseActions({ courseId, title, price, slug }: CourseActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? "Favorilerden kaldırıldı" : "Favorilere eklendi")
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/egitim-detay/${slug}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url)
        toast.success("Link kopyalandı!")
      } catch (error) {
        toast.error("Link kopyalanamadı")
      }
    }
  }

  const handleAddToCart = () => {
    setIsAddingToCart(true)

    // Simulate API call
    setTimeout(() => {
      setIsAddingToCart(false)
      toast.success("Sepete eklendi!")
    }, 500)
  }

  return (
    <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Button
        size="sm"
        variant="secondary"
        className="w-10 h-10 p-0 bg-white/90 hover:bg-white shadow-sm"
        onClick={handleFavoriteToggle}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
      </Button>

      <Button
        size="sm"
        variant="secondary"
        className="w-10 h-10 p-0 bg-white/90 hover:bg-white shadow-sm"
        onClick={handleShare}
      >
        <Share2 className="w-4 h-4 text-gray-600" />
      </Button>

      <Button
        size="sm"
        variant="secondary"
        className="w-10 h-10 p-0 bg-white/90 hover:bg-white shadow-sm"
        onClick={handleAddToCart}
        disabled={isAddingToCart}
      >
        <ShoppingCart className="w-4 h-4 text-gray-600" />
      </Button>
    </div>
  )
}
