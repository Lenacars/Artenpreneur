"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function EgitimlerPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Örnek eğitim verileri
    const dummyCourses = [
      {
        id: 1,
        title: "Yaratıcı Girişimcilik",
        instructor: "Begüm Meriç",
        price: 750,
        status: "published",
        students: 24,
        created_at: "2023-01-15T10:00:00.000Z",
        image_url: "/images/courses/begum-merih-yaratici-girisimcilik.jpeg",
      },
      {
        id: 2,
        title: "Dijital Pazarlama",
        instructor: "Ceylan Karaca",
        price: 500,
        status: "published",
        students: 18,
        created_at: "2023-02-10T14:30:00.000Z",
        image_url: "/images/courses/ceylan-karaca-dijital-pazarlama.jpeg",
      },
      {
        id: 3,
        title: "İletişim 101",
        instructor: "Defne Kayacık",
        price: 500,
        status: "published",
        students: 32,
        created_at: "2023-01-05T09:15:00.000Z",
        image_url: "/images/courses/defne-kayacik-iletisim-101.jpeg",
      },
      {
        id: 4,
        title: "Film Yapım",
        instructor: "Dr. Fırat Sayıcı",
        price: 1500,
        status: "draft",
        students: 0,
        created_at: "2023-03-20T11:45:00.000Z",
        image_url: "/images/courses/firat-sayici-film-yapim.jpeg",
      },
      {
        id: 5,
        title: "Müzik Endüstrisi",
        instructor: "Fahranaz Bozkurt",
        price: 750,
        status: "published",
        students: 15,
        created_at: "2023-02-25T16:20:00.000Z",
        image_url: "/images/courses/fahranaz-bozkurt-muzik-endustrisi.webp",
      },
    ]

    // Veri yükleme simülasyonu
    setTimeout(() => {
      setCourses(dummyCourses)
      setLoading(false)
    }, 1000)
  }, [])

  // Eğitim durumuna göre renk ve metin belirleme
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return { color: "bg-green-100 text-green-800", text: "Yayında" }
      case "draft":
        return { color: "bg-gray-100 text-gray-800", text: "Taslak" }
      case "archived":
        return { color: "bg-red-100 text-red-800", text: "Arşivlenmiş" }
      default:
        return { color: "bg-blue-100 text-blue-800", text: status }
    }
  }

  // Arama filtreleme fonksiyonu
  const filteredCourses = courses.filter(
    (course) =>
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Eğitim Yönetimi</h1>
        <Button>Yeni Eğitim Ekle</Button>
      </div>

      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Eğitim ara..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-teal-500 border-r-transparent"></div>
          <p className="mt-2">Eğitimler yükleniyor...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Eğitim Adı</TableHead>
                <TableHead>Eğitmen</TableHead>
                <TableHead>Fiyat</TableHead>
                <TableHead>Öğrenci Sayısı</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => {
                  const statusBadge = getStatusBadge(course.status)
                  return (
                    <TableRow key={course.id}>
                      <TableCell>#{course.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded overflow-hidden bg-gray-100">
                            <img
                              src={course.image_url || "/placeholder.svg"}
                              alt={course.title}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                ;(e.target as HTMLImageElement).src = "/online-learning-platform.png"
                              }}
                            />
                          </div>
                          <span className="font-medium">{course.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>{course.price.toLocaleString("tr-TR")} ₺</TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${statusBadge.color}`}>
                          {statusBadge.text}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Düzenle
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                            Sil
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    {searchTerm ? "Arama kriterlerine uygun eğitim bulunamadı." : "Henüz eğitim bulunmuyor."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
