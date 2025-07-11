import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AccountLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-6 w-px" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader className="text-center pb-4">
                <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
                <Skeleton className="h-6 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-40 mx-auto mb-2" />
                <Skeleton className="h-5 w-16 mx-auto" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <Skeleton className="h-10 w-full" />
              <Card className="shadow-lg">
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-5 w-40" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-9 w-32" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
