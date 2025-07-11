// app/sertifika-dogrula/code/page.tsx
// Bu bir Server Component'tir (başına "use client" YOK)

import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Award, User, BookOpen, Calendar, Clock } from "lucide-react" // <-- Clock eklendi

interface PageProps {
  params: {
    code: string
  }
}

export default async function CertificateVerificationPage({ params }: PageProps) {
  const { code } = params

  const certificate = await prisma.certificate.findUnique({
    where: {
      verificationCode: code,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      course: {
        select: {
          title: true,
          instructor: true,
          duration: true,
        },
      },
    },
  })

  if (!certificate) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-12">
            <XCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold mb-2">Sertifika Bulunamadı</h2>
            <p className="text-muted-foreground">Girilen doğrulama kodu geçersiz veya sertifika mevcut değil.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isValid = certificate.status === "ACTIVE"

  const formatDate = (dateInput: Date | string) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const formatDuration = (minutes?: number | null) => {
    if (minutes === null || minutes === undefined) return "Belirtilmemiş"
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours} saat ${mins} dakika` : `${mins} dakika`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Sertifika Doğrulama</h1>
          <p className="text-muted-foreground">Aşağıda sertifika bilgileri görüntülenmektedir</p>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className={`text-white ${isValid ? "bg-green-500" : "bg-red-500"}`}>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {isValid ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                {isValid ? "Geçerli Sertifika" : "Geçersiz Sertifika"}
              </CardTitle>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {certificate.status === "ACTIVE" ? "Aktif" : "Pasif"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Certificate Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">SERTİFİKA NUMARASI</h3>
                <p className="font-mono text-lg">{certificate.certificateNumber}</p>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">DOĞRULAMA KODU</h3>
                <p className="font-mono text-lg">{certificate.verificationCode}</p>
              </div>
            </div>

            <hr />

            {/* Student Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">KATILIMCI</h3>
                  <p className="text-lg font-medium">{certificate.user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">KURS</h3>
                  <p className="text-lg font-medium">{certificate.course.title}</p>
                  <p className="text-sm text-muted-foreground">Eğitmen: {certificate.course.instructor}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">TARİHLER</h3>
                  <p className="text-sm">
                    <span className="font-medium">Tamamlanma:</span> {formatDate(certificate.completedAt)}
                  </p>
                  {certificate.issuedAt && (
                    <p className="text-sm">
                      <span className="font-medium">Düzenlenme:</span> {formatDate(certificate.issuedAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              {certificate.grade !== null && (
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Award className="h-6 w-6 mx-auto mb-1 text-green-600" />
                  <p className="text-sm text-green-800 font-medium">Başarı Notu</p>
                  <p className="text-xl font-bold text-green-600">{certificate.grade}/100</p>
                </div>
              )}

              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <BookOpen className="h-6 w-6 mx-auto mb-1 text-blue-600" />
                <p className="text-sm text-blue-800 font-medium">Kurs Süresi</p>
                <p className="text-lg font-semibold text-blue-600">{formatDuration(certificate.course.duration)}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Bu sertifika ARTENPRENEUR tarafından düzenlenmiş ve dijital imza ile güvence altına alınmıştır.
              </p>
              <p className="text-xs text-muted-foreground mt-1">Doğrulama tarihi: {formatDate(new Date())}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}