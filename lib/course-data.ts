// lib/course-data.ts

// Eğitmen görselleri için sabit data (gerçek uygulamada API'den gelecektir)
export const instructorImages: { [key: string]: string } = {
    "Sanat Deliorman": "/images/instructors/sanat-deliorman.jpg",
    "Dr. Seda Aktaş": "/images/instructors/seda-aktas.jpg",
    "Begüm Meriç": "/images/instructors/begum-meric.jpg",
    "Gizem Gezenoğlu": "/images/instructors/gizem-gezenoglu.jpg",
    "Gülhan Kadim": "/images/instructors/gulhan-kadim.jpg",
    "Doç Dr. Gökçe Dervişoğlu Okandan": "/images/instructors/gokce-okandan.jpg",
    "Dr. Fırat Sayıcı": "/images/instructors/firat-sayici.jpg",
    "Dr. Funda Lena": "/images/instructors/funda-lena.jpg",
    "Prof. Dr. Tekin Memiş": "/images/instructors/tekin-memis.jpg",
    "Tolga Akyıldız": "/images/instructors/tolga-akyildiz.jpg",
    "Fahranaz Bozkurt": "/images/instructors/fahranaz-bozkurt.jpg",
    "Saliha Yavuz": "/images/instructors/saliha-yavuz.jpg",
    "Mehmet Müziksever": "/images/instructors/mehmet-muziksever.jpg",
    "Ceylan Karaca": "/images/instructors/ceylan-karaca.jpg",
    "Defne Kayacık": "/images/instructors/defne-kayacik.jpg",
};

// Eğitmen adına göre görsel yolu döndüren utility fonksiyonu
export const getInstructorImage = (instructorName: string): string | undefined => {
    return instructorImages[instructorName];
};

// Kurs Detayları için ana TypeScript arayüzü
export interface CourseDetailData {
  id: string;
  title: string;
  subtitle: string;
  instructorName: string; // Tutarlılık için bu adı kullanıyoruz
  category: string;
  price: number;
  originalPrice?: number;
  level: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  duration: string;
  lessonCount: number;
  language: string;
  lastUpdated: string;
  completionRate: number;
  isBestseller: boolean;
  hasLifetimeAccess: boolean;
  hasCertificate: boolean;
  description: string;
  longDescription: string;
  coursePreviewImage?: string;
  slug: string; // URL'de kullanılacak benzersiz isim

  // İç içe veri yapıları için arayüzler
  bonusContent: { title: string; value: string; }[];
  whatYouWillLearn: string[];
  requirements: string[];
  targetAudience: string[];
  curriculum: {
    title: string;
    duration: string;
    lessons: { title: string; duration: string; isPreview: boolean; }[];
  }[];
  instructorDetails: {
    name: string;
    title: string;
    bio: string;
    experience: string;
    students: string;
    courses: number;
    rating: number;
    achievements: string[];
    image: string; // Eğitmenin profil görseli yolu
  };
  reviews: {
    id: number;
    name: string;
    title: string;
    rating: number;
    date: string;
    comment: string;
    helpful: number;
  }[];
  features: string[];
  offerEndsAt?: Date;
  image?: string; // CourseCard'daki 'image' prop'u için eklendi (thumbnail)
  instructorImage?: string; // CourseCard'daki 'instructorImage' prop'u için eklendi (eğitmen resmi)
}


