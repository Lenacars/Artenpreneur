// components/certificate/certificate-card.tsx
"use client"; // Bu dosyanın Client Component olduğundan emin olun

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Share2, Calendar, BookOpen, Clock } from "lucide-react"; // Clock eklendi
import Link from 'next/link';
import { toast } from "sonner"; // toast eklendi

// Certificate arayüzünü burada tanımlıyoruz (veya merkezi bir yerden import edebiliriz)
interface Certificate {
  id: string;
  certificateNumber: string;
  verificationCode: string;
  grade: number | null;
  completedAt: string;
  createdAt: string;
  status: string;
  course: {
    id: string;
    title: string;
    instructor: string;
    category: string;
    level: string;
    duration: number | null; // Dakika cinsinden süre
  };
  user: {
    name: string | null;
  };
  issuedAt?: string;
}

interface CertificateCardProps {
  certificate: Certificate;
  // onDownload prop'u kaldırıldı
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatDuration = (minutes?: number | null) => {
    if (minutes === null || minutes === undefined) return "Belirtilmemiş";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours} saat ${mins} dakika` : `${mins} dakika`;
  };

  // Sertifika indirme fonksiyonu artık CertificateCard içinde
  const handleDownload = async (certificateId: string) => {
    try {
      const response = await fetch(`/api/certificates/download/${certificateId}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Bilinmeyen bir hata oluştu.' }));
        throw new Error(errorData.message || "Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sertifika-${certificateId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Sertifika başarıyla indirildi!");
    } catch (error: any) {
      console.error("Download error:", error);
      toast.error(`Sertifika indirme sırasında bir hata oluştu: ${error.message || "Bilinmeyen hata"}`);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold line-clamp-2">{certificate.course.title}</CardTitle>
        <p className="text-sm text-gray-600">Eğitmen: {certificate.course.instructor}</p>
        <div className="flex items-center text-xs text-gray-500 mt-2">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Tamamlanma: {formatDate(certificate.completedAt)}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Award className="h-4 w-4 text-blue-500" />
          <span>Sertifika No: {certificate.certificateNumber}</span>
        </div>
        {certificate.grade !== null && (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <BookOpen className="h-4 w-4 text-green-500" />
            <span>Not: {certificate.grade}/100</span>
          </div>
        )}
        {certificate.course.duration !== null && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock className="h-4 w-4 text-purple-500" /> {/* Clock ikonu kullanıldı */}
                <span>Süre: {formatDuration(certificate.course.duration)}</span>
            </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button variant="outline" size="sm" onClick={() => handleDownload(certificate.id)}> {/* onDownload yerine handleDownload çağrıldı */}
          <Download className="h-4 w-4 mr-2" />
          İndir
        </Button>
        <Link href={`/sertifika-dogrula/${certificate.verificationCode}`} passHref>
            <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Doğrula
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}