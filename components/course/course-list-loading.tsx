import { Card, CardContent } from "@/components/ui/card"

interface CourseListLoadingProps {
  count?: number
  title?: string
}

export default function CourseListLoading({ count = 9, title }: CourseListLoadingProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20 mb-8 rounded-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="h-12 w-64 bg-white/20 rounded mx-auto animate-pulse" />
            <div className="h-6 w-96 bg-white/20 rounded mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* Title */}
      {title && (
        <div className="mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
        </div>
      )}

      {/* Course Grid Skeleton */}
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
    </div>
  )
}
