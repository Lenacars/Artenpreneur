import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Hesabım | ARTENPRENEUR",
  description: "Hesap bilgilerinizi yönetin, siparişlerinizi görüntüleyin ve kurslarınıza erişin.",
}

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Hesabım</h1>

      <div className="mb-8">
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="profile" asChild>
              <Link href="/hesabim/profil">Profil</Link>
            </TabsTrigger>
            <TabsTrigger value="orders" asChild>
              <Link href="/hesabim/siparislerim">Siparişlerim</Link>
            </TabsTrigger>
            <TabsTrigger value="courses" asChild>
              <Link href="/kurslarim">Kurslarım</Link>
            </TabsTrigger>
            <TabsTrigger value="settings" asChild>
              <Link href="/hesabim/ayarlar">Ayarlar</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {children}
    </div>
  )
}
