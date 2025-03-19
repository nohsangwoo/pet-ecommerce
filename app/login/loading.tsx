import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function LoginLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="mb-6">
        <Skeleton className="h-[120px] w-full rounded-lg" />
      </div>

      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-8 w-1/2 mx-auto" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-4 w-1/3" />
          </div>
          <Skeleton className="h-10 w-full" />

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center">
              <Skeleton className="h-px w-full" />
              <div className="px-2">
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-px w-full" />
            </div>

            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Skeleton className="h-4 w-3/4" />
        </CardFooter>
      </Card>
    </div>
  )
}

