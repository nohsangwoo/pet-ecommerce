"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  ShoppingBag,
  Users,
  CreditCard,
  Package,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  QrCode,
  Tag,
  Calendar,
  Clock,
} from "lucide-react"

// Sample data for charts
const salesData = [
  { name: "Mon", sales: 120000 },
  { name: "Tue", sales: 160000 },
  { name: "Wed", sales: 180000 },
  { name: "Thu", sales: 140000 },
  { name: "Fri", sales: 200000 },
  { name: "Sat", sales: 240000 },
  { name: "Sun", sales: 190000 },
]

const productData = [
  { name: "Pet Food", value: 40 },
  { name: "Medication", value: 30 },
  { name: "Supplements", value: 20 },
  { name: "Accessories", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function HospitalDashboardPage() {
  const [isShopOpen, setIsShopOpen] = useState(true)
  const [isAutoSchedule, setIsAutoSchedule] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-muted fixed inset-y-0">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/hospital-dashboard" className="flex items-center gap-2 font-semibold">
            <Hospital className="h-6 w-6" />
            <span>병원 대시보드</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Link
              href="/hospital-dashboard"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <LayoutDashboard className="h-5 w-5" />
              대시보드
            </Link>
            <Link
              href="/hospital-dashboard/products"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Package className="h-5 w-5" />
              상품
            </Link>
            <Link
              href="/hospital-dashboard/orders"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingBag className="h-5 w-5" />
              주문
            </Link>
            <Link
              href="/hospital-dashboard/customers"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-5 w-5" />
              고객
            </Link>
            <Link
              href="/hospital-dashboard/promotions"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Tag className="h-5 w-5" />
              프로모션
            </Link>
            <Link
              href="/hospital-dashboard/qr-codes"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <QrCode className="h-5 w-5" />
              QR 코드
            </Link>
            <Link
              href="/hospital-dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Settings className="h-5 w-5" />
              설정
            </Link>
          </nav>
        </div>
        <div className="border-t p-4">
          <div className="flex items-center gap-4">
            <img
              src="/placeholder.svg?height=40&width=40"
              width={40}
              height={40}
              className="rounded-full"
              alt="Hospital profile"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">서울 동물병원</span>
              <span className="text-xs text-muted-foreground">병원 관리자</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">로그아웃</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">메뉴 토글</span>
          </Button>
          <div className="flex items-center gap-2 md:ml-auto">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">알림</span>
            </Button>
            <Button variant="outline" size="sm" className="md:hidden">
              <LogOut className="h-5 w-5 mr-2" />
              로그아웃
            </Button>
          </div>
        </header>
        <main className="grid gap-6 p-4 md:p-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">대시보드</h1>
            <div className="ml-auto flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="shop-status" checked={isShopOpen} onCheckedChange={setIsShopOpen} />
                <Label htmlFor="shop-status" className="font-medium">
                  {isShopOpen ? "매장 열림" : "매장 닫힘"}
                </Label>
              </div>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                이번 주
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">총 수익</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₩1,230,000</div>
                <p className="text-xs text-muted-foreground">지난달 대비 +12.5%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">주문</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+48</div>
                <p className="text-xs text-muted-foreground">지난달 대비 +8.2%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">고객</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+124</div>
                <p className="text-xs text-muted-foreground">지난달 대비 +5.7%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">활성 상품</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">86</div>
                <p className="text-xs text-muted-foreground">이번 주 +2개 신규 상품</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>주간 매출</CardTitle>
                <CardDescription>매장의 주간 매출 성과 개요</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₩${value.toLocaleString()}`, "매출"]} />
                    <Bar dataKey="sales" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>상품 카테고리</CardTitle>
                <CardDescription>상품 카테고리별 매출 분포</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {productData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>최근 주문</CardTitle>
                <CardDescription>최근 고객 주문</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="rounded-full bg-muted p-2">
                        <Package className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">주문 #{1000 + i}</p>
                        <p className="text-xs text-muted-foreground">고객: 김민지</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">₩{(25000 + i * 5000).toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">방금 전</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>매장 설정</CardTitle>
                <CardDescription>매장 운영 관리</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-schedule">자동 스케줄</Label>
                    <p className="text-xs text-muted-foreground">병원 운영 시간에 따라 자동으로 열고 닫기</p>
                  </div>
                  <Switch id="auto-schedule" checked={isAutoSchedule} onCheckedChange={setIsAutoSchedule} />
                </div>
                {isAutoSchedule && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="open-time">오픈 시간</Label>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>09:00 AM</span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="close-time">마감 시간</Label>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>06:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="pt-2">
                  <Button className="w-full">
                    <QrCode className="h-4 w-4 mr-2" />새 QR 코드 생성
                  </Button>
                </div>
                <div>
                  <Button variant="outline" className="w-full">
                    <Bell className="h-4 w-4 mr-2" />
                    고객에게 알림 보내기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

function LayoutDashboard(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  )
}

function Hospital(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3v2" />
      <path d="M16 3v2" />
      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7" />
      <path d="M16 16h6" />
      <path d="M19 13v6" />
    </svg>
  )
}

function Menu(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

