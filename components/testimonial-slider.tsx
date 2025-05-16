"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Ayşe Yılmaz",
    role: "Müzisyen",
    quote:
      "ARTENPRENEUR eğitimleri sayesinde müziğimi nasıl pazarlayacağımı ve gelir modelimi nasıl çeşitlendireceğimi öğrendim. Artık sadece sanatçı değil, aynı zamanda kendi işimin yöneticisiyim.",
    image: "/placeholder.svg?key=6eqco",
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    role: "Görsel Sanatçı",
    quote:
      "Sanat eğitimim boyunca hiç öğrenmediğim finansal yönetim ve pazarlama stratejilerini bu platformda öğrendim. Artık eserlerimi daha geniş kitlelere ulaştırabiliyorum.",
    image: "/placeholder.svg?key=fr2tr",
  },
  {
    id: 3,
    name: "Zeynep Demir",
    role: "Tiyatro Yönetmeni",
    quote:
      "Bir tiyatro kurmak ve yönetmek sandığımdan çok daha karmaşık bir süreçti. ARTENPRENEUR'ün eğitimleri ve mentorluk desteği olmasaydı bu yolda ilerleyemezdim.",
    image: "/placeholder.svg?key=wyxrv",
  },
  {
    id: 4,
    name: "Can Özkan",
    role: "Yazar",
    quote:
      "Telif hakları konusunda bilgi eksikliğim vardı ve bu yüzden birçok fırsatı kaçırıyordum. Aldığım eğitimler sayesinde artık haklarımı daha iyi koruyabiliyorum.",
    image: "/placeholder.svg?key=dg8ey",
  },
]

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, currentIndex])

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <Card className="bg-white border-2 border-primary shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-primary">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Quote className="h-8 w-8 text-primary mb-4" />
                    <p className="text-lg mb-6 italic">{testimonial.quote}</p>
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-primary-foreground font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-primary-light transition-colors border border-primary"
        aria-label="Önceki"
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <ChevronLeft className="h-6 w-6 text-primary-foreground" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-primary-light transition-colors border border-primary"
        aria-label="Sonraki"
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <ChevronRight className="h-6 w-6 text-primary-foreground" />
      </button>

      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              currentIndex === index ? "bg-primary" : "bg-gray-300"
            }`}
            aria-label={`Testimonial ${index + 1}`}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          />
        ))}
      </div>
    </div>
  )
}

export default TestimonialSlider
