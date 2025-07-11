// app/hesabim/layout.tsx
"use client" // Client Component olmalı, çünkü useRouter ve useSession kullanıyor

import type { ReactNode } from "react"
import { useEffect } from "react" // <-- useEffect buraya eklendi
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { User, BookOpen, ShoppingBag, Settings, Award, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"

export default function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const activeTab = pathname.split('/').pop() || 'profil';

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/giris");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Yükleniyor...</h2>
            <p className="text-slate-600">Hesap bilgileriniz yükleniyor.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Hesabım</h1>
        <Button variant="outline" onClick={handleSignOut} className="flex items-center space-x-2 bg-transparent">
          <LogOut className="h-4 w-4" />
          <span>Çıkış Yap</span>
        </Button>
      </div>

      <div className="mb-8">
        <Tabs value={activeTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5">
            <TabsTrigger value="profil" asChild>
              <Link href="/hesabim/profil" className="flex items-center space-x-2">
                <User className="h-4 w-4" /><span>Profil</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="egitimler" asChild>
              <Link href="/hesabim/egitimler" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" /><span>Eğitimler</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="sertifikalarim" asChild>
              <Link href="/hesabim/sertifikalarim" className="flex items-center space-x-2">
                <Award className="h-4 w-4" /><span>Sertifikalarım</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="siparislerim" asChild>
              <Link href="/hesabim/siparislerim" className="flex items-center space-x-2">
                <ShoppingBag className="h-4 w-4" /><span>Siparişlerim</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="ayarlar" asChild>
              <Link href="/hesabim/ayarlar" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" /><span>Ayarlar</span>
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {children}
    </div>
  )
}