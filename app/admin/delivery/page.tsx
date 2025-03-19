"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Search,
  Filter,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  FileText,
  Edit,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// 배송 상태 타입
type DeliveryStatus = "preparing" | "in_transit" | "delivered" | "delayed" | "cancelled"

// 배송 정보 타입
interface DeliveryItem {
  id: string
  orderId: string
  customerName: string
  customerPhone: string
  address: string
  status: DeliveryStatus
  carrier: string
  trackingNumber: string
  orderDate: string
  shippedDate: string | null
  deliveredDate: string | null
  items: {
    name: string
    quantity: number
    price: number
  }[]
  totalAmount: number
  notes: string | null
}

// 배송 상태 표시 함수
const getStatusBadge = (status: DeliveryStatus) => {
  switch (status) {
    case "preparing":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          배송준비중
        </Badge>
      )
    case "in_transit":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          배송중
        </Badge>
      )
    case "delivered":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          배송완료
        </Badge>
      )
    case "delayed":
      return (
        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
          배송지연
        </Badge>
      )
    case "cancelled":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          배송취소
        </Badge>
      )
  }
}

// 배송 상태 한글 표시
const getStatusText = (status: DeliveryStatus) => {
  switch (status) {
    case "preparing":
      return "배송준비중"
    case "in_transit":
      return "배송중"
    case "delivered":
      return "배송완료"
    case "delayed":
      return "배송지연"
    case "cancelled":
      return "배송취소"
  }
}

