"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, CreditCard, Building, Wallet, Check, Info, AlertCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { createPaytrPayment } from "@/app/actions/payment-actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Örnek eğitim verileri - gerçek uygulamada API'den gelecektir
const courseData = [
  {
    id: "1",
    title: "Yaratıcı Girişimcilik ve Teknoloji",
    instructor: "Begüm Merih",
    price: 90.0,
    image: "/images/begum-merih-yaratici-girisimcilik.jpeg",
  },
  {
    id: "2",
    title: "Sanatçılar İçin İletişim 101",
    instructor: "Defne Kayacık",
    price: 90.0,
    image: "/images/defne-kayacik-iletisim-101.jpeg",
  },
  {
    id: "3",
    title: "Sanatçılar İçin Markalaşma ve Dijital Pazarlama",
    instructor: "Ceylan Karaca",
    price: 90.0,
    image: "/images/ceylan-karaca-dijital-pazarlama.jpeg",
  },
  {
    id: "ableton-live-12",
    title: "Ableton Live 12 İle Müzik Prodüksiyon Eğitimi",
    instructor: "ORFE a.k.a Berfu",
    price: 1200.0,
    image: "/images/music-production.webp",
    type: "Yüz Yüze Eğitim",
  },
  {
    id: "telif-haklari-ve-sanat-hukuku",
    title: "Telif Hakları ve Sanat Hukuku Atölyesi",
    instructor: "Prof. Dr. Tolga Memiş",
    price: 450.0,
    image: "/images/writer-typewriter.webp",
    type: "Yüz Yüze Eğitim",
  },
]

