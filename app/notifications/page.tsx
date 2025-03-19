"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"
import { MainNav } from "@/components/main-nav"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bell, Package, Tag, Info, Search, Filter, CheckCircle, Calendar, ChevronRight } from "lucide-react"

// 알림 타입에 따른 아이콘 및 스타일
const getNotificationIcon = (type: string) => {
  switch (type) {
    case "order":
      return <Package className="h-5 w-5 text-blue-500" />
    case "promotion":
      return <Tag className="h-5 w-5 text-purple-500" />
    case "system":
      return <Info className="h-5 w-5 text-amber-500" />
    default:
      return <Bell className="h-5 w-5 text-gray-500" />
  }
}

// 알림 타입에 따른 배지 스타일
const getNotificationBadge = (type: string) => {
  switch (type) {
    case "order":
      return <Badge className="bg-blue-500 hover:bg-blue-600">주문</Badge>
    case "promotion":
      return <Badge className="bg-purple-500 hover:bg-purple-600">프로모션</Badge>
    case "system":
      return <Badge className="bg-amber-500 hover:bg-amber-600">시스템</Badge>
    default:
      return <Badge>기타</Badge>
  }
}

// 샘플 알림 데이터
const sampleNotifications = [
  {
    id: "notif-001",
    title: "주문이 배송 중입니다",
    message: "주문 #ORD-2023-0985이 배송 중입니다. 배송 현황을 확인하세요.",
    type: "order",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30분 전
    linkUrl: "/orders",
  },
  {
    id: "notif-002",
    title: "특별 할인 이벤트",
    message:
      "모든 반려동물 사료 20% 할인 이벤트가 시작되었습니다! 지금 바로 확인하고 할인된 가격으로 구매하세요. 이 이벤트는 일주일 동안만 진행됩니다.",
    type: "promotion",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3시간 전
    linkUrl: "/products",
  },
  {
    id: "notif-003",
    title: "상품 요청이 승인되었습니다",
    message: "요청하신 '관절 보조제'가 승인되었습니다. 곧 입고될 예정입니다. 입고 시 다시 알림을 보내드리겠습니다.",
    type: "system",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1일 전
    linkUrl: "/requests",
  },
  {
    id: "notif-004",
    title: "주문이 완료되었습니다",
    message: "주문 #ORD-2023-0901이 성공적으로 배송 완료되었습니다. 상품에 만족하셨다면 리뷰를 작성해주세요.",
    type: "order",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2일 전
    linkUrl: "/orders",
  },
  {
    id: "notif-005",
    title: "새로운 기능 안내",
    message:
      "이제 상품 요청 기능을 사용할 수 있습니다. 원하는 상품을 요청해보세요! 동물병원에서 검토 후 상품을 구비할 예정입니다.",
    type: "system",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5일 전
    linkUrl: "/requests",
  },
  {
    id: "notif-006",
    title: "회원 등급 업그레이드",
    message:
      "축하합니다! 회원님의 등급이 '실버'에서 '골드'로 업그레이드되었습니다. 이제 모든 상품 구매 시 5% 추가 할인 혜택을 받으실 수 있습니다.",
    type: "system",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7일 전
    linkUrl: "/profile",
  },
  {
    id: "notif-007",
    title: "겨울 시즌 특별 프로모션",
    message: "겨울철 반려동물 건강 관리를 위한 특별 프로모션이 시작되었습니다. 모든 면역 강화 제품 15% 할인!",
    type: "promotion",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10일 전
    linkUrl: "/products",
  },
  {
    id: "notif-008",
    title: "정기 건강 검진 알림",
    message: "반려동물의 정기 건강 검진 시기가 다가왔습니다. 서울 동물병원에 방문하여 건강 검진을 받아보세요.",
    type: "system",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 14일 전
    linkUrl: "/hospital",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(sampleNotifications)
  const [selectedTab, setSelectedTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // 알림을 읽음으로 표시
  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  // 모든 알림을 읽음으로 표시
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  // 선택된 탭에 따라 알림 필터링
  const getFilteredNotifications = () => {
    let filtered = [...notifications]

    // 탭 필터링
    if (selectedTab === "unread") {
      filtered = filtered.filter((notif) => !notif.isRead)
    } else if (selectedTab === "order") {
      filtered = filtered.filter((notif) => notif.type === "order")
    } else if (selectedTab === "promotion") {
      filtered = filtered.filter((notif) => notif.type === "promotion")
    } else if (selectedTab === "system") {
      filtered = filtered.filter((notif) => notif.type === "system")
    }

    // 검색어 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (notif) => notif.title.toLowerCase().includes(query) || notif.message.toLowerCase().includes(query),
      )
    }

    return filtered
  }

  const filteredNotifications = getFilteredNotifications()
  const unreadCount = notifications.filter((notif) => !notif.isRead).length

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">알림</h1>
              <p className="text-muted-foreground">
                최근 알림 및 업데이트를 확인하세요.
                {unreadCount > 0 && ` ${unreadCount}개의 읽지 않은 알림이 있습니다.`}
              </p>
            </div>
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <CheckCircle className="h-4 w-4 mr-2" />
              모두 읽음으로 표시
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>필터</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium" htmlFor="search-notifications">
                      알림 검색
                    </label>
                    <div className="flex mt-1">
                      <Input
                        id="search-notifications"
                        placeholder="검색어 입력..."
                        className="rounded-r-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
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
                        <SelectItem value="today">오늘</SelectItem>
                        <SelectItem value="last-week">지난 주</SelectItem>
                        <SelectItem value="last-month">지난 달</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    필터 적용
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>알림 설정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/settings/notifications">
                    <Button variant="outline" className="w-full">
                      <Bell className="h-4 w-4 mr-2" />
                      알림 환경설정
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-3/4">
              <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">전체</TabsTrigger>
                  <TabsTrigger value="unread">읽지 않음</TabsTrigger>
                  <TabsTrigger value="order">주문</TabsTrigger>
                  <TabsTrigger value="promotion">프로모션</TabsTrigger>
                  <TabsTrigger value="system">시스템</TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  {filteredNotifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">알림이 없습니다</h3>
                      <p className="text-muted-foreground mt-1 mb-4">선택한 필터에 해당하는 알림이 없습니다.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredNotifications.map((notification) => (
                        <Card
                          key={notification.id}
                          className={`overflow-hidden transition-colors ${!notification.isRead ? "bg-primary/5 border-primary/20" : ""}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div
                                className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                                  notification.isRead ? "bg-muted" : "bg-primary/10"
                                }`}
                              >
                                {getNotificationIcon(notification.type)}
                              </div>

                              <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                  <div className="flex items-center gap-2">
                                    <h3 className={`font-medium ${!notification.isRead ? "text-primary" : ""}`}>
                                      {notification.title}
                                    </h3>
                                    {getNotificationBadge(notification.type)}
                                  </div>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {formatDistanceToNow(notification.createdAt, { addSuffix: true, locale: ko })}
                                  </div>
                                </div>

                                <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>

                                <div className="flex justify-between items-center">
                                  <Link href={notification.linkUrl}>
                                    <Button
                                      variant="link"
                                      className="p-0 h-auto text-sm"
                                      onClick={() => markAsRead(notification.id)}
                                    >
                                      자세히 보기
                                      <ChevronRight className="h-3 w-3 ml-1" />
                                    </Button>
                                  </Link>

                                  {!notification.isRead && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-xs"
                                      onClick={() => markAsRead(notification.id)}
                                    >
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      읽음으로 표시
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </Tabs>

              {filteredNotifications.length > 0 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-muted-foreground">총 {filteredNotifications.length}개의 알림이 있습니다</p>
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

