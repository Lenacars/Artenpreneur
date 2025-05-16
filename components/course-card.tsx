import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getInstructorImage } from "@/lib/getInstructorImage" // ← yeni

interface CourseCardProps {
  id: string
  title: string
  instructor: string
  price: string
}

export default function CourseCard({ id, title, instructor, price }: CourseCardProps) {
  return (
    <div className="flex flex-col transition-all duration-200 hover:shadow-md hover:border hover:border-primary hover:bg-primary-light/10">
      {/* --- Eğitmen fotoğrafı --- */}
      <div className="relative aspect-[4/3] bg-gray-200">
        <Image
          src={getInstructorImage(instructor) || "/placeholder.svg"} // /images/instructors/sanat_deliorman.webp
          alt={instructor}
          fill // <div> relative olduğundan tüm alanı kaplar
          className="object-cover"
          sizes="(min-width:768px) 33vw, 100vw" // responsive
          priority={false}
        />
      </div>

      {/* --- Eğitmen adı: turkuaz şerit --- */}
      <div className="bg-[#b2e4e6] py-2 px-4">
        <p className="text-sm font-medium truncate">{instructor}</p>
      </div>

      {/* --- Eğitim bilgileri --- */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-6">{title}</h3>

        <div className="mt-auto flex justify-between items-center">
          <span className="font-bold">{price}</span>

          <Link href={`/egitim-detay/${id}`}>
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary-foreground hover:bg-primary-light"
            >
              Ayrıntıları Görüntüle
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
