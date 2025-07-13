'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseJwt } from "../../utils/jwt";

export default function AdminPage() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    // JWT token'ı localStorage'dan al
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/giris"); // Giriş sayfasına yönlendir
      return;
    }

    const payload = parseJwt(token);
    // Kullanıcı rolünü kontrol et
    if (payload && (payload.role === "admin" || payload.role === "superadmin")) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
      router.replace("/giris");
    }
  }, [router]);

  if (isAllowed === null) {
    return <div>Yükleniyor...</div>; // İzin kontrolü sırasında loader gösterebilirsin
  }

  if (!isAllowed) {
    return <div>Yetkisiz erişim.</div>;
  }

  // Yetkiliyse admin panelini göster
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Buraya admin panel bileşenlerini koyabilirsin */}
    </div>
  );
}
