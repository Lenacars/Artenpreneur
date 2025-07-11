"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

interface CourseImageProps {
  src: string
  alt: string
  duration?: string
  className?: string
}

export default function CourseImage({ src, alt, duration, className = "" }: CourseImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-t-lg ${className}`}>
      {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

      {hasError ? (
        <div className="flex items-center justify-center h-full bg-gray-100">
          <div className="text-center text-gray-500">
            <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
              <Play className="w-6 h-6" />
            </div>
            <p className="text-sm">Görsel yüklenemedi</p>
          </div>
        </div>
      ) : (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      )}

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
        <div className="bg-white/90 rounded-full p-3">
          <Play className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Duration badge */}
      {duration && (
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{duration}</div>
      )}
    </div>
  )
}
