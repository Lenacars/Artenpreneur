'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3100/dashboard/summary')
      .then(res => setSummary(res.data))
      .catch(() => setSummary(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (!summary) return <div>Veri alınamadı!</div>;

  return (
    <div>
      <h2>Yönetim Özeti</h2>
      <div>Kullanıcı sayısı: {summary.totalUserCount}</div>
      <div>Öğrenci sayısı: {summary.totalStudentCount}</div>
      <div>Eğitmen sayısı: {summary.totalInstructorCount}</div>
      <div>Toplam Eğitim: {summary.totalTrainingCount}</div>
      <div>Toplam Satış: {summary.totalSalesCount}</div>
      <div>Toplam Gelir: {summary.totalRevenue} TL</div>
      {/* Detaylı grafik/kart tasarımı ekleyebilirsin */}
    </div>
  );
}
