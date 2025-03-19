"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Clock,
  CreditCard,
  Download,
  Filter,
  LineChart,
  PieChart,
  Search,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// 가상의 매출 데이터
const salesData = {
  summary: {
    totalSales: 12580000,
    orderCount: 342,
    averageOrder: 36784,
    comparisonPeriod: {
      totalSales: 10450000,
      orderCount: 298,
      averageOrder: 35067,
    },
  },
  dailySales: [
    { date: "2024-03-14", sales: 420000, orders: 12 },
    { date: "2024-03-15", sales: 380000, orders: 10 },
    { date: "2024-03-16", sales: 520000, orders: 15 },
    { date: "2024-03-17", sales: 480000, orders: 13 },
    { date: "2024-03-18", sales: 350000, orders: 9 },
    { date: "2024-03-19", sales: 430000, orders: 11 },
    { date: "2024-03-20", sales: 390000, orders: 10 },
  ],
  topProducts: [
    { id: 1, name: "프리미엄 강아지 사료", sales: 1850000, quantity: 37, growth: 12.5 },
    { id: 2, name: "고양이 자동 급식기", sales: 1240000, quantity: 31, growth: 8.2 },
    { id: 3, name: "반려동물 건강검진 패키지", sales: 980000, quantity: 14, growth: 15.8 },
    { id: 4, name: "강아지 장난감 세트", sales: 720000, quantity: 48, growth: -3.2 },
    { id: 5, name: "고양이 화장실", sales: 680000, quantity: 17, growth: 5.7 },
  ],
  categorySales: [
    { category: "사료/간식", sales: 3850000, percentage: 30.6 },
    { category: "의료/건강", sales: 2980000, percentage: 23.7 },
    { category: "용품", sales: 2450000, percentage: 19.5 },
    { category: "서비스", sales: 1980000, percentage: 15.7 },
    { category: "의류/악세서리", sales: 1320000, percentage: 10.5 },
  ],
  recentOrders: [
    {
      id: "ORD-2024-0342",
      customer: "김지민",
      date: "2024-03-20T14:30:00",
      total: 85000,
      status: "completed",
      items: 3,
      payment: "card",
    },
    {
      id: "ORD-2024-0341",
      customer: "이승우",
      date: "2024-03-20T11:15:00",
      total: 42000,
      status: "completed",
      items: 2,
      payment: "card",
    },
    {
      id: "ORD-2024-0340",
      customer: "박소연",
      date: "2024-03-19T16:45:00",
      total: 128000,
      status: "completed",
      items: 4,
      payment: "transfer",
    },
    {
      id: "ORD-2024-0339",
      customer: "최준호",
      date: "2024-03-19T10:20:00",
      total: 36000,
      status: "completed",
      items: 1,
      payment: "card",
    },
    {
      id: "ORD-2024-0338",
      customer: "정다은",
      date: "2024-03-18T15:10:00",
      total: 94000,
      status: "completed",
      items: 3,
      payment: "card",
    },
  ],
  paymentMethods: [
    { method: "신용카드", count: 245, percentage: 71.6 },
    { method: "계좌이체", count: 58, percentage: 17.0 },
    { method: "간편결제", count: 32, percentage: 9.4 },
    { method: "기타", count: 7, percentage: 2.0 },
  ],
  orderTimes: [
    { time: "오전 (06:00-12:00)", count: 87, percentage: 25.4 },
    { time: "오후 (12:00-18:00)", count: 156, percentage: 45.6 },
    { time: "저녁 (18:00-24:00)", count: 92, percentage: 26.9 },
    { time: "심야 (00:00-06:00)", count: 7, percentage: 2.1 },
  ],
  yearlyTarget: {
    target: 150000000,
    current: 38500000,
    percentage: 25.7,
  },
}

