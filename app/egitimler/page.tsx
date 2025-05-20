import Link from "next/link"
import CourseCard from "@/components/course-card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

// ----------------------------------------------------------------
//  Dummy data – gerçek projede veritabanından / CMS'den çekebilirsiniz
// ----------------------------------------------------------------
export type Course = {
  id: string
  title: string
  instructor: string
  category: "music" | "visual-arts" | "theater" | "cinema" | "literature"
  price: number
}

const courses: Course[] = [
  {
    id: "1",
    title: "Sanatçılar İçin Yazılı İletişim",
    instructor: "Sanat Deliorman",
    category: "literature",
    price: 90,
  },
  {
    id: "2",
    title: "Kültür Sanat Projeleri İçin Kitlesel Fonlama",
    instructor: "Dr. Seda Aktaş",
    category: "visual-arts",
    price: 90,
  },
  {
    id: "3",
    title: "Yaratıcı Girişimcilik ve Teknoloji",
    instructor: "Begüm Meriç",
    category: "visual-arts",
    price: 90,
  },
  {
    id: "4",
    title: "Kültür ve Sanat İçin Kaynak Geliştirme",
    instructor: "Gizem Gezenoğlu",
    category: "visual-arts",
    price: 90,
  },
  {
    id: "5",
    title: "Bir Tiyatro Kurmak ve Yönetmek",
    instructor: "Gülhan Kadim",
    category: "theater",
    price: 90,
  },
  {
    id: "6",
    title: "Yaratıcı Endüstriler ve Yaratıcı Ekonomi",
    instructor: "Doç Dr. Gökçe Dervişoğlu Okandan",
    category: "literature",
    price: 80,
  },
  {
    id: "7",
    title: "Müzik Endüstrisinde Sanatçı ve Proje Yönetimi",
    instructor: "Fahranaz Bozkurt",
    category: "music",
    price: 90,
  },
  {
    id: "8",
    title: "Müzik Sektöründe Kariyer Planlaması",
    instructor: "Dr. Funda Lena",
    category: "music",
    price: 90,
  },
  {
    id: "9",
    title: "Film Yapım ve Yönetim Süreçleri",
    instructor: "Dr. Fırat Sayıcı",
    category: "cinema",
    price: 90,
  },
  {
    id: "10",
    title: "Görsel Sanatlar Alanında Kariyer Gelişimi",
    instructor: "Saliha Yavuz",
    category: "visual-arts",
    price: 90,
  },
  {
    id: "11",
    title: "Dijital Pazarlama ve Sosyal Medya Stratejileri",
    instructor: "Ceylan Karaca",
    category: "literature",
    price: 90,
  },
  {
    id: "12",
    title: "İletişim 101: Etkili İletişim Teknikleri",
    instructor: "Defne Kayacık",
    category: "literature",
    price: 90,
  },
  {
    id: "13",
    title: "Yeni Medya ve Dijital İçerik Üretimi",
    instructor: "Defne Kayacık",
    category: "cinema",
    price: 90,
  },
  {
    id: "14",
    title: "Ağ ve İşbirlikleri Geliştirme",
    instructor: "İlkay Bilgiç",
    category: "literature",
    price: 90,
  },
  {
    id: "15",
    title: "NFT ve Metamüzik: Dijital Sanat Ekonomisi",
    instructor: "Tolga Akyıldız",
    category: "music",
    price: 90,
  },
  {
    id: "16",
    title: "Telif Hakları ve Fikri Mülkiyet",
    instructor: "Prof Dr. Tekin Memiş",
    category: "literature",
    price: 90,
  },
]

const categories = [
  { key: "all", label: "Tüm Programlar" },
  { key: "music", label: "Müzik" },
  { key: "visual-arts", label: "Görsel Sanatlar" },
  { key: "theater", label: "Tiyatro" },
  { key: "cinema", label: "Sinema" },
  { key: "literature", label: "Edebiyat" },
]

// ----------------------------------------------------------------
//  Page component
// ----------------------------------------------------------------
export default function CoursesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ---------------- Hero ---------------- */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Eğitim Programları</h1>
            <p className="text-lg md:text-xl mb-8">
              Sanatçıların işlerini daha sürdürülebilir kılabilmesi için ihtiyaç duydukları tüm bilgi ve becerileri
              kazandıran eğitim programlarımızı keşfedin.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Course Tabs ---------------- */}
      <section className="py-16">
        <div className="container-custom">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-1 mb-12">
              {categories.map((c) => (
                <TabsTrigger key={c.key} value={c.key} className="px-4 py-2 text-base">
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map(({ key }) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {courses
                    .filter((c) => key === "all" || c.category === key)
                    .map((c) => (
                      <CourseCard
                        key={c.id}
                        id={c.id}
                        title={c.title}
                        instructor={c.instructor}
                        price={`₺${c.price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}`}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="py-16 bg-primary-light">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Özel Eğitim mi Arıyorsunuz?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Kurumunuz veya grubunuz için özel eğitim programları düzenliyoruz. İhtiyaçlarınıza uygun çözümler için
            bizimle iletişime geçin.
          </p>
          <Link href="/iletisim">
            <Button size="lg">Bizimle İletişime Geçin</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
