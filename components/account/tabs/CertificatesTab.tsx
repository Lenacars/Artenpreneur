// components/account/tabs/CertificatesTab.tsx
"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CertificateCard } from "@/components/certificate/certificate-card" // Bu yolun doğru olduğundan emin olun
import { Award, BookOpen, TrendingUp, AlertCircle, Clock } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

// Certificate arayüzü
interface Certificate {
  id: string
  certificateNumber: string
  verificationCode: string
  grade: number | null
  completedAt: string
  createdAt: string
  status: string
  course: {
    id: string
    title: string
    instructor: string
    category: string
    level: string
    duration: number | null // Dakika cinsinden süre
  }
  user: {
    name: string | null
  }
  issuedAt?: string; // Prisma modelinizle uyumlu olmalı
}

interface CertificateStats {
  totalCertificates: number
  averageGrade: number
  completedCourses: number
  learningStreak: number
}

export function CertificatesTab() {
  const { data: session, status } = useSession()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [stats, setStats] = useState<CertificateStats>({
    totalCertificates: 0,
    averageGrade: 0,
    completedCourses: 0,
    learningStreak: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === "authenticated") {
      fetchCertificates()
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status])

  const fetchCertificates = async () => {
    try {
      setLoading(true)
      setError(null)

      // Gerçek API çağrısı burada olacak:
      // const response = await fetch('/api/certificates'); // Örneğin /api/certificates rotası oluşturulmalı
      // if (!response.ok) {
      //   throw new Error('Sertifikalar çekilemedi');
      // }
      // const data: Certificate[] = await response.json();
      // setCertificates(data);

      const mockCertificates: Certificate[] = [
        {
          id: "1", certificateNumber: "ART-202412-123456", verificationCode: "ABC-DEF-GHI-JKL", grade: 95,
          completedAt: "2024-12-01T10:00:00Z", createdAt: "2024-12-01T09:00:00Z", status: "ACTIVE",
          course: { id: "1", title: "Dijital Pazarlama Temelleri", instructor: "Ceylan Karaca", category: "Pazarlama", level: "Başlangıç", duration: 120, },
          user: { name: session?.user?.name || "Kullanıcı", }, issuedAt: "2024-12-01T11:00:00Z",
        },
        {
          id: "2", certificateNumber: "ART-202411-789012", verificationCode: "MNO-PQR-STU-VWX", grade: 88,
          completedAt: "2024-11-15T10:00:00Z", createdAt: "2024-11-15T09:00:00Z", status: "ACTIVE",
          course: { id: "2", title: "Yaratıcı Girişimcilik", instructor: "Begüm Meriç", category: "Girişimcilik", level: "Orta", duration: 180, },
          user: { name: session?.user?.name || "Kullanıcı", }, issuedAt: "2024-11-15T11:00:00Z",
        },
      ]

      setCertificates(mockCertificates)

      const totalCertificates = mockCertificates.length
      const averageGrade = totalCertificates > 0 ? mockCertificates.reduce((sum, cert) => sum + (cert.grade || 0), 0) / totalCertificates : 0
      const completedCourses = mockCertificates.length
      const learningStreak = 5 // Mock value

      setStats({
        totalCertificates, averageGrade: Math.round(averageGrade), completedCourses, learningStreak,
      })
    } catch (err) {
      console.error("Error fetching certificates:", err)
      setError("Sertifikalar yüklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="px-4 py-8">
        <div className="space-y-6">
          <div> <Skeleton className="h-8 w-64 mb-2" /> <Skeleton className="h-4 w-96" /> </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> {[...Array(4)].map((_, i) => ( <Card key={i}> <CardHeader className="pb-3"> <Skeleton className="h-4 w-20" /> <Skeleton className="h-8 w-16" /> </CardHeader> </Card> ))} </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {[...Array(3)].map((_, i) => ( <Card key={i}> <CardHeader> <Skeleton className="h-6 w-48" /> <Skeleton className="h-4 w-32" /> </CardHeader> <CardContent> <Skeleton className="h-20 w-full" /> </CardContent> </Card> ))} </div>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="px-4 py-8">
        <Alert> <AlertCircle className="h-4 w-4" /> <AlertDescription>Sertifikalarınızı görüntülemek için giriş yapmanız gerekiyor.</AlertDescription> </Alert>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 py-8">
        <Alert variant="destructive"> <AlertCircle className="h-4 w-4" /> <AlertDescription>{error}</AlertDescription> </Alert>
      </div>
    )
  }

  return (
    <div className="px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div> <h1 className="text-3xl font-bold text-gray-900">Sertifikalarım</h1> <p className="text-gray-600 mt-2">Tamamladığınız kursların sertifikalarını görüntüleyin ve indirin.</p> </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card> <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> <CardTitle className="text-sm font-medium">Toplam Sertifika</CardTitle> <Award className="h-4 w-4 text-muted-foreground" /> </CardHeader> <CardContent> <div className="text-2xl font-bold">{stats.totalCertificates}</div> </CardContent> </Card>
          <Card> <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> <CardTitle className="text-sm font-medium">Ortalama Not</CardTitle> <TrendingUp className="h-4 w-4 text-muted-foreground" /> </CardHeader> <CardContent> <div className="text-2xl font-bold">{stats.averageGrade}/100</div> </CardContent> </Card>
          <Card> <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> <CardTitle className="text-sm font-medium">Tamamlanan Kurs</CardTitle> <BookOpen className="h-4 w-4 text-muted-foreground" /> </CardHeader> <CardContent> <div className="text-2xl font-bold">{stats.completedCourses}</div> </CardContent> </Card>
          <Card> <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> <CardTitle className="text-sm font-medium">Öğrenme Serisi</CardTitle> <Award className="h-4 w-4 text-muted-foreground" /> </CardHeader> <CardContent> <div className="text-2xl font-bold">{stats.learningStreak} gün</div> </CardContent> </Card>
        </div>
        {/* Certificates Grid */}
        {certificates.length > 0 ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Sertifikalarım ({certificates.length})</h2>
              <Link href="/hesabim/sertifika-analizi">
                <Button variant="outline"> <TrendingUp className="w-4 h-4 mr-2" /> Detaylı Analiz </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((certificate) => (
                <CertificateCard key={certificate.id} certificate={certificate} />
              ))}
            </div>
          </div>
        ) : (
          <Card>
            <CardHeader> <CardTitle>Henüz Sertifikanız Yok</CardTitle> <CardDescription>Kurs tamamladığınızda sertifikalarınız burada görünecek.</CardDescription> </CardHeader>
            <CardContent>
              <Link href="/egitimler"> <Button> <BookOpen className="w-4 h-4 mr-2" /> Kurslara Göz At </Button> </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}