// Tüm kursların ana veritabanı (şimdilik manuel, gerçekte API'den çekilir)
export const courseData: { [key: string]: CourseDetailData } = {
  "yazili-iletisim": {
    id: "yazili-iletisim", title: "Sanatçılar İçin Yazılı İletişim", subtitle: "Profesyonel sanat kariyerinizi yazılı iletişim becerileriyle güçlendirin",
    instructorName: "Sanat Deliorman", category: "Edebiyat", price: 90, originalPrice: 150, level: "Başlangıç",
    rating: 4.8, reviewCount: 156, studentCount: 1250, duration: "8 saat", lessonCount: 24, language: "Türkçe",
    lastUpdated: "Aralık 2024", completionRate: 94, isBestseller: true, hasLifetimeAccess: true, hasCertificate: true,
    description: "Sanatçıların kendilerini yazılı olarak ifade etme becerilerini geliştiren kapsamlı bir eğitim programı.",
    longDescription: "Bu kurs, sanatçıların yazılı iletişim becerilerini profesyonel düzeyde geliştirmelerini sağlar. Proje önerilerinden basın bültenlerine, sosyal medya içeriklerinden akademik yazılara kadar geniş bir yelpazede yazma tekniklerini öğreneceksiniz.",
    coursePreviewImage: "/images/course-previews/yazili-iletisim-preview.jpg", slug: "yazili-iletisim",
    image: "/images/courses/sanat-deliorman-yazili-iletisim.webp",
    instructorImage: "/images/instructors/sanat-deliorman.jpg",

    bonusContent: [ { title: "Sanatçı CV Şablonları", value: "₺75" }, { title: "Proje Önerisi Örnekleri", value: "₺50" }, { title: "Basın Bülteni Şablonları", value: "₺100" }, { title: "1-1 Mentörlük Seansı", value: "₺100" }, ],
    whatYouWillLearn: [ "Etkili proje önerileri yazma teknikleri", "Basın bülteni ve medya metinleri hazırlama", "Sosyal medya için içerik üretimi", "Akademik yazım kuralları ve teknikleri", "Kişisel marka oluşturma yazıları", "Hibe başvuru metinleri yazma", "Portfolyo metinleri oluşturma", "Profesyonel e-posta yazışmaları", ],
    requirements: [ "Temel Türkçe yazım bilgisi", "Bilgisayar ve internet erişimi", "Yazma konusunda motivasyon", "Herhangi bir ön deneyim gerekmez", ],
    targetAudience: [ "Profesyonel sanatçılar", "Sanat öğrencileri", "Kültür-sanat sektörü çalışanları", "Yazılı iletişim becerilerini geliştirmek isteyenler", "Freelance sanatçılar", "Galeri sahipleri ve küratörler", ],
    curriculum: [ { title: "Yazılı İletişime Giriş", duration: "1 saat 15 dk", lessons: [ { title: "Yazılı İletişimin Önemi", duration: "15 dk", isPreview: true }, { title: "Sanatçılar İçin Yazım Türleri", duration: "20 dk", isPreview: false }, { title: "Hedef Kitle Analizi", duration: "18 dk", isPreview: false }, { title: "Etkili Yazının Temel İlkeleri", duration: "22 dk", isPreview: false }, ], }, { title: "Proje Önerileri ve Başvuru Metinleri", duration: "2 saat 30 dk", lessons: [ { title: "Etkili Proje Önerisi Yazma", duration: "25 dk", isPreview: false }, { title: "Hibe Başvuru Teknikleri", duration: "30 dk", isPreview: false }, { title: "Bütçe Sunumu ve Gerekçelendirme", duration: "22 dk", isPreview: false }, { title: "Başvuru Mektupları", duration: "28 dk", isPreview: false }, { title: "Proje Özgeçmişi Hazırlama", duration: "25 dk", isPreview: false }, ], }, { title: "Medya ve Basın İletişimi", duration: "2 saat", lessons: [ { title: "Basın Bülteni Hazırlama", duration: "28 dk", isPreview: false }, { title: "Röportaj Teknikleri", duration: "20 dk", isPreview: false }, { title: "Medya İlişkileri Yönetimi", duration: "25 dk", isPreview: false }, { title: "Sosyal Medya İçerik Stratejisi", duration: "27 dk", isPreview: false }, ], }, { title: "Portfolyo ve Kişisel Marka", duration: "1 saat 45 dk", lessons: [ { title: "Sanatçı Biyografisi Yazma", duration: "30 dk", isPreview: false }, { title: "Portfolyo Metinleri", duration: "25 dk", isPreview: false }, { title: "Kişisel Web Sitesi İçerikleri", duration: "28 dk", isPreview: false }, { title: "Online Profil Optimizasyonu", duration: "22 dk", isPreview: false }, ], }, { title: "Bonus: Pratik Uygulamalar", duration: "30 dk", lessons: [ { title: "Gerçek Proje Örnekleri", duration: "15 dk", isPreview: false }, { title: "Yaygın Hatalar ve Çözümleri", duration: "15 dk", isPreview: false }, ], }, ],
    instructorDetails: {
      name: "Sanat Deliorman", title: "Yazılı İletişim Uzmanı & Sanat Yazarı",
      bio: "15 yıllık deneyime sahip yazılı iletişim uzmanı. Çok sayıda sanatçının proje önerilerini ve medya metinlerini hazırlamıştır. Sanat eleştirmeni olarak çeşitli dergi ve gazetelerde yazıları yayımlanmaktadır.",
      experience: "15+ yıl", students: "3,500+", courses: 8, rating: 4.9,
      achievements: [ "İstanbul Sanat Bienali Danışmanı", "50+ başarılı hibe başvurusu", "Sanat Dünyası Dergisi Editörü", "Uluslararası sanat projelerinde danışman", ],
      image: "/images/instructors/sanat-deliorman.jpg",
    },
    reviews: [ { id: 1, name: "Ayşe Kaya", title: "Görsel Sanatçı", rating: 5, date: "2 hafta önce", comment: "Bu kurs sayesinde ilk hibe başvurum kabul edildi! Sanat Deliorman'ın anlatımı çok net ve pratik örnekler gerçekten işe yarıyor.", helpful: 24, }, { id: 2, name: "Mehmet Özkan", title: "Müzisyen", rating: 5, date: "1 ay önce", comment: "Proje önerilerimi artık çok daha profesyonel yazabiliyorum. Özellikle basın bülteni bölümü harika!", helpful: 18, }, { id: 3, name: "Elif Yılmaz", title: "Tiyatro Oyuncusu", rating: 4, date: "3 hafta önce", comment: "İçerik çok kapsamlı ve faydalı. Portfolyo metinlerimi yeniden düzenledim ve çok daha etkili oldu.", helpful: 15, }, ],
    features: [ "Yaşam boyu erişim", "Mobil ve masaüstü erişim", "Tamamlama sertifikası", "30 gün para iade garantisi", "İndirilebilir kaynaklar", "Topluluk erişimi", ],
    offerEndsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  "kaynak-gelistirme": {
    id: "kaynak-gelistirme", title: "Kültür ve Sanat İçin Kaynak Geliştirme", subtitle: "Projeniz için doğru kaynakları bulma ve geliştirme stratejileri.",
    instructorName: "Gizem Gezenoğlu", category: "Genel", price: 90, originalPrice: 110, level: "Başlangıç",
    rating: 4.6, reviewCount: 110, studentCount: 450,
    duration: "2 saat 15 dk", lessonCount: 18, language: "Türkçe", lastUpdated: "Kasım 2024", completionRate: 92,
    isBestseller: false, hasLifetimeAccess: true, hasCertificate: true,
    description: "Kültür sanat projeleriniz için finansal ve insan kaynaklarını nasıl geliştireceğinizi öğrenin.",
    longDescription: "Bu kurs, kültür ve sanat alanında faaliyet gösteren birey ve kurumların projeleri için sürdürülebilir kaynak geliştirme stratejilerini ele almaktadır.",
    coursePreviewImage: "/images/course-previews/kaynak-gelistirme-preview.jpg", slug: "kaynak-gelistirme",
    image: "/images/courses/gizem-gezenoglu-kaynak-gelistirme.jpeg",
    instructorImage: "/images/instructors/gizem-gezenoglu.jpg",

    bonusContent: [{ title: "Hibe Kaynakları Listesi", value: "₺50" }],
    whatYouWillLearn: [ "Temel hibe programlarına başvuru süreçleri", "Etkili sponsorluk anlaşmaları yapma", "Topluluk fonlaması (crowdfunding) kampanyaları oluşturma", "Kurumsal sosyal sorumluluk projeleri geliştirme" ],
    requirements: ["Temel finans bilgisi", "Proje geliştirme konusunda ilgi"],
    targetAudience: ["Sanat yöneticileri", "Kültür STK çalışanları", "Bağımsız sanatçılar"],
    curriculum: [], reviews: [], features: [],
    instructorDetails: {
      name: "Gizem Gezenoğlu", title: "Kaynak Geliştirme Uzmanı",
      bio: "Kültür ve sanat alanında 10 yıldan fazla kaynak geliştirme deneyimi. Sayısız başarılı proje yürütmüştür.",
      experience: "10+ yıl", students: "2,000+", courses: 5, rating: 4.8,
      achievements: [ "UNESCO Kültür Mirası Fonu Danışmanı", "10+ başarılı hibe projesi", "Avrupa Birliği Kültür Programları Eğitmeni" ],
      image: "/images/instructors/gizem-gezenoglu.jpg",
    },
    offerEndsAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  },
  "tiyatro-kurmak": {
    id: "tiyatro-kurmak", title: "Bir Tiyatro Kurmak ve Yönetmek", subtitle: "Kendi tiyatronuzu sıfırdan kurmanın ve başarılı bir şekilde yönetmenin yolları.",
    instructorName: "Gülhan Kadim", category: "Tiyatro", price: 90, originalPrice: 90, level: "Orta",
    rating: 4.9, reviewCount: 150, studentCount: 600,
    duration: "3 saat 45 dk", lessonCount: 20, language: "Türkçe", lastUpdated: "Ekim 2024", completionRate: 95,
    isBestseller: true, hasLifetimeAccess: true, hasCertificate: true,
    description: "Bu kurs, tiyatro kurmak ve yönetmek isteyenler için pratik bilgiler sunar.",
    longDescription: "Tiyatro sanatının inceliklerini, bir tiyatro topluluğu kurmanın hukuki ve finansal süreçlerini, prodüksiyon yönetimini ve pazarlamayı kapsar.",
    coursePreviewImage: "/images/course-previews/tiyatro-kurmak-preview.jpg", slug: "tiyatro-kurmak",
    image: "/images/courses/gulhan-kadim-tiyatro-kurmak.jpeg",
    instructorImage: "/images/instructors/gulhan-kadim.jpg",

    bonusContent: [{ title: "Tiyatro Mekanı Seçimi Kılavuzu", value: "₺60" }],
    whatYouWillLearn: [ "Tiyatro kurumu için hukuki süreçler", "Mekan seçimi ve düzenlemesi", "Oyun seçimi ve prodüksiyon yönetimi", "Pazarlama ve seyirci geliştirme stratejileri" ],
    requirements: ["Tiyatroya ilgi", "Yaratıcı bir vizyon"],
    targetAudience: ["Tiyatrocular", "Yönetmenler", "Kültür-sanat girişimcileri"],
    curriculum: [], reviews: [], features: [],
    instructorDetails: {
      name: "Gülhan Kadim", title: "Tiyatro Yönetmeni & Eğitmen",
      bio: "Uzun yıllardır tiyatro dünyasında aktif olarak yer almakta, birçok başarılı oyunu sahneye koymuştur.",
      experience: "20+ yıl", students: "1,800+", courses: 3, rating: 4.9,
      achievements: [ "Devlet Tiyatroları Başarılı Yönetmen Ödülü", "Uluslararası Tiyatro Festivali Jüri Üyesi" ],
      image: "/images/instructors/gulhan-kadim.jpg",
    },
    offerEndsAt: new Date(Date.now() + 0.5 * 24 * 60 * 60 * 1000),
  },
  "yaratici-ekonomi": {
    id: "yaratici-ekonomi", title: "Yaratıcı Endüstriler ve Yaratıcı Ekonomi", subtitle: "Yaratıcı endüstrilerin dinamiklerini ve yaratıcı ekonomideki fırsatları keşfedin.",
    instructorName: "Doç Dr. Gökçe Dervişoğlu Okandan", category: "Genel", price: 90, originalPrice: 90, level: "Başlangıç",
    rating: 4.3, reviewCount: 80, studentCount: 380,
    duration: "2 saat", lessonCount: 15, language: "Türkçe", lastUpdated: "Eylül 2024", completionRate: 88,
    isBestseller: false, hasLifetimeAccess: true, hasCertificate: true,
    description: "Yaratıcı ekonominin temel prensiplerini ve bu alandaki iş modellerini anlayın.",
    longDescription: "Sanat, tasarım, medya, moda gibi yaratıcı endüstrilerin ekonomik yapılarını ve gelişim potansiyellerini detaylıca inceler.",
    coursePreviewImage: "/images/course-previews/yaratici-ekonomi-preview.jpg", slug: "yaratici-ekonomi",
    image: "/images/courses/gokce-dervisoglu-yaratici-ekonomi.jpeg",
    instructorImage: "/images/instructors/gokce-okandan.jpg",

    bonusContent: [{ title: "Yaratıcı Endüstriler Vaka Çalışmaları", value: "₺40" }],
    whatYouWillLearn: [ "Yaratıcı endüstrilerin tanımı ve önemi", "Yaratıcı ekonominin iş modelleri", "Fikri mülkiyet hakları ve telif hakları yönetimi", "Kültürel girişimcilik ve sosyal etki" ],
    requirements: ["İş dünyasına ilgi", "Yaratıcı sektörlere merak"],
    targetAudience: ["Girişimciler", "Sanatçılar", "Kültür yöneticileri", "Ekonomi öğrencileri"],
    curriculum: [], reviews: [], features: [],
    instructorDetails: {
      name: "Doç Dr. Gökçe Dervişoğlu Okandan", title: "Ekonomi ve Yaratıcı Endüstriler Uzmanı",
      bio: "Akademisyen ve yaratıcı ekonomi danışmanı. Alanında birçok makale ve kitabı bulunmaktadır.",
      experience: "12+ yıl", students: "1,500+", courses: 4, rating: 4.7,
      achievements: [ "Yaratıcı Ekonomi alanında uluslararası yayınlar", "Birçok üniversitede misafir öğretim üyesi" ],
      image: "/images/instructors/gokce-okandan.jpg",
    },
    offerEndsAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
    // coursesData'daki eksik kurslar da buraya eklenecek
    "dijital-pazarlama": {
        id: "dijital-pazarlama", title: "Dijital Pazarlama Stratejileri", subtitle: "Sanat ve kültür sektöründe dijital pazarlama tekniklerini öğrenin.",
        instructorName: "Ceylan Karaca", category: "Pazarlama", price: 150, originalPrice: 200, level: "Orta",
        rating: 4.9, reviewCount: 203, studentCount: 890,
        duration: "12 saat", lessonCount: 25, language: "Türkçe", lastUpdated: "Mayıs 2025", completionRate: 95,
        isBestseller: true, hasLifetimeAccess: true, hasCertificate: true,
        description: "Sanat ve kültür sektöründe dijital pazarlama tekniklerini öğrenin.",
        longDescription: "Bu kurs, sanat ve kültür alanında faaliyet gösterenler için özel olarak tasarlanmış dijital pazarlama stratejilerini öğretir.",
        coursePreviewImage: "/images/course-previews/dijital-pazarlama-preview.jpg", slug: "dijital-pazarlama",
        image: "/images/courses/ceylan-karaca-dijital-pazarlama.jpeg",
        instructorImage: "/images/instructors/ceylan-karaca.jpg",

        bonusContent: [{ title: "Sosyal Medya İçerik Takvimi Şablonu", value: "₺60" }],
        whatYouWillLearn: ["SEO temelleri", "Sosyal medya pazarlaması", "E-posta pazarlaması"],
        requirements: ["Temel internet bilgisi"],
        targetAudience: ["Pazarlamacılar", "Sanat yöneticileri"],
        curriculum: [], reviews: [], features: [],
        instructorDetails: {
            name: "Ceylan Karaca", title: "Dijital Pazarlama Uzmanı", bio: "Dijital pazarlama alanında 10 yıldan fazla deneyim.",
            experience: "10+ yıl", students: "5,000+", courses: 5, rating: 4.9, achievements: [], image: "/images/instructors/ceylan-karaca.jpg",
        },
        offerEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    "iletisim-101": {
        id: "iletisim-101", title: "İletişim 101", subtitle: "Etkili iletişim kurma ve sunum becerilerinizi geliştirin.",
        instructorName: "Defne Kayacık", category: "İletişim", price: 75, originalPrice: 100, level: "Başlangıç",
        rating: 4.6, reviewCount: 167, studentCount: 1100,
        duration: "6 saat", lessonCount: 15, language: "Türkçe", lastUpdated: "Nisan 2025", completionRate: 90,
        isBestseller: false, hasLifetimeAccess: true, hasCertificate: true,
        description: "Etkili iletişim kurma ve sunum becerilerinizi geliştirin.",
        longDescription: "Bu kurs, günlük yaşamınızda ve profesyonel kariyerinizde size yardımcı olacak temel iletişim becerilerini öğretir.",
        coursePreviewImage: "/images/course-previews/iletisim-101-preview.jpg", slug: "iletisim-101",
        image: "/images/courses/defne-kayacik-iletisim-101.jpeg",
        instructorImage: "/images/instructors/defne-kayacik.jpg",

        bonusContent: [{ title: "Etkili Sunum Teknikleri Kontrol Listesi", value: "₺40" }],
        whatYouWillLearn: ["Sözlü iletişim", "Beden dili", "İkna teknikleri"],
        requirements: ["İletişim kurmaya istekli olmak"],
        targetAudience: ["Herkes"],
        curriculum: [], reviews: [], features: [],
        instructorDetails: {
            name: "Defne Kayacık", title: "İletişim Uzmanı", bio: "İletişim becerileri konusunda ulusal ve uluslararası eğitimler vermektedir.",
            experience: "8+ yıl", students: "3,000+", courses: 3, rating: 4.7, achievements: [], image: "/images/instructors/defne-kayacik.jpg",
        },
        offerEndsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    },
    "muzik-endustrisi": {
        id: "muzik-endustrisi", title: "Müzik Endüstrisi", subtitle: "Müzik endüstrisinin işleyişi ve kariyer fırsatları.",
        instructorName: "Fahranaz Bozkurt", category: "Müzik", price: 120, originalPrice: 160, level: "Orta",
        rating: 4.8, reviewCount: 134, studentCount: 678,
        duration: "10 saat", lessonCount: 20, language: "Türkçe", lastUpdated: "Mart 2025", completionRate: 92,
        isBestseller: true, hasLifetimeAccess: true, hasCertificate: true,
        description: "Müzik endüstrisinin işleyişi ve kariyer fırsatları.",
        longDescription: "Bu kurs, müzik endüstrisinin dijitalleşen dünyadaki yerini, sanatçıların haklarını ve gelir modellerini kapsar.",
        coursePreviewImage: "/images/course-previews/muzik-endustrisi-preview.jpg", slug: "muzik-endustrisi",
        image: "/images/courses/fahranaz-bozkurt-muzik-endustrisi.webp",
        instructorImage: "/images/instructors/fahranaz-bozkurt.jpg",

        bonusContent: [{ title: "Müzik Yapım Sözleşme Örnekleri", value: "₺70" }],
        whatYouWillLearn: ["Sanatçı hakları", "Dijital dağıtım", "Konser organizasyonu"],
        requirements: ["Müziğe ilgi"],
        targetAudience: ["Müzisyenler", "Prodüktörler", "Müzik sektörü çalışanları"],
        curriculum: [], reviews: [], features: [],
        instructorDetails: {
            name: "Fahranaz Bozkurt", title: "Müzik Hukuku Uzmanı", bio: "Müzik endüstrisinde uzun yıllardır hukuki danışmanlık hizmeti vermektedir.",
            experience: "15+ yıl", students: "4,000+", courses: 4, rating: 4.8, achievements: [], image: "/images/instructors/fahranaz-bozkurt.jpg",
        },
        offerEndsAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    },
    "film-yapim": {
        id: "film-yapim", title: "Film Yapım Süreci", subtitle: "Profesyonel film yapım sürecinin tüm aşamaları.",
        instructorName: "Dr. Fırat Sayıcı", category: "Sinema", price: 200, originalPrice: 280, level: "İleri",
        rating: 4.9, reviewCount: 78, studentCount: 234,
        duration: "18 saat", lessonCount: 30, language: "Türkçe", lastUpdated: "Şubat 2025", completionRate: 98,
        isBestseller: true, hasLifetimeAccess: true, hasCertificate: true,
        description: "Profesyonel film yapım sürecinin tüm aşamaları.",
        longDescription: "Bu kurs, senaryo yazımından post-prodüksiyona kadar bir filmin tüm yapım aşamalarını detaylı olarak inceler.",
        coursePreviewImage: "/images/course-previews/film-yapim-preview.jpg", slug: "film-yapim",
        image: "/images/courses/firat-sayici-film-yapim.jpeg",
        instructorImage: "/images/instructors/firat-sayici.jpg",

        bonusContent: [{ title: "Film Senaryosu Şablonları", value: "₺100" }],
        whatYouWillLearn: ["Senaryo yazımı", "Yönetmenlik", "Kurgu"],
        requirements: ["Sinemaya ilgi"],
        targetAudience: ["Film yapımcıları", "Yönetmenler", "Senaristler"],
        curriculum: [], reviews: [], features: [],
        instructorDetails: {
            name: "Dr. Fırat Sayıcı", title: "Film Yönetmeni & Akademisyen", bio: "Ulusal ve uluslararası ödüllere sahip bir yönetmen ve sinema akademisyeni.",
            experience: "20+ yıl", students: "2,500+", courses: 6, rating: 4.9, achievements: [], image: "/images/instructors/firat-sayici.jpg",
        },
        offerEndsAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    },
};

// Benzer kurslar için kullanılan data
export const allCoursesForSimilarSection: CourseDetailData[] = [
  {
    id: "kaynak-gelistirme",
    title: "Kültür ve Sanat İçin Kaynak Geliştirme",
    // instructor: "Gizem Gezenoğlu", // Bu satır kaldırılmalı
    instructorName: "Gizem Gezenoğlu",
    price: 90.00,
    originalPrice: 110.00,
    image: "/images/courses/gizem-gezenoglu-kaynak-gelistirme.jpeg",
    instructorImage: "/images/instructors/gizem-gezenoglu.jpg",
    rating: 4.6,
    reviewCount: 110,
    studentCount: 450,
    duration: "2h 15m",
    level: "Başlangıç",
    category: "genel",
    description: "Kültür sanat projeleri için kaynak geliştirme stratejileri.",
    slug: "kaynak-gelistirme",
    subtitle: "Projeniz için doğru kaynakları bulma ve geliştirme stratejileri.",
    lessonCount: 18,
    language: "Türkçe",
    lastUpdated: "Kasım 2024",
    completionRate: 92,
    isBestseller: false,
    hasLifetimeAccess: true,
    hasCertificate: true,
    longDescription: "Bu kurs, kültür ve sanat alanında faaliyet gösteren birey ve kurumların projeleri için sürdürülebilir kaynak geliştirme stratejilerini ele almaktadır.",
    coursePreviewImage: "/images/course-previews/kaynak-gelistirme-preview.jpg",
    bonusContent: [], whatYouWillLearn: [], requirements: [], targetAudience: [], curriculum: [],
    instructorDetails: {
      name: "Gizem Gezenoğlu", title: "Kaynak Geliştirme Uzmanı",
      bio: "Kültür ve sanat alanında 10 yıldan fazla kaynak geliştirme deneyimi. Sayısız başarılı proje yürütmüştür.",
      experience: "10+ yıl", students: "2,000+", courses: 5, rating: 4.8,
      achievements: [],
      image: "/images/instructors/gizem-gezenoglu.jpg",
    },
    reviews: [], features: [],
    offerEndsAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "tiyatro-kurmak",
    title: "Bir Tiyatro Kurmak ve Yönetmek",
    // instructor: "Gülhan Kadim", // BU SATIR KALDIRILMALI
    instructorName: "Gülhan Kadim",
    price: 90.00,
    image: "/images/courses/gulhan-kadim-tiyatro-kurmak.jpeg",
    instructorImage: "/images/instructors/gulhan-kadim.jpg",
    rating: 4.9,
    reviewCount: 150,
    studentCount: 600,
    duration: "3h 45m",
    level: "Orta",
    category: "tiyatro",
    description: "Kendi tiyatronuzu kurmanın ve yönetmenin incelikleri.",
    slug: "tiyatro-kurmak",
    subtitle: "Kendi tiyatronuzu sıfırdan kurmanın ve başarılı bir şekilde yönetmenin yolları.",
    lessonCount: 20,
    language: "Türkçe",
    lastUpdated: "Ekim 2024",
    completionRate: 95,
    isBestseller: true,
    hasLifetimeAccess: true,
    hasCertificate: true,
    longDescription: "Tiyatro sanatının inceliklerini, bir tiyatro topluluğu kurmanın hukuki ve finansal süreçlerini, prodüksiyon yönetimini ve pazarlamayı kapsar.",
    coursePreviewImage: "/images/course-previews/tiyatro-kurmak-preview.jpg",
    bonusContent: [], whatYouWillLearn: [], requirements: [], targetAudience: [], curriculum: [],
    instructorDetails: {
      name: "Gülhan Kadim", title: "Tiyatro Yönetmeni & Eğitmen", bio: "Uzun yıllardır tiyatro dünyasında aktif olarak yer almakta, birçok başarılı oyunu sahneye koymuştur.",
      experience: "20+ yıl", students: "1,800+", courses: 3, rating: 4.9, achievements: [], image: "/images/instructors/gulhan-kadim.jpg",
    },
    reviews: [], features: [],
    offerEndsAt: new Date(Date.now() + 0.5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "yaratici-ekonomi",
    title: "Yaratıcı Endüstriler ve Yaratıcı Ekonomi",
    // instructor: "Doç Dr. Gökçe Dervişoğlu Okandan", // BU SATIR KALDIRILMALI
    instructorName: "Doç Dr. Gökçe Dervişoğlu Okandan",
    price: 90.00,
    image: "/images/courses/gokce-dervisoglu-yaratici-ekonomi.jpeg",
    instructorImage: "/images/instructors/gokce-okandan.jpg",
    rating: 4.3,
    reviewCount: 80,
    studentCount: 380,
    duration: "2h 00m",
    level: "Başlangıç",
    category: "genel",
    description: "Yaratıcı endüstrilerin ve ekonominin temel prensipleri.",
    slug: "yaratici-ekonomi",
    subtitle: "Yaratıcı endüstrilerin dinamiklerini ve yaratıcı ekonomideki fırsatları keşfedin.",
    lessonCount: 15,
    language: "Türkçe",
    lastUpdated: "Eylül 2024",
    completionRate: 88,
    isBestseller: false,
    hasLifetimeAccess: true,
    hasCertificate: true,
    longDescription: "Yaratıcı endüstrilerin ve ekonominin temel prensiplerini ve bu alandaki iş modellerini anlayın.",
    coursePreviewImage: "/images/course-previews/yaratici-ekonomi-preview.jpg",
    bonusContent: [], whatYouWillLearn: [], requirements: [], targetAudience: [], curriculum: [],
    instructorDetails: {
      name: "Doç Dr. Gökçe Dervişoğlu Okandan", title: "Ekonomi ve Yaratıcı Endüstriler Uzmanı",
      bio: "Akademisyen ve yaratıcı ekonomi danışmanı. Alanında birçok makale ve kitabı bulunmaktadır.",
      experience: "12+ yıl", students: "1,500+", courses: 4, rating: 4.7,
      achievements: [],
      image: "/images/instructors/gokce-okandan.jpg",
    },
    reviews: [], features: [],
    offerEndsAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];