// 샘플 배송 데이터
const sampleDeliveries: DeliveryItem[] = [
  {
    id: "DEL-001",
    orderId: "ORD-001",
    customerName: "김철수",
    customerPhone: "010-1234-5678",
    address: "서울시 강남구 테헤란로 123, 456동 789호",
    status: "preparing",
    carrier: "CJ대한통운",
    trackingNumber: "",
    orderDate: "2023-03-15",
    shippedDate: null,
    deliveredDate: null,
    items: [
      { name: "강아지 사료 10kg", quantity: 1, price: 45000 },
      { name: "강아지 간식 세트", quantity: 2, price: 15000 },
    ],
    totalAmount: 75000,
    notes: null,
  },
  {
    id: "DEL-002",
    orderId: "ORD-002",
    customerName: "이영희",
    customerPhone: "010-9876-5432",
    address: "부산시 해운대구 해운대로 456, 101동 202호",
    status: "in_transit",
    carrier: "롯데택배",
    trackingNumber: "LOTTE123456789",
    orderDate: "2023-03-14",
    shippedDate: "2023-03-16",
    deliveredDate: null,
    items: [
      { name: "고양이 사료 5kg", quantity: 1, price: 35000 },
      { name: "고양이 모래 10L", quantity: 1, price: 20000 },
    ],
    totalAmount: 55000,
    notes: "문 앞에 놓아주세요",
  },
  {
    id: "DEL-003",
    orderId: "ORD-003",
    customerName: "박민수",
    customerPhone: "010-5555-7777",
    address: "인천시 연수구 연수동 789-10",
    status: "delivered",
    carrier: "한진택배",
    trackingNumber: "HANJIN987654321",
    orderDate: "2023-03-13",
    shippedDate: "2023-03-14",
    deliveredDate: "2023-03-17",
    items: [
      { name: "강아지 장난감 세트", quantity: 1, price: 25000 },
      { name: "강아지 샴푸", quantity: 2, price: 18000 },
    ],
    totalAmount: 61000,
    notes: null,
  },
  {
    id: "DEL-004",
    orderId: "ORD-004",
    customerName: "정수진",
    customerPhone: "010-2222-3333",
    address: "대전시 유성구 유성대로 123-45",
    status: "delayed",
    carrier: "우체국택배",
    trackingNumber: "POST123456789",
    orderDate: "2023-03-12",
    shippedDate: "2023-03-13",
    deliveredDate: null,
    items: [{ name: "고양이 캣타워", quantity: 1, price: 89000 }],
    totalAmount: 89000,
    notes: "배송 지연으로 고객 문의 있었음",
  },
  {
    id: "DEL-005",
    orderId: "ORD-005",
    customerName: "최지훈",
    customerPhone: "010-8888-9999",
    address: "광주시 서구 상무대로 567-8",
    status: "cancelled",
    carrier: "로젠택배",
    trackingNumber: "LOGEN123456789",
    orderDate: "2023-03-11",
    shippedDate: null,
    deliveredDate: null,
    items: [
      { name: "강아지 옷 M사이즈", quantity: 2, price: 22000 },
      { name: "강아지 신발 세트", quantity: 1, price: 15000 },
    ],
    totalAmount: 59000,
    notes: "고객 요청으로 취소",
  },
  {
    id: "DEL-006",
    orderId: "ORD-006",
    customerName: "한미영",
    customerPhone: "010-3333-4444",
    address: "대구시 수성구 수성로 234-56",
    status: "preparing",
    carrier: "CJ대한통운",
    trackingNumber: "",
    orderDate: "2023-03-16",
    shippedDate: null,
    deliveredDate: null,
    items: [
      { name: "고양이 화장실", quantity: 1, price: 35000 },
      { name: "고양이 모래 5L", quantity: 2, price: 12000 },
    ],
    totalAmount: 59000,
    notes: null,
  },
  {
    id: "DEL-007",
    orderId: "ORD-007",
    customerName: "송재민",
    customerPhone: "010-7777-8888",
    address: "울산시 남구 삼산로 789-10",
    status: "in_transit",
    carrier: "CJ대한통운",
    trackingNumber: "CJ987654321",
    orderDate: "2023-03-15",
    shippedDate: "2023-03-17",
    deliveredDate: null,
    items: [
      { name: "강아지 목줄 세트", quantity: 1, price: 28000 },
      { name: "강아지 사료 5kg", quantity: 1, price: 32000 },
    ],
    totalAmount: 60000,
    notes: "경비실에 맡겨주세요",
  },
  {
    id: "DEL-008",
    orderId: "ORD-008",
    customerName: "임서연",
    customerPhone: "010-4444-5555",
    address: "세종시 한누리대로 123-45",
    status: "delivered",
    carrier: "롯데택배",
    trackingNumber: "LOTTE987654321",
    orderDate: "2023-03-14",
    shippedDate: "2023-03-15",
    deliveredDate: "2023-03-18",
    items: [
      { name: "고양이 스크래쳐", quantity: 1, price: 18000 },
      { name: "고양이 장난감 세트", quantity: 1, price: 15000 },
      { name: "고양이 간식", quantity: 3, price: 5000 },
    ],
    totalAmount: 48000,
    notes: null,
  },
]

