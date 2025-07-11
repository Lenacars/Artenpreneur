// app/hesabim/ayarlar/page.tsx
"use client" // Bu bir Client Component'tir

import { useState } from "react" // useState'i kullanıyoruz
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card" // <-- CardDescription buraya eklendi
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Settings } from "lucide-react"

export default function AccountSettingsPage() {
  // Bu sayfada gerçek bir durum yönetimi veya API çağrısı olabilir
  // Örneğin, bildirim ayarlarını açma/kapama state'leri

  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [smsNotificationsEnabled, setSmsNotificationsEnabled] = useState(false);

  const handleEmailNotificationsToggle = () => {
    setEmailNotificationsEnabled(prev => !prev);
    // Burada API çağrısı ile kullanıcı tercihini güncelleyebilirsiniz
    console.log("E-posta bildirimleri değişti:", !emailNotificationsEnabled);
  };

  const handleSmsNotificationsToggle = () => {
    setSmsNotificationsEnabled(prev => !prev);
    // Burada API çağrısı ile kullanıcı tercihini güncelleyebilirsiniz
    console.log("SMS bildirimleri değişti:", !smsNotificationsEnabled);
  };

  const handleDeleteAccount = () => {
    // Kullanıcıya onay sorusu sorulmalı (custom modal ile, alert() kullanmayın)
    if (window.confirm("Hesabınızı kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
      console.log("Hesap silme işlemi başlatıldı.");
      // Burada API çağrısı ile hesabı silme işlemi yapılabilir
      // Başarılı olursa kullanıcı çıkışı yapılmalı ve ana sayfaya yönlendirilmeli
    }
  };


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Hesap Ayarları</span>
        </CardTitle>
        <CardDescription>Hesap güvenliği ve bildirim tercihlerinizi yönetin</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium text-slate-900">Güvenlik</h4>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Şifre Değiştir
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              İki Faktörlü Doğrulama
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium text-slate-900">Bildirimler</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">E-posta bildirimleri</span>
              <Button variant="outline" size="sm" onClick={handleEmailNotificationsToggle}>
                {emailNotificationsEnabled ? "Kapat" : "Aç"}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">SMS bildirimleri</span>
              <Button variant="outline" size="sm" onClick={handleSmsNotificationsToggle}>
                {smsNotificationsEnabled ? "Kapat" : "Aç"}
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium text-slate-900">Hesap</h4>
          <Button variant="destructive" className="w-full" onClick={handleDeleteAccount}>
            Hesabı Sil
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