export default function PaymentPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Türkiye",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [paytrIframeUrl, setPaytrIframeUrl] = useState<string | null>(null)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  useEffect(() => {
    // URL'den hata parametresini kontrol et
    const error = searchParams.get("error")
    if (error === "payment_failed") {
      setPaymentError("Ödeme işlemi başarısız oldu. Lütfen tekrar deneyiniz.")
    }

    // Gerçek uygulamada API'den veri çekilecektir
    const courseId = params.id as string
    const foundCourse = courseData.find((c) => c.id === courseId)

    if (foundCourse) {
      setCourse(foundCourse)
    } else {
      // Eğitim bulunamadıysa ana sayfaya yönlendir
      router.push("/egitimler")
    }

    setLoading(false)
  }, [params.id, router, searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Hata mesajını temizle
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Kişisel bilgiler validasyonu
    if (!formData.name.trim()) {
      newErrors.name = "Ad Soyad gereklidir"
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-posta gereklidir"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon numarası gereklidir"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Adres gereklidir"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Kullanım koşullarını kabul etmelisiniz"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)
      setPaymentError(null)

      if (paymentMethod === "online-payment") {
        try {
          // PayTR ile ödeme işlemi başlat
          const paymentData = {
            userId: "user123", // Gerçek uygulamada kullanıcı ID'si
            courseId: course.id,
            amount: course.price,
            userEmail: formData.email,
            userName: formData.name,
            userAddress: `${formData.address}, ${formData.city}, ${formData.country}`,
            userPhone: formData.phone,
            basketItems: [
              {
                name: course.title,
                price: course.price,
                quantity: 1,
              },
            ],
          }

          const result = await createPaytrPayment(paymentData)

          if (result.success && result.iframeUrl) {
            // PayTR iframe URL'ini ayarla
            setPaytrIframeUrl(result.iframeUrl)
          } else {
            setPaymentError(result.error || "Ödeme işlemi başlatılamadı.")
          }
        } catch (error) {
          console.error("Payment error:", error)
          setPaymentError("Ödeme işlemi sırasında bir hata oluştu.")
        }
      } else if (paymentMethod === "credit-card") {
        // Kredi kartı ile ödeme işlemi (örnek)
        setTimeout(() => {
          setIsSubmitting(false)
          setIsSuccess(true)

          // Başarılı ödeme sonrası 3 saniye bekleyip teşekkür sayfasına yönlendir
          setTimeout(() => {
            router.push(`/odeme/tesekkurler?course=${course.id}`)
          }, 3000)
        }, 2000)
      } else if (paymentMethod === "bank-transfer") {
        // Havale/EFT ile ödeme işlemi (örnek)
        setTimeout(() => {
          setIsSubmitting(false)
          router.push(`/odeme/tesekkurler?course=${course.id}&method=bank-transfer`)
        }, 1000)
      }

      setIsSubmitting(false)
    }
  }

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

  if (isSuccess) {
    return (
      <div className="container-custom py-16 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Ödeme Başarılı!</CardTitle>
            <CardDescription>Ödemeniz başarıyla tamamlandı. Yönlendiriliyorsunuz...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // PayTR iframe görüntüleme
  if (paytrIframeUrl) {
    return (
      <div className="container-custom py-16 min-h-screen">
        <div className="mb-8">
          <Button variant="outline" onClick={() => setPaytrIframeUrl(null)} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ödeme Formuna Dön
          </Button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Güvenli Ödeme Sayfası</h2>
          <div className="aspect-video w-full">
            <iframe
              src={paytrIframeUrl}
              frameBorder="0"
              scrolling="no"
              className="w-full h-[600px]"
              title="PayTR Ödeme Sayfası"
            ></iframe>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-12 min-h-screen">
      <div className="mb-8">
        <Link href="/egitimler" className="inline-flex items-center text-primary hover:text-primary-dark">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Eğitimlere Dön
        </Link>
      </div>

      {paymentError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ödeme Hatası</AlertTitle>
          <AlertDescription>{paymentError}</AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {/* Ödeme Formu */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-6">Ödeme Bilgileri</h1>

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="credit-card" onValueChange={(value) => setPaymentMethod(value)}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="credit-card" className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Kredi Kartı
                </TabsTrigger>
                <TabsTrigger value="bank-transfer" className="flex items-center">
                  <Building className="mr-2 h-4 w-4" />
                  Havale/EFT
                </TabsTrigger>
                <TabsTrigger value="online-payment" className="flex items-center">
                  <Wallet className="mr-2 h-4 w-4" />
                  Online Ödeme
                </TabsTrigger>
              </TabsList>

              <TabsContent value="credit-card">
                <Card>
                  <CardHeader>
                    <CardTitle>Kredi Kartı Bilgileri</CardTitle>
                    <CardDescription>Güvenli ödeme için kart bilgilerinizi giriniz.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Kart Numarası</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className={errors.cardNumber ? "border-red-500" : ""}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Kart Üzerindeki İsim</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        placeholder="AD SOYAD"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className={errors.cardName ? "border-red-500" : ""}
                      />
                      {errors.cardName && <p className="text-red-500 text-sm">{errors.cardName}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Son Kullanma Tarihi</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="AA/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className={errors.expiryDate ? "border-red-500" : ""}
                        />
                        {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className={errors.cvv ? "border-red-500" : ""}
                        />
                        {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="saveCard"
                        name="saveCard"
                        checked={formData.saveCard}
                        onCheckedChange={(checked) => setFormData({ ...formData, saveCard: checked as boolean })}
                      />
                      <Label htmlFor="saveCard" className="text-sm">
                        Kart bilgilerimi gelecekteki ödemeler için kaydet
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bank-transfer">
                <Card>
                  <CardHeader>
                    <CardTitle>Havale/EFT Bilgileri</CardTitle>
                    <CardDescription>
                      Aşağıdaki banka hesaplarımıza ödeme yapabilirsiniz. Ödeme açıklamasına adınızı ve eğitim kodunu
                      yazmayı unutmayınız.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-primary/10 p-4 rounded-md">
                      <h3 className="font-bold mb-2">Banka Hesap Bilgileri</h3>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Banka:</span> Garanti Bankası
                      </p>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Şube:</span> Çekmeköy Şubesi (123)
                      </p>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Hesap Sahibi:</span> Lena Mama Yayıncılık Tic. A.Ş.
                      </p>
                      <p className="text-sm mb-1">
                        <span className="font-medium">IBAN:</span> TR12 3456 7890 1234 5678 9012 34
                      </p>
                      <p className="text-sm mb-4">
                        <span className="font-medium">Açıklama:</span> {course.title} - [Adınız Soyadınız]
                      </p>
                      <div className="flex items-center text-sm text-primary-foreground">
                        <Info className="h-4 w-4 mr-2" />
                        Ödeme yaptıktan sonra dekontunuzu info@artenpreneur.com adresine gönderiniz.
                      </div>
                    </div>

                    <div className="bg-primary/10 p-4 rounded-md">
                      <h3 className="font-bold mb-2">Alternatif Banka Hesabı</h3>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Banka:</span> İş Bankası
                      </p>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Şube:</span> Ümraniye Şubesi (1234)
                      </p>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Hesap Sahibi:</span> Lena Mama Yayıncılık Tic. A.Ş.
                      </p>
                      <p className="text-sm mb-1">
                        <span className="font-medium">IBAN:</span> TR98 7654 3210 9876 5432 1098 76
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="online-payment">
                <Card>
                  <CardHeader>
                    <CardTitle>Online Ödeme Sistemleri</CardTitle>
                    <CardDescription>
                      PayTR güvenli ödeme sistemi ile kredi kartı veya banka kartınızla ödeme yapabilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <RadioGroupItem value="paytr" id="paytr" checked />
                      <Label htmlFor="paytr" className="flex items-center">
                        <Image src="/placeholder.svg?key=6k04x" alt="PayTR" width={80} height={30} className="mr-2" />
                        PayTR ile öde
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Fatura Bilgileri</CardTitle>
                <CardDescription>Fatura için gerekli bilgilerinizi giriniz.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ad Soyad</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ad Soyad"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="ornek@mail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+90 5XX XXX XX XX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adres</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Adres"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Şehir</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Şehir"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Ülke</Label>
                    <Input
                      id="country"
                      name="country"
                      placeholder="Ülke"
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 flex items-start space-x-2">
              <Checkbox
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                className={errors.agreeTerms ? "border-red-500" : ""}
              />
              <div>
                <Label htmlFor="agreeTerms" className="text-sm">
                  <span>
                    <Link href="/kullanim-kosullari" className="text-primary hover:underline">
                      Kullanım Koşulları
                    </Link>{" "}
                    ve{" "}
                    <Link href="/gizlilik-politikasi" className="text-primary hover:underline">
                      Gizlilik Politikası
                    </Link>
                    'nı okudum ve kabul ediyorum.
                  </span>
                </Label>
                {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}
              </div>
            </div>

            <div className="mt-8">
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    İşleminiz Gerçekleştiriliyor...
                  </>
                ) : (
                  `${course.price.toLocaleString("tr-TR")} ₺ Öde`
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Sipariş Özeti */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Sipariş Özeti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-text-secondary">Eğitmen: {course.instructor}</p>
                  {course.type && (
                    <p className="text-xs bg-primary/20 inline-block px-2 py-1 rounded mt-1">{course.type}</p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Eğitim Ücreti</span>
                  <span>{course.price.toLocaleString("tr-TR")} ₺</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>KDV (%18)</span>
                  <span>{(course.price * 0.18).toLocaleString("tr-TR")} ₺</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Toplam</span>
                <span>{course.price.toLocaleString("tr-TR")} ₺</span>
              </div>

              <div className="bg-primary/10 p-3 rounded-md text-sm">
                <p className="flex items-center">
                  <Info className="h-4 w-4 mr-2 text-primary" />
                  Ödeme işleminiz güvenli bir şekilde gerçekleştirilecektir.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
