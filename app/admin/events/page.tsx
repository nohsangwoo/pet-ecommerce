"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Plus, Search, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

export default function EventsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // 이벤트 데이터 샘플
  const events = [
    {
      id: 1,
      title: "봄맞이 할인 이벤트",
      description: "모든 상품 20% 할인",
      startDate: "2023-03-01",
      endDate: "2023-03-31",
      status: "active",
      discount: "20%",
      products: 45,
      views: 1240,
      conversions: 89,
    },
    {
      id: 2,
      title: "신규 회원 특별 할인",
      description: "신규 회원 첫 구매 30% 할인",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      status: "active",
      discount: "30%",
      products: 120,
      views: 3450,
      conversions: 278,
    },
    {
      id: 3,
      title: "여름 시즌 특가",
      description: "여름 관련 상품 최대 40% 할인",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      status: "upcoming",
      discount: "40%",
      products: 78,
      views: 0,
      conversions: 0,
    },
    {
      id: 4,
      title: "블랙 프라이데이",
      description: "연중 최대 할인 행사",
      startDate: "2023-11-24",
      endDate: "2023-11-27",
      status: "upcoming",
      discount: "50%",
      products: 200,
      views: 0,
      conversions: 0,
    },
    {
      id: 5,
      title: "설날 특별 이벤트",
      description: "명절 선물 세트 10% 할인",
      startDate: "2023-01-15",
      endDate: "2023-01-25",
      status: "ended",
      discount: "10%",
      products: 35,
      views: 2100,
      conversions: 145,
    },
    {
      id: 6,
      title: "가을 신상품 출시 기념",
      description: "신상품 구매 시 사은품 증정",
      startDate: "2023-09-01",
      endDate: "2023-09-30",
      status: "ended",
      discount: "사은품",
      products: 28,
      views: 1870,
      conversions: 112,
    },
  ]

  // 이벤트 상태에 따른 배지 색상
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">진행중</Badge>
      case "upcoming":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            예정됨
          </Badge>
        )
      case "ended":
        return <Badge variant="secondary">종료됨</Badge>
      default:
        return <Badge variant="outline">알 수 없음</Badge>
    }
  }

  if (!mounted) {
    return <div className="container mx-auto py-8">로딩 중...</div>
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">이벤트 관리</h1>
          <p className="text-muted-foreground">이벤트를 생성하고 관리하세요.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> 새 이벤트 생성
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="이벤트명 검색..." className="pl-8 w-full md:w-[300px]" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">필터</Button>
          <Button variant="outline">정렬</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="active">진행중</TabsTrigger>
          <TabsTrigger value="upcoming">예정됨</TabsTrigger>
          <TabsTrigger value="ended">종료됨</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={`event-${event.id}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{event.title}</CardTitle>
                    {getStatusBadge(event.status)}
                  </div>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {event.startDate} ~ {event.endDate}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium">할인:</span>
                      <span className="ml-2">{event.discount}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium">대상 상품:</span>
                      <span className="ml-2">{event.products}개</span>
                    </div>
                    {event.status !== "upcoming" && (
                      <div className="flex items-center text-sm">
                        <span className="font-medium">조회수:</span>
                        <span className="ml-2">{event.views.toLocaleString()}</span>
                        <span className="mx-2">|</span>
                        <span className="font-medium">전환:</span>
                        <span className="ml-2">{event.conversions.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" /> 수정
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                    <Trash2 className="mr-2 h-4 w-4" /> 삭제
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events
              .filter((e) => e.status === "active")
              .map((event) => (
                <Card key={`active-event-${event.id}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{event.title}</CardTitle>
                      {getStatusBadge(event.status)}
                    </div>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {event.startDate} ~ {event.endDate}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">할인:</span>
                        <span className="ml-2">{event.discount}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">대상 상품:</span>
                        <span className="ml-2">{event.products}개</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">조회수:</span>
                        <span className="ml-2">{event.views.toLocaleString()}</span>
                        <span className="mx-2">|</span>
                        <span className="font-medium">전환:</span>
                        <span className="ml-2">{event.conversions.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> 수정
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash2 className="mr-2 h-4 w-4" /> 삭제
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events
              .filter((e) => e.status === "upcoming")
              .map((event) => (
                <Card key={`upcoming-event-${event.id}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{event.title}</CardTitle>
                      {getStatusBadge(event.status)}
                    </div>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {event.startDate} ~ {event.endDate}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">할인:</span>
                        <span className="ml-2">{event.discount}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">대상 상품:</span>
                        <span className="ml-2">{event.products}개</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> 수정
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash2 className="mr-2 h-4 w-4" /> 삭제
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="ended" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events
              .filter((e) => e.status === "ended")
              .map((event) => (
                <Card key={`ended-event-${event.id}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{event.title}</CardTitle>
                      {getStatusBadge(event.status)}
                    </div>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {event.startDate} ~ {event.endDate}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">할인:</span>
                        <span className="ml-2">{event.discount}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">대상 상품:</span>
                        <span className="ml-2">{event.products}개</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">조회수:</span>
                        <span className="ml-2">{event.views.toLocaleString()}</span>
                        <span className="mx-2">|</span>
                        <span className="font-medium">전환:</span>
                        <span className="ml-2">{event.conversions.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> 수정
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash2 className="mr-2 h-4 w-4" /> 삭제
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

