"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, Calendar, ChevronDown, Download, Filter, Plus, Search, Send, Settings, Trash, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// 가상의 알림 데이터
const notifications = [
  {
    id: 1,
    title: "예방접종 알림",
    content: "다음 주에 예방접종 일정이 있습니다. 예약을 확인해주세요.",
    status: "sent",
    type: "scheduled",
    sentAt: "2024-03-15T10:00:00",
    recipients: 156,
    opened: 124,
    clicked: 98,
    template: true,
    category: "reminder",
  },
  {
    id: 2,
    title: "봄맞이 건강검진 프로모션",
    content: "봄맞이 반려동물 건강검진 20% 할인 프로모션을 진행합니다.",
    status: "scheduled",
    type: "campaign",
    sentAt: "2024-03-25T09:00:00",
    recipients: 450,
    opened: 0,
    clicked: 0,
    template: false,
    category: "promotion",
  },
  {
    id: 3,
    title: "정기 검진 알림",
    content: "정기 검진 일정이 다가오고 있습니다. 예약을 확인해주세요.",
    status: "draft",
    type: "scheduled",
    sentAt: null,
    recipients: 0,
    opened: 0,
    clicked: 0,
    template: true,
    category: "reminder",
  },
  {
    id: 4,
    title: "신규 서비스 안내",
    content: "저희 병원에서 새롭게 시작하는 반려동물 치과 서비스를 소개합니다.",
    status: "sent",
    type: "announcement",
    sentAt: "2024-03-10T14:30:00",
    recipients: 320,
    opened: 280,
    clicked: 175,
    template: false,
    category: "announcement",
  },
  {
    id: 5,
    title: "휴무 안내",
    content: "다가오는 공휴일에 병원 휴무 일정을 안내드립니다.",
    status: "sent",
    type: "announcement",
    sentAt: "2024-03-05T11:15:00",
    recipients: 450,
    opened: 410,
    clicked: 120,
    template: true,
    category: "announcement",
  },
]

// 알림 템플릿 데이터
const templates = [
  { id: 1, name: "예방접종 알림", category: "reminder" },
  { id: 2, name: "정기 검진 알림", category: "reminder" },
  { id: 3, name: "휴무 안내", category: "announcement" },
  { id: 4, name: "생일 축하", category: "event" },
  { id: 5, name: "프로모션 안내", category: "promotion" },
]

// 고객 세그먼트 데이터
const segments = [
  { id: 1, name: "모든 고객", count: 450 },
  { id: 2, name: "강아지 보호자", count: 280 },
  { id: 3, name: "고양이 보호자", count: 150 },
  { id: 4, name: "최근 3개월 내 방문", count: 210 },
  { id: 5, name: "1년 이상 미방문", count: 85 },
]

