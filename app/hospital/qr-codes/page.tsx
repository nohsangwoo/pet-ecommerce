"use client"

import { useState, useRef } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  QrCode,
  Plus,
  Download,
  Printer,
  Share2,
  MoreHorizontal,
  Trash2,
  Edit,
  Copy,
  ExternalLink,
  BarChart4,
  Calendar,
  Tag,
  ShoppingBag,
  MapPin,
  Clock,
  Info,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

// 샘플 QR 코드 데이터
const sampleQRCodes = [
  {
    id: "qr-001",
    name: "병원 메인 페이지",
    type: "shop",
    description: "병원 온라인 쇼핑몰 메인 페이지로 연결되는 QR 코드",
    url: "https://example.com/shop/hospital-123",
    imageUrl: "/placeholder.svg?height=200&width=200",
    createdAt: "2023-11-01",
    scans: 245,
    isActive: true,
    expiresAt: null,
  },
  {
    id: "qr-002",
    name: "강아지 사료 프로모션",
    type: "product",
    description: "프리미엄 강아지 사료 20% 할인 프로모션 페이지",
    url: "https://example.com/shop/hospital-123/products/dog-food-promo",
    imageUrl: "/placeholder.svg?height=200&width=200",
    createdAt: "2023-11-05",
    scans: 128,
    isActive: true,
    expiresAt: "2023-12-31",
  },
  {
    id: "qr-003",
    name: "병원 위치 안내",
    type: "location",
    description: "병원 위치 및 찾아오는 길 안내",
    url: "https://example.com/hospital-123/location",
    imageUrl: "/placeholder.svg?height=200&width=200",
    createdAt: "2023-10-15",
    scans: 87,
    isActive: true,
    expiresAt: null,
  },
  {
    id: "qr-004",
    name: "겨울 건강 체크업 이벤트",
    type: "event",
    description: "겨울철 반려동물 건강 체크업 특별 이벤트",
    url: "https://example.com/hospital-123/events/winter-checkup",
    imageUrl: "/placeholder.svg?height=200&width=200",
    createdAt: "2023-11-10",
    scans: 56,
    isActive: true,
    expiresAt: "2024-01-31",
  },
  {
    id: "qr-005",
    name: "고양이 장난감 할인",
    type: "product",
    description: "고양이 장난감 모음전 할인 페이지",
    url: "https://example.com/shop/hospital-123/products/cat-toys",
    imageUrl: "/placeholder.svg?height=200&width=200",
    createdAt: "2023-10-25",
    scans: 42,
    isActive: false,
    expiresAt: "2023-11-30",
  },
  {
    id: "qr-006",
    name: "진료 예약 페이지",
    type: "appointment",
    description: "온라인 진료 예약 페이지",
    url: "https://example.com/hospital-123/appointment",
    imageUrl: "/placeholder.svg?height=200&width=200",
    createdAt: "2023-09-20",
    scans: 312,
    isActive: true,
    expiresAt: null,
  },
]

// QR 코드 타입에 따른 아이콘 및 색상
const getQRTypeIcon = (type) => {
  switch (type) {
    case "shop":
      return <ShoppingBag className="h-4 w-4" />
    case "product":
      return <Tag className="h-4 w-4" />
    case "location":
      return <MapPin className="h-4 w-4" />
    case "event":
      return <Calendar className="h-4 w-4" />
    case "appointment":
      return <Clock className="h-4 w-4" />
    default:
      return <Info className="h-4 w-4" />
  }
}

const getQRTypeBadge = (type) => {
  switch (type) {
    case "shop":
      return <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-100">{getQRTypeIcon(type)} 쇼핑몰</Badge>
    case "product":
      return <Badge className="bg-green-100 text-green-500 hover:bg-green-100">{getQRTypeIcon(type)} 상품</Badge>
    case "location":
      return <Badge className="bg-amber-100 text-amber-500 hover:bg-amber-100">{getQRTypeIcon(type)} 위치</Badge>
    case "event":
      return <Badge className="bg-purple-100 text-purple-500 hover:bg-purple-100">{getQRTypeIcon(type)} 이벤트</Badge>
    case "appointment":
      return <Badge className="bg-indigo-100 text-indigo-500 hover:bg-indigo-100">{getQRTypeIcon(type)} 예약</Badge>
    default:
      return <Badge variant="outline">{getQRTypeIcon(type)} 기타</Badge>
  }
}

