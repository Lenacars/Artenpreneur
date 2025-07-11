// components/course-categories.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CourseCard from "@/components/course-card"

// courseData'yı ve CourseDetailData tipini lib/course-data.ts'den import ediyoruz
import { courseData, CourseDetailData } from "@/lib/course-data"; // <-- Yeni import

export default function CourseCategories() {
  const [activeTab, setActiveTab] = useState("all")

  // lib/course-data.ts'deki courseData objesinden tüm kursları bir diziye dönüştürüyoruz.
  // Bu kurslar zaten CourseDetailData tipine uygun.
  const allCourses: CourseDetailData[] = Object.values(courseData);

  // Filtreleme fonksiyonu
  const filteredCourses = activeTab === "all"
    ? allCourses
    : allCourses.filter((course) => course.category.toLowerCase() === activeTab.toLowerCase()); // Kategori filtrelemesi küçük harfe duyarlı yapıldı

  // Sadece ilk 6 kursu göster
  const displayedCourses = filteredCourses.slice(0, 6); // İlk 6 kursu gösterme mantığı korundu

  return (
    <div className="flex flex-col items-center">
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="flex flex-wrap justify-center mb-8 bg-transparent">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-2 m-1"
          >
            Tüm Programlar
          </TabsTrigger>
          <TabsTrigger
            value="muzik"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-2 m-1"
          >
            Müzik
          </TabsTrigger>
          <TabsTrigger
            value="gorsel-sanatlar"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-2 m-1"
          >
            Görsel Sanatlar
          </TabsTrigger>
          <TabsTrigger
            value="tiyatro"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-2 m-1"
          >
            Tiyatro
          </TabsTrigger>
          <TabsTrigger
            value="sinema"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-2 m-1"
          >
            Sinema
          </TabsTrigger>
          <TabsTrigger
            value="edebiyat"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-2 m-1"
          >
            Edebiyat
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course} // CourseCard artık CourseDetailData bekliyor ve bu yüzden sorunsuz çalışacak
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Tüm Eğitimleri Gör butonu */}
      <div className="mt-10">
        <Link href="/egitimler">
          <Button size="lg" className="px-8 bg-primary hover:bg-primary-dark text-primary-foreground">
            Tüm Eğitimleri Gör
          </Button>
        </Link>
      </div>
    </div>
  )
}