// app/egitim/[slug]/page.tsx

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth" // @/app/api/auth/[...nextauth]/route yerine @/lib/auth'dan import ediyoruz

interface Props {
  params: {
    slug: string
  }
}

export default async function VideoPage({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/giris")
  }

  // Prisma sorguları için alternatif yaklaşım
  try {
    // Video bilgilerini al
    const videoData = await prisma.$queryRaw`
      SELECT id, title, description, url as "videoUrl" 
      FROM "Video" 
      WHERE id = ${params.slug}
    `

    const video = Array.isArray(videoData) && videoData.length > 0 ? videoData[0] : null

    if (!video) {
      return (
        <div className="text-center mt-20">
          <h2 className="text-xl font-semibold text-red-600">Video bulunamadı</h2>
          <p className="mt-2">Geçerli bir eğitim sayfası değil.</p>
        </div>
      )
    }

    // Satın alma bilgilerini al
    const purchaseData = await prisma.$queryRaw`
      SELECT p.id 
      FROM "Purchase" p
      JOIN "User" u ON p."userId" = u.id
      WHERE u.email = ${session.user?.email || ""} 
      AND p."videoId" = ${video.id}
    `

    const purchase = Array.isArray(purchaseData) && purchaseData.length > 0 ? purchaseData[0] : null

    if (!purchase) {
      return (
        <div className="text-center mt-20">
          <h2 className="text-xl font-semibold text-red-600">Erişim Reddedildi</h2>
          <p className="mt-2">
            Bu videoya erişim izniniz bulunmuyor. Satın almak için{" "}
            <a href="/egitimler" className="text-primary underline">
              buraya tıklayın
            </a>
            .
          </p>
        </div>
      )
    }

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
        <p className="mb-4 text-gray-600">{video.description}</p>
        <video controls className="w-full rounded" src={video.videoUrl} />
      </div>
    )
  } catch (error) {
    console.error("Video sayfası yüklenirken hata:", error)
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold text-red-600">Bir hata oluştu</h2>
        <p className="mt-2">Video yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.</p>
      </div>
    )
  }
}
