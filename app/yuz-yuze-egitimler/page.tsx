import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Clock, Users } from "lucide-react"

export default function FaceToFaceTrainingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Yüz Yüze Eğitimler</h1>
            <p className="text-lg md:text-xl mb-8">
              Derinlemesine öğrenme ve networking için yüz yüze eğitim programlarımıza katılın.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Face-to-Face Trainings */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Yaklaşan Yüz Yüze Eğitimler</h2>

          <div className="space-y-8">
            {/* Training 1 */}
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative h-64 md:h-full">
                  <Image
                    src="/images/music-production.webp"
                    alt="Ableton Live 12 İle Müzik Prodüksiyon Eğitimi"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:col-span-2 p-6">
                  <h3 className="text-2xl font-bold mb-2">Ableton Live 12 İle Müzik Prodüksiyon Eğitimi</h3>
                  <p className="text-lg font-medium text-secondary mb-4">Eğitmen: ORFE a.k.a Berfu</p>

                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-primary" />
                      <span>17-18-24-25 Mayıs</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      <span>10:00 - 16:00</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      <span>Fulya/Şişli</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      <span>Kontenjan: 10 kişi</span>
                    </div>
                  </div>

                  <p className="text-text-secondary mb-4">
                    Eğitim 4 gün 6'şar saat olacak şekilde yüz yüze gerçekleşecektir. Toplam 24 saatlik eğitimin sonunda
                    katılımcılar kendi şarkılarını üretip yayınlayacak donanıma sahip olacaklardır.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link href="/egitimler/ableton-live-12">
                      <Button variant="outline">Detaylı Bilgi</Button>
                    </Link>
                    <Link href="/kayit/ableton-live-12">
                      <Button>Kayıt Ol</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>

            {/* Training 2 */}
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative h-64 md:h-full">
                  <Image
                    src="/images/writer-typewriter.webp"
                    alt="Telif Hakları ve Sanat Hukuku Atölyesi"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:col-span-2 p-6">
                  <h3 className="text-2xl font-bold mb-2">Telif Hakları ve Sanat Hukuku Atölyesi</h3>
                  <p className="text-lg font-medium text-secondary mb-4">Eğitmen: Prof. Dr. Tolga Memiş</p>

                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-primary" />
                      <span>10 Haziran</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      <span>13:00 - 17:00</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      <span>Crea Center - Çekmeköy</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      <span>Kontenjan: 20 kişi</span>
                    </div>
                  </div>

                  <p className="text-text-secondary mb-4">
                    Sanatçıların haklarını korumak, telif haklarını yönetmek ve hukuki süreçleri anlamak için temel
                    bilgilerin paylaşılacağı interaktif bir atölye çalışması.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link href="/egitimler/telif-haklari-ve-sanat-hukuku">
                      <Button variant="outline">Detaylı Bilgi</Button>
                    </Link>
                    <Link href="/kayit/telif-haklari-ve-sanat-hukuku">
                      <Button>Kayıt Ol</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>

            {/* Training 3 */}
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative h-64 md:h-full">
                  <Image
                    src="/images/theater-rehearsal.webp"
                    alt="Tiyatro Yönetimi ve Prodüksiyon Atölyesi"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:col-span-2 p-6">
                  <h3 className="text-2xl font-bold mb-2">Tiyatro Yönetimi ve Prodüksiyon Atölyesi</h3>
                  <p className="text-lg font-medium text-secondary mb-4">Eğitmen: Gülhan Kadim</p>

                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-primary" />
                      <span>15-16 Temmuz</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      <span>10:00 - 17:00</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      <span>Crea Center - Çekmeköy</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      <span>Kontenjan: 15 kişi</span>
                    </div>
                  </div>

                  <p className="text-text-secondary mb-4">
                    Tiyatro kurma, yönetme, prodüksiyon planlama ve sürdürülebilir bir tiyatro işletmesi oluşturma
                    konularında pratik bilgiler içeren iki günlük yoğun atölye.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link href="/egitimler/tiyatro-yonetimi-ve-produksiyon">
                      <Button variant="outline">Detaylı Bilgi</Button>
                    </Link>
                    <Link href="/kayit/tiyatro-yonetimi-ve-produksiyon">
                      <Button>Kayıt Ol</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-primary-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Yüz Yüze Eğitimlerin Avantajları</h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Yüz yüze eğitimlerimiz, online eğitimlerden farklı olarak birçok ek avantaj sunar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="bg-primary/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Networking Fırsatları</h3>
                <p className="text-text-secondary">
                  Aynı alanda çalışan diğer sanatçılarla tanışma, bağlantı kurma ve işbirliği fırsatları yakalayın.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="bg-primary/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-secondary"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Pratik Uygulama</h3>
                <p className="text-text-secondary">
                  Teorik bilgileri hemen uygulama fırsatı bulun ve anında geri bildirim alın.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="bg-primary/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-secondary"
                  >
                    <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1"></path>
                    <path d="M17 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1"></path>
                    <path d="M12 12v9"></path>
                    <path d="M8 21h8"></path>
                    <path d="M12 3v9"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Kişiselleştirilmiş Rehberlik</h3>
                <p className="text-text-secondary">
                  Eğitmenlerle birebir etkileşim kurarak kişiselleştirilmiş rehberlik alın.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
