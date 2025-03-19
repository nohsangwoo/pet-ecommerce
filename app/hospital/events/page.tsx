"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CalendarIcon,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Copy,
  Share2,
  Bell,
  BarChart4,
  CheckCircle,
  XCircle,
  AlertCircle,
  ImageIcon,
  FileText,
  ArrowUpRight,
} from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

// 샘플 이벤트 데이터
const sampleEvents = [
  {
    id: "event_1",
    title: "여름 건강 체크업 캠페인",
    description: "여름철 반려동물 건강 체크업 특별 할인 이벤트입니다. 종합 검진 20% 할인된 가격으로 제공합니다.",
    imageUrl: "/placeholder.svg?height=300&width=600",
    startDate: new Date(2024, 6, 1), // 2024년 7월 1일
    endDate: new Date(2024, 7, 31), // 2024년 8월 31일
    isActive: true,
    isPublished: true,
    category: "프로모션",
    views: 245,
    clicks: 78,
    conversions: 12,
    targetAudience: "모든 고객",
  },
  {
    id: "event_2",
    title: "강아지 치아 건강의 날",
    description:
      "강아지 치아 건강의 중요성을 알리는 특별 이벤트입니다. 치아 검진 및 스케일링 서비스를 특별가에 제공합니다.",
    imageUrl: "/placeholder.svg?height=300&width=600",
    startDate: new Date(2024, 8, 15), // 2024년 9월 15일
    endDate: new Date(2024, 8, 30), // 2024년 9월 30일
    isActive: true,
    isPublished: true,
    category: "건강 캠페인",
    views: 189,
    clicks: 56,
    conversions: 8,
    targetAudience: "강아지 보호자",
  },
  {
    id: "event_3",
    title: "고양이 중성화 수술 할인",
    description: "고양이 중성화 수술의 중요성을 알리고 책임감 있는 반려동물 보호를 장려하기 위한 할인 이벤트입니다.",
    imageUrl: "/placeholder.svg?height=300&width=600",
    startDate: new Date(2024, 9, 1), // 2024년 10월 1일
    endDate: new Date(2024, 9, 31), // 2024년 10월 31일
    isActive: false,
    isPublished: true,
    category: "수술/시술",
    views: 120,
    clicks: 35,
    conversions: 5,
    targetAudience: "고양이 보호자",
  },
  {
    id: "event_4",
    title: "겨울철 반려동물 관리 세미나",
    description: "겨울철 반려동물 건강 관리에 대한 무료 온라인 세미나입니다. 전문 수의사가 직접 알려드립니다.",
    imageUrl: "/placeholder.svg?height=300&width=600",
    startDate: new Date(2024, 11, 10), // 2024년 12월 10일
    endDate: new Date(2024, 11, 10), // 2024년 12월 10일
    isActive: true,
    isPublished: false,
    category: "교육/세미나",
    views: 0,
    clicks: 0,
    conversions: 0,
    targetAudience: "모든 고객",
  },
  {
    id: "event_5",
    title: "신규 고객 첫 방문 할인",
    description: "처음 방문하는 고객을 위한 특별 할인 이벤트입니다. 첫 진료 시 20% 할인 혜택을 제공합니다.",
    imageUrl: "/placeholder.svg?height=300&width=600",
    startDate: new Date(2024, 5, 1), // 2024년 6월 1일
    endDate: new Date(2024, 11, 31), // 2024년 12월 31일
    isActive: true,
    isPublished: true,
    category: "프로모션",
    views: 310,
    clicks: 95,
    conversions: 22,
    targetAudience: "신규 고객",
  },
  {
    id: "event_6",
    title: "반려동물 건강검진 패키지",
    description: "종합 건강검진 패키지를 특별 가격에 제공합니다. 혈액검사, X-ray, 초음파 검사가 포함됩니다.",
    imageUrl: "/placeholder.svg?height=300&width=600",
    startDate: new Date(2024, 4, 15), // 2024년 5월 15일
    endDate: new Date(2024, 6, 15), // 2024년 7월 15일
    isActive: false,
    isPublished: true,
    category: "건강 캠페인",
    views: 275,
    clicks: 82,
    conversions: 15,
    targetAudience: "모든 고객",
  },
]

