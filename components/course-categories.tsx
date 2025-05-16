"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CourseCard from "@/components/course-card"

// Örnek veri - gerçek uygulamada API'den gelecek
const courses = [
  {
    id: "yazili-iletisim",
    title: "Sanatçılar İçin Yazılı İletişim",
    instructor: "Sanat Deliorman",
    price: "₺90,00",
    category: "edebiyat",
  },
  {
    id: "kitlesel-fonlama",
    title: "Kültür Sanat Projeleri İçin Kitlesel Fonlama",
    instructor: "Dr. Seda Aktaş",
    price: "₺90,00",
    category: "genel",
  },
  {
    id: "yaratici-girisimcilik",
    title: "Yaratıcı Girişimcilik ve Teknoloji",
    instructor: "Begüm Meriç",
    price: "₺90,00",
    category: "genel",
  },
  {
    id: "kaynak-gelistirme",
    title: "Kültür ve Sanat İçin Kaynak Geliştirme",
    instructor: "Gizem Gezenoğlu",
    price: "₺90,00",
    category: "genel",
  },
  {
    id: "tiyatro-kurmak",
    title: "Bir Tiyatro Kurmak ve Yönetmek",
    instructor: "Gülhan Kadim",
    price: "₺90,00",
    category: "tiyatro",
  },
  {
    id: "yaratici-ekonomi",
    title: "Yaratıcı Endüstriler ve Yaratıcı Ekonomi",
    instructor: "Doç Dr. Gökçe Dervişoğlu Okandan",
    price: "₺90,00",
    category: "genel",
  },
  {
    id: "gorsel-sanatlar",
    title: "Görsel Sanatlar Alanında Kariyer Gelişimi",
    instructor: "Saliha Yavuz",
    price: "₺90,00",
    category: "gorsel-sanatlar",
  },
  {
    id: "film-yapim",
    title: "Film Yapım ve Yönetim Süreçleri",
    instructor: "Dr. Fırat Sayıcı",
    price: "₺90,00",
    category: "sinema",
  },
  {
    id: "muzik-sektoru",
    title: "Müzik Sektöründe Kariyer Gelişimi",
    instructor: "Dr. Funda Lena",
    price: "₺90,00",
    category: "muzik",
  },
  {
    id: "telif-haklari",
    title: "Sanatçılar İçin Telif Hakları",
    instructor: "Prof. Dr. Tekin Memiş",
    price: "₺90,00",
    category: "genel",
  },
  {
    id: "nft-metamuzik",
    title: "NFT ve Metamüzik",
    instructor: "Tolga Akyıldız",
    price: "₺90,00",
    category: "muzik",
  },
  {
    id: "muzik-endustrisi",
    title: "Müzik Endüstrisi ve Dijital Platformlar",
    instructor: "Fahranaz Bozkurt",
    price: "₺90,00",
    category: "muzik",
  },
]

export default function CourseCategories() {
  const [activeTab, setActiveTab] = useState("all")

  // Filtreleme fonksiyonu
  const filteredCourses = activeTab === "all" ? courses : courses.filter((course) => course.category === activeTab)

  // Sadece ilk 6 kursu göster
  const displayedCourses = filteredCourses.slice(0, 6)

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
                id={course.id}
                title={course.title}
                instructor={course.instructor}
                price={course.price}
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
