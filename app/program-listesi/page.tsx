import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock, User } from "lucide-react"

export default function ProgramListPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Program Listesi</h1>
            <p className="text-lg md:text-xl mb-8">
              Tüm eğitim programlarımızı tarih, format ve eğitmen bilgileriyle birlikte görüntüleyin.
            </p>
          </div>
        </div>
      </section>

      {/* Program List Section */}
      <section className="py-16">
        <div className="container-custom">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap justify-center mb-12">
              <TabsTrigger value="all" className="px-4 py-2 text-base">
                Tüm Programlar
              </TabsTrigger>
              <TabsTrigger value="online" className="px-4 py-2 text-base">
                Online Eğitimler
              </TabsTrigger>
              <TabsTrigger value="live" className="px-4 py-2 text-base">
                Canlı Eğitimler
              </TabsTrigger>
              <TabsTrigger value="face-to-face" className="px-4 py-2 text-base">
                Yüz Yüze Eğitimler
              </TabsTrigger>
              <TabsTrigger value="mentoring" className="px-4 py-2 text-base">
                Mentorluk Seansları
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="space-y-6">
                {/* Program 1 */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold">Ableton Live 12 İle Müzik Prodüksiyon Eğitimi</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">17-18-24-25 Mayıs</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">10:00 - 16:00</span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">ORFE a.k.a Berfu</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="inline-block bg-secondary-light/20 text-secondary px-2 py-1 rounded text-xs font-medium">
                            Yüz Yüze Eğitim
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link href="/egitimler/ableton-live-12">
                          <Button variant="outline" size="sm">
                            Detaylar
                          </Button>
                        </Link>
                        <Link href="/kayit/ableton-live-12">
                          <Button size="sm">Kayıt Ol</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Program 2 */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold">Sanatçılar İçin Dijital Pazarlama Stratejileri</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">3-4 Haziran</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">19:00 - 21:00</span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">Ceyda Lena</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="inline-block bg-primary/20 text-text-primary px-2 py-1 rounded text-xs font-medium">
                            Online Canlı Eğitim
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link href="/egitimler/dijital-pazarlama">
                          <Button variant="outline" size="sm">
                            Detaylar
                          </Button>
                        </Link>
                        <Link href="/kayit/dijital-pazarlama">
                          <Button size="sm">Kayıt Ol</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Program 3 */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold">Telif Hakları ve Sanat Hukuku Atölyesi</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">10 Haziran</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">13:00 - 17:00</span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">Prof. Dr. Tolga Memiş</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="inline-block bg-secondary-light/20 text-secondary px-2 py-1 rounded text-xs font-medium">
                            Yüz Yüze Eğitim
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link href="/egitimler/telif-haklari">
                          <Button variant="outline" size="sm">
                            Detaylar
                          </Button>
                        </Link>
                        <Link href="/kayit/telif-haklari">
                          <Button size="sm">Kayıt Ol</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Program 4 */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold">Sanatçılar İçin Yazılı İletişim</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">Sanat Deforman</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                            Online Video Eğitim
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link href="/egitimler/yazili-iletisim">
                          <Button variant="outline" size="sm">
                            Detaylar
                          </Button>
                        </Link>
                        <Link href="/kayit/yazili-iletisim">
                          <Button size="sm">Satın Al</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Program 5 */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold">Tiyatro Yönetimi ve Prodüksiyon Atölyesi</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">15-16 Temmuz</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">10:00 - 17:00</span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">Gülhan Kadim</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="inline-block bg-secondary-light/20 text-secondary px-2 py-1 rounded text-xs font-medium">
                            Yüz Yüze Eğitim
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link href="/egitimler/tiyatro-yonetimi">
                          <Button variant="outline" size="sm">
                            Detaylar
                          </Button>
                        </Link>
                        <Link href="/kayit/tiyatro-yonetimi">
                          <Button size="sm">Kayıt Ol</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Program 6 */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold">Kültür Sanat Projeleri İçin Kitlesel Fonlama</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">Dr. Seda Aktaş</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                            Online Video Eğitim
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link href="/egitimler/kitlesel-fonlama">
                          <Button variant="outline" size="sm">
                            Detaylar
                          </Button>
                        </Link>
                        <Link href="/kayit/kitlesel-fonlama">
                          <Button size="sm">Satın Al</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Other tabs would have filtered content */}
            <TabsContent value="online" className="mt-0">
              <div className="space-y-6">
                {/* Online courses would be listed here */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold">Sanatçılar İçin Yazılı İletişim</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">Sanat Deforman</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                            Online Video Eğitim
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link href="/egitimler/yazili-iletisim">
                          <Button variant="outline" size="sm">
                            Detaylar
                          </Button>
                        </Link>
                        <Link href="/kayit/yazili-iletisim">
                          <Button size="sm">Satın Al</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold">Kültür Sanat Projeleri İçin Kitlesel Fonlama</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">Dr. Seda Aktaş</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                            Online Video Eğitim
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link href="/egitimler/kitlesel-fonlama">
                          <Button variant="outline" size="sm">
                            Detaylar
                          </Button>
                        </Link>
                        <Link href="/kayit/kitlesel-fonlama">
                          <Button size="sm">Satın Al</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 bg-primary-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Eğitim Takvimi</h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Yaklaşan eğitimlerimizi takvim görünümünde inceleyebilirsiniz.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold">Mayıs - Temmuz 2024</h3>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold mb-3 border-b pb-2">Mayıs 2024</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-primary text-text-primary px-2 py-1 rounded text-sm font-medium mr-3 mt-0.5">
                      17-18-24-25
                    </span>
                    <div>
                      <p className="font-medium">Ableton Live 12 İle Müzik Prodüksiyon Eğitimi</p>
                      <p className="text-sm text-text-secondary">10:00 - 16:00 | Fulya/Şişli</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-3 border-b pb-2">Haziran 2024</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-primary text-text-primary px-2 py-1 rounded text-sm font-medium mr-3 mt-0.5">
                      3-4
                    </span>
                    <div>
                      <p className="font-medium">Sanatçılar İçin Dijital Pazarlama Stratejileri</p>
                      <p className="text-sm text-text-secondary">19:00 - 21:00 | Online</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary text-text-primary px-2 py-1 rounded text-sm font-medium mr-3 mt-0.5">
                      10
                    </span>
                    <div>
                      <p className="font-medium">Telif Hakları ve Sanat Hukuku Atölyesi</p>
                      <p className="text-sm text-text-secondary">13:00 - 17:00 | Crea Center - Çekmeköy</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-3 border-b pb-2">Temmuz 2024</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-primary text-text-primary px-2 py-1 rounded text-sm font-medium mr-3 mt-0.5">
                      15-16
                    </span>
                    <div>
                      <p className="font-medium">Tiyatro Yönetimi ve Prodüksiyon Atölyesi</p>
                      <p className="text-sm text-text-secondary">10:00 - 17:00 | Crea Center - Çekmeköy</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Özel Eğitim Programları</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Kurumunuz veya grubunuz için özel eğitim programları düzenliyoruz. İhtiyaçlarınıza uygun çözümler için
            bizimle iletişime geçin.
          </p>
          <Link href="/iletisim">
            <Button size="lg" className="bg-white text-secondary hover:bg-gray-100">
              Bizimle İletişime Geçin
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
