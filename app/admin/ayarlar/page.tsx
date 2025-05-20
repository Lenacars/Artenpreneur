"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AyarlarPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Artenpreneur",
    siteDescription: "Sanatçılar için girişimcilik platformu",
    contactEmail: "info@artenpreneur.com",
    contactPhone: "+90 555 123 4567",
    address: "İstanbul, Türkiye",
  })

  const [paymentSettings, setPaymentSettings] = useState({
    currency: "TRY",
    paymentMethods: {
      creditCard: true,
      bankTransfer: true,
      paypal: false,
    },
    taxRate: 18,
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "info@artenpreneur.com",
    smtpPassword: "••••••••",
    senderName: "Artenpreneur",
    senderEmail: "info@artenpreneur.com",
    enableNotifications: true,
  })

  const [socialSettings, setSocialSettings] = useState({
    facebook: "https://facebook.com/artenpreneur",
    twitter: "https://twitter.com/artenpreneur",
    instagram: "https://instagram.com/artenpreneur",
    linkedin: "https://linkedin.com/company/artenpreneur",
    youtube: "",
  })

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings({ ...generalSettings, [name]: value })
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "taxRate") {
      setPaymentSettings({ ...paymentSettings, taxRate: Number(value) })
    } else if (name.startsWith("paymentMethods.")) {
      const method = name.split(".")[1]
      setPaymentSettings({
        ...paymentSettings,
        paymentMethods: {
          ...paymentSettings.paymentMethods,
          [method]: value === "true",
        },
      })
    } else {
      setPaymentSettings({ ...paymentSettings, [name]: value })
    }
  }

  const handlePaymentSwitchChange = (method: string, checked: boolean) => {
    setPaymentSettings({
      ...paymentSettings,
      paymentMethods: {
        ...paymentSettings.paymentMethods,
        [method]: checked,
      },
    })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmailSettings({ ...emailSettings, [name]: value })
  }

  const handleEmailSwitchChange = (name: string, checked: boolean) => {
    setEmailSettings({ ...emailSettings, [name]: checked })
  }

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSocialSettings({ ...socialSettings, [name]: value })
  }

  const handleSaveSettings = async (tab: string) => {
    setLoading(true)
    setSuccess(null)
    setError(null)

    try {
      // Burada gerçek bir API çağrısı yapılacak
      // Şimdilik sadece simülasyon yapıyoruz
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Hangi sekmenin ayarlarını kaydettiğimize bağlı olarak konsola yazdır
      switch (tab) {
        case "general":
          console.log("Genel ayarlar kaydedildi:", generalSettings)
          break
        case "payment":
          console.log("Ödeme ayarları kaydedildi:", paymentSettings)
          break
        case "email":
          console.log("E-posta ayarları kaydedildi:", emailSettings)
          break
        case "social":
          console.log("Sosyal medya ayarları kaydedildi:", socialSettings)
          break
      }

      setSuccess("Ayarlar başarıyla kaydedildi.")
    } catch (err) {
      console.error("Ayarlar kaydedilirken hata:", err)
      setError("Ayarlar kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Site Ayarları</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Hata</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
          <AlertTitle>Başarılı</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">Genel</TabsTrigger>
          <TabsTrigger value="payment">Ödeme</TabsTrigger>
          <TabsTrigger value="email">E-posta</TabsTrigger>
          <TabsTrigger value="social">Sosyal Medya</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Genel Ayarlar</CardTitle>
              <CardDescription>Site hakkında genel bilgileri düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Adı</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">İletişim E-postası</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Açıklaması</Label>
                <Textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralChange}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">İletişim Telefonu</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    value={generalSettings.contactPhone}
                    onChange={handleGeneralChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adres</Label>
                  <Input id="address" name="address" value={generalSettings.address} onChange={handleGeneralChange} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("general")} disabled={loading}>
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Kaydet
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Ödeme Ayarları</CardTitle>
              <CardDescription>Ödeme yöntemleri ve para birimi ayarlarını düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currency">Para Birimi</Label>
                <Input id="currency" name="currency" value={paymentSettings.currency} onChange={handlePaymentChange} />
                <p className="text-sm text-gray-500">Örnek: TRY, USD, EUR</p>
              </div>

              <div className="space-y-2">
                <Label>Ödeme Yöntemleri</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="creditCard"
                      checked={paymentSettings.paymentMethods.creditCard}
                      onCheckedChange={(checked) => handlePaymentSwitchChange("creditCard", checked)}
                    />
                    <Label htmlFor="creditCard">Kredi Kartı</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="bankTransfer"
                      checked={paymentSettings.paymentMethods.bankTransfer}
                      onCheckedChange={(checked) => handlePaymentSwitchChange("bankTransfer", checked)}
                    />
                    <Label htmlFor="bankTransfer">Banka Havalesi</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="paypal"
                      checked={paymentSettings.paymentMethods.paypal}
                      onCheckedChange={(checked) => handlePaymentSwitchChange("paypal", checked)}
                    />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxRate">KDV Oranı (%)</Label>
                <Input
                  id="taxRate"
                  name="taxRate"
                  type="number"
                  min="0"
                  max="100"
                  value={paymentSettings.taxRate}
                  onChange={handlePaymentChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("payment")} disabled={loading}>
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Kaydet
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>E-posta Ayarları</CardTitle>
              <CardDescription>E-posta gönderimi için SMTP ayarlarını düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">SMTP Sunucusu</Label>
                  <Input
                    id="smtpServer"
                    name="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={handleEmailChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input id="smtpPort" name="smtpPort" value={emailSettings.smtpPort} onChange={handleEmailChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Kullanıcı Adı</Label>
                  <Input
                    id="smtpUsername"
                    name="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={handleEmailChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Şifre</Label>
                  <Input
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="senderName">Gönderen Adı</Label>
                  <Input
                    id="senderName"
                    name="senderName"
                    value={emailSettings.senderName}
                    onChange={handleEmailChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senderEmail">Gönderen E-posta</Label>
                  <Input
                    id="senderEmail"
                    name="senderEmail"
                    type="email"
                    value={emailSettings.senderEmail}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enableNotifications"
                  checked={emailSettings.enableNotifications}
                  onCheckedChange={(checked) => handleEmailSwitchChange("enableNotifications", checked)}
                />
                <Label htmlFor="enableNotifications">E-posta Bildirimlerini Etkinleştir</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("email")} disabled={loading}>
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Kaydet
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Sosyal Medya Ayarları</CardTitle>
              <CardDescription>Sosyal medya hesaplarınızı düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  name="facebook"
                  value={socialSettings.facebook}
                  onChange={handleSocialChange}
                  placeholder="https://facebook.com/sayfaniz"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  name="twitter"
                  value={socialSettings.twitter}
                  onChange={handleSocialChange}
                  placeholder="https://twitter.com/kullaniciadiniz"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  name="instagram"
                  value={socialSettings.instagram}
                  onChange={handleSocialChange}
                  placeholder="https://instagram.com/kullaniciadiniz"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={socialSettings.linkedin}
                  onChange={handleSocialChange}
                  placeholder="https://linkedin.com/company/sirketiniz"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  name="youtube"
                  value={socialSettings.youtube}
                  onChange={handleSocialChange}
                  placeholder="https://youtube.com/channel/kanaliniz"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("social")} disabled={loading}>
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Kaydet
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
