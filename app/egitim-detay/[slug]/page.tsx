import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Clock, Award, Users, Play, Share2, Gift } from "lucide-react"
import { getInstructorImage } from "@/lib/getInstructorImage"
import Link from "next/link"
import { Input } from "@/components/ui/input"

interface Props {
  params: {
    slug: string
  }
}

export default async function CourseDetailPage({ params }: Props) {
  // Gerçek uygulamada, bu veriyi veritabanından çekeceksiniz
  // Şimdilik örnek veri kullanıyoruz
  const course = {
    id: params.slug,
    title: "Sanatçılar İçin Yazılı İletişim",
    instructor: "Sanat Deliorman",
    price: "₺90,00",
    description:
      "Bu kurs, sanatçıların yazılı iletişim becerilerini geliştirmelerine yardımcı olmak için tasarlanmıştır. Sanat dünyasında başarılı olmak için etkili iletişim kurabilmek çok önemlidir. Bu kursta, sanatçıların ihtiyaç duyduğu tüm yazılı iletişim becerilerini öğreneceksiniz.",
    duration: "5 saat uzunluğunda hazır video içeriği",
    articles: "4 makale",
    resources: "38 indirilebilir kaynak",
    access: "Mobil ve TV'den erişim",
    certificate: "Bitirme sertifikası",
    sections: [
      {
        title: "Giriş",
        lessons: [
          { title: "Bu Kursta Neler Öğreneceksiniz?", duration: "01:20" },
          { title: "Sanatçılar İçin İletişimin Önemi", duration: "01:40" },
          { title: "Aktif Öğrenme VS Pasif Öğrenme", duration: "01:21" },
        ],
      },
      {
        title: "Sanatçılar İçin Yazılı İletişim Temelleri",
        lessons: [
          { title: "Etkili Yazı Yazmanın Temel İlkeleri", duration: "05:45" },
          { title: "Sanat Dünyasında Yazılı İletişim", duration: "04:30" },
          { title: "Sanatçı Biyografisi Nasıl Yazılır", duration: "06:15" },
          { title: "Sanat Eseri Açıklaması Yazma", duration: "07:20" },
          { title: "Portfolyo Metinleri Oluşturma", duration: "08:10" },
        ],
      },
      {
        title: "Profesyonel E-posta ve Yazışmalar",
        lessons: [
          { title: "Profesyonel E-posta Yazma Teknikleri", duration: "04:25" },
          { title: "Galeri ve Küratörlerle İletişim", duration: "05:30" },
          { title: "Başvuru Metinleri Hazırlama", duration: "06:40" },
          { title: "Sosyal Medyada Yazılı İletişim", duration: "07:15" },
        ],
      },
      {
        title: "Proje Metinleri ve Başvurular",
        lessons: [
          { title: "Proje Önerisi Yazma", duration: "09:20" },
          { title: "Fon Başvurusu Metinleri", duration: "08:45" },
          { title: "Sanatsal Projelerde Bütçe Metinleri", duration: "07:30" },
          { title: "Basın Bülteni Hazırlama", duration: "06:50" },
        ],
      },
    ],
    willLearn: [
      "Sanat dünyasında etkili yazılı iletişim kurma",
      "Profesyonel sanatçı biyografisi yazma",
      "Sanat eseri açıklamaları oluşturma",
      "Galeri ve küratörlerle profesyonel yazışma",
      "Proje önerileri ve fon başvuruları hazırlama",
      "Sosyal medyada etkili içerik üretme",
      "Portfolyo metinleri oluşturma",
      "Basın bültenleri yazma",
    ],
    requirements: [
      "Herhangi bir ön bilgi gerekmemektedir",
      "Temel düzeyde Türkçe yazma becerisi",
      "Kendi sanatsal çalışmalarınız hakkında düşünmeye istekli olmak",
    ],
    targetAudience: [
      "Yazılı iletişim becerilerini geliştirmek isteyen tüm sanatçılar",
      "Sanat okullarında okuyan öğrenciler",
      "Portfolyosunu profesyonelleştirmek isteyen sanatçılar",
      "Sanat projelerine başvuru yapmak isteyenler",
      "Sanat dünyasında kendini daha iyi ifade etmek isteyenler",
    ],
    instructorBio:
      "Sanat Deliorman, 15 yılı aşkın deneyime sahip bir iletişim uzmanı ve sanat yazarıdır. Çeşitli sanat kurumlarında iletişim danışmanlığı yapmış, birçok sanatçının portfolyo ve proje metinlerini hazırlamıştır. Aynı zamanda sanat eleştirmeni olarak çeşitli dergi ve gazetelerde yazıları yayımlanmaktadır.",
  }

  // Benzer kurslar - gerçek uygulamada veritabanından çekilecek
  const similarCourses = [
    { id: "1", title: "Kültür ve Sanat İçin Kaynak Geliştirme", instructor: "Gizem Gezenoğlu", price: "₺90,00" },
    { id: "2", title: "Bir Tiyatro Kurmak ve Yönetmek", instructor: "Gülhan Kadim", price: "₺90,00" },
    {
      id: "3",
      title: "Yaratıcı Endüstriler ve Yaratıcı Ekonomi",
      instructor: "Doç Dr. Gökçe Dervişoğlu Okandan",
      price: "₺90,00",
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Üst Bölüm - Başlık ve Açıklama */}
      <div className="bg-[#f5f9fa] p-8 rounded-lg mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-4">{course.description}</p>

            <div className="flex items-center mb-4">
              <div className="mr-2 font-bold">Eğitmen:</div>
              <div className="text-primary">{course.instructor}</div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-[#b2e4e6] text-gray-800 px-3 py-1 rounded-full text-sm">Sanat</span>
              <span className="bg-[#b2e4e6] text-gray-800 px-3 py-1 rounded-full text-sm">İletişim</span>
              <span className="bg-[#b2e4e6] text-gray-800 px-3 py-1 rounded-full text-sm">Yazı</span>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Clock className="w-4 h-4 mr-1 text-gray-500" />
                <span className="text-sm text-gray-600">Son güncelleme: Mayıs 2023</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1 text-gray-500" />
                <span className="text-sm text-gray-600">120 öğrenci</span>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Eğitmen Fotoğrafı */}
          <div className="relative h-64 lg:h-auto rounded-lg overflow-hidden">
            <Image
              src={getInstructorImage(course.instructor) || "/placeholder.svg"}
              alt={course.instructor}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
      </div>

      {/* Ana İçerik - Sekmeler ve Satın Alma */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Taraf - Sekmeler */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="content">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="content" className="flex-1">
                Kurs İçeriği
              </TabsTrigger>
              <TabsTrigger value="description" className="flex-1">
                Açıklama
              </TabsTrigger>
              <TabsTrigger value="instructor" className="flex-1">
                Eğitmen
              </TabsTrigger>
            </TabsList>

            {/* Kurs İçeriği Sekmesi */}
            <TabsContent value="content">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Bu kursta neler öğreneceksiniz?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {course.willLearn.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border rounded-lg mt-6">
                <div className="p-4 border-b flex justify-between items-center">
                  <div>
                    <span className="font-semibold">Kurs içeriği</span>
                    <div className="text-sm text-gray-500">
                      {course.sections.length} bölüm •{" "}
                      {course.sections.reduce((total, section) => total + section.lessons.length, 0)} ders • Toplam{" "}
                      {course.sections.reduce(
                        (total, section) =>
                          total +
                          section.lessons.reduce(
                            (sum, lesson) =>
                              sum +
                              Number.parseInt(lesson.duration.split(":")[0]) * 60 +
                              Number.parseInt(lesson.duration.split(":")[1]),
                            0,
                          ),
                        0,
                      ) / 60}{" "}
                      saat
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Tüm bölümleri genişlet
                  </Button>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {course.sections.map((section, index) => (
                    <AccordionItem key={index} value={`section-${index}`}>
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <div className="flex justify-between items-center w-full pr-4">
                          <div>
                            <div className="font-semibold text-left">{section.title}</div>
                            <div className="text-sm text-gray-500 text-left">
                              {section.lessons.length} ders •{" "}
                              {section.lessons.reduce(
                                (total, lesson) =>
                                  total +
                                  Number.parseInt(lesson.duration.split(":")[0]) * 60 +
                                  Number.parseInt(lesson.duration.split(":")[1]),
                                0,
                              ) / 60}{" "}
                              saat
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="px-4 py-1">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="py-3 flex items-center border-b last:border-0">
                              <Play className="w-4 h-4 mr-3 text-gray-500" />
                              <div className="flex-1">{lesson.title}</div>
                              <div className="text-sm text-gray-500">{lesson.duration}</div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            {/* Açıklama Sekmesi */}
            <TabsContent value="description">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Kurs Açıklaması</h3>
                  <p className="mb-4">{course.description}</p>
                  <p className="mb-4">
                    Sanat dünyasında başarılı olmak sadece yetenekle değil, aynı zamanda etkili iletişim kurabilme
                    becerisiyle de ilgilidir. Bu kurs, sanatçıların yazılı iletişim becerilerini geliştirerek, sanat
                    kariyerlerinde daha başarılı olmalarını sağlamayı amaçlamaktadır.
                  </p>
                  <p>
                    Kurs boyunca, sanatçı biyografisi yazma, portfolyo metinleri oluşturma, proje önerileri hazırlama ve
                    profesyonel e-posta yazışmaları gibi konularda pratik bilgiler edineceksiniz. Ayrıca, sosyal medyada
                    etkili içerik üretme ve basın bültenleri hazırlama konularında da becerilerinizi geliştireceksiniz.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Gereksinimler</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {course.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Bu kurs kimler için uygundur?</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {course.targetAudience.map((audience, index) => (
                      <li key={index}>{audience}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Eğitmen Sekmesi */}
            <TabsContent value="instructor">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={getInstructorImage(course.instructor) || "/placeholder.svg"}
                    alt={course.instructor}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">{course.instructor}</h3>
                  <p className="text-gray-600 mb-4">İletişim Uzmanı ve Sanat Yazarı</p>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-sm text-gray-600">4.8 Eğitmen Puanı</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-sm text-gray-600">350+ Öğrenci</span>
                    </div>
                    <div className="flex items-center">
                      <Play className="w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-sm text-gray-600">3 Kurs</span>
                    </div>
                  </div>

                  <p className="mb-4">{course.instructorBio}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sağ Taraf - Satın Alma */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg overflow-hidden">
            {/* Video Önizleme */}
            <div className="relative aspect-video bg-gray-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center cursor-pointer">
                  <Play className="h-8 w-8 text-gray-800" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3">
                Bu kursu önizle
              </div>
            </div>

            {/* Sekmeler */}
            <div className="border-b">
              <div className="flex">
                <div className="w-1/2 py-3 text-center font-medium border-b-2 border-primary">Kişisel</div>
                <div className="w-1/2 py-3 text-center text-gray-500">Ekipler</div>
              </div>
            </div>

            {/* İçerik */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-bold mb-1">Artenpreneur'ün en popüler kurslarına abone olun</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Kişisel Plan ile bu kursa ve en yüksek puan alan 1000+ kursumuza erişin.
                </p>
                <Link href="#" className="text-sm text-primary font-medium">
                  Daha fazla bilgi edinin
                </Link>
              </div>

              <Button className="w-full mb-6 bg-purple-600 hover:bg-purple-700 text-white">
                Kişisel Planı ücretsiz deneyin
              </Button>

              <div className="text-sm text-gray-500 text-center mb-2">
                Denemeden sonra ayda ₺165,00 başlangıç fiyatıyla
              </div>
              <div className="text-sm text-gray-500 text-center mb-4">Dilediğiniz zaman iptal edin</div>

              <div className="flex items-center justify-center mb-2">
                <div className="border-t border-gray-300 flex-grow"></div>
                <div className="mx-4 text-gray-500">veya</div>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>

              <div className="text-3xl font-bold mb-4 text-center">{course.price}</div>

              <Button variant="outline" className="w-full mb-2 border-gray-300 hover:bg-gray-50">
                Sepete git
              </Button>

              <Link href={`/odeme/${course.id}`}>
                <Button className="w-full mb-4 bg-purple-600 hover:bg-purple-700 text-white">Hemen kaydolun</Button>
              </Link>

              <p className="text-center text-sm text-gray-500 mb-2">30 gün içinde para iade garantisi</p>
              <p className="text-center text-sm text-gray-500 mb-4">Ömür Boyu Tam Erişim</p>

              <div className="flex justify-between items-center text-sm mb-4">
                <Link href="#" className="text-gray-600 hover:text-gray-900 flex items-center">
                  <Share2 className="w-4 h-4 mr-1" />
                  Paylaş
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900 flex items-center">
                  <Gift className="w-4 h-4 mr-1" />
                  Bu kursu hediye et
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Kupon Uygula
                </Link>
              </div>

              <div className="border border-gray-200 rounded p-3 mb-2">
                <div className="text-xs text-gray-500 mb-1">LETSLEARNNOW kupon kodu uygulandı</div>
                <div className="text-xs text-gray-500">Udemy kuponu</div>
              </div>

              <div className="flex">
                <Input placeholder="Kupon Girin" className="rounded-r-none" />
                <Button className="rounded-l-none bg-purple-600 hover:bg-purple-700 text-white">Uygula</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benzer Kurslar */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Benzer Kurslar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarCourses.map((course) => (
            <div key={course.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src={getInstructorImage(course.instructor) || "/placeholder.svg"}
                  alt={course.instructor}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">{course.price}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary-foreground hover:bg-primary-light"
                  >
                    Ayrıntıları Görüntüle
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
