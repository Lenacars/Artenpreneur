import { Skeleton } from "@/components/ui/skeleton"

export default function CartLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Skeleton className="h-8 w-48 mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-8 w-32" />
            </div>

            <div className="divide-y">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 flex items-start">
                  <Skeleton className="w-20 h-20 rounded-md flex-shrink-0 mr-4" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-3" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Skeleton className="h-7 w-32 mb-4" />

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>

              <Skeleton className="h-px w-full my-2" />

              <div className="flex justify-between">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex mb-2">
                <Skeleton className="h-10 w-full rounded-r-none" />
                <Skeleton className="h-10 w-24 rounded-l-none" />
              </div>
              <Skeleton className="h-3 w-48" />
            </div>

            <Skeleton className="h-10 w-full mb-2" />

            <div className="mt-4">
              <Skeleton className="h-3 w-48 mx-auto mb-1" />
              <Skeleton className="h-3 w-32 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
