"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, Clock, MapPin, Download, ArrowRight } from "lucide-react"

// Örnek eğitim verileri - gerçek uygulamada API'den gelecektir
const courseData = [
  {
    id: "1",
    title: "Yaratıcı Girişimcilik ve Teknoloji",
    instructor: "Begüm Merih",
    price: 90.0,
    image: "/images/begum-merih-yaratici-girisimcilik.jpeg",
    type: "Online Video Eğitim",
    accessInfo: "Eğitim içeriğine hesabınızdan hemen erişebilirsiniz.",
  },
  {
    id: "2",
    title: "Sanatçılar İçin İletişim 101",
    instructor: "Defne Kayacık",
    price: 90.0,
    image: "/images/defne-kayacik-iletisim-101.jpeg",
    type: "Online Video Eğitim",
    accessInfo: "Eğitim içeriğine hesabınızdan hemen erişebilirsiniz.",
  },
  {
    id: "3",
    title: "Sanatçılar İçin Markalaşma ve Dijital Pazarlama",
    instructor: "Ceylan Karaca",
    price: 90.0,
    image: "/images/ceylan-karaca-dijital-pazarlama.jpeg",
    type: "Online Video Eğitim",
    accessInfo: "Eğitim içeriğine hesabınızdan hemen erişebilirsiniz.",
  },
  {
    id: "ableton-live-12",
    title: "Ableton Live 12 İle Müzik Prodüksiyon Eğitimi",
    instructor: "ORFE a.k.a Berfu",
    price: 1200.0,
    image: "/images/music-production.webp",
    type: "Yüz Yüze Eğitim",
    accessInfo: "Eğitim 17-18-24-25 Mayıs tarihlerinde Fulya/Şişli'de gerçekleşecektir.",
    date: "17-18-24-25 Mayıs",
    time: "10:00 - 16:00",
    location: "Fulya/Şişli",
  },
  {
    id: "telif-haklari-ve-sanat-hukuku",
    title: "Telif Hakları ve Sanat Hukuku Atölyesi",
    instructor: "Prof. Dr. Tolga Memiş",
    price: 450.0,
    image: "/images/writer-typewriter.webp",
    type: "Yüz Yüze Eğitim",
    accessInfo: "Eğitim 10 Haziran tarihinde Crea Center - Çekmeköy'de gerçekleşecektir.",
    date: "10 Haziran",
    time: "13:00 - 17:00",
    location: "Crea Center - Çekmeköy",
  },
]

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    // Gerçek uygulamada API'den veri çekilecektir
    const courseId = searchParams.get("course")

    if (courseId) {
      const foundCourse = courseData.find((c) => c.id === courseId)
      if (foundCourse) {
        setCourse(foundCourse)
        // Rastgele sipariş numarası oluştur
        setOrderNumber(`ART-${Math.floor(100000 + Math.random() * 900000)}`)
      } else {
        // Eğitim bulunamadıysa ana sayfaya yönlendir
        router.push("/egitimler")
      }
    } else {
      router.push("/egitimler")
    }

    setLoading(false)
  }, [searchParams, router])

  if (loading) {
    return (
      <div className="container-custom py-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container-custom py-16 min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Eğitim bulunamadı</h1>
          <p className="mb-6">Aradığınız eğitim bulunamadı veya kaldırılmış olabilir.</p>
          <Link href="/egitimler">
            <Button>Eğitimlere Dön</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-16 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Card className="border-primary">
          <CardHeader className="text-center border-b pb-6">
            <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Teşekkürler!</CardTitle>
            <CardDescription className="text-lg">
              Ödemeniz başarıyla tamamlandı. Eğitim kaydınız oluşturuldu.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="bg-primary/10 p-4 rounded-md">
                <h3 className="font-bold mb-2">Sipariş Bilgileri</h3>
                <p className="text-sm mb-1">
                  <span className="font-medium">Sipariş Numarası:</span> {orderNumber}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-medium">Tarih:</span> {new Date().toLocaleDateString("tr-TR")}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-medium">Toplam Tutar:</span> {course.price.toLocaleString("tr-TR")} ₺
                </p>
                <p className="text-sm mb-1">
                  <span className="font-medium">Ödeme Yöntemi:</span> Kredi Kartı
                </p>
              </div>

              <div className="flex items-start space-x-4 border p-4 rounded-md">
                <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold">{course.title}</h3>
                  <p className="text-sm text-text-secondary">Eğitmen: {course.instructor}</p>
                  <p className="text-xs bg-primary/20 inline-block px-2 py-1 rounded mt-1">{course.type}</p>

                  {course.type === "Yüz Yüze Eğitim" && (
                    <div className="mt-3 space-y-1">
                      <p className="text-sm flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        {course.date}
                      </p>
                      <p className="text-sm flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        {course.time}
                      </p>
                      <p className="text-sm flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        {course.location}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-bold mb-2 text-primary-foreground">Eğitime Erişim</h3>
                <p className="text-sm mb-3">{course.accessInfo}</p>

                {course.type === "Online Video Eğitim" ? (
                  <Link href="/hesabim/egitimlerim">
                    <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
                      Eğitime Git
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Link href={`/hesabim/egitimlerim/${course.id}`}>
                    <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
                      Detayları Görüntüle
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between border-t pt-6">
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Faturayı İndir
            </Button>
            <Link href="/egitimler" className="w-full sm:w-auto">
              <Button className="w-full">Diğer Eğitimleri Keşfet</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
