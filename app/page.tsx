import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, Award, CheckCircle } from "lucide-react"
import UpcomingCourses from "@/components/upcoming-courses"
import TestimonialSlider from "@/components/testimonial-slider"
import CourseCategories from "@/components/course-categories"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-light via-primary to-accent py-16 md:py-24">
        <div className="container-custom grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-primary-foreground">
              Sanatçılar İçin Girişimcilik Eğitimleri
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground">
              Müzik, tiyatro, sinema, görsel sanatlar ya da edebiyat alanında üretim yapan bağımsız bir sanatçı mısınız?
              Sanatınızı profesyonelce sürdürebilmek için yalnızca yetenek yeterli değildir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/egitimler">
                <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-opacity-90">
                  Eğitimleri Keşfet
                </Button>
              </Link>
              <Link href="/hakkimizda">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-white/20"
                >
                  Daha Fazla Bilgi
                </Button>
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artenpreneur%20Ana%20Sayfa%20G%C3%B6rsel-OseUXaSc7gAVCja0Aql2NBuQsyffA5.webp"
                alt="Ahşap ART harfleri - Sanat ve Girişimcilik"
                width={600}
                height={400}
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories - Ana girişin hemen altına taşındı */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Eğitim Programları</h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Farklı sanat dallarına özel hazırlanmış eğitim programlarımızı keşfedin.
            </p>
          </div>

          <CourseCategories />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">ARTENPRENEUR Platformunun Temel Faydaları</h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Sanatçıların işlerini daha sürdürülebilir kılabilmesi için ihtiyaç duydukları tüm bilgi ve becerileri
              kazandırıyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-t-4 border-primary">
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sanatçılara Özgü Girişimcilik Bilgisi</h3>
                <p className="text-text-secondary">
                  Geleneksel girişimcilik eğitimlerinden farklı olarak, sanatçılara özel ihtiyaçları gözeten ve yaratıcı
                  üretimle iş yönetimi arasında köprü kuran özgün içerikler sunar.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-primary">
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Gelir Kazanma ve Pazar Erişimi</h3>
                <p className="text-text-secondary">
                  Sanatçıların işlerini sürdürülebilir kılabilmesi için pazar kazanma, müşteri ve sponsor bulma gibi
                  kritik alanlarda pratik bilgi ve stratejiler sağlar.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-primary">
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Finansal Okuryazarlık</h3>
                <p className="text-text-secondary">
                  Finans ve muhasebe bilgisi, sanatçılar için genellikle ihmal edilen ancak hayati bir konudur.
                  ARTENPRENEUR, bu alandaki eksikleri kapatır.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Link href="/hakkimizda">
              <Button variant="outline" className="group border-primary text-primary-foreground hover:bg-primary-light">
                Tüm Faydaları Keşfet
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sanat Dalları Bölümü - YENİ EKLENEN BÖLÜM */}
      <section className="py-16 bg-primary-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Sanat Dallarında Uzmanlaşma</h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Her sanat dalının kendine özgü ihtiyaçlarını anlıyor ve buna yönelik eğitimler sunuyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Görsel Sanatlar */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/categories/artist-painter.webp"
                  alt="Görsel Sanatlar"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold mb-1">Görsel Sanatlar</h3>
                <p className="text-sm opacity-90">Resim, heykel ve diğer görsel sanat dallarında kariyer gelişimi</p>
              </div>
            </div>

            {/* Müzik */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/categories/singer-performer.webp"
                  alt="Müzik"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold mb-1">Müzik</h3>
                <p className="text-sm opacity-90">Bağımsız müzisyenler için kariyer ve prodüksiyon yönetimi</p>
              </div>
            </div>

            {/* Sinema */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/categories/film-shooting.webp"
                  alt="Sinema"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold mb-1">Sinema</h3>
                <p className="text-sm opacity-90">Film yapım ve yönetim süreçleri için kapsamlı eğitimler</p>
              </div>
            </div>

            {/* Tiyatro */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/categories/theater-rehearsal.webp"
                  alt="Tiyatro"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold mb-1">Tiyatro</h3>
                <p className="text-sm opacity-90">Sahne sanatları ve tiyatro yönetimi için profesyonel rehberlik</p>
              </div>
            </div>

            {/* Edebiyat */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/categories/writer-typewriter.webp"
                  alt="Edebiyat"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold mb-1">Edebiyat</h3>
                <p className="text-sm opacity-90">Yazarlar için yayıncılık ve telif hakları yönetimi</p>
              </div>
            </div>

            {/* Müzik Prodüksiyonu */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/categories/music-production.webp"
                  alt="Müzik Prodüksiyonu"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold mb-1">Müzik Prodüksiyonu</h3>
                <p className="text-sm opacity-90">Ev stüdyosundan profesyonel kayıtlara uzanan süreç yönetimi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İkinci görseli de ekleyelim - Bilgi Bölümü */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="section-title">Sanatçıların İşlerini Daha İyi Yönetebilmesi İçin</h2>
              <p className="text-lg mb-6">
                Müzik, tiyatro, sinema, görsel sanatlar veya edebiyat alanında üretim yapan bağımsız sanatçılar için
                tasarlanmış eğitim programlarımız, sanatsal üretiminizi sürdürülebilir bir iş modeline dönüştürmenize
                yardımcı olur.
              </p>
              <p className="text-lg mb-6">
                Sanatçı olarak sadece üretmek değil, aynı zamanda işinizi yönetmek, pazarlamak ve finansal
                sürdürülebilirliği sağlamak için gereken tüm becerileri kazanın.
              </p>
              <Link href="/egitimler">
                <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
                  Eğitim Programlarını İncele
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="rounded-lg overflow-hidden shadow-lg border-4 border-primary">
                <Image
                  src="/images/categories/vocal-recording.webp"
                  alt="Sanatçılar için stüdyo kayıt eğitimi"
                  width={500}
                  height={300}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Courses */}
      <section className="py-16 bg-background-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Yaklaşan Eğitimler</h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Yakında başlayacak eğitimlerimize hemen kaydolun, yerinizi ayırtın.
            </p>
          </div>

          <UpcomingCourses />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-primary-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Katılımcılarımız Ne Diyor?</h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Eğitimlerimize katılan sanatçıların deneyimleri ve geri bildirimleri.
            </p>
          </div>

          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Sanatınızı Girişimcilikle Buluşturun</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Yaratıcı üretiminizi sürdürülebilir bir iş modeline dönüştürmek için hemen kaydolun.
          </p>
          <Link href="/kayit">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Hemen Başlayın
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
