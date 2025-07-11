// app/hesabim/page.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AccountHomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/hesabim/profil");
  }, [router]);

  return (
    <div className="flex justify-center items-center h-64 text-gray-500">
      Yükleniyor veya yönlendiriliyor...
    </div>
  );
}