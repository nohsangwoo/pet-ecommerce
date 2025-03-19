"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  ShoppingBag,
  Users,
  CreditCard,
  Package,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  Calendar,
  Hospital,
  LayoutDashboard,
  FileText,
  Truck,
  AlertCircle,
} from "lucide-react"

// Sample data for charts
const salesData = [
  { name: "Jan", sales: 4000000 },
  { name: "Feb", sales: 3000000 },
  { name: "Mar", sales: 2000000 },
  { name: "Apr", sales: 2780000 },
  { name: "May", sales: 1890000 },
  { name: "Jun", sales: 2390000 },
  { name: "Jul", sales: 3490000 },
]

const hospitalData = [
  { name: "Seoul Vet", value: 40 },
  { name: "Busan Vet", value: 30 },
  { name: "Daegu Vet", value: 20 },
  { name: "Incheon Vet", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-muted fixed inset-y-0">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Settings className="h-6 w-6" />
            <span>관리자 대시보드</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <LayoutDashboard className="h-5 w-5" />
              대시보드
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Package className="h-5 w-5" />
              상품
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingBag className="h-5 w-5" />
              주문
            </Link>
            <Link
              href="/admin/hospitals"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Hospital className="h-5 w-5" />
              병원
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-5 w-5" />
              사용자
            </Link>
            <Link
              href="/admin/delivery"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Truck className="h-5 w-5" />
              배송
            </Link>
            <Link
              href="/admin/events"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Bell className="h-5 w-5" />
              이벤트
            </Link>
            <Link
              href="/admin/reports"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <FileText className="h-5 w-5" />
              보고서
            </Link>
            <Link
              href="/admin/settings"
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
              alt="Admin profile"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">시스템 관리자</span>
              <span className="text-xs text-muted-foreground">관리자</span>
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
            <h1 className="text-2xl font-bold">관리자 대시보드</h1>
            <div className="ml-auto flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                이번 달
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
              <Button>
                <AlertCircle className="h-4 w-4 mr-2" />
                공지사항 생성
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
                <div className="text-2xl font-bold">₩24,530,000</div>
                <p className="text-xs text-muted-foreground">지난달 대비 +18.2%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">총 주문</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">지난달 대비 +12.5%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">총 사용자</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,642</div>
                <p className="text-xs text-muted-foreground">지난달 대비 +8.1%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">활성 병원</CardTitle>
                <Hospital className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">이번 달 +2개 신규</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>월간 수익</CardTitle>
                <CardDescription>시스템 전체 월간 수익 개요</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₩${value.toLocaleString()}`, "수익"]} />
                    <Line type="monotone" dataKey="sales" stroke="#3b82f6" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>병원별 수익</CardTitle>
                <CardDescription>병원별 수익 분포</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={hospitalData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {hospitalData.map((entry, index) => (
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
                <CardTitle>최근 병원 등록</CardTitle>
                <CardDescription>플랫폼에 최근 가입한 동물병원</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="rounded-full bg-muted p-2">
                        <Hospital className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">강남 동물병원</p>
                        <p className="text-xs text-muted-foreground">서울, 대한민국</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">승인됨</p>
                        <p className="text-xs text-muted-foreground">2일 전</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>시스템 상태</CardTitle>
                <CardDescription>현재 플랫폼 성능</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">결제 게이트웨이</p>
                    <span className="flex items-center text-sm text-green-500">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                      정상 작동
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">배송 API</p>
                    <span className="flex items-center text-sm text-green-500">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                      정상 작동
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">알림 서비스</p>
                    <span className="flex items-center text-sm text-green-500">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                      정상 작동
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">OAuth 연동</p>
                    <span className="flex items-center text-sm text-green-500">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                      정상 작동
                    </span>
                  </div>
                </div>
                <div className="pt-2">
                  <Button className="w-full">시스템 로그 보기</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
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

