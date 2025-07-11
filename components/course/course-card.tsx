"use client"

import { useState, useEffect } from "react"
// Düzeltme: Import yolları, aynı dizindeki dosyalar için './' ile başlamalıdır.
import CourseImage from "./course-image" // 'course/course-image' yerine './course-image'
import CourseInstructor from "./course-instructor" // 'course/course-instructor' yerine './course-instructor'
import CourseInfo from "./course-info" // 'course/course-info' yerine './course-info'
import CourseActions from "./course-actions" // 'course/course-actions' yerine './course-actions'
import CourseCardSkeleton from "./course-card-skeleton" // 'course/course-card-skeleton' yerine './course-card-skeleton'

interface CourseCardProps {
  id: string
  title: string
  instructor: string
  price: string
  duration?: string
  students?: number
  rating?: number
  isLoading?: boolean
}

export default function CourseCard({
  id,
  title,
  instructor,
  price,
  duration,
  students,
  rating,
  isLoading = false,
}: CourseCardProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = () => {
    // Sepete ekleme işlemi
    console.log(`Adding course ${id} to cart`)
  }

  const handleToggleFavorite = () => {
    // Favorilere ekleme/çıkarma işlemi
    console.log(`Toggling favorite for course ${id}`)
  }

  const handleShare = () => {
    // Paylaşma işlemi
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `${instructor} tarafından verilen ${title} eğitimini incele!`,
        url: `${window.location.origin}/egitim-detay/${id}`,
      })
    } else {
      // Fallback: URL'yi kopyala (navigator.clipboard.writeText güvenli bağlam gerektirebilir)
      // Tarayıcı uyumluluğu için execCommand kullanmak daha güvenli olabilir
      const tempInput = document.createElement('input');
      tempInput.value = `${window.location.origin}/egitim-detay/${id}`;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      console.log('URL kopyalandı:', tempInput.value);
    }
  }

  if (isLoading || !mounted) {
    return <CourseCardSkeleton />
  }

  return (
    <div className="group relative flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
      {/* Course Image */}
      <CourseImage instructor={instructor} title={title} />

      {/* Course Actions (Hover) */}
      <CourseActions
        courseId={id}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        onShare={handleShare}
      />

      {/* Instructor Badge */}
      <CourseInstructor instructor={instructor} />

      {/* Course Information */}
      <CourseInfo id={id} title={title} price={price} duration={duration} students={students} rating={rating} />
    </div>
  )
}
