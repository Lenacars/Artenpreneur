import { Skeleton } from "@/components/ui/skeleton"

export default function CourseInstructorSkeleton() {
  return (
    <div className="flex items-center space-x-2 mb-3">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-4 w-24" />
    </div>
  )
}
