import { Card, CardContent } from "@/components/ui/card"

interface CourseGridSkeletonProps {
  count?: number
}

export default function CourseGridSkeleton({ count = 6 }: CourseGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="aspect-video bg-gray-200 animate-pulse" />
          <CardContent className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
