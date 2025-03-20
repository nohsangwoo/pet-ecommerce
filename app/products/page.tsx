import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter } from "lucide-react"

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">상품 필터링</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium" htmlFor="search">
                      검색
                    </label>
                    <div className="flex mt-1">
                      <Input id="search" placeholder="상품 검색..." className="rounded-r-none" />
                      <Button variant="outline" className="rounded-l-none">
                        <Search className="h-4 w-4" />
                        <span className="sr-only">검색</span>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">카테고리</label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="모든 카테고리" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 카테고리</SelectItem>
                        <SelectItem value="medication">약품</SelectItem>
                        <SelectItem value="food">반려동물 사료</SelectItem>
                        <SelectItem value="supplements">영양제</SelectItem>
                        <SelectItem value="accessories">액세서리</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">가격 범위</label>
                    <div className="pt-4 pb-2">
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">₩0</span>
                      <span className="text-sm">₩100,000</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">재고 상태</label>
                    <Select defaultValue="in-stock">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="재고 있음" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 상품</SelectItem>
                        <SelectItem value="in-stock">재고 있음</SelectItem>
                        <SelectItem value="out-of-stock">품절</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    필터 적용
                  </Button>
                </div>
              </div>
            </div>
            <div className="md:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">상품</h1>
                <Select defaultValue="featured">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="정렬 기준" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">추천순</SelectItem>
                    <SelectItem value="price-low">가격: 낮은순</SelectItem>
                    <SelectItem value="price-high">가격: 높은순</SelectItem>
                    <SelectItem value="newest">최신순</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <ProductCard key={i} />
                ))}
              </div>
              <div className="flex items-center justify-center mt-8">
                <Button variant="outline" size="sm" className="mx-1">
                  이전
                </Button>
                <Button variant="outline" size="sm" className="mx-1 bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm" className="mx-1">
                  2
                </Button>
                <Button variant="outline" size="sm" className="mx-1">
                  3
                </Button>
                <Button variant="outline" size="sm" className="mx-1">
                  다음
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 동물병원몰. 모든 권리 보유.
          </p>
        </div>
      </footer>
    </div>
  )
}

function ProductCard() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <img
          src="/products/2.webp"
          alt="Product"
          className="object-cover w-full h-full"
          width={300}
          height={300}
        />
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">재고 있음</div>
      </div>
      <CardHeader className="p-4 pb-0">
        <h3 className="font-semibold text-lg">프리미엄 반려동물 사료</h3>
        <p className="text-sm text-muted-foreground">수의사 추천</p>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center justify-between">
          <span className="font-medium">₩35,000</span>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★★★★</span>
            <span className="text-xs text-muted-foreground">(24)</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">장바구니에 추가</Button>
      </CardFooter>
    </Card>
  )
}

