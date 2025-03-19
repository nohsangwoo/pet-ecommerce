import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-10 w-[400px]" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-2" />
                  <Skeleton className="h-5 w-48" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-2/3 mt-1" />
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="flex flex-col">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex flex-col">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-8 mr-2" />
                    <Skeleton className="h-2 flex-1" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-8 mr-2" />
                    <Skeleton className="h-2 flex-1" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex items-center w-full">
                <Skeleton className="h-5 w-16 mr-2" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-32 ml-auto" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

