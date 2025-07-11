// components/course-card.tsx
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, Clock, Users, Eye } from "lucide-react"
import { isFavorite, addToFavorites, removeFromFavorites, favoritesEmitter } from "@/lib/favorites"
import { isInCart, addToCart, removeFromCart, cartEmitter } from "@/lib/cart"
import { toast } from "sonner"

// CourseDetailData arayüzünü lib/course-data.ts dosyasından import ediyoruz
import { CourseDetailData } from "@/lib/course-data"; // <-- CourseDetailData import edildi

// NOT: components/course-card.tsx içindeki eski 'interface Course' tamamen kaldırıldı.
// Artık CourseDetailData'yı doğrudan kullanacağız.

// CourseCardProps arayüzünü CourseDetailData'yı kullanacak şekilde güncelliyoruz
interface CourseCardProps {
  course: CourseDetailData; // <-- CourseDetailData kullanılıyor
}

export function CourseCard({ course }: CourseCardProps) {
  const [mounted, setMounted] = useState(false)
  const [favoriteState, setFavoriteState] = useState(false)
  const [cartState, setCartState] = useState(false)

  useEffect(() => {
    setMounted(true)
    setFavoriteState(isFavorite(course.id))
    setCartState(isInCart(course.id))
  }, [course.id])

  useEffect(() => {
    const handleFavoritesChange = () => {
      setFavoriteState(isFavorite(course.id))
    }

    const handleCartChange = () => {
      setCartState(isInCart(course.id))
    }

    favoritesEmitter.on("favoritesChanged", handleFavoritesChange)
    cartEmitter.on("cartChanged", handleCartChange)

    return () => {
      favoritesEmitter.off("favoritesChanged", handleFavoritesChange)
      cartEmitter.off("cartChanged", handleCartChange)
    }
  }, [course.id])

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!mounted) return

    try {
      if (favoriteState) {
        const success = removeFromFavorites(course.id)
        if (success) {
          toast.success("Favorilerden kaldırıldı")
        }
      } else {
        const success = addToFavorites({
          id: course.id,
          title: course.title,
          instructor: course.instructorName, // <-- instructor yerine instructorName kullanıldı
          price: course.price,
          image: course.image || "/placeholder.svg",
          instructorImage: course.instructorImage,
        })
        if (success) {
          toast.success("Favorilere eklendi")
        }
      }
    } catch (error) {
      console.error("Error handling favorite:", error)
      toast.error("Bir hata oluştu")
    }
  }

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!mounted) return

    try {
      if (cartState) {
        toast.info("Bu kurs zaten sepetinizde."); // Sepetteyse sadece bilgi ver
      } else {
        const success = addToCart({
          id: course.id,
          title: course.title,
          instructor: course.instructorName, // <-- instructor yerine instructorName kullanıldı
          price: course.price,
          image: course.image || "/placeholder.svg",
          instructorImage: course.instructorImage,
        })
        if (success) {
          toast.success("Sepete eklendi")
        } else {
            toast.error("Sepete eklenirken bir sorun oluştu.");
        }
      }
    } catch (error) {
      console.error("Error handling cart:", error)
      toast.error("Bir hata oluştu")
    }
  }

  const discountPercentage = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0

  if (!mounted) {
    return (
      <Card className="group hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-video bg-gray-200 animate-pulse rounded-t-lg" />
        <CardContent className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        {/* Kurs görseli */}
        <Image
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Hover ile görünen "Ayrıntıları Görüntüle" overlay'i */}
        <Link
          href={`/egitim-detay/${course.slug || course.id}`}
          className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg font-semibold cursor-pointer"
          passHref
        >
          <Eye className="h-6 w-6 mr-2" />
          Ayrıntıları Görüntüle
        </Link>


        {/* Favorite Button (z-index ile üstte kalmalı) */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors duration-200"
          aria-label={favoriteState ? "Favorilerden kaldır" : "Favorilere ekle"}
        >
          <Heart
            className={`h-4 w-4 transition-colors duration-200 ${
              favoriteState ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <Badge className="absolute top-3 left-3 z-10 bg-red-500 hover:bg-red-600">%{discountPercentage} İndirim</Badge>
        )}

        {/* Level Badge */}
        {course.level && (
          <Badge variant="secondary" className="absolute bottom-3 left-3 z-10">
            {course.level}
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Category */}
        {course.category && (
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>
        )}

        {/* Title (Linkli) */}
        <Link href={`/egitim-detay/${course.slug || course.id}`}>
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {course.title}
          </h3>
        </Link>

        {/* Instructor and Image */}
        <div className="flex items-center gap-2">
          {course.instructorImage && (
            <Image
              src={course.instructorImage}
              alt={course.instructorName} // <-- instructor yerine instructorName kullanıldı
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
          )}
          <p className="text-sm text-gray-600">{course.instructorName}</p> {/* <-- instructor yerine instructorName kullanıldı */}
        </div>

        {/* Course Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {course.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
              {course.reviewCount && <span>({course.reviewCount})</span>}
            </div>
          )}
          {course.studentCount && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{course.studentCount}</span>
            </div>
          )}
          {course.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{course.duration}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {course.description && <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-green-600">₺{course.price.toFixed(2)}</span>
          {course.originalPrice && <span className="text-sm text-gray-500 line-through">₺{course.originalPrice.toFixed(2)}</span>}
        </div>

        {/* Sepete Ekle Butonu */}
        <Button
          onClick={handleCartClick}
          variant={cartState ? "secondary" : "default"}
          size="sm"
          className="flex items-center gap-2"
          disabled={cartState}
        >
          <ShoppingCart className="h-4 w-4" />
          {cartState ? "Sepette" : "Sepete Ekle"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CourseCard