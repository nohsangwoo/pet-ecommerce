import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CartLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="h-8 bg-gray-200 rounded-md w-1/3 mb-4 animate-pulse"></div>
            <Separator className="mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={`loading-item-${i}`} className="flex items-center py-4 border-b animate-pulse">
                  <div className="h-24 w-24 bg-gray-200 rounded-md mr-4"></div>
                  <div className="flex-grow">
                    <div className="h-5 bg-gray-200 rounded-md w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-1/4 mb-2"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-8 w-24 bg-gray-200 rounded-md mr-4"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div>
          <Card className="p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded-md w-1/2 mb-4"></div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/5"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded-md w-1/5"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/6"></div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between mb-6">
              <div className="h-5 bg-gray-200 rounded-md w-1/4"></div>
              <div className="h-5 bg-gray-200 rounded-md w-1/3"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded-md w-full"></div>
          </Card>
        </div>
      </div>
    </div>
  )
}

