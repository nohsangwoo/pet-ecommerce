"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ShoppingBag,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Package,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"

// 주문 상태에 따른 배지 스타일 및 아이콘
const getStatusBadge = (status: string) => {
  switch (status) {
    case "배송 완료":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          배송 완료
        </Badge>
      )
    case "배송 중":
      return (
        <Badge className="bg-blue-500 hover:bg-blue-600">
          <Truck className="h-3 w-3 mr-1" />
          배송 중
        </Badge>
      )
    case "처리 중":
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600">
          <Clock className="h-3 w-3 mr-1" />
          처리 중
        </Badge>
      )
    case "취소됨":
      return (
        <Badge className="bg-red-500 hover:bg-red-600">
          <XCircle className="h-3 w-3 mr-1" />
          취소됨
        </Badge>
      )
    default:
      return (
        <Badge variant="outline">
          <AlertCircle className="h-3 w-3 mr-1" />
          {status}
        </Badge>
      )
  }
}

// 샘플 주문 데이터
const orders = [
  {
    id: "ORD-2023-1001",
    date: "2023-11-15",
    status: "배송 완료",
    total: 78000,
    hospital: "서울 동물병원",
    items: [
      { name: "프리미엄 강아지 사료", quantity: 1, price: 35000 },
      { name: "반려동물 영양제", quantity: 2, price: 15000 },
      { name: "치석 제거 간식", quantity: 1, price: 13000 },
    ],
  },
  {
    id: "ORD-2023-0985",
    date: "2023-11-10",
    status: "배송 중",
    total: 52000,
    hospital: "서울 동물병원",
    items: [
      { name: "고양이 전용 사료", quantity: 1, price: 42000 },
      { name: "캣닢 장난감", quantity: 2, price: 5000 },
    ],
  },
  {
    id: "ORD-2023-0954",
    date: "2023-11-05",
    status: "처리 중",
    total: 65000,
    hospital: "서울 동물병원",
    items: [
      { name: "강아지 구충제", quantity: 1, price: 25000 },
      { name: "피부 관리 샴푸", quantity: 1, price: 18000 },
      { name: "반려동물 브러쉬", quantity: 1, price: 12000 },
      { name: "치석 제거 간식", quantity: 1, price: 10000 },
    ],
  },
  {
    id: "ORD-2023-0932",
    date: "2023-10-28",
    status: "취소됨",
    total: 45000,
    hospital: "서울 동물병원",
    items: [{ name: "강아지 관절 영양제", quantity: 1, price: 45000 }],
  },
  {
    id: "ORD-2023-0901",
    date: "2023-10-20",
    status: "배송 완료",
    total: 87000,
    hospital: "서울 동물병원",
    items: [
      { name: "프리미엄 고양이 사료", quantity: 1, price: 48000 },
      { name: "고양이 화장실", quantity: 1, price: 25000 },
      { name: "모래 스쿱", quantity: 1, price: 8000 },
      { name: "고양이 장난감 세트", quantity: 1, price: 6000 },
    ],
  },
]

// 주문 목록 컴포넌트
function OrdersList({ orders, expandedOrder, toggleOrderDetails }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">주문 내역이 없습니다</h3>
        <p className="text-muted-foreground mt-1 mb-4">선택한 필터에 해당하는 주문이 없습니다.</p>
        <Link href="/products">
          <Button>상품 둘러보기</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden">
          <CardHeader className="p-4 pb-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base font-medium">주문번호: {order.id}</CardTitle>
                <p className="text-sm text-muted-foreground">주문일: {order.date}</p>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(order.status)}
                <span className="font-medium">₩{order.total.toLocaleString()}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span>
                  <span className="font-medium">{order.hospital}</span>에서 배송
                </span>
              </div>
              <Button variant="ghost" size="sm" className="mt-2 md:mt-0" onClick={() => toggleOrderDetails(order.id)}>
                {expandedOrder === order.id ? "상세 정보 닫기" : "상세 정보 보기"}
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform ${expandedOrder === order.id ? "rotate-180" : ""}`}
                />
              </Button>
            </div>

            {expandedOrder === order.id && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">주문 상품</h4>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                          <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">수량: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">₩{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center">
                  <span className="font-medium">총 금액</span>
                  <span className="font-bold">₩{order.total.toLocaleString()}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">
                    주문 상세 보기
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                  {order.status === "배송 완료" && (
                    <Button size="sm" variant="outline">
                      리뷰 작성하기
                    </Button>
                  )}
                  {order.status === "처리 중" && (
                    <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                      주문 취소
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    문의하기
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function OrdersPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
    } else {
      setExpandedOrder(orderId)
    }
  }

  // 선택된 탭에 따라 주문 필터링
  const getFilteredOrders = () => {
    if (selectedTab === "all") return orders
    if (selectedTab === "completed") return orders.filter((order) => order.status === "배송 완료")
    if (selectedTab === "processing")
      return orders.filter((order) => order.status === "처리 중" || order.status === "배송 중")
    if (selectedTab === "cancelled") return orders.filter((order) => order.status === "취소됨")
    return orders
  }

  const filteredOrders = getFilteredOrders()

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">주문 내역</h1>
            <p className="text-muted-foreground">지난 주문 내역을 확인하고 관리하세요.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>필터</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium" htmlFor="search-orders">
                      주문 검색
                    </label>
                    <div className="flex mt-1">
                      <Input id="search-orders" placeholder="주문번호 검색..." className="rounded-r-none" />
                      <Button variant="outline" className="rounded-l-none">
                        <Search className="h-4 w-4" />
                        <span className="sr-only">검색</span>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">날짜 범위</label>
                    <Select defaultValue="all-time">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="모든 기간" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-time">모든 기간</SelectItem>
                        <SelectItem value="last-month">지난 달</SelectItem>
                        <SelectItem value="last-3-months">지난 3개월</SelectItem>
                        <SelectItem value="last-6-months">지난 6개월</SelectItem>
                        <SelectItem value="last-year">지난 1년</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">정렬 기준</label>
                    <Select defaultValue="newest">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="최신순" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">최신순</SelectItem>
                        <SelectItem value="oldest">오래된순</SelectItem>
                        <SelectItem value="price-high">가격: 높은순</SelectItem>
                        <SelectItem value="price-low">가격: 낮은순</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    필터 적용
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-3/4">
              <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">전체</TabsTrigger>
                  <TabsTrigger value="processing">처리 중</TabsTrigger>
                  <TabsTrigger value="completed">완료</TabsTrigger>
                  <TabsTrigger value="cancelled">취소</TabsTrigger>
                </TabsList>
                <div className="mt-4">
                  <OrdersList
                    orders={filteredOrders}
                    expandedOrder={expandedOrder}
                    toggleOrderDetails={toggleOrderDetails}
                  />
                </div>
              </Tabs>

              {filteredOrders.length > 0 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-muted-foreground">총 {filteredOrders.length}개의 주문이 있습니다</p>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      이전
                    </Button>
                    <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                      1
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      다음
                    </Button>
                  </div>
                </div>
              )}
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

