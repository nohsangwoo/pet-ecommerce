"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Plus,
  MoreVertical,
  ArrowUpDown,
  RefreshCw,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Truck,
} from "lucide-react"

// 발주 데이터 타입 정의
interface OrderItem {
  id: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

interface Order {
  id: string
  orderNumber: string
  supplier: string
  status: "pending" | "approved" | "shipped" | "delivered" | "cancelled"
  totalAmount: number
  items: OrderItem[]
  createdAt: string
  expectedDelivery: string
  notes: string
}

// 샘플 발주 데이터
const sampleOrders: Order[] = [
  {
    id: "1",
    orderNumber: "PO-2024-0001",
    supplier: "펫푸드코리아",
    status: "delivered",
    totalAmount: 1250000,
    items: [
      {
        id: "1-1",
        productName: "프리미엄 강아지 사료",
        quantity: 20,
        unitPrice: 45000,
        totalPrice: 900000,
      },
      {
        id: "1-2",
        productName: "고양이 사료",
        quantity: 10,
        unitPrice: 35000,
        totalPrice: 350000,
      },
    ],
    createdAt: "2024-03-01",
    expectedDelivery: "2024-03-08",
    notes: "월간 정기 발주",
  },
  {
    id: "2",
    orderNumber: "PO-2024-0002",
    supplier: "펫토이즈",
    status: "shipped",
    totalAmount: 450000,
    items: [
      {
        id: "2-1",
        productName: "고양이 장난감 세트",
        quantity: 15,
        unitPrice: 15000,
        totalPrice: 225000,
      },
      {
        id: "2-2",
        productName: "강아지 장난감 세트",
        quantity: 15,
        unitPrice: 15000,
        totalPrice: 225000,
      },
    ],
    createdAt: "2024-03-05",
    expectedDelivery: "2024-03-12",
    notes: "",
  },
  {
    id: "3",
    orderNumber: "PO-2024-0003",
    supplier: "펫헬스케어",
    status: "approved",
    totalAmount: 875000,
    items: [
      {
        id: "3-1",
        productName: "반려동물 영양제",
        quantity: 25,
        unitPrice: 35000,
        totalPrice: 875000,
      },
    ],
    createdAt: "2024-03-10",
    expectedDelivery: "2024-03-17",
    notes: "긴급 발주",
  },
  {
    id: "4",
    orderNumber: "PO-2024-0004",
    supplier: "펫클린",
    status: "pending",
    totalAmount: 540000,
    items: [
      {
        id: "4-1",
        productName: "강아지 샴푸",
        quantity: 30,
        unitPrice: 18000,
        totalPrice: 540000,
      },
    ],
    createdAt: "2024-03-15",
    expectedDelivery: "2024-03-22",
    notes: "",
  },
  {
    id: "5",
    orderNumber: "PO-2024-0005",
    supplier: "펫라이프",
    status: "cancelled",
    totalAmount: 500000,
    items: [
      {
        id: "5-1",
        productName: "고양이 화장실",
        quantity: 20,
        unitPrice: 25000,
        totalPrice: 500000,
      },
    ],
    createdAt: "2024-03-18",
    expectedDelivery: "2024-03-25",
    notes: "공급업체 재고 부족으로 취소",
  },
]

// 공급업체 목록
const suppliers = ["전체", "펫푸드코리아", "펫토이즈", "펫헬스케어", "펫클린", "펫라이프", "펫스낵", "펫패션"]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSupplier, setSelectedSupplier] = useState("전체")
  const [selectedStatus, setSelectedStatus] = useState("전체")
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false)
  const [isViewOrderOpen, setIsViewOrderOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Order | null
    direction: "ascending" | "descending" | null
  }>({ key: null, direction: null })

  // 발주 필터링
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSupplier = selectedSupplier === "전체" || order.supplier === selectedSupplier

    const matchesStatus =
      selectedStatus === "전체" ||
      (selectedStatus === "승인대기" && order.status === "pending") ||
      (selectedStatus === "승인완료" && order.status === "approved") ||
      (selectedStatus === "배송중" && order.status === "shipped") ||
      (selectedStatus === "배송완료" && order.status === "delivered") ||
      (selectedStatus === "취소" && order.status === "cancelled")

    return matchesSearch && matchesSupplier && matchesStatus
  })

  // 정렬 처리
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.direction) return 0

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  // 정렬 토글
  const requestSort = (key: keyof Order) => {
    let direction: "ascending" | "descending" | null = "ascending"

    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending"
      } else if (sortConfig.direction === "descending") {
        direction = null
      }
    }

    setSortConfig({ key, direction })
  }

  // 발주 상태에 따른 배지 색상 및 아이콘
  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-yellow-500 text-yellow-500">
            <Clock className="h-3 w-3" />
            승인대기
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-blue-500 text-blue-500">
            <CheckCircle className="h-3 w-3" />
            승인완료
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-purple-500 text-purple-500">
            <Truck className="h-3 w-3" />
            배송중
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-green-500 text-green-500">
            <CheckCircle className="h-3 w-3" />
            배송완료
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-red-500 text-red-500">
            <XCircle className="h-3 w-3" />
            취소
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />알 수 없음
          </Badge>
        )
    }
  }

  // 발주 승인
  const handleApproveOrder = (id: string) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status: "approved" } : order)))
  }

  // 발주 취소
  const handleCancelOrder = (id: string) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status: "cancelled" } : order)))
  }

  // 발주 배송 상태 변경
  const handleShippedOrder = (id: string) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status: "shipped" } : order)))
  }

  // 발주 배송 완료
  const handleDeliveredOrder = (id: string) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status: "delivered" } : order)))
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">발주 관리</h1>
          <p className="text-muted-foreground">제품 발주를 관리하고 상태를 추적하세요.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            보고서
          </Button>
          <Button onClick={() => setIsAddOrderOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            발주 생성
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="pending">승인대기</TabsTrigger>
          <TabsTrigger value="approved">승인완료</TabsTrigger>
          <TabsTrigger value="shipped">배송중</TabsTrigger>
          <TabsTrigger value="delivered">배송완료</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex w-full md:w-96 items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="발주번호, 공급업체 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="공급업체" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier} value={supplier}>
                          {supplier}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="상태" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="전체">전체</SelectItem>
                      <SelectItem value="승인대기">승인대기</SelectItem>
                      <SelectItem value="승인완료">승인완료</SelectItem>
                      <SelectItem value="배송중">배송중</SelectItem>
                      <SelectItem value="배송완료">배송완료</SelectItem>
                      <SelectItem value="취소">취소</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => requestSort("orderNumber")}>
                        <div className="flex items-center">
                          발주번호
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => requestSort("supplier")}>
                        <div className="flex items-center">
                          공급업체
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => requestSort("totalAmount")}>
                        <div className="flex items-center">
                          총 금액
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => requestSort("createdAt")}>
                        <div className="flex items-center">
                          발주일
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => requestSort("expectedDelivery")}>
                        <div className="flex items-center">
                          예상 배송일
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          검색 결과가 없습니다.
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell className="font-medium">
                            <Button
                              variant="link"
                              className="p-0 h-auto font-medium"
                              onClick={() => {
                                setCurrentOrder(order)
                                setIsViewOrderOpen(true)
                              }}
                            >
                              {order.orderNumber}
                            </Button>
                          </TableCell>
                          <TableCell>{order.supplier}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>{order.totalAmount.toLocaleString()}원</TableCell>
                          <TableCell>{order.createdAt}</TableCell>
                          <TableCell>{order.expectedDelivery}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>작업</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setCurrentOrder(order)
                                    setIsViewOrderOpen(true)
                                  }}
                                >
                                  <FileText className="h-4 w-4 mr-2" />
                                  상세 보기
                                </DropdownMenuItem>
                                {order.status === "pending" && (
                                  <DropdownMenuItem onClick={() => handleApproveOrder(order.id)}>
                                    <CheckCircle className="h-4 w-4 mr-2 text-blue-500" />
                                    <span className="text-blue-500">승인</span>
                                  </DropdownMenuItem>
                                )}
                                {order.status === "approved" && (
                                  <DropdownMenuItem onClick={() => handleShippedOrder(order.id)}>
                                    <Truck className="h-4 w-4 mr-2 text-purple-500" />
                                    <span className="text-purple-500">배송중으로 변경</span>
                                  </DropdownMenuItem>
                                )}
                                {order.status === "shipped" && (
                                  <DropdownMenuItem onClick={() => handleDeliveredOrder(order.id)}>
                                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                    <span className="text-green-500">배송완료로 변경</span>
                                  </DropdownMenuItem>
                                )}
                                {(order.status === "pending" || order.status === "approved") && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleCancelOrder(order.id)}>
                                      <XCircle className="h-4 w-4 mr-2 text-destructive" />
                                      <span className="text-destructive">취소</span>
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                총 {sortedOrders.length}개 발주 중 {sortedOrders.length}개 표시
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 다른 탭 콘텐츠는 유사하므로 생략 */}
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>승인대기 발주</CardTitle>
              <CardDescription>승인이 필요한 발주 목록입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead>발주번호</TableHead>
                      <TableHead>공급업체</TableHead>
                      <TableHead>총 금액</TableHead>
                      <TableHead>발주일</TableHead>
                      <TableHead>예상 배송일</TableHead>
                      <TableHead className="text-right">관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders
                      .filter((order) => order.status === "pending")
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell className="font-medium">
                            <Button
                              variant="link"
                              className="p-0 h-auto font-medium"
                              onClick={() => {
                                setCurrentOrder(order)
                                setIsViewOrderOpen(true)
                              }}
                            >
                              {order.orderNumber}
                            </Button>
                          </TableCell>
                          <TableCell>{order.supplier}</TableCell>
                          <TableCell>{order.totalAmount.toLocaleString()}원</TableCell>
                          <TableCell>{order.createdAt}</TableCell>
                          <TableCell>{order.expectedDelivery}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApproveOrder(order.id)}
                                className="text-blue-500 border-blue-500 hover:bg-blue-50"
                              >
                                승인
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCancelOrder(order.id)}
                                className="text-destructive border-destructive hover:bg-red-50"
                              >
                                취소
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 발주 상세 보기 다이얼로그 */}
      <Dialog open={isViewOrderOpen} onOpenChange={setIsViewOrderOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>발주 상세 정보</DialogTitle>
            <DialogDescription>발주 번호: {currentOrder?.orderNumber}</DialogDescription>
          </DialogHeader>
          {currentOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">공급업체</p>
                  <p className="font-medium">{currentOrder.supplier}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">상태</p>
                  <div>{getStatusBadge(currentOrder.status)}</div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">총 금액</p>
                  <p className="font-medium">{currentOrder.totalAmount.toLocaleString()}원</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">발주일</p>
                  <p>{currentOrder.createdAt}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">예상 배송일</p>
                  <p>{currentOrder.expectedDelivery}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">메모</p>
                  <p>{currentOrder.notes || "-"}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">발주 항목</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>제품명</TableHead>
                        <TableHead className="text-right">수량</TableHead>
                        <TableHead className="text-right">단가</TableHead>
                        <TableHead className="text-right">금액</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.productName}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">{item.unitPrice.toLocaleString()}원</TableCell>
                          <TableCell className="text-right">{item.totalPrice.toLocaleString()}원</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">
                          총 합계
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {currentOrder.totalAmount.toLocaleString()}원
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="space-x-2">
                  {currentOrder.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleCancelOrder(currentOrder.id)
                          setIsViewOrderOpen(false)
                        }}
                        className="text-destructive border-destructive hover:bg-red-50"
                      >
                        발주 취소
                      </Button>
                      <Button
                        onClick={() => {
                          handleApproveOrder(currentOrder.id)
                          setIsViewOrderOpen(false)
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        발주 승인
                      </Button>
                    </>
                  )}
                  {currentOrder.status === "approved" && (
                    <Button
                      onClick={() => {
                        handleShippedOrder(currentOrder.id)
                        setIsViewOrderOpen(false)
                      }}
                      className="bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      배송중으로 변경
                    </Button>
                  )}
                  {currentOrder.status === "shipped" && (
                    <Button
                      onClick={() => {
                        handleDeliveredOrder(currentOrder.id)
                        setIsViewOrderOpen(false)
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      배송완료로 변경
                    </Button>
                  )}
                </div>
                <Button variant="outline" onClick={() => setIsViewOrderOpen(false)}>
                  닫기
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 발주 생성 다이얼로그 */}
      <Dialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>새 발주 생성</DialogTitle>
            <DialogDescription>새로운 발주 정보를 입력하세요.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="order-supplier">공급업체</Label>
                <Select>
                  <SelectTrigger id="order-supplier">
                    <SelectValue placeholder="공급업체 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.slice(1).map((supplier) => (
                      <SelectItem key={supplier} value={supplier}>
                        {supplier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="order-expected-delivery">예상 배송일</Label>
                <Input id="order-expected-delivery" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order-notes">메모</Label>
                <Textarea id="order-notes" placeholder="발주에 대한 메모를 입력하세요" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>발주 항목</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    항목 추가
                  </Button>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>제품명</TableHead>
                        <TableHead className="text-right">수량</TableHead>
                        <TableHead className="text-right">단가</TableHead>
                        <TableHead className="text-right">금액</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="제품 선택" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="product1">프리미엄 강아지 사료</SelectItem>
                              <SelectItem value="product2">고양이 장난감 세트</SelectItem>
                              <SelectItem value="product3">반려동물 영양제</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <Input type="number" defaultValue="1" min="1" className="w-16 ml-auto" />
                        </TableCell>
                        <TableCell className="text-right">45,000원</TableCell>
                        <TableCell className="text-right">45,000원</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">
                          총 합계
                        </TableCell>
                        <TableCell className="text-right font-bold">45,000원</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOrderOpen(false)}>
              취소
            </Button>
            <Button>발주 생성</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