// 기간 옵션
const periodOptions = [
  { value: "today", label: "오늘" },
  { value: "yesterday", label: "어제" },
  { value: "this-week", label: "이번 주" },
  { value: "last-week", label: "지난 주" },
  { value: "this-month", label: "이번 달" },
  { value: "last-month", label: "지난 달" },
  { value: "this-year", label: "올해" },
  { value: "last-year", label: "작년" },
  { value: "custom", label: "사용자 지정" },
]

export default function SalesPage() {
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState("this-month")
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCustomPeriod, setIsCustomPeriod] = useState(false)
  const [customStartDate, setCustomStartDate] = useState("")
  const [customEndDate, setCustomEndDate] = useState("")

  // 숫자 포맷팅 (천 단위 콤마)
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  // 성장률에 따른 배지 색상
  const getGrowthBadge = (growth) => {
    if (growth > 0) {
      return (
        <Badge className="bg-green-500 text-white">
          <ArrowUp className="h-3 w-3 mr-1" />
          {growth}%
        </Badge>
      )
    } else if (growth < 0) {
      return (
        <Badge className="bg-red-500 text-white">
          <ArrowDown className="h-3 w-3 mr-1" />
          {Math.abs(growth)}%
        </Badge>
      )
    } else {
      return <Badge variant="outline">0%</Badge>
    }
  }

  // 주문 상태에 따른 배지 색상
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">완료</Badge>
      case "processing":
        return <Badge className="bg-blue-500">처리중</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">취소됨</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // 결제 방법에 따른 아이콘
  const getPaymentIcon = (method) => {
    switch (method) {
      case "card":
        return <CreditCard className="h-4 w-4 mr-1" />
      case "transfer":
        return <ArrowDown className="h-4 w-4 mr-1" />
      default:
        return <CreditCard className="h-4 w-4 mr-1" />
    }
  }

  // 기간 변경 처리
  const handlePeriodChange = (value) => {
    setSelectedPeriod(value)
    setIsCustomPeriod(value === "custom")
  }

  // 사용자 지정 기간 적용
  const applyCustomPeriod = () => {
    console.log("사용자 지정 기간 적용:", customStartDate, customEndDate)
    // 실제 구현에서는 API 호출로 데이터 가져오기
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">매출 데이터</h1>
          <p className="text-muted-foreground mt-1">매출 현황과 추세를 분석하고 비즈니스 인사이트를 얻으세요</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="기간 선택" />
            </SelectTrigger>
            <SelectContent>
              {periodOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            내보내기
          </Button>
        </div>
      </div>

      {isCustomPeriod && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-end gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="start-date">시작일</Label>
                <Input
                  type="date"
                  id="start-date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="end-date">종료일</Label>
                <Input
                  type="date"
                  id="end-date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                />
              </div>
              <Button onClick={applyCustomPeriod}>적용</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="products">상품 분석</TabsTrigger>
          <TabsTrigger value="orders">주문 내역</TabsTrigger>
          <TabsTrigger value="insights">인사이트</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* 매출 요약 */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 매출</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(salesData.summary.totalSales)}원</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {salesData.summary.totalSales > salesData.summary.comparisonPeriod.totalSales ? (
                    <span className="text-green-500 flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      {Math.round(
                        (salesData.summary.totalSales / salesData.summary.comparisonPeriod.totalSales - 1) * 100,
                      )}
                      % 증가
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      {Math.round(
                        (1 - salesData.summary.totalSales / salesData.summary.comparisonPeriod.totalSales) * 100,
                      )}
                      % 감소
                    </span>
                  )}
                  <span className="text-muted-foreground"> 지난 기간 대비</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">주문 수</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(salesData.summary.orderCount)}건</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {salesData.summary.orderCount > salesData.summary.comparisonPeriod.orderCount ? (
                    <span className="text-green-500 flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      {Math.round(
                        (salesData.summary.orderCount / salesData.summary.comparisonPeriod.orderCount - 1) * 100,
                      )}
                      % 증가
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      {Math.round(
                        (1 - salesData.summary.orderCount / salesData.summary.comparisonPeriod.orderCount) * 100,
                      )}
                      % 감소
                    </span>
                  )}
                  <span className="text-muted-foreground"> 지난 기간 대비</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">평균 주문 금액</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(salesData.summary.averageOrder)}원</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {salesData.summary.averageOrder > salesData.summary.comparisonPeriod.averageOrder ? (
                    <span className="text-green-500 flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      {Math.round(
                        (salesData.summary.averageOrder / salesData.summary.comparisonPeriod.averageOrder - 1) * 100,
                      )}
                      % 증가
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      {Math.round(
                        (1 - salesData.summary.averageOrder / salesData.summary.comparisonPeriod.averageOrder) * 100,
                      )}
                      % 감소
                    </span>
                  )}
                  <span className="text-muted-foreground"> 지난 기간 대비</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">연간 목표 진행률</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{salesData.yearlyTarget.percentage}%</div>
                <Progress value={salesData.yearlyTarget.percentage} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  목표: {formatNumber(salesData.yearlyTarget.target)}원
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 일별 매출 추이 */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>일별 매출 추이</CardTitle>
              <CardDescription>최근 7일간의 일별 매출 및 주문 추이</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <LineChart className="h-16 w-16 text-muted-foreground" />
                <span className="ml-4 text-muted-foreground">차트 데이터 시각화 영역</span>
              </div>
            </CardContent>
          </Card>

          {/* 카테고리별 매출 & 결제 방법 */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>카테고리별 매출</CardTitle>
                <CardDescription>상품 카테고리별 매출 비중</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <PieChart className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  {salesData.categorySales.map((category) => (
                    <div key={category.category} className="flex items-center">
                      <div className="w-1/3 font-medium truncate">{category.category}</div>
                      <div className="w-1/3 text-right">{formatNumber(category.sales)}원</div>
                      <div className="w-1/3 pl-4">
                        <div className="flex items-center">
                          <Progress value={category.percentage} className="h-2 flex-1 mr-2" />
                          <span className="text-xs text-muted-foreground w-10 text-right">{category.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>결제 방법 분석</CardTitle>
                <CardDescription>결제 방법별 주문 비중</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <PieChart className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  {salesData.paymentMethods.map((method) => (
                    <div key={method.method} className="flex items-center">
                      <div className="w-1/3 font-medium truncate">{method.method}</div>
                      <div className="w-1/3 text-right">{method.count}건</div>
                      <div className="w-1/3 pl-4">
                        <div className="flex items-center">
                          <Progress value={method.percentage} className="h-2 flex-1 mr-2" />
                          <span className="text-xs text-muted-foreground w-10 text-right">{method.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 최근 주문 */}
          <Card>
            <CardHeader>
              <CardTitle>최근 주문</CardTitle>
              <CardDescription>최근 5건의 주문 내역</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>주문번호</TableHead>
                    <TableHead>고객명</TableHead>
                    <TableHead>날짜</TableHead>
                    <TableHead>금액</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>결제방법</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{formatNumber(order.total)}원</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="flex items-center">
                        {getPaymentIcon(order.payment)}
                        <span>
                          {order.payment === "card"
                            ? "카드"
                            : order.payment === "transfer"
                              ? "계좌이체"
                              : order.payment}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setActiveTab("orders")}>
                모든 주문 보기
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          {/* 상품별 매출 */}
          <Card>
            <CardHeader>
              <CardTitle>상품별 매출</CardTitle>
              <CardDescription>매출이 높은 상위 상품 목록</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>상품명</TableHead>
                    <TableHead className="text-right">판매량</TableHead>
                    <TableHead className="text-right">매출액</TableHead>
                    <TableHead className="text-right">성장률</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.topProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-right">{product.quantity}개</TableCell>
                      <TableCell className="text-right">{formatNumber(product.sales)}원</TableCell>
                      <TableCell className="text-right">{getGrowthBadge(product.growth)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 카테고리별 매출 상세 */}
          <Card>
            <CardHeader>
              <CardTitle>카테고리별 매출 상세</CardTitle>
              <CardDescription>상품 카테고리별 매출 및 비중</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-6">
                <PieChart className="h-32 w-32 text-muted-foreground" />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>카테고리</TableHead>
                    <TableHead className="text-right">매출액</TableHead>
                    <TableHead className="text-right">비중</TableHead>
                    <TableHead>추이</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.categorySales.map((category) => (
                    <TableRow key={category.category}>
                      <TableCell className="font-medium">{category.category}</TableCell>
                      <TableCell className="text-right">{formatNumber(category.sales)}원</TableCell>
                      <TableCell className="text-right">{category.percentage}%</TableCell>
                      <TableCell>
                        <Progress value={category.percentage} className="h-2 w-[100px]" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          {/* 주문 필터링 */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="주문번호, 고객명 검색..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="주문 상태" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">모든 상태</SelectItem>
                    <SelectItem value="completed">완료</SelectItem>
                    <SelectItem value="processing">처리중</SelectItem>
                    <SelectItem value="cancelled">취소됨</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="결제 방법" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">모든 결제방법</SelectItem>
                    <SelectItem value="card">카드</SelectItem>
                    <SelectItem value="transfer">계좌이체</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  필터 적용
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 주문 목록 */}
          <Card>
            <CardHeader>
              <CardTitle>주문 내역</CardTitle>
              <CardDescription>모든 주문 내역을 확인하고 관리하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>주문번호</TableHead>
                    <TableHead>고객명</TableHead>
                    <TableHead>날짜</TableHead>
                    <TableHead>상품 수</TableHead>
                    <TableHead className="text-right">금액</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>결제방법</TableHead>
                    <TableHead className="text-right">액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{order.items}개</TableCell>
                      <TableCell className="text-right">{formatNumber(order.total)}원</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="flex items-center">
                        {getPaymentIcon(order.payment)}
                        <span>
                          {order.payment === "card"
                            ? "카드"
                            : order.payment === "transfer"
                              ? "계좌이체"
                              : order.payment}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          상세보기
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">총 5개 중 1-5 표시</div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  이전
                </Button>
                <Button variant="outline" size="sm" disabled>
                  다음
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          {/* 매출 인사이트 */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>주문 시간대 분석</CardTitle>
                <CardDescription>시간대별 주문 비중</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <Clock className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  {salesData.orderTimes.map((time) => (
                    <div key={time.time} className="flex items-center">
                      <div className="w-1/3 font-medium truncate">{time.time}</div>
                      <div className="w-1/3 text-right">{time.count}건</div>
                      <div className="w-1/3 pl-4">
                        <div className="flex items-center">
                          <Progress value={time.percentage} className="h-2 flex-1 mr-2" />
                          <span className="text-xs text-muted-foreground w-10 text-right">{time.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>매출 성장 분석</CardTitle>
                <CardDescription>기간별 매출 성장률</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground" />
                  <span className="ml-4 text-muted-foreground">차트 데이터 시각화 영역</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 추천 액션 */}
          <Card>
            <CardHeader>
              <CardTitle>데이터 기반 추천 액션</CardTitle>
              <CardDescription>매출 데이터를 기반으로 한 비즈니스 개선 제안</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">오후 시간대 프로모션 강화</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      오후(12:00-18:00) 시간대에 주문이 가장 많습니다. 이 시간대에 특별 프로모션을 진행하여 매출을 더
                      증가시킬 수 있습니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">의료/건강 카테고리 확장</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      의료/건강 카테고리의 성장률이 높습니다. 이 카테고리의 상품 라인업을 확장하여 추가 매출 기회를
                      창출하세요.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">고객 충성도 프로그램 도입</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      반복 구매 고객의 비율이 증가하고 있습니다. 충성도 프로그램을 도입하여 이러한 고객들의 지속적인
                      구매를 장려하세요.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

