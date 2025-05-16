"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"
import { getInstructorImage } from "@/lib/getInstructorImage"   // ← yeni

type UpcomingCourse = {
  id: number
  title: string
  instructor: string
  date: string
  location: string
  description: string
  image?: string              // opsiyonel hâle getirildi
  price: number
}

const upcomingCourses: UpcomingCourse[] = [
  {
    id: 1,
    title: "Yaratıcı Girişimcilik ve Teknoloji",
    instructor: "Begüm Meric",
    date: "17-18-24-25 Mayıs",
    location: "Online",
    description:
      "Teknolojinin sanat ve yaratıcı endüstrilerdeki rolü, dijital dönüşüm ve yeni iş modelleri hakkında kapsamlı bir eğitim.",
    // image: "/images/courses/begum-merih-yaratici-girisimcilik.jpeg",
    price: 90,
  },
  {
    id: 2,
    title: "Sanatçılar İçin Markalaşma ve Dijital Pazarlama",
    instructor: "Ceylan Karaca",
    date: "3-4 Haziran",
    location: "Online",
    description:
      "Sanatçıların dijital platformlarda görünürlüğünü artırmak, sosyal medyayı etkin kullanmak ve hedef kitleye ulaşmak için stratejiler öğrenecekleri kapsamlı bir eğitim.",
    price: 90,
  },
  {
    id: 3,
    title: "Film Yapım ve Tanıtım Aşamaları",
    instructor: "Dr. Fırat Sayıcı",
    date: "10 Haziran",
    location: "Crea Center - Çekmeköy",
    description:
      "Film yapım sürecinin tüm aşamalarını öğreneceğiniz, projenizi nasıl tanıtacağınızı ve pazarlayacağınızı keşfedeceğiniz kapsamlı bir eğitim.",
    price: 80,
  },
]

export default function UpcomingCourses() {
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null)
  const toggleExpand = (id: number) => setExpandedCourse(expandedCourse === id ? null : id)

  return (
    <div className="space-y-8">
      {upcomingCourses.map((course) => {
        const imgSrc = course.image ?? getInstructorImage(course.instructor) // 👈

        return (
          <Card
            key={course.id}
            className="overflow-hidden border border-primary/30 hover:border-primary transition-colors"
          >
            <div className="grid md:grid-cols-3 gap-4">
              {/* ---- Görsel ---- */}
              <div className="relative h-64 md:h-full bg-gray-200">
                <Image
                  src={imgSrc}
                  alt={course.instructor}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>

              {/* ---- Metin ---- */}
              <div className="md:col-span-2 p-6 flex flex-col">
                <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                <p className="text-lg font-medium text-primary-foreground mb-4">
                  Eğitmen: {course.instructor}
                </p>

                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    <span>{course.date}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    <span>{course.location}</span>
                  </div>
                </div>

                <p className={`text-text-secondary ${expandedCourse === course.id ? "" : "line-clamp-2"}`}>
                  {course.description}
                </p>

                {course.description.length > 100 && (
                  <button
                    onClick={() => toggleExpand(course.id)}
                    className="text-primary hover:text-primary-dark mt-2 text-sm font-medium"
                  >
                    {expandedCourse === course.id ? "Daha Az Göster" : "Daha Fazla Göster"}
                  </button>
                )}

                {/* ---- CTA ---- */}
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link href={`/egitimler/${course.id}`}>
                    <Button variant="outline" className="border-primary text-primary-foreground hover:bg-primary-light">
                      Ayrıntıları Görüntüle
                    </Button>
                  </Link>
                  <Link href={`/odeme/${course.id}`}>
                    <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
                      {course.price.toLocaleString("tr-TR")} ₺ Satın Al
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