export default function HospitalQRCodesPage() {
  const [qrCodes, setQRCodes] = useState(sampleQRCodes)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [newQRCode, setNewQRCode] = useState({
    name: "",
    type: "shop",
    description: "",
    url: "",
    isActive: true,
    hasExpiration: false,
    expiresAt: "",
  })
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedQRCode, setSelectedQRCode] = useState(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const qrCodeRef = useRef(null)

  // QR 코드 필터링
  const getFilteredQRCodes = () => {
    let filtered = [...qrCodes]

    // 탭 필터링
    if (activeTab === "active") {
      filtered = filtered.filter((qr) => qr.isActive)
    } else if (activeTab === "inactive") {
      filtered = filtered.filter((qr) => !qr.isActive)
    }

    // 검색어 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (qr) => qr.name.toLowerCase().includes(query) || qr.description.toLowerCase().includes(query),
      )
    }

    // 타입 필터링
    if (typeFilter !== "all") {
      filtered = filtered.filter((qr) => qr.type === typeFilter)
    }

    // 정렬
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    } else if (sortBy === "most-scanned") {
      filtered.sort((a, b) => b.scans - a.scans)
    } else if (sortBy === "least-scanned") {
      filtered.sort((a, b) => a.scans - b.scans)
    } else if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }

  const filteredQRCodes = getFilteredQRCodes()

  // 새 QR 코드 생성
  const handleCreateQRCode = () => {
    const newId = `qr-${String(qrCodes.length + 1).padStart(3, "0")}`
    const currentDate = new Date().toISOString().split("T")[0]

    const createdQRCode = {
      id: newId,
      name: newQRCode.name,
      type: newQRCode.type,
      description: newQRCode.description,
      url: newQRCode.url,
      imageUrl: "/placeholder.svg?height=200&width=200", // 실제로는 생성된 QR 코드 이미지 URL
      createdAt: currentDate,
      scans: 0,
      isActive: newQRCode.isActive,
      expiresAt: newQRCode.hasExpiration ? newQRCode.expiresAt : null,
    }

    setQRCodes([createdQRCode, ...qrCodes])
    setIsCreateDialogOpen(false)
    setNewQRCode({
      name: "",
      type: "shop",
      description: "",
      url: "",
      isActive: true,
      hasExpiration: false,
      expiresAt: "",
    })
  }

  // QR 코드 상태 토글
  const toggleQRCodeStatus = (id, isActive) => {
    setQRCodes((prev) => prev.map((qr) => (qr.id === id ? { ...qr, isActive } : qr)))
  }

  // QR 코드 삭제
  const deleteQRCode = (id) => {
    setQRCodes((prev) => prev.filter((qr) => qr.id !== id))
  }

  // QR 코드 상세 정보 보기
  const openQRCodeDetail = (qrCode) => {
    setSelectedQRCode(qrCode)
    setIsDetailDialogOpen(true)
  }

  // QR 코드 다운로드 (실제로는 서버에서 생성된 이미지를 다운로드)
  const downloadQRCode = () => {
    // 실제 구현에서는 서버에서 QR 코드 이미지를 다운로드
    alert("QR 코드 이미지가 다운로드되었습니다.")
  }

  // QR 코드 인쇄
  const printQRCode = () => {
    if (qrCodeRef.current) {
      const printWindow = window.open("", "_blank")
      printWindow.document.write(`
        <html>
          <head>
            <title>QR 코드 인쇄</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
              .qr-container { margin: 0 auto; max-width: 300px; }
              img { width: 100%; height: auto; }
              h2 { margin-top: 10px; }
              p { color: #666; }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <img src="${selectedQRCode.imageUrl}" alt="${selectedQRCode.name}" />
              <h2>${selectedQRCode.name}</h2>
              <p>${selectedQRCode.description}</p>
            </div>
            <script>
              window.onload = function() { window.print(); window.close(); }
            </script>
          </body>
        </html>
      `)
      printWindow.document.close()
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">QR 코드 관리</h1>
              <p className="text-muted-foreground">
                병원 쇼핑몰, 상품, 이벤트 등을 위한 QR 코드를 생성하고 관리하세요.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />새 QR 코드 생성
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>새 QR 코드 생성</DialogTitle>
                    <DialogDescription>새로운 QR 코드를 생성하기 위한 정보를 입력하세요.</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="qr-name" className="text-right">
                        이름
                      </Label>
                      <Input
                        id="qr-name"
                        value={newQRCode.name}
                        onChange={(e) => setNewQRCode({ ...newQRCode, name: e.target.value })}
                        className="col-span-3"
                        placeholder="QR 코드 이름"
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="qr-type" className="text-right">
                        유형
                      </Label>
                      <Select
                        value={newQRCode.type}
                        onValueChange={(value) => setNewQRCode({ ...newQRCode, type: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="QR 코드 유형" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shop">쇼핑몰</SelectItem>
                          <SelectItem value="product">상품</SelectItem>
                          <SelectItem value="location">위치</SelectItem>
                          <SelectItem value="event">이벤트</SelectItem>
                          <SelectItem value="appointment">예약</SelectItem>
                          <SelectItem value="other">기타</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="qr-url" className="text-right">
                        URL
                      </Label>
                      <Input
                        id="qr-url"
                        value={newQRCode.url}
                        onChange={(e) => setNewQRCode({ ...newQRCode, url: e.target.value })}
                        className="col-span-3"
                        placeholder="https://example.com/your-link"
                      />
                    </div>

                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="qr-description" className="text-right pt-2">
                        설명
                      </Label>
                      <Textarea
                        id="qr-description"
                        value={newQRCode.description}
                        onChange={(e) => setNewQRCode({ ...newQRCode, description: e.target.value })}
                        className="col-span-3"
                        placeholder="QR 코드에 대한 설명"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="text-right">
                        <Label htmlFor="qr-active">활성화</Label>
                      </div>
                      <div className="flex items-center space-x-2 col-span-3">
                        <Switch
                          id="qr-active"
                          checked={newQRCode.isActive}
                          onCheckedChange={(checked) => setNewQRCode({ ...newQRCode, isActive: checked })}
                        />
                        <Label htmlFor="qr-active">{newQRCode.isActive ? "활성화됨" : "비활성화됨"}</Label>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="text-right">
                        <Label htmlFor="qr-expiration">만료일</Label>
                      </div>
                      <div className="flex items-center space-x-2 col-span-3">
                        <Switch
                          id="qr-expiration"
                          checked={newQRCode.hasExpiration}
                          onCheckedChange={(checked) => setNewQRCode({ ...newQRCode, hasExpiration: checked })}
                        />
                        <Label htmlFor="qr-expiration">{newQRCode.hasExpiration ? "만료일 설정" : "만료일 없음"}</Label>
                      </div>
                    </div>

                    {newQRCode.hasExpiration && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div className="text-right">
                          <Label htmlFor="qr-expires-at">만료일 선택</Label>
                        </div>
                        <Input
                          id="qr-expires-at"
                          type="date"
                          value={newQRCode.expiresAt}
                          onChange={(e) => setNewQRCode({ ...newQRCode, expiresAt: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                    )}
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      취소
                    </Button>
                    <Button onClick={handleCreateQRCode} disabled={!newQRCode.name || !newQRCode.url}>
                      QR 코드 생성
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    내보내기
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    모든 QR 코드 ZIP으로 다운로드
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    QR 코드 목록 CSV로 내보내기
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
                    <label className="text-sm font-medium" htmlFor="search-qr">
                      QR 코드 검색
                    </label>
                    <Input
                      id="search-qr"
                      placeholder="이름 또는 설명으로 검색..."
                      className="mt-1"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">QR 코드 유형</label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="모든 유형" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 유형</SelectItem>
                        <SelectItem value="shop">쇼핑몰</SelectItem>
                        <SelectItem value="product">상품</SelectItem>
                        <SelectItem value="location">위치</SelectItem>
                        <SelectItem value="event">이벤트</SelectItem>
                        <SelectItem value="appointment">예약</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
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
                        <SelectItem value="most-scanned">스캔 많은순</SelectItem>
                        <SelectItem value="least-scanned">스캔 적은순</SelectItem>
                        <SelectItem value="name-asc">이름순</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>QR 코드 통계</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">총 QR 코드</p>
                      <p className="text-2xl font-bold">{qrCodes.length}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">활성 QR 코드</p>
                      <p className="text-2xl font-bold">{qrCodes.filter((qr) => qr.isActive).length}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">총 스캔 수</p>
                      <p className="text-2xl font-bold">{qrCodes.reduce((sum, qr) => sum + qr.scans, 0)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">평균 스캔 수</p>
                      <p className="text-2xl font-bold">
                        {Math.round(qrCodes.reduce((sum, qr) => sum + qr.scans, 0) / qrCodes.length)}
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
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">전체</TabsTrigger>
                  <TabsTrigger value="active">활성</TabsTrigger>
                  <TabsTrigger value="inactive">비활성</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderQRCodeGrid(filteredQRCodes)}
                  </div>
                </TabsContent>

                <TabsContent value="active" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderQRCodeGrid(filteredQRCodes)}
                  </div>
                </TabsContent>

                <TabsContent value="inactive" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderQRCodeGrid(filteredQRCodes)}
                  </div>
                </TabsContent>
              </Tabs>

              {filteredQRCodes.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <QrCode className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">QR 코드가 없습니다</h3>
                  <p className="text-muted-foreground mt-1 mb-4">선택한 필터에 해당하는 QR 코드가 없습니다.</p>
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />새 QR 코드 생성
                  </Button>
                </div>
              )}

              {filteredQRCodes.length > 0 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-muted-foreground">총 {filteredQRCodes.length}개의 QR 코드</p>
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

      {/* QR 코드 상세 정보 다이얼로그 */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedQRCode && (
            <>
              <DialogHeader>
                <DialogTitle>QR 코드 상세 정보</DialogTitle>
                <DialogDescription>{selectedQRCode.name}의 상세 정보 및 사용 통계</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="flex flex-col items-center justify-center">
                  <div ref={qrCodeRef} className="border p-4 rounded-lg bg-white">
                    <img
                      src={selectedQRCode.imageUrl || "/placeholder.svg"}
                      alt={selectedQRCode.name}
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={downloadQRCode}>
                      <Download className="h-4 w-4 mr-2" />
                      다운로드
                    </Button>
                    <Button variant="outline" size="sm" onClick={printQRCode}>
                      <Printer className="h-4 w-4 mr-2" />
                      인쇄
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      공유
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">QR 코드 정보</h3>
                    <div className="mt-2 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">이름:</span>
                        <span className="font-medium">{selectedQRCode.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">유형:</span>
                        <span>{getQRTypeBadge(selectedQRCode.type)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">상태:</span>
                        <span>
                          {selectedQRCode.isActive ? (
                            <Badge className="bg-green-100 text-green-500 hover:bg-green-100">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              활성
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              비활성
                            </Badge>
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">생성일:</span>
                        <span>{selectedQRCode.createdAt}</span>
                      </div>
                      {selectedQRCode.expiresAt && (
                        <div className="flex justify-between">
                          <span className="text-sm">만료일:</span>
                          <span>{selectedQRCode.expiresAt}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm">총 스캔 수:</span>
                        <span className="font-bold">{selectedQRCode.scans}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">URL 정보</h3>
                    <div className="mt-2 p-2 bg-muted rounded-md flex items-center justify-between">
                      <span className="text-sm truncate">{selectedQRCode.url}</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">설명</h3>
                    <p className="mt-2 text-sm">{selectedQRCode.description}</p>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500"
                    onClick={() => {
                      deleteQRCode(selectedQRCode.id)
                      setIsDetailDialogOpen(false)
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    삭제
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    편집
                  </Button>
                </div>
                <Button onClick={() => setIsDetailDialogOpen(false)}>닫기</Button>
              </DialogFooter>
            </>
          )}
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

  // QR 코드 그리드 렌더링 함수
  function renderQRCodeGrid(qrCodes) {
    if (qrCodes.length === 0) {
      return null
    }

    return qrCodes.map((qrCode) => (
      <Card key={qrCode.id} className="overflow-hidden">
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base font-medium truncate">{qrCode.name}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openQRCodeDetail(qrCode)}>
                  <Info className="h-4 w-4 mr-2" />
                  상세 정보
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  편집
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  다운로드
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  공유
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500" onClick={() => deleteQRCode(qrCode.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  삭제
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription className="truncate">{qrCode.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col items-center">
            <div className="border p-4 rounded-lg bg-white cursor-pointer" onClick={() => openQRCodeDetail(qrCode)}>
              <img src={qrCode.imageUrl || "/placeholder.svg"} alt={qrCode.name} className="w-32 h-32 object-contain" />
            </div>
            <div className="mt-4 w-full">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">{getQRTypeBadge(qrCode.type)}</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <BarChart4 className="h-4 w-4" />
                  <span>{qrCode.scans} 스캔</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Switch
                    id={`active-${qrCode.id}`}
                    checked={qrCode.isActive}
                    onCheckedChange={(checked) => toggleQRCodeStatus(qrCode.id, checked)}
                  />
                  <Label htmlFor={`active-${qrCode.id}`} className="text-sm">
                    {qrCode.isActive ? "활성" : "비활성"}
                  </Label>
                </div>
                <Button variant="ghost" size="sm" onClick={() => openQRCodeDetail(qrCode)}>
                  자세히 보기
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ))
  }
}

