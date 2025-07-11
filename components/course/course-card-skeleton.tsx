import CourseImageSkeleton from "./course-image-skeleton"
import CourseInstructorSkeleton from "./course-instructor-skeleton"
import CourseInfoSkeleton from "./course-info-skeleton"

export default function CourseCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <CourseImageSkeleton />

      <div className="p-4">
        <CourseInstructorSkeleton />
        <CourseInfoSkeleton />
      </div>
    </div>
  )
}
