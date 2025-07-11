import { Skeleton } from "@/components/ui/skeleton"

export default function CourseInfoSkeleton() {
  return (
    <div className="space-y-3">
      {/* Title skeleton */}
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-3/4" />

      {/* Stats skeleton */}
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex items-center space-x-1">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex items-center space-x-1">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Price and button skeleton */}
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-9 w-32" />
      </div>
    </div>
  )
}
