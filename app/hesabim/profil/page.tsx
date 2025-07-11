// app/hesabim/profil/page.tsx
"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail } from "lucide-react"

export default function ProfilePage() {
  const { data: session, status } = useSession()

  // Layout'ta zaten loading ve unauthenticated kontrolü yapıldığı için
  // burada daha basit bir kontrol yeterlidir.
  if (status === "loading" || !session || !session.user) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Profil Yükleniyor...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse h-48 bg-gray-200 rounded-md"></div>
        </CardContent>
      </Card>
    );
  }

  const userInitials = session.user.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : session.user.email?.[0].toUpperCase() || "U"

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="text-center pb-4">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback className="text-lg font-semibold bg-teal-100 text-teal-700">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl">{session.user.name || "Kullanıcı"}</CardTitle>
          <CardDescription className="flex items-center justify-center space-x-1">
            <Mail className="h-4 w-4" />
            <span>{session.user.email}</span>
          </CardDescription>
          <Badge variant="secondary" className="mt-2">
            {(session.user as any)?.role || "USER"}
          </Badge>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Üyelik Tarihi:</span>
              <span className="font-medium">Ocak 2024</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Toplam Eğitim:</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Tamamlanan:</span>
              <span className="font-medium">0</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Profil Bilgileri</span>
          </CardTitle>
          <CardDescription>Kişisel bilgilerinizi görüntüleyin ve düzenleyin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Ad Soyad</label>
              <p className="mt-1 text-slate-900">{session.user.name || "Belirtilmemiş"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">E-posta</label>
              <p className="mt-1 text-slate-900">{session.user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Telefon</label>
              <p className="mt-1 text-slate-900">Belirtilmemiş</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Şehir</label>
              <p className="mt-1 text-slate-900">Belirtilmemiş</p>
            </div>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700">Profili Düzenle</Button>
        </CardContent>
      </Card>
    </div>
  )
}