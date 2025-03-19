"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Send, ChevronDown, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

// 요청 상태에 따른 배지 스타일 및 아이콘
const getStatusBadge = (status: string) => {
  switch (status) {
    case "승인됨":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          승인됨
        </Badge>
      )
    case "처리 중":
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600">
          <Clock className="h-3 w-3 mr-1" />
          처리 중
        </Badge>
      )
    case "거절됨":
      return (
        <Badge className="bg-red-500 hover:bg-red-600">
          <XCircle className="h-3 w-3 mr-1" />
          거절됨
        </Badge>
      )
    case "완료됨":
      return (
        <Badge className="bg-blue-500 hover:bg-blue-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          완료됨
        </Badge>
      )
    default:
      return (
        <Badge variant="outline">
          <AlertCircle className="h-3 w-3 mr-1" />
          {status}
        </Badge>
      )
  }
}

// 샘플 요청 데이터
const sampleRequests = [
  {
    id: "REQ-2023-0045",
    date: "2023-11-18",
    productName: "특수 알러지 사료",
    description:
      "우리 강아지가 특정 단백질에 알러지가 있어서 특수 사료가 필요합니다. 가능하면 연어와 감자 기반의 사료를 구하고 싶습니다.",
    status: "처리 중",
    hospital: "서울 동물병원",
    response: "",
  },
  {
    id: "REQ-2023-0039",
    date: "2023-11-10",
    productName: "관절 보조제 (고양이용)",
    description: "노령 고양이를 위한 관절 보조제가 필요합니다. 액체 형태로 먹이기 쉬운 제품이면 좋겠습니다.",
    status: "승인됨",
    hospital: "서울 동물병원",
    response: "요청하신 관절 보조제를 주문했습니다. 약 1주일 내에 입고될 예정입니다. 입고 시 알림을 보내드리겠습니다.",
  },
  {
    id: "REQ-2023-0032",
    date: "2023-11-05",
    productName: "천연 해충 방지 목걸이",
    description: "화학 성분이 없는 천연 재료로 만든 해충 방지 목걸이를 찾고 있습니다.",
    status: "거절됨",
    hospital: "서울 동물병원",
    response:
      "현재 저희가 확인한 천연 해충 방지 목걸이는 효과가 검증되지 않았습니다. 대신 저희 병원에서 처방하는 안전한 해충 방지 제품을 추천드립니다.",
  },
  {
    id: "REQ-2023-0028",
    date: "2023-10-25",
    productName: "당뇨병 관리 사료",
    description: "당뇨 진단을 받은 고양이를 위한 특수 사료가 필요합니다.",
    status: "완료됨",
    hospital: "서울 동물병원",
    response:
      "요청하신 당뇨병 관리 사료가 입고되었습니다. 온라인 스토어에서 '당뇨 관리 사료' 카테고리에서 확인하실 수 있습니다.",
  },
]

