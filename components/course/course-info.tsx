import { Clock, Users, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CourseInfoProps {
  title: string
  duration?: string
  studentCount?: number
  rating?: number
  level?: string
  category?: string
}

export default function CourseInfo({ title, duration, studentCount, rating, level, category }: CourseInfoProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      {/* Course stats */}
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        {duration && (
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        )}

        {studentCount && (
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{studentCount} öğrenci</span>
          </div>
        )}

        {rating && (
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="flex items-center space-x-2">
        {level && (
          <Badge variant="secondary" className="text-xs">
            {level}
          </Badge>
        )}
        {category && (
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        )}
      </div>
    </div>
  )
}
