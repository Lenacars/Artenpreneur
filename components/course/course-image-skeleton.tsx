import { Skeleton } from "@/components/ui/skeleton"

export default function CourseImageSkeleton() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
      <Skeleton className="h-full w-full" />

      {/* Play button skeleton */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>

      {/* Duration badge skeleton */}
      <div className="absolute bottom-2 right-2">
        <Skeleton className="h-6 w-16 rounded" />
      </div>
    </div>
  )
}