export default function NotificationsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedNotification, setSelectedNotification] = useState(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newNotification, setNewNotification] = useState({
    title: "",
    content: "",
    type: "immediate",
    segment: "1",
    scheduledDate: "",
    scheduledTime: "",
    template: null,
  })

  // 필터링된 알림 목록
  const filteredNotifications = notifications.filter((notification) => {
    // 탭 필터링
    if (activeTab !== "all" && notification.status !== activeTab) return false

    // 검색어 필터링
    if (searchQuery && !notification.title.toLowerCase().includes(searchQuery.toLowerCase())) return false

    // 카테고리 필터링
    if (selectedCategory !== "all" && notification.category !== selectedCategory) return false

    return true
  })

  // 알림 상태에 따른 배지 색상
  const getStatusBadge = (status) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-500">발송완료</Badge>
      case "scheduled":
        return <Badge className="bg-yellow-500">예약됨</Badge>
      case "draft":
        return <Badge variant="secondary">임시저장</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // 알림 유형에 따른 아이콘
  const getTypeIcon = (type) => {
    switch (type) {
      case "immediate":
        return <Send className="h-4 w-4 mr-2" />
      case "scheduled":
        return <Calendar className="h-4 w-4 mr-2" />
      case "campaign":
        return <Users className="h-4 w-4 mr-2" />
      case "announcement":
        return <Bell className="h-4 w-4 mr-2" />
      default:
        return <Bell className="h-4 w-4 mr-2" />
    }
  }

  // 알림 생성 처리
  const handleCreateNotification = () => {
    console.log("새 알림 생성:", newNotification)
    setIsCreateDialogOpen(false)
    // 실제 구현에서는 API 호출로 알림 생성
  }

  // 알림 삭제 처리
  const handleDeleteNotification = (id) => {
    console.log("알림 삭제:", id)
    // 실제 구현에서는 API 호출로 알림 삭제
  }

  // 알림 상세 정보 보기
  const handleViewNotification = (notification) => {
    setSelectedNotification(notification)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">알림 관리</h1>
          <p className="text-muted-foreground mt-1">고객에게 보낼 알림을 생성하고 관리하세요</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />새 알림 작성
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>새 알림 작성</DialogTitle>
              <DialogDescription>
                고객에게 보낼 새로운 알림을 작성하세요. 즉시 발송하거나 예약 발송할 수 있습니다.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notification-template" className="text-right">
                  템플릿
                </Label>
                <Select
                  onValueChange={(value) => setNewNotification({ ...newNotification, template: value })}
                  className="col-span-3"
                >
                  <SelectTrigger id="notification-template">
                    <SelectValue placeholder="템플릿 선택 (선택사항)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="direct">직접 작성</SelectItem>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id.toString()}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notification-title" className="text-right">
                  제목
                </Label>
                <Input
                  id="notification-title"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                  className="col-span-3"
                  placeholder="알림 제목을 입력하세요"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notification-content" className="text-right">
                  내용
                </Label>
                <Textarea
                  id="notification-content"
                  value={newNotification.content}
                  onChange={(e) => setNewNotification({ ...newNotification, content: e.target.value })}
                  className="col-span-3"
                  placeholder="알림 내용을 입력하세요"
                  rows={5}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">발송 방식</Label>
                <RadioGroup
                  defaultValue="immediate"
                  onValueChange={(value) => setNewNotification({ ...newNotification, type: value })}
                  className="col-span-3 flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="immediate" id="immediate" />
                    <Label htmlFor="immediate">즉시 발송</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="scheduled" id="scheduled" />
                    <Label htmlFor="scheduled">예약 발송</Label>
                  </div>
                </RadioGroup>
              </div>
              {newNotification.type === "scheduled" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">예약 일시</Label>
                    <div className="col-span-3 flex gap-2">
                      <div className="flex-1">
                        <Label htmlFor="scheduled-date" className="sr-only">
                          날짜
                        </Label>
                        <Input
                          id="scheduled-date"
                          type="date"
                          value={newNotification.scheduledDate}
                          onChange={(e) => setNewNotification({ ...newNotification, scheduledDate: e.target.value })}
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="scheduled-time" className="sr-only">
                          시간
                        </Label>
                        <Input
                          id="scheduled-time"
                          type="time"
                          value={newNotification.scheduledTime}
                          onChange={(e) => setNewNotification({ ...newNotification, scheduledTime: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notification-segment" className="text-right">
                  수신자 그룹
                </Label>
                <Select
                  defaultValue="1"
                  onValueChange={(value) => setNewNotification({ ...newNotification, segment: value })}
                  className="col-span-3"
                >
                  <SelectTrigger id="notification-segment">
                    <SelectValue placeholder="수신자 그룹 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {segments.map((segment) => (
                      <SelectItem key={segment.id} value={segment.id.toString()}>
                        {segment.name} ({segment.count}명)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                취소
              </Button>
              <Button onClick={handleCreateNotification}>
                {newNotification.type === "scheduled" ? "예약 발송" : "즉시 발송"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center justify-between mb-4">
        <Tabs defaultValue="all" className="w-[400px]" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="sent">발송완료</TabsTrigger>
            <TabsTrigger value="scheduled">예약됨</TabsTrigger>
            <TabsTrigger value="draft">임시저장</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="알림 검색..."
              className="w-[200px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                카테고리
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>카테고리 필터</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedCategory("all")}>전체</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCategory("reminder")}>알림/리마인더</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCategory("promotion")}>프로모션</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCategory("announcement")}>공지사항</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCategory("event")}>이벤트</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Bell className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {searchQuery ? "검색 결과가 없습니다." : "알림이 없습니다."}
              </p>
              <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />새 알림 작성
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card key={notification.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    {getTypeIcon(notification.type)}
                    <CardTitle className="text-lg">{notification.title}</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(notification.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">메뉴 열기</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewNotification(notification)}>
                          상세 정보
                        </DropdownMenuItem>
                        {notification.status === "draft" && <DropdownMenuItem>편집</DropdownMenuItem>}
                        {notification.status === "scheduled" && <DropdownMenuItem>일정 변경</DropdownMenuItem>}
                        <DropdownMenuItem onClick={() => handleDeleteNotification(notification.id)}>
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardDescription className="mt-1">
                  {notification.content.length > 100
                    ? `${notification.content.substring(0, 100)}...`
                    : notification.content}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                {notification.status === "sent" && (
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">수신자</span>
                      <span className="font-medium">{notification.recipients}명</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">열람률</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">
                          {Math.round((notification.opened / notification.recipients) * 100)}%
                        </span>
                        <Progress
                          value={(notification.opened / notification.recipients) * 100}
                          className="h-2 flex-1"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">클릭률</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">
                          {Math.round((notification.clicked / notification.recipients) * 100)}%
                        </span>
                        <Progress
                          value={(notification.clicked / notification.recipients) * 100}
                          className="h-2 flex-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {notification.status === "scheduled" && (
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      예약 발송: {new Date(notification.sentAt).toLocaleDateString()}{" "}
                      {new Date(notification.sentAt).toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-2 text-xs text-muted-foreground">
                <div className="flex items-center">
                  {notification.template && (
                    <Badge variant="outline" className="mr-2">
                      템플릿
                    </Badge>
                  )}
                  <Badge variant="outline" className="capitalize">
                    {notification.category === "reminder" && "알림/리마인더"}
                    {notification.category === "promotion" && "프로모션"}
                    {notification.category === "announcement" && "공지사항"}
                    {notification.category === "event" && "이벤트"}
                  </Badge>
                  {notification.status === "sent" && (
                    <span className="ml-auto">발송: {new Date(notification.sentAt).toLocaleDateString()}</span>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* 알림 상세 정보 다이얼로그 */}
      {selectedNotification && (
        <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {getTypeIcon(selectedNotification.type)}
                {selectedNotification.title}
              </DialogTitle>
              <div className="flex items-center space-x-2 mt-1">
                {getStatusBadge(selectedNotification.status)}
                {selectedNotification.template && <Badge variant="outline">템플릿</Badge>}
                <Badge variant="outline" className="capitalize">
                  {selectedNotification.category === "reminder" && "알림/리마인더"}
                  {selectedNotification.category === "promotion" && "프로모션"}
                  {selectedNotification.category === "announcement" && "공지사항"}
                  {selectedNotification.category === "event" && "이벤트"}
                </Badge>
              </div>
            </DialogHeader>
            <div className="py-4">
              <div className="border rounded-md p-4 mb-4">
                <p className="whitespace-pre-line">{selectedNotification.content}</p>
              </div>

              {selectedNotification.status === "sent" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">발송 정보</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">발송 일시</span>
                            <span className="text-sm">
                              {new Date(selectedNotification.sentAt).toLocaleDateString()}{" "}
                              {new Date(selectedNotification.sentAt).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">수신자 수</span>
                            <span className="text-sm">{selectedNotification.recipients}명</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">성과 지표</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-muted-foreground">열람률</span>
                              <span className="text-sm">
                                {Math.round((selectedNotification.opened / selectedNotification.recipients) * 100)}%
                              </span>
                            </div>
                            <Progress
                              value={(selectedNotification.opened / selectedNotification.recipients) * 100}
                              className="h-2"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-muted-foreground">클릭률</span>
                              <span className="text-sm">
                                {Math.round((selectedNotification.clicked / selectedNotification.recipients) * 100)}%
                              </span>
                            </div>
                            <Progress
                              value={(selectedNotification.clicked / selectedNotification.recipients) * 100}
                              className="h-2"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    성과 보고서 다운로드
                  </Button>
                </div>
              )}

              {selectedNotification.status === "scheduled" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">예약 정보</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">예약 발송 일시</span>
                          <span className="text-sm">
                            {new Date(selectedNotification.sentAt).toLocaleDateString()}{" "}
                            {new Date(selectedNotification.sentAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">예상 수신자 수</span>
                          <span className="text-sm">{selectedNotification.recipients}명</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      일정 변경
                    </Button>
                    <Button variant="destructive" className="flex-1">
                      <Trash className="h-4 w-4 mr-2" />
                      예약 취소
                    </Button>
                  </div>
                </div>
              )}

              {selectedNotification.status === "draft" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">임시저장 정보</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        이 알림은 아직 발송되지 않았습니다. 편집 후 발송하거나 예약 발송할 수 있습니다.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Settings className="h-4 w-4 mr-2" />
                      편집하기
                    </Button>
                    <Button className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      발송하기
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedNotification(null)}>
                닫기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

