import CourseListLoading from "@/components/course/course-list-loading"

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="h-12 w-3/4 bg-white/20 rounded mx-auto animate-pulse" />
            <div className="h-6 w-1/2 bg-white/20 rounded mx-auto animate-pulse" />
            <div className="h-12 w-48 bg-white/20 rounded mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* Featured Courses Skeleton */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>

          <CourseListLoading count={6} />
        </div>
      </div>
    </div>
  )
}
