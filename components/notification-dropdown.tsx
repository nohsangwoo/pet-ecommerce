"use client"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"
import { Bell, Package, Tag, Info, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// 알림 타입에 따른 아이콘 및 스타일
const getNotificationIcon = (type: string) => {
  switch (type) {
    case "order":
      return <Package className="h-4 w-4" />
    case "promotion":
      return <Tag className="h-4 w-4" />
    case "system":
      return <Info className="h-4 w-4" />
    default:
      return <Bell className="h-4 w-4" />
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
    message: "모든 반려동물 사료 20% 할인 이벤트가 시작되었습니다!",
    type: "promotion",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3시간 전
    linkUrl: "/products",
  },
  {
    id: "notif-003",
    title: "상품 요청이 승인되었습니다",
    message: "요청하신 '관절 보조제'가 승인되었습니다. 곧 입고될 예정입니다.",
    type: "system",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1일 전
    linkUrl: "/requests",
  },
  {
    id: "notif-004",
    title: "주문이 완료되었습니다",
    message: "주문 #ORD-2023-0901이 성공적으로 배송 완료되었습니다.",
    type: "order",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2일 전
    linkUrl: "/orders",
  },
  {
    id: "notif-005",
    title: "새로운 기능 안내",
    message: "이제 상품 요청 기능을 사용할 수 있습니다. 원하는 상품을 요청해보세요!",
    type: "system",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5일 전
    linkUrl: "/requests",
  },
]

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState(sampleNotifications)

  // 읽지 않은 알림 개수
  const unreadCount = notifications.filter((notif) => !notif.isRead).length

  // 알림을 읽음으로 표시
  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  // 모든 알림을 읽음으로 표시
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>}
          <span className="sr-only">알림</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>알림</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount}개 읽지 않음
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <div className="py-4 px-2 text-center text-muted-foreground">알림이 없습니다</div>
        ) : (
          <>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.slice(0, 5).map((notification) => (
                <DropdownMenuItem key={notification.id} className="cursor-pointer p-0">
                  <Link
                    href={notification.linkUrl}
                    className="flex w-full px-2 py-3 hover:bg-muted"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div
                      className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full ${
                        notification.isRead ? "bg-muted" : "bg-primary/10"
                      }`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${!notification.isRead ? "text-primary" : ""}`}>
                          {notification.title}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(notification.createdAt, { addSuffix: true, locale: ko })}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator />
            <div className="p-2 flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                모두 읽음으로 표시
              </Button>
              <Link href="/notifications" className="text-xs text-primary hover:underline">
                모든 알림 보기
              </Link>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

