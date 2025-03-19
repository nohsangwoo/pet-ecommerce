import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DeliveryLoading() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">배송 관리</h1>

      {/* 배송 현황 요약 스켈레톤 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={`skeleton-card-${i}`}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-12 mb-1" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 검색 및 필터 스켈레톤 */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Skeleton className="h-10 flex-1" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[180px]" />
        </div>
      </div>

      {/* 탭 스켈레톤 */}
      <Skeleton className="h-10 w-full mb-6" />

      {/* 테이블 스켈레톤 */}
      <div className="rounded-md border">
        <div className="h-12 border-b bg-gray-50 px-4 flex items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <Skeleton key={`header-${i}`} className="h-4 flex-1 mx-2" />
          ))}
        </div>
        <div className="divide-y">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={`row-${i}`} className="px-4 py-4 flex items-center">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((j) => (
                <Skeleton key={`cell-${i}-${j}`} className="h-4 flex-1 mx-2" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

