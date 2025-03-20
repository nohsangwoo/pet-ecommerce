import { MainNav } from "@/components/main-nav"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  동물병원 쇼핑몰에 오신 것을 환영합니다
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  수의사가 추천하는 고품질 반려동물 제품을 만나보세요
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg">상품 둘러보기</Button>
                </Link>
                <Link href="/requests">
                  <Button variant="outline" size="lg">
                    상품 요청하기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">추천 상품</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground">동물병원에서 추천하는 상품</p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* Product cards would go here */}
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 동물병원몰. 모든 권리 보유.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              이용약관
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              개인정보 처리방침
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProductCard() {
  return (
    <div className="group relative overflow-hidden rounded-lg border">
      <div className="aspect-square overflow-hidden">
        <img
          src="/products/1.webp"
          alt="Product"
          className="object-cover transition-transform group-hover:scale-105"
          width={400}
          height={400}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">반려동물 약품</h3>
        <p className="text-sm text-muted-foreground">수의사 처방</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-medium">₩25,000</span>
          <span className="text-xs text-muted-foreground">재고 있음</span>
        </div>
        <Button className="mt-3 w-full" size="sm">
          장바구니에 추가
        </Button>
      </div>
    </div>
  )
}