// 배송 상세 정보 컴포넌트
const DeliveryDetail = ({
  delivery,
  onStatusChange,
}: {
  delivery: DeliveryItem
  onStatusChange: (id: string, status: DeliveryStatus) => void
}) => {
  const [trackingNumber, setTrackingNumber] = useState(delivery.trackingNumber)
  const [notes, setNotes] = useState(delivery.notes || "")

  return (
    <div className="space-y-6">
      {/* 배송 상태 및 기본 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Package className="mr-2 h-5 w-5" /> 배송 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">배송 상태</span>
              <div className="flex items-center gap-2">
                {getStatusBadge(delivery.status)}
                <Select
                  defaultValue={delivery.status}
                  onValueChange={(value) => onStatusChange(delivery.id, value as DeliveryStatus)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="상태 변경" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preparing">배송준비중</SelectItem>
                    <SelectItem value="in_transit">배송중</SelectItem>
                    <SelectItem value="delivered">배송완료</SelectItem>
                    <SelectItem value="delayed">배송지연</SelectItem>
                    <SelectItem value="cancelled">배송취소</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">주문 번호</span>
              <span>{delivery.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">주문 일자</span>
              <span>{delivery.orderDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">발송 일자</span>
              <span>{delivery.shippedDate || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">배송 완료 일자</span>
              <span>{delivery.deliveredDate || "-"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <User className="mr-2 h-5 w-5" /> 고객 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">고객명</span>
              <span>{delivery.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">연락처</span>
              <span>{delivery.customerPhone}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium mb-1">배송지 주소</span>
              <span className="text-right">{delivery.address}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 택배사 및 운송장 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Truck className="mr-2 h-5 w-5" /> 택배 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">택배사</span>
            <Select defaultValue={delivery.carrier}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="택배사 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CJ대한통운">CJ대한통운</SelectItem>
                <SelectItem value="롯데택배">롯데택배</SelectItem>
                <SelectItem value="한진택배">한진택배</SelectItem>
                <SelectItem value="우체국택배">우체국택배</SelectItem>
                <SelectItem value="로젠택배">로젠택배</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="tracking">운송장 번호</Label>
            <div className="flex gap-2">
              <Input
                id="tracking"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="운송장 번호 입력"
              />
              <Button variant="outline">저장</Button>
              {trackingNumber && (
                <Button variant="outline">
                  <a
                    href={`https://tracker.delivery/#/${delivery.carrier}/${trackingNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> 배송조회
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 주문 상품 목록 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <FileText className="mr-2 h-5 w-5" /> 주문 상품
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>상품명</TableHead>
                <TableHead className="text-right">수량</TableHead>
                <TableHead className="text-right">가격</TableHead>
                <TableHead className="text-right">소계</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {delivery.items.map((item, index) => (
                <TableRow key={`item-${delivery.id}-${index}`}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.price.toLocaleString()}원</TableCell>
                  <TableCell className="text-right">{(item.quantity * item.price).toLocaleString()}원</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-bold">
                  총 금액
                </TableCell>
                <TableCell className="text-right font-bold">{delivery.totalAmount.toLocaleString()}원</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 배송 메모 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Edit className="mr-2 h-5 w-5" /> 배송 메모
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="배송 관련 메모를 입력하세요"
            rows={3}
          />
          <Button className="mt-2" variant="outline">
            메모 저장
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// 배송 테이블 컴포넌트
const DeliveryTable = ({
  deliveries,
  onViewDetail,
}: {
  deliveries: DeliveryItem[]
  onViewDetail: (delivery: DeliveryItem) => void
}) => {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedDeliveries = [...deliveries].sort((a, b) => {
    if (!sortField) return 0

    let aValue: any = a[sortField as keyof DeliveryItem]
    let bValue: any = b[sortField as keyof DeliveryItem]

    if (aValue === null) aValue = ""
    if (bValue === null) bValue = ""

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return sortDirection === "asc" ? (aValue > bValue ? 1 : -1) : aValue < bValue ? 1 : -1
  })

  const SortableHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort(field)}>
      <div className="flex items-center">
        {children}
        {sortField === field ? (
          sortDirection === "asc" ? (
            <ChevronUp className="ml-1 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-1 h-4 w-4" />
          )
        ) : (
          <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
        )}
      </div>
    </TableHead>
  )

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader field="id">배송 번호</SortableHeader>
            <SortableHeader field="orderId">주문 번호</SortableHeader>
            <SortableHeader field="customerName">고객명</SortableHeader>
            <TableHead>배송지</TableHead>
            <SortableHeader field="status">상태</SortableHeader>
            <SortableHeader field="carrier">택배사</SortableHeader>
            <TableHead>운송장 번호</TableHead>
            <SortableHeader field="orderDate">주문일</SortableHeader>
            <TableHead>상세</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedDeliveries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4">
                배송 정보가 없습니다
              </TableCell>
            </TableRow>
          ) : (
            sortedDeliveries.map((delivery) => (
              <TableRow key={`delivery-row-${delivery.id}`}>
                <TableCell className="font-medium">{delivery.id}</TableCell>
                <TableCell>{delivery.orderId}</TableCell>
                <TableCell>{delivery.customerName}</TableCell>
                <TableCell className="max-w-[200px] truncate">{delivery.address}</TableCell>
                <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                <TableCell>{delivery.carrier}</TableCell>
                <TableCell>
                  {delivery.trackingNumber ? (
                    <a
                      href={`https://tracker.delivery/#/${delivery.carrier}/${delivery.trackingNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {delivery.trackingNumber}
                    </a>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>{delivery.orderDate}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => onViewDetail(delivery)}>
                    상세보기
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

// 메인 배송관리 페이지 컴포넌트
export default function DeliveryPage() {
  const [mounted, setMounted] = useState(false)
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [carrierFilter, setCarrierFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryItem | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    // 실제 구현에서는 API 호출로 대체
    setDeliveries(sampleDeliveries)
    setMounted(true)

    return () => setMounted(false)
  }, [])

  // 배송 상태 변경 핸들러
  const handleStatusChange = (id: string, newStatus: DeliveryStatus) => {
    setDeliveries((prev) =>
      prev.map((delivery) =>
        delivery.id === id
          ? {
              ...delivery,
              status: newStatus,
              shippedDate:
                newStatus === "in_transit" && !delivery.shippedDate
                  ? new Date().toISOString().split("T")[0]
                  : delivery.shippedDate,
              deliveredDate:
                newStatus === "delivered" && !delivery.deliveredDate
                  ? new Date().toISOString().split("T")[0]
                  : delivery.deliveredDate,
            }
          : delivery,
      ),
    )

    // 선택된 배송 정보도 업데이트
    if (selectedDelivery && selectedDelivery.id === id) {
      setSelectedDelivery((prev) =>
        prev
          ? {
              ...prev,
              status: newStatus,
              shippedDate:
                newStatus === "in_transit" && !prev.shippedDate
                  ? new Date().toISOString().split("T")[0]
                  : prev.shippedDate,
              deliveredDate:
                newStatus === "delivered" && !prev.deliveredDate
                  ? new Date().toISOString().split("T")[0]
                  : prev.deliveredDate,
            }
          : null,
      )
    }
  }

  // 배송 상세 정보 보기
  const handleViewDetail = (delivery: DeliveryItem) => {
    setSelectedDelivery(delivery)
    setIsDetailOpen(true)
  }

  // 필터링된 배송 목록
  const filteredDeliveries = deliveries.filter((delivery) => {
    // 검색어 필터링
    const searchMatch =
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (delivery.trackingNumber && delivery.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()))

    // 상태 필터링
    const statusMatch = statusFilter === "all" || delivery.status === statusFilter

    // 택배사 필터링
    const carrierMatch = carrierFilter === "all" || delivery.carrier === carrierFilter

    // 탭 필터링
    let tabMatch = true
    if (activeTab === "preparing") {
      tabMatch = delivery.status === "preparing"
    } else if (activeTab === "in_transit") {
      tabMatch = delivery.status === "in_transit"
    } else if (activeTab === "delivered") {
      tabMatch = delivery.status === "delivered"
    } else if (activeTab === "issues") {
      tabMatch = delivery.status === "delayed" || delivery.status === "cancelled"
    }

    return searchMatch && statusMatch && carrierMatch && tabMatch
  })

  // 배송 상태별 카운트
  const statusCounts = {
    all: deliveries.length,
    preparing: deliveries.filter((d) => d.status === "preparing").length,
    in_transit: deliveries.filter((d) => d.status === "in_transit").length,
    delivered: deliveries.filter((d) => d.status === "delivered").length,
    issues: deliveries.filter((d) => d.status === "delayed" || d.status === "cancelled").length,
  }

  // 택배사 목록
  const carriers = Array.from(new Set(deliveries.map((d) => d.carrier)))

  if (!mounted) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">배송 관리</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={`skeleton-card-${i}`} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="bg-gray-100 h-96 rounded-md animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">배송 관리</h1>

      {/* 배송 현황 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className={cn("transition-all hover:shadow-md", activeTab === "all" ? "border-primary" : "")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">전체 배송</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.all}</div>
            <p className="text-xs text-muted-foreground mt-1">모든 배송 건수</p>
          </CardContent>
        </Card>
        <Card className={cn("transition-all hover:shadow-md", activeTab === "preparing" ? "border-primary" : "")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">배송준비중</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.preparing}</div>
            <p className="text-xs text-muted-foreground mt-1">배송 준비 중인 주문</p>
          </CardContent>
        </Card>
        <Card className={cn("transition-all hover:shadow-md", activeTab === "in_transit" ? "border-primary" : "")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">배송중</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.in_transit}</div>
            <p className="text-xs text-muted-foreground mt-1">현재 배송 중인 주문</p>
          </CardContent>
        </Card>
        <Card
          className={cn(
            "transition-all hover:shadow-md",
            activeTab === "delivered" || activeTab === "issues" ? "border-primary" : "",
          )}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">배송완료/문제</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statusCounts.delivered}/{statusCounts.issues}
            </div>
            <p className="text-xs text-muted-foreground mt-1">배송완료 및 문제 발생</p>
          </CardContent>
        </Card>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="배송번호, 주문번호, 고객명, 운송장번호 검색"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="배송 상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 상태</SelectItem>
              <SelectItem value="preparing">배송준비중</SelectItem>
              <SelectItem value="in_transit">배송중</SelectItem>
              <SelectItem value="delivered">배송완료</SelectItem>
              <SelectItem value="delayed">배송지연</SelectItem>
              <SelectItem value="cancelled">배송취소</SelectItem>
            </SelectContent>
          </Select>

          <Select value={carrierFilter} onValueChange={setCarrierFilter}>
            <SelectTrigger className="w-[180px]">
              <Truck className="mr-2 h-4 w-4" />
              <SelectValue placeholder="택배사" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 택배사</SelectItem>
              {carriers.map((carrier) => (
                <SelectItem key={`carrier-${carrier}`} value={carrier}>
                  {carrier}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 배송 상태별 탭 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="all" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            전체 ({statusCounts.all})
          </TabsTrigger>
          <TabsTrigger value="preparing" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            배송준비중 ({statusCounts.preparing})
          </TabsTrigger>
          <TabsTrigger value="in_transit" className="flex items-center">
            <Truck className="mr-2 h-4 w-4" />
            배송중 ({statusCounts.in_transit})
          </TabsTrigger>
          <TabsTrigger value="delivered" className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" />
            배송완료 ({statusCounts.delivered})
          </TabsTrigger>
          <TabsTrigger value="issues" className="flex items-center">
            <AlertCircle className="mr-2 h-4 w-4" />
            문제/취소 ({statusCounts.issues})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <DeliveryTable deliveries={filteredDeliveries} onViewDetail={handleViewDetail} />
        </TabsContent>

        <TabsContent value="preparing" className="mt-4">
          <DeliveryTable deliveries={filteredDeliveries} onViewDetail={handleViewDetail} />
        </TabsContent>

        <TabsContent value="in_transit" className="mt-4">
          <DeliveryTable deliveries={filteredDeliveries} onViewDetail={handleViewDetail} />
        </TabsContent>

        <TabsContent value="delivered" className="mt-4">
          <DeliveryTable deliveries={filteredDeliveries} onViewDetail={handleViewDetail} />
        </TabsContent>

        <TabsContent value="issues" className="mt-4">
          <DeliveryTable deliveries={filteredDeliveries} onViewDetail={handleViewDetail} />
        </TabsContent>
      </Tabs>

      {/* 배송 상세 정보 모달 */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>배송 상세 정보 - {selectedDelivery?.id}</DialogTitle>
          </DialogHeader>
          {selectedDelivery && <DeliveryDetail delivery={selectedDelivery} onStatusChange={handleStatusChange} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

