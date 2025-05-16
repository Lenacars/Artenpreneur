import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, CheckCircle, Users, BookOpen, Briefcase } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Hakkımızda</h1>
            <p className="text-lg md:text-xl mb-8">
              ARTENPRENEUR – Sanatçılar İçin Girişimcilik Eğitimleri, bağımsız sanatçıların yaratıcı üretimlerini daha
              sürdürülebilir hale getirmelerine destek olmak amacıyla kurulmuş bir eğitim platformudur.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Misyonumuz</h2>
              <p className="mb-6 text-text-secondary">
                Türkiye'de ve dünyada benzeri olmayan bu platform, bağımsız sanatçılara yalnızca yaratıcı üretim
                süreçlerinde değil; aynı zamanda iş modelleri, sürdürülebilirlik, gelir yönetimi, telif hakları ve
                markalaşma gibi konularda da yol göstermeyi hedeflemektedir.
              </p>
              <p className="mb-6 text-text-secondary">
                Sanatın kültürel ifade çeşitliliğini ve toplumsal gelişime katkısını savunan ARTENPRENEUR, sanatçının
                sadece üretici değil aynı zamanda kendi işinin yöneticisi olmasını destekleyen özgün bir yaklaşımla
                ilerlemektedir.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                  <p>Sanatçıların girişimcilik kapasitelerini geliştirmek</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                  <p>Yaratıcı üretimin sürdürülebilirliğini sağlamak</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                  <p>Kültür ve sanatın topluma erişimini güçlendirmek</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/images/artist-painter.webp" alt="Sanat Galerisi" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="section-title">Kurucumuz</h2>
              <h3 className="text-2xl font-bold mb-4">Dr. Funda Lena Nazik</h3>
              <p className="mb-6 text-text-secondary">
                Boğaziçi Üniversitesi'nde ekonomi lisans ve yüksek lisans eğitimini dereceyle tamamlayan Dr. Funda Lena,
                doktorasını İstanbul Bilgi Üniversitesi İletişim Fakültesi Sanat ve Kültür Yönetimi Bölümünde
                birincilikle tamamlamıştır.
              </p>
              <p className="mb-6 text-text-secondary">
                Akademik birikimini yaratıcı sektörler alanında yürüttüğü araştırmalara taşıyarak 2015 yılında KREKSA
                Araştırma ve Danışmanlık markasını kurmuştur. 2018'de Lena & Mama Yayıncılık ve 2022'de ARTENPRENEUR ile
                şirketinin faaliyet alanlarını genişletmiştir.
              </p>
              <div className="flex space-x-4">
                <Link href="https://www.linkedin.com/in/fundalena/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">LinkedIn Profili</Button>
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/professional-woman-portrait.png" alt="Dr. Funda Lena Nazik" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Sunduğumuz Hizmetler</h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Sanatçılar için geliştirilen eğitimler dört ana kategoride sunulmaktadır.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-light p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Online Eğitim Videoları</h3>
              <p className="text-text-secondary">
                İstediğiniz zaman, istediğiniz yerden erişebileceğiniz kapsamlı eğitim videoları.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-light p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Online Canlı Eğitimler</h3>
              <p className="text-text-secondary">
                Eğitmenlerle gerçek zamanlı etkileşim kurarak öğrenebileceğiniz canlı eğitimler.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-light p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Yüz Yüze Eğitimler</h3>
              <p className="text-text-secondary">
                Derinlemesine öğrenme ve networking için yüz yüze eğitim programları.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-light p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Online Mentorluk Seansları</h3>
              <p className="text-text-secondary">
                Kişiselleştirilmiş rehberlik ve destek için bire bir mentorluk seansları.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sanat Dalları Bölümü - YENİ EKLENEN BÖLÜM */}
      <section className="py-16 bg-primary-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Sanat Dallarında Uzmanlık</h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Farklı sanat dallarında uzmanlaşmış eğitmenlerimiz ve programlarımızla sanatçıların gelişimine katkı
              sağlıyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <p className="text-sm opacity-90">Film yapım süreçleri, senaryo yazımı ve yönetmenlik eğitimleri</p>
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
                <p className="text-sm opacity-90">Tiyatro yönetimi, oyunculuk ve sahne sanatları eğitimleri</p>
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
                <p className="text-sm opacity-90">Yazarlık, yayıncılık ve telif hakları yönetimi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-primary-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Başarılarımız</h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Yıllar içinde elde ettiğimiz başarılar ve aldığımız ödüller.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Fark Yaratan Kadın Girişimciler Ödülü</h3>
              <p className="text-text-secondary mb-4">
                Lena Mama Yayıncılık Ticaret A.Ş. Kurucu Ortağı Dr. Funda Lena Nazik 2018 yılında hayata geçirdiği
                "Annelerden Masallar" projesi ile Lions International tarafından düzenlenen "Fark Yaratan Kadın
                Girişimciler" yarışmasında, halk oylaması ve jüri değerlendirmesi ile en yüksek puanı alarak ödül
                kazanmıştır.
              </p>
              <Link
                href="https://parentsdergisi.com/anne/annelerden-masallar-dinlemeye-hazir-misiniz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  Daha Fazla Bilgi
                </Button>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Female Founders 100 Listesi</h3>
              <p className="text-text-secondary mb-4">
                Lena Mama Yayıncılık Ticaret A.Ş. göstermiş olduğu mali başarı ve fark yaratan projeleri sayesinde
                Uluslararası organizasyon olan Fast Company Business tarafından yayınlanan Türkiye'nin önde gelen,
                sahibi/ortağı kadın olan şirketleri "Female Founders 100" listesinde fark yaratan liderler arasına
                girmeyi başarmıştır.
              </p>
              <Link
                href="https://fastcompany.com.tr/dergi/female-founders-100/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  Daha Fazla Bilgi
                </Button>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Kadın Dostu Markalar Farkındalık Ödülü</h3>
              <p className="text-text-secondary mb-4">
                Lena Mama Yayıncılık Tic. A.Ş. Kurucusu Dr. Funda Lena Nazik, 2023 yılında geliştirmiş olduğu "Sisters
                Music Chain" projesi ile her yıl "8 Mart Dünya Kadınlar Günü" haftasında gerçekleştirilen "Kadın Dostu
                Markalar Farkındalık Ödülleri" kapsamında Jüri Özel Ödülüne layık görülmüştür.
              </p>
              <Link
                href="https://www.kadindostumarkalar.org/yazilar/haberler/kadin-dostu-markalar-farkindalik-odulleri-4kez-sahiplerini-buluyor"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  Daha Fazla Bilgi
                </Button>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">EY Girişimci Kadın Liderler Programı</h3>
              <p className="text-text-secondary mb-4">
                Dr. Funda Lena Nazik, İdeallerini gerçekleştirmek ve vizyonlarını gerçeğe dönüştürmek isteyen kadın
                girişimcileri destekleyen EY Girişimci Kadın Liderler Programı'nın 2024 yılı dönemine katılmaya hak
                kazanan 10 girişimcisi arasında yer almayı başarmıştır.
              </p>
              <Link
                href="https://www.ey.com/tr_tr/newsroom/2024/11/ey-turkiye-girisimci-kadin-liderler-programi-2024-sinifi-belli-oldu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  Daha Fazla Bilgi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Sanatınızı Girişimcilikle Buluşturun</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Yaratıcı üretiminizi sürdürülebilir bir iş modeline dönüştürmek için hemen kaydolun.
          </p>
          <Link href="/egitimler">
            <Button size="lg" className="bg-white text-secondary hover:bg-gray-100">
              Eğitimleri Keşfedin
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
