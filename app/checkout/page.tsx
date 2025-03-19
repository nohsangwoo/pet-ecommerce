"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, CreditCard, Truck, MapPin, AlertCircle } from "lucide-react"

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState("motorcycle")
  const [showCourierWarning, setShowCourierWarning] = useState(false)

  // Simulate checking delivery distance
  const handleDeliveryMethodChange = (value) => {
    setDeliveryMethod(value)
    // Simulate a case where the distance is over 10km
    const distanceOver10km = true
    if (value === "motorcycle" && distanceOver10km) {
      setShowCourierWarning(true)
    } else {
      setShowCourierWarning(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <ShoppingBag className="h-6 w-6" />
            <span>동물병원몰</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/account">
              <Button variant="ghost">내 계정</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">결제</h1>
                <p className="text-muted-foreground">주문 완료하기</p>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">연락처 정보</h2>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">이름</Label>
                    <Input id="name" placeholder="이름을 입력하세요" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input id="email" type="email" placeholder="이메일을 입력하세요" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">전화번호</Label>
                    <Input id="phone" placeholder="전화번호를 입력하세요" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">배송 정보</h2>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="address">주소</Label>
                    <Input id="address" placeholder="주소를 입력하세요" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="city">도시</Label>
                      <Input id="city" placeholder="도시" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="postal-code">우편번호</Label>
                      <Input id="postal-code" placeholder="우편번호" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>배송 방법</Label>
                    <RadioGroup defaultValue="motorcycle" onValueChange={handleDeliveryMethodChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="motorcycle" id="motorcycle" />
                        <Label htmlFor="motorcycle" className="flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          오토바이 배송 (10km 이내)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="courier" id="courier" />
                        <Label htmlFor="courier" className="flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          택배 서비스 (10km 이상)
                        </Label>
                      </div>
                    </RadioGroup>
                    {showCourierWarning && (
                      <div className="flex items-center gap-2 text-amber-500 bg-amber-50 p-3 rounded-md text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <p>배송지가 10km 이상 떨어져 있습니다. 택배 서비스를 선택해주세요.</p>
                      </div>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="special-instructions">배송 요청사항 (선택사항)</Label>
                    <Input id="special-instructions" placeholder="특별한 배송 요청사항" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">결제 정보</h2>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>결제 방법</Label>
                    <RadioGroup defaultValue="card">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          신용/체크카드
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank">계좌이체</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="card-number">카드 번호</Label>
                    <Input id="card-number" placeholder="카드 번호 입력" />
                  </div>
                  <div className="grid grid-cols-2 gap-4"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">만료일</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="CVC" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>주문 요약</CardTitle>
                <CardDescription>주문 전 상품을 확인하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md bg-muted">
                        <img
                          src="/placeholder.svg?height=64&width=64"
                          alt="Product"
                          className="h-full w-full object-cover"
                          width={64}
                          height={64}
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium">프리미엄 반려동물 사료</h3>
                        <p className="text-sm text-muted-foreground">수량: 1</p>
                      </div>
                      <div className="font-medium">₩35,000</div>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">소계</span>
                    <span>₩105,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">배송비</span>
                    <span>₩3,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">세금</span>
                    <span>₩10,500</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>합계</span>
                    <span>₩118,500</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">
                  주문하기
                </Button>
              </CardFooter>
            </Card>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p>
                  배송 출발지: <span className="font-medium">서울 동물병원</span>
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">도움이 필요하신가요?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  주문에 관한 문의사항은 담당 동물병원이나 고객 지원팀에 문의하세요.
                </p>
                <Button variant="outline" className="w-full">
                  고객 지원 문의
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