// 이벤트 상태에 따른 배지 컴포넌트
const EventStatusBadge = ({ isActive, isPublished }) => {
  if (!isPublished) {
    return (
      <Badge variant="outline" className="bg-amber-100 text-amber-500">
        <AlertCircle className="h-3 w-3 mr-1" />
        미발행
      </Badge>
    )
  }

  if (!isActive) {
    return (
      <Badge variant="outline" className="bg-gray-100 text-gray-500">
        <XCircle className="h-3 w-3 mr-1" />
        비활성
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="bg-green-100 text-green-500">
      <CheckCircle className="h-3 w-3 mr-1" />
      활성
    </Badge>
  )
}

export default function HospitalEventsPage() {
  const [events, setEvents] = useState(sampleEvents)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    imageUrl: "/placeholder.svg?height=300&width=600",
    startDate: new Date(),
    endDate: new Date(),
    isActive: true,
    isPublished: false,
    category: "프로모션",
    targetAudience: "모든 고객",
  })

  // 이벤트 필터링
  const getFilteredEvents = () => {
    let filtered = [...events]

    // 탭 필터링
    if (activeTab === "active") {
      filtered = filtered.filter((event) => event.isActive && event.isPublished)
    } else if (activeTab === "draft") {
      filtered = filtered.filter((event) => !event.isPublished)
    } else if (activeTab === "inactive") {
      filtered = filtered.filter((event) => !event.isActive && event.isPublished)
    } else if (activeTab === "upcoming") {
      filtered = filtered.filter((event) => event.isPublished && event.startDate > new Date())
    } else if (activeTab === "past") {
      filtered = filtered.filter((event) => event.isPublished && event.endDate < new Date())
    }

    // 검색어 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (event) => event.title.toLowerCase().includes(query) || event.description.toLowerCase().includes(query),
      )
    }

    // 카테고리 필터링
    if (categoryFilter !== "all") {
      filtered = filtered.filter((event) => event.category === categoryFilter)
    }

    // 정렬
    if (sortBy === "newest") {
      filtered.sort((a, b) => b.startDate - a.startDate)
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => a.startDate - b.startDate)
    } else if (sortBy === "title-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === "title-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title))
    } else if (sortBy === "views-desc") {
      filtered.sort((a, b) => b.views - a.views)
    }

    return filtered
  }

  const filteredEvents = getFilteredEvents()

  // 카테고리 목록 (중복 제거)
  const categories = [...new Set(events.map((event) => event.category))]

  // 새 이벤트 생성
  const handleCreateEvent = () => {
    const newId = `event_${events.length + 1}`

    setEvents([
      {
        id: newId,
        ...newEvent,
        views: 0,
        clicks: 0,
        conversions: 0,
      },
      ...events,
    ])

    setIsCreateDialogOpen(false)
    setNewEvent({
      title: "",
      description: "",
      imageUrl: "/placeholder.svg?height=300&width=600",
      startDate: new Date(),
      endDate: new Date(),
      isActive: true,
      isPublished: false,
      category: "프로모션",
      targetAudience: "모든 고객",
    })
  }

  // 이벤트 상태 토글
  const toggleEventStatus = (eventId, field, value) => {
    setEvents((prev) => prev.map((event) => (event.id === eventId ? { ...event, [field]: value } : event)))
  }

  // 이벤트 삭제
  const deleteEvent = () => {
    if (!selectedEvent) return

    setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.id))
    setIsDeleteDialogOpen(false)
    setSelectedEvent(null)
  }

  // 이벤트 상세 정보 보기
  const openEventDetail = (event) => {
    setSelectedEvent(event)
    setIsDetailDialogOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">이벤트 관리</h1>
              <p className="text-muted-foreground">병원 이벤트와 프로모션을 생성하고 관리하세요.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />새 이벤트 생성
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>새 이벤트 생성</DialogTitle>
                    <DialogDescription>
                      새로운 이벤트 또는 프로모션을 생성하세요. 발행 전에는 고객에게 표시되지 않습니다.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-title">이벤트 제목</Label>
                      <Input
                        id="event-title"
                        placeholder="이벤트 제목을 입력하세요"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="event-description">이벤트 설명</Label>
                      <Textarea
                        id="event-description"
                        placeholder="이벤트에 대한 상세 설명을 입력하세요"
                        rows={4}
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="event-category">카테고리</Label>
                        <Select
                          value={newEvent.category}
                          onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}
                        >
                          <SelectTrigger id="event-category">
                            <SelectValue placeholder="카테고리 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="프로모션">프로모션</SelectItem>
                            <SelectItem value="건강 캠페인">건강 캠페인</SelectItem>
                            <SelectItem value="수술/시술">수술/시술</SelectItem>
                            <SelectItem value="교육/세미나">교육/세미나</SelectItem>
                            <SelectItem value="기타">기타</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="event-audience">대상 고객</Label>
                        <Select
                          value={newEvent.targetAudience}
                          onValueChange={(value) => setNewEvent({ ...newEvent, targetAudience: value })}
                        >
                          <SelectTrigger id="event-audience">
                            <SelectValue placeholder="대상 고객 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="모든 고객">모든 고객</SelectItem>
                            <SelectItem value="신규 고객">신규 고객</SelectItem>
                            <SelectItem value="기존 고객">기존 고객</SelectItem>
                            <SelectItem value="강아지 보호자">강아지 보호자</SelectItem>
                            <SelectItem value="고양이 보호자">고양이 보호자</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>시작일</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {newEvent.startDate ? (
                                format(newEvent.startDate, "PPP", { locale: ko })
                              ) : (
                                <span>날짜 선택</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={newEvent.startDate}
                              onSelect={(date) => setNewEvent({ ...newEvent, startDate: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label>종료일</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {newEvent.endDate ? (
                                format(newEvent.endDate, "PPP", { locale: ko })
                              ) : (
                                <span>날짜 선택</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={newEvent.endDate}
                              onSelect={(date) => setNewEvent({ ...newEvent, endDate: date })}
                              initialFocus
                              disabled={(date) => date < newEvent.startDate}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>이벤트 이미지</Label>
                      <div className="border rounded-md p-4 flex flex-col items-center justify-center">
                        <div className="w-full aspect-[2/1] bg-muted rounded-md overflow-hidden mb-4">
                          <img
                            src={newEvent.imageUrl || "/placeholder.svg"}
                            alt="이벤트 이미지 미리보기"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button variant="outline" className="w-full">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          이미지 업로드
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">권장 크기: 1200 x 600px, 최대 2MB</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="event-active"
                          checked={newEvent.isActive}
                          onCheckedChange={(checked) => setNewEvent({ ...newEvent, isActive: checked })}
                        />
                        <Label htmlFor="event-active">이벤트 활성화</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="event-published"
                          checked={newEvent.isPublished}
                          onCheckedChange={(checked) => setNewEvent({ ...newEvent, isPublished: checked })}
                        />
                        <Label htmlFor="event-published">즉시 발행</Label>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      취소
                    </Button>
                    <Button onClick={handleCreateEvent} disabled={!newEvent.title}>
                      이벤트 생성
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <MoreHorizontal className="h-4 w-4 mr-2" />더 보기
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>이벤트 관리</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <FileText className="h-4 w-4 mr-2" />
                    이벤트 템플릿
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BarChart4 className="h-4 w-4 mr-2" />
                    이벤트 분석
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="h-4 w-4 mr-2" />
                    알림 설정
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>필터</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium" htmlFor="search-events">
                      이벤트 검색
                    </label>
                    <div className="flex mt-1">
                      <Input
                        id="search-events"
                        placeholder="이벤트명 검색..."
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
                    <label className="text-sm font-medium">카테고리</label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="모든 카테고리" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 카테고리</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">정렬 기준</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="정렬 기준" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">최신순</SelectItem>
                        <SelectItem value="oldest">오래된순</SelectItem>
                        <SelectItem value="title-asc">제목 (오름차순)</SelectItem>
                        <SelectItem value="title-desc">제목 (내림차순)</SelectItem>
                        <SelectItem value="views-desc">조회수 (높은순)</SelectItem>
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
                  <CardTitle>이벤트 통계</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">총 이벤트</p>
                      <p className="text-2xl font-bold">{events.length}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">활성 이벤트</p>
                      <p className="text-2xl font-bold">{events.filter((e) => e.isActive && e.isPublished).length}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">총 조회수</p>
                      <p className="text-2xl font-bold">{events.reduce((sum, event) => sum + event.views, 0)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">전환율</p>
                      <p className="text-2xl font-bold">
                        {Math.round(
                          (events.reduce((sum, event) => sum + event.conversions, 0) /
                            events.reduce((sum, event) => sum + event.clicks, 0)) *
                            100,
                        ) || 0}
                        %
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" className="w-full">
                      <BarChart4 className="h-4 w-4 mr-2" />
                      상세 분석 보기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-3/4">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">전체</TabsTrigger>
                  <TabsTrigger value="active">활성</TabsTrigger>
                  <TabsTrigger value="upcoming">예정됨</TabsTrigger>
                  <TabsTrigger value="past">지난 이벤트</TabsTrigger>
                  <TabsTrigger value="draft">임시저장</TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>이벤트 목록</CardTitle>
                        <p className="text-sm text-muted-foreground">총 {filteredEvents.length}개 이벤트</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {filteredEvents.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">이벤트가 없습니다.</p>
                          <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />새 이벤트 생성
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filteredEvents.map((event) => (
                            <Card key={event.id} className="overflow-hidden">
                              <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/3 h-48 md:h-auto">
                                  <img
                                    src={event.imageUrl || "/placeholder.svg"}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-4 md:p-6 flex-1">
                                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div>
                                      <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="outline">{event.category}</Badge>
                                        <EventStatusBadge isActive={event.isActive} isPublished={event.isPublished} />
                                      </div>
                                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                        {event.description}
                                      </p>
                                      <div className="flex items-center gap-2 text-sm">
                                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                        <span>
                                          {format(event.startDate, "PPP", { locale: ko })} ~{" "}
                                          {format(event.endDate, "PPP", { locale: ko })}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                      <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1">
                                          <Eye className="h-4 w-4 text-muted-foreground" />
                                          <span>{event.views}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                          <span>{event.clicks}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <CheckCircle className="h-4 w-4 text-muted-foreground" />
                                          <span>{event.conversions}</span>
                                        </div>
                                      </div>

                                      <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => openEventDetail(event)}>
                                          상세 보기
                                        </Button>
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                              <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => openEventDetail(event)}>
                                              <Eye className="h-4 w-4 mr-2" />
                                              상세 보기
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                              <Edit className="h-4 w-4 mr-2" />
                                              편집
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                              <Copy className="h-4 w-4 mr-2" />
                                              복제
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                              <Share2 className="h-4 w-4 mr-2" />
                                              공유
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                              className="text-red-500"
                                              onClick={() => {
                                                setSelectedEvent(event)
                                                setIsDeleteDialogOpen(true)
                                              }}
                                            >
                                              <Trash2 className="h-4 w-4 mr-2" />
                                              삭제
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      {/* 이벤트 상세 정보 다이얼로그 */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>이벤트 상세 정보</DialogTitle>
                <DialogDescription>{selectedEvent.title}의 상세 정보 및 성과 통계</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="aspect-[2/1] w-full overflow-hidden rounded-md">
                  <img
                    src={selectedEvent.imageUrl || "/placeholder.svg"}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">이벤트 제목</h3>
                    <p className="font-medium">{selectedEvent.title}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">카테고리</h3>
                    <Badge variant="outline">{selectedEvent.category}</Badge>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">이벤트 설명</h3>
                    <p className="text-sm">{selectedEvent.description}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">기간</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {format(selectedEvent.startDate, "PPP", { locale: ko })} ~{" "}
                        {format(selectedEvent.endDate, "PPP", { locale: ko })}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">대상 고객</h3>
                    <p>{selectedEvent.targetAudience}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-3">이벤트 성과</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <Eye className="h-5 w-5 text-muted-foreground mb-1" />
                        <p className="text-2xl font-bold">{selectedEvent.views}</p>
                        <p className="text-xs text-muted-foreground">조회수</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground mb-1" />
                        <p className="text-2xl font-bold">{selectedEvent.clicks}</p>
                        <p className="text-xs text-muted-foreground">클릭수</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-muted-foreground mb-1" />
                        <p className="text-2xl font-bold">{selectedEvent.conversions}</p>
                        <p className="text-xs text-muted-foreground">전환수</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`detail-active-${selectedEvent.id}`}
                        checked={selectedEvent.isActive}
                        onCheckedChange={(checked) => toggleEventStatus(selectedEvent.id, "isActive", checked)}
                      />
                      <Label htmlFor={`detail-active-${selectedEvent.id}`}>
                        {selectedEvent.isActive ? "활성" : "비활성"}
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`detail-published-${selectedEvent.id}`}
                        checked={selectedEvent.isPublished}
                        onCheckedChange={(checked) => toggleEventStatus(selectedEvent.id, "isPublished", checked)}
                      />
                      <Label htmlFor={`detail-published-${selectedEvent.id}`}>
                        {selectedEvent.isPublished ? "발행됨" : "미발행"}
                      </Label>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <BarChart4 className="h-4 w-4 mr-2" />
                    상세 분석
                  </Button>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                  닫기
                </Button>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  편집
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 이벤트 삭제 확인 다이얼로그 */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>이벤트 삭제</DialogTitle>
            <DialogDescription>정말로 이 이벤트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <div className="py-4">
              <div className="flex items-center gap-3 p-3 border rounded-md">
                <div className="w-12 h-12 rounded-md overflow-hidden">
                  <img
                    src={selectedEvent.imageUrl || "/placeholder.svg"}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{selectedEvent.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(selectedEvent.startDate, "PPP", { locale: ko })} ~{" "}
                    {format(selectedEvent.endDate, "PPP", { locale: ko })}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={deleteEvent}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 동물병원몰. 모든 권리 보유.
          </p>
        </div>
      </footer>
    </div>
  )
}