export default function RequestsPage() {
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState("new")
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "",
    urgency: "보통",
  })

  const toggleRequestDetails = (requestId: string) => {
    if (expandedRequest === requestId) {
      setExpandedRequest(null)
    } else {
      setExpandedRequest(requestId)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 여기서 폼 데이터를 서버로 전송하는 로직을 구현합니다
    alert("상품 요청이 제출되었습니다!")
    // 폼 초기화
    setFormData({
      productName: "",
      description: "",
      category: "",
      urgency: "보통",
    })
    // 요청 내역 탭으로 전환
    setSelectedTab("history")
  }

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">상품 요청</h1>
            <p className="text-muted-foreground">찾으시는 상품이 없으신가요? 동물병원에 상품을 요청하세요.</p>
          </div>

          <Tabs defaultValue="new" className="w-full" onValueChange={setSelectedTab} value={selectedTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="new">새 요청 작성</TabsTrigger>
              <TabsTrigger value="history">요청 내역</TabsTrigger>
            </TabsList>
            <TabsContent value="new" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>새 상품 요청</CardTitle>
                  <CardDescription>필요한 상품에 대한 정보를 최대한 자세히 작성해주세요.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="productName" className="text-sm font-medium">
                          상품명 <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="productName"
                          name="productName"
                          placeholder="요청하실 상품의 이름을 입력하세요"
                          value={formData.productName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <label htmlFor="category" className="text-sm font-medium">
                          카테고리
                        </label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleSelectChange("category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="카테고리 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="food">사료</SelectItem>
                            <SelectItem value="medicine">약품</SelectItem>
                            <SelectItem value="supplement">영양제</SelectItem>
                            <SelectItem value="accessory">액세서리</SelectItem>
                            <SelectItem value="toy">장난감</SelectItem>
                            <SelectItem value="other">기타</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <label htmlFor="description" className="text-sm font-medium">
                          상세 설명 <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="상품에 대한 상세 정보를 입력하세요 (브랜드, 특징, 용도 등)"
                          rows={5}
                          value={formData.description}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <label htmlFor="urgency" className="text-sm font-medium">
                          긴급도
                        </label>
                        <Select
                          value={formData.urgency}
                          onValueChange={(value) => handleSelectChange("urgency", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="긴급도 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="낮음">낮음</SelectItem>
                            <SelectItem value="보통">보통</SelectItem>
                            <SelectItem value="높음">높음</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">요청 처리 안내</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            요청하신 상품은 담당 동물병원에서 검토 후 처리됩니다. 처리 결과는 이메일 또는 알림으로
                            안내드립니다. 일반적으로 요청 처리에는 1-3일이 소요됩니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFormData({
                        productName: "",
                        description: "",
                        category: "",
                        urgency: "보통",
                      })
                    }
                  >
                    초기화
                  </Button>
                  <Button type="submit" onClick={handleSubmit}>
                    <Send className="h-4 w-4 mr-2" />
                    요청 제출
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">요청 내역</h2>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="모든 상태" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">모든 상태</SelectItem>
                      <SelectItem value="pending">처리 중</SelectItem>
                      <SelectItem value="approved">승인됨</SelectItem>
                      <SelectItem value="rejected">거절됨</SelectItem>
                      <SelectItem value="completed">완료됨</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {sampleRequests.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">요청 내역이 없습니다</h3>
                    <p className="text-muted-foreground mt-1 mb-4">아직 상품 요청을 하지 않으셨습니다.</p>
                    <Button onClick={() => setSelectedTab("new")}>새 요청 작성하기</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sampleRequests.map((request) => (
                      <Card key={request.id} className="overflow-hidden">
                        <CardHeader className="p-4 pb-0">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <CardTitle className="text-base font-medium">{request.productName}</CardTitle>
                              <p className="text-sm text-muted-foreground">
                                요청 ID: {request.id} | 요청일: {request.date}
                              </p>
                            </div>
                            <div>{getStatusBadge(request.status)}</div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>
                                <span className="font-medium">{request.hospital}</span>에 요청됨
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 md:mt-0"
                              onClick={() => toggleRequestDetails(request.id)}
                            >
                              {expandedRequest === request.id ? "상세 정보 닫기" : "상세 정보 보기"}
                              <ChevronDown
                                className={`ml-2 h-4 w-4 transition-transform ${
                                  expandedRequest === request.id ? "rotate-180" : ""
                                }`}
                              />
                            </Button>
                          </div>

                          {expandedRequest === request.id && (
                            <div className="mt-4 pt-4 border-t">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-1">요청 내용</h4>
                                  <p className="text-sm">{request.description}</p>
                                </div>

                                {request.response && (
                                  <div>
                                    <h4 className="font-medium mb-1">병원 답변</h4>
                                    <div className="bg-muted p-3 rounded-md text-sm">{request.response}</div>
                                  </div>
                                )}

                                <div className="flex flex-wrap gap-2">
                                  {request.status === "처리 중" && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-500 border-red-200 hover:bg-red-50"
                                    >
                                      요청 취소
                                    </Button>
                                  )}
                                  {request.status === "승인됨" && (
                                    <Button size="sm" variant="outline">
                                      관련 상품 보기
                                    </Button>
                                  )}
                                  {request.status === "완료됨" && (
                                    <Button size="sm" variant="outline">
                                      상품 구매하기
                                    </Button>
                                  )}
                                  <Button size="sm" variant="outline">
                                    문의하기
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
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

