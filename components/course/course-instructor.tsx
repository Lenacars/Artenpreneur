import Image from "next/image"
import { getInstructorImage } from "@/lib/getInstructorImage"

interface CourseInstructorProps {
  instructor: {
    name: string
    image?: string
  }
}

export default function CourseInstructor({ instructor }: CourseInstructorProps) {
  const instructorImage = getInstructorImage(instructor.name)

  return (
    <div className="flex items-center space-x-2 mb-3">
      <div className="relative w-8 h-8 rounded-full overflow-hidden">
        <Image src={instructor.image || instructorImage} alt={instructor.name} fill className="object-cover" />
      </div>
      <span className="text-sm text-gray-600 font-medium">{instructor.name}</span>
    </div>
  )
}
