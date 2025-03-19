"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Percent,
  RefreshCw,
  CheckCircle,
  Tag,
  Search,
  Filter,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  Calendar,
  BarChart4,
  Info,
  Plus,
  Trash2,
  Copy,
  Edit,
  FileText,
  Download,
  Upload,
} from "lucide-react"

// 샘플 상품 데이터
const sampleProducts = [
  {
    id: "prod_1",
    name: "프리미엄 강아지 사료",
    category: "사료",
    basePrice: 35000,
    recommendedPrice: 35000,
    customPrice: 32000,
    discountRate: null,
    margin: 15,
    isCustomPriceEnabled: true,
    isDiscountEnabled: false,
    isActive: true,
  },
  {
    id: "prod_2",
    name: "고양이 치석 제거 간식",
    category: "간식",
    basePrice: 15000,
    recommendedPrice: 15000,
    customPrice: null,
    discountRate: 10,
    margin: 25,
    isCustomPriceEnabled: false,
    isDiscountEnabled: true,
    isActive: true,
  },
  {
    id: "prod_3",
    name: "반려동물 영양제",
    category: "영양제",
    basePrice: 28000,
    recommendedPrice: 28000,
    customPrice: 25000,
    discountRate: null,
    margin: 20,
    isCustomPriceEnabled: true,
    isDiscountEnabled: false,
    isActive: true,
  },
  {
    id: "prod_4",
    name: "강아지 노즈워크 장난감",
    category: "장난감",
    basePrice: 22000,
    recommendedPrice: 22000,
    customPrice: null,
    discountRate: 15,
    margin: 30,
    isCustomPriceEnabled: false,
    isDiscountEnabled: true,
    isActive: true,
  },
  {
    id: "prod_5",
    name: "고양이 화장실",
    category: "용품",
    basePrice: 45000,
    recommendedPrice: 45000,
    customPrice: 42000,
    discountRate: null,
    margin: 18,
    isCustomPriceEnabled: true,
    isDiscountEnabled: false,
    isActive: true,
  },
  {
    id: "prod_6",
    name: "강아지 구충제",
    category: "약품",
    basePrice: 32000,
    recommendedPrice: 32000,
    customPrice: null,
    discountRate: null,
    margin: 35,
    isCustomPriceEnabled: false,
    isDiscountEnabled: false,
    isActive: true,
  },
  {
    id: "prod_7",
    name: "고양이 발톱깎이",
    category: "용품",
    basePrice: 18000,
    recommendedPrice: 18000,
    customPrice: null,
    discountRate: 20,
    margin: 28,
    isCustomPriceEnabled: false,
    isDiscountEnabled: true,
    isActive: true,
  },
  {
    id: "prod_8",
    name: "반려동물 샴푸",
    category: "그루밍",
    basePrice: 25000,
    recommendedPrice: 25000,
    customPrice: 23000,
    discountRate: null,
    margin: 22,
    isCustomPriceEnabled: true,
    isDiscountEnabled: false,
    isActive: true,
  },
]

// 샘플 프로모션 데이터
const samplePromotions = [
  {
    id: "promo_1",
    name: "여름 할인 이벤트",
    type: "percentage",
    value: 15,
    startDate: "2024-07-01",
    endDate: "2024-07-31",
    categories: ["사료", "간식"],
    isActive: true,
  },
  {
    id: "promo_2",
    name: "겨울 건강 캠페인",
    type: "percentage",
    value: 10,
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    categories: ["영양제"],
    isActive: false,
  },
  {
    id: "promo_3",
    name: "신규 고객 특별 할인",
    type: "fixed",
    value: 5000,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    categories: ["전체"],
    isActive: true,
  },
]

// 가격 계산 함수
const calculateFinalPrice = (product) => {
  if (product.isCustomPriceEnabled && product.customPrice !== null) {
    return product.customPrice
  }

  if (product.isDiscountEnabled && product.discountRate !== null) {
    return Math.round(product.basePrice * (1 - product.discountRate / 100))
  }

  return product.basePrice
}

export default function HospitalPricingPage() {
  const [products, setProducts] = useState(sampleProducts)
  const [promotions, setPromotions] = useState(samplePromotions)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState([0, 50000])
  const [sortBy, setSortBy] = useState("name-asc")
  const [selectedProducts, setSelectedProducts] = useState([])
  const [isBulkEditDialogOpen, setIsBulkEditDialogOpen] = useState(false)
  const [bulkEditType, setBulkEditType] = useState("discount")
  const [bulkEditValue, setBulkEditValue] = useState(10)
  const [isNewPromoDialogOpen, setIsNewPromoDialogOpen] = useState(false)
  const [newPromotion, setNewPromotion] = useState({
    name: "",
    type: "percentage",
    value: 10,
    startDate: "",
    endDate: "",
    categories: ["전체"],
    isActive: true,
  })

  // 상품 필터링
  const getFilteredProducts = () => {
    let filtered = [...products]

    // 검색어 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(query))
    }

    // 카테고리 필터링
    if (categoryFilter !== "all") {
      filtered = filtered.filter((product) => product.category === categoryFilter)
    }

    // 가격 범위 필터링
    filtered = filtered.filter((product) => {
      const finalPrice = calculateFinalPrice(product)
      return finalPrice >= priceFilter[0] && finalPrice <= priceFilter[1]
    })

    // 정렬
    if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name))
    } else if (sortBy === "price-asc") {
      filtered.sort((a, b) => calculateFinalPrice(a) - calculateFinalPrice(b))
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => calculateFinalPrice(b) - calculateFinalPrice(a))
    } else if (sortBy === "margin-asc") {
      filtered.sort((a, b) => a.margin - b.margin)
    } else if (sortBy === "margin-desc") {
      filtered.sort((a, b) => b.margin - a.margin)
    }

    return filtered
  }

  const filteredProducts = getFilteredProducts()

  // 카테고리 목록 (중복 제거)
  const categories = [...new Set(products.map((product) => product.category))]

  // 상품 선택 토글
  const toggleProductSelection = (productId) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      } else {
        return [...prev, productId]
      }
    })
  }

  // 모든 상품 선택/해제
  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    }
  }

  // 가격 설정 변경
  const updateProductPrice = (productId, field, value) => {
    setProducts((prev) => prev.map((product) => (product.id === productId ? { ...product, [field]: value } : product)))
  }

  // 일괄 가격 수정
  const applyBulkEdit = () => {
    if (selectedProducts.length === 0) return

    setProducts((prev) =>
      prev.map((product) => {
        if (!selectedProducts.includes(product.id)) return product

        if (bulkEditType === "discount") {
          return {
            ...product,
            isDiscountEnabled: true,
            isCustomPriceEnabled: false,
            discountRate: bulkEditValue,
            customPrice: null,
          }
        } else if (bulkEditType === "fixed") {
          return {
            ...product,
            isDiscountEnabled: false,
            isCustomPriceEnabled: true,
            customPrice: bulkEditValue,
            discountRate: null,
          }
        } else if (bulkEditType === "margin") {
          // 마진 조정은 실제로는 서버에서 처리해야 함
          return {
            ...product,
            margin: bulkEditValue,
          }
        }

        return product
      }),
    )

    setIsBulkEditDialogOpen(false)
    setSelectedProducts([])
  }

  // 새 프로모션 추가
  const addNewPromotion = () => {
    const newPromoId = `promo_${promotions.length + 1}`

    setPromotions([
      ...promotions,
      {
        id: newPromoId,
        ...newPromotion,
      },
    ])

    setIsNewPromoDialogOpen(false)
    setNewPromotion({
      name: "",
      type: "percentage",
      value: 10,
      startDate: "",
      endDate: "",
      categories: ["전체"],
      isActive: true,
    })
  }

  // 프로모션 활성화/비활성화 토글
  const togglePromotionStatus = (promoId, isActive) => {
    setPromotions((prev) => prev.map((promo) => (promo.id === promoId ? { ...promo, isActive } : promo)))
  }

  // 프로모션 삭제
  const deletePromotion = (promoId) => {
    setPromotions((prev) => prev.filter((promo) => promo.id !== promoId))
  }

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">가격 설정</h1>
              <p className="text-muted-foreground">상품 가격과 할인을 관리하고 프로모션을 설정하세요.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Dialog open={isBulkEditDialogOpen} onOpenChange={setIsBulkEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button disabled={selectedProducts.length === 0}>
                    <Tag className="h-4 w-4 mr-2" />
                    일괄 가격 수정 ({selectedProducts.length})
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>일괄 가격 수정</DialogTitle>
                    <DialogDescription>
                      선택한 {selectedProducts.length}개 상품의 가격을 일괄 수정합니다.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>수정 유형</Label>
                      <RadioGroup
                        value={bulkEditType}
                        onValueChange={setBulkEditType}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="discount" id="discount" />
                          <Label htmlFor="discount" className="flex items-center gap-2">
                            <Percent className="h-4 w-4" />
                            할인율 설정
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fixed" id="fixed" />
                          <Label htmlFor="fixed" className="flex items-center gap-2">
                            <Tag className="h-4 w-4" />
                            고정 가격 설정
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="margin" id="margin" />
                          <Label htmlFor="margin" className="flex items-center gap-2">
                            <BarChart4 className="h-4 w-4" />
                            마진율 설정
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bulk-edit-value">
                        {bulkEditType === "discount"
                          ? "할인율 (%)"
                          : bulkEditType === "fixed"
                            ? "고정 가격 (원)"
                            : "마진율 (%)"}
                      </Label>
                      <Input
                        id="bulk-edit-value"
                        type="number"
                        value={bulkEditValue}
                        onChange={(e) => setBulkEditValue(Number(e.target.value))}
                        min={bulkEditType === "fixed" ? 0 : 0}
                        max={bulkEditType !== "fixed" ? 100 : undefined}
                      />
                    </div>

                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center gap-2 text-sm">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <p>
                          {bulkEditType === "discount"
                            ? "할인율을 설정하면 기존 고정 가격 설정은 해제됩니다."
                            : bulkEditType === "fixed"
                              ? "고정 가격을 설정하면 기존 할인율 설정은 해제됩니다."
                              : "마진율을 변경하면 권장 판매가가 변경될 수 있습니다."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsBulkEditDialogOpen(false)}>
                      취소
                    </Button>
                    <Button onClick={applyBulkEdit}>적용</Button>
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
                  <DropdownMenuLabel>가격 관리</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    권장 가격으로 초기화
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Upload className="h-4 w-4 mr-2" />
                    가격 일괄 업로드
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    가격 목록 내보내기
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <FileText className="h-4 w-4 mr-2" />
                    가격 변경 이력 보기
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
                    <label className="text-sm font-medium" htmlFor="search-products">
                      상품 검색
                    </label>
                    <div className="flex mt-1">
                      <Input
                        id="search-products"
                        placeholder="상품명 검색..."
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
                    <label className="text-sm font-medium">가격 범위</label>
                    <div className="pt-6 pb-2">
                      <Slider value={priceFilter} min={0} max={50000} step={1000} onValueChange={setPriceFilter} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">₩{priceFilter[0].toLocaleString()}</span>
                      <span className="text-sm">₩{priceFilter[1].toLocaleString()}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">정렬 기준</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="정렬 기준" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name-asc">이름 (오름차순)</SelectItem>
                        <SelectItem value="name-desc">이름 (내림차순)</SelectItem>
                        <SelectItem value="price-asc">가격 (낮은순)</SelectItem>
                        <SelectItem value="price-desc">가격 (높은순)</SelectItem>
                        <SelectItem value="margin-asc">마진 (낮은순)</SelectItem>
                        <SelectItem value="margin-desc">마진 (높은순)</SelectItem>
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
                  <CardTitle>가격 통계</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">평균 판매가</p>
                      <p className="text-2xl font-bold">
                        ₩
                        {Math.round(
                          products.reduce((sum, product) => sum + calculateFinalPrice(product), 0) / products.length,
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">평균 마진율</p>
                      <p className="text-2xl font-bold">
                        {Math.round(products.reduce((sum, product) => sum + product.margin, 0) / products.length)}%
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">할인 상품</p>
                      <p className="text-2xl font-bold">
                        {products.filter((p) => p.isDiscountEnabled && p.discountRate > 0).length}개
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">커스텀 가격</p>
                      <p className="text-2xl font-bold">
                        {products.filter((p) => p.isCustomPriceEnabled && p.customPrice !== null).length}개
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-3/4">
              <Tabs defaultValue="products">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="products">상품 가격</TabsTrigger>
                  <TabsTrigger value="promotions">프로모션</TabsTrigger>
                </TabsList>

                <TabsContent value="products" className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>상품 가격 관리</CardTitle>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={toggleSelectAll}>
                            {selectedProducts.length === filteredProducts.length ? "전체 선택 해제" : "전체 선택"}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px]">
                                <Checkbox
                                  checked={
                                    filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length
                                  }
                                  onCheckedChange={toggleSelectAll}
                                  aria-label="전체 선택"
                                />
                              </TableHead>
                              <TableHead>상품명</TableHead>
                              <TableHead>카테고리</TableHead>
                              <TableHead className="text-right">기본 가격</TableHead>
                              <TableHead className="text-right">판매 가격</TableHead>
                              <TableHead className="text-center">할인/커스텀</TableHead>
                              <TableHead className="text-center">마진</TableHead>
                              <TableHead className="w-[100px] text-right">작업</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredProducts.map((product) => {
                              const finalPrice = calculateFinalPrice(product)

                              return (
                                <TableRow key={product.id}>
                                  <TableCell>
                                    <Checkbox
                                      checked={selectedProducts.includes(product.id)}
                                      onCheckedChange={() => toggleProductSelection(product.id)}
                                      aria-label={`${product.name} 선택`}
                                    />
                                  </TableCell>
                                  <TableCell className="font-medium">{product.name}</TableCell>
                                  <TableCell>
                                    <Badge variant="outline">{product.category}</Badge>
                                  </TableCell>
                                  <TableCell className="text-right">₩{product.basePrice.toLocaleString()}</TableCell>
                                  <TableCell className="text-right font-medium">
                                    ₩{finalPrice.toLocaleString()}
                                    {finalPrice !== product.basePrice && (
                                      <div className="text-xs text-muted-foreground">
                                        {finalPrice < product.basePrice ? (
                                          <span className="text-green-500">
                                            <ArrowDown className="h-3 w-3 inline" />
                                            {Math.round((1 - finalPrice / product.basePrice) * 100)}%
                                          </span>
                                        ) : (
                                          <span className="text-red-500">
                                            <ArrowUp className="h-3 w-3 inline" />
                                            {Math.round((finalPrice / product.basePrice - 1) * 100)}%
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <div className="flex flex-col items-center gap-1">
                                      <div className="flex items-center gap-2">
                                        <Switch
                                          id={`discount-${product.id}`}
                                          checked={product.isDiscountEnabled}
                                          onCheckedChange={(checked) => {
                                            updateProductPrice(product.id, "isDiscountEnabled", checked)
                                            if (checked) {
                                              updateProductPrice(product.id, "isCustomPriceEnabled", false)
                                            }
                                          }}
                                          size="sm"
                                        />
                                        <Label htmlFor={`discount-${product.id}`} className="text-xs">
                                          할인
                                        </Label>
                                      </div>
                                      {product.isDiscountEnabled && (
                                        <div className="flex items-center gap-1">
                                          <Input
                                            type="number"
                                            value={product.discountRate || 0}
                                            onChange={(e) =>
                                              updateProductPrice(product.id, "discountRate", Number(e.target.value))
                                            }
                                            className="w-16 h-7 text-xs"
                                            min={0}
                                            max={100}
                                          />
                                          <span className="text-xs">%</span>
                                        </div>
                                      )}
                                    </div>

                                    <Separator className="my-2" />

                                    <div className="flex flex-col items-center gap-1">
                                      <div className="flex items-center gap-2">
                                        <Switch
                                          id={`custom-${product.id}`}
                                          checked={product.isCustomPriceEnabled}
                                          onCheckedChange={(checked) => {
                                            updateProductPrice(product.id, "isCustomPriceEnabled", checked)
                                            if (checked) {
                                              updateProductPrice(product.id, "isDiscountEnabled", false)
                                              if (product.customPrice === null) {
                                                updateProductPrice(product.id, "customPrice", product.basePrice)
                                              }
                                            }
                                          }}
                                          size="sm"
                                        />
                                        <Label htmlFor={`custom-${product.id}`} className="text-xs">
                                          커스텀
                                        </Label>
                                      </div>
                                      {product.isCustomPriceEnabled && (
                                        <div className="flex items-center gap-1">
                                          <Input
                                            type="number"
                                            value={product.customPrice || 0}
                                            onChange={(e) =>
                                              updateProductPrice(product.id, "customPrice", Number(e.target.value))
                                            }
                                            className="w-20 h-7 text-xs"
                                            min={0}
                                          />
                                          <span className="text-xs">원</span>
                                        </div>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Badge variant={product.margin >= 25 ? "default" : "outline"}>
                                      {product.margin}%
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                          onClick={() => {
                                            updateProductPrice(product.id, "isCustomPriceEnabled", false)
                                            updateProductPrice(product.id, "isDiscountEnabled", false)
                                            updateProductPrice(product.id, "customPrice", null)
                                            updateProductPrice(product.id, "discountRate", null)
                                          }}
                                        >
                                          <RefreshCw className="h-4 w-4 mr-2" />
                                          기본 가격으로 초기화
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => toggleProductSelection(product.id)}>
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          선택에 추가
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              )
                            })}

                            {filteredProducts.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center">
                                  검색 결과가 없습니다.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <p className="text-sm text-muted-foreground">
                        총 {filteredProducts.length}개 상품 중 {selectedProducts.length}개 선택됨
                      </p>
                      <Button onClick={() => setIsBulkEditDialogOpen(true)} disabled={selectedProducts.length === 0}>
                        <Tag className="h-4 w-4 mr-2" />
                        선택 상품 일괄 수정
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="promotions" className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>프로모션 관리</CardTitle>
                        <Dialog open={isNewPromoDialogOpen} onOpenChange={setIsNewPromoDialogOpen}>
                          <DialogTrigger asChild>
                            <Button>
                              <Plus className="h-4 w-4 mr-2" />새 프로모션
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>새 프로모션 추가</DialogTitle>
                              <DialogDescription>
                                새로운 프로모션을 생성하여 특정 상품 카테고리에 할인을 적용하세요.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="promo-name">프로모션 이름</Label>
                                <Input
                                  id="promo-name"
                                  placeholder="예: 여름 할인 이벤트"
                                  value={newPromotion.name}
                                  onChange={(e) => setNewPromotion({ ...newPromotion, name: e.target.value })}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>할인 유형</Label>
                                <RadioGroup
                                  value={newPromotion.type}
                                  onValueChange={(value) => setNewPromotion({ ...newPromotion, type: value })}
                                  className="flex flex-col space-y-1"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="percentage" id="percentage" />
                                    <Label htmlFor="percentage" className="flex items-center gap-2">
                                      <Percent className="h-4 w-4" />
                                      퍼센트 할인
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="fixed" id="fixed" />
                                    <Label htmlFor="fixed" className="flex items-center gap-2">
                                      <Tag className="h-4 w-4" />
                                      고정 금액 할인
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="promo-value">
                                  {newPromotion.type === "percentage" ? "할인율 (%)" : "할인 금액 (원)"}
                                </Label>
                                <Input
                                  id="promo-value"
                                  type="number"
                                  value={newPromotion.value}
                                  onChange={(e) => setNewPromotion({ ...newPromotion, value: Number(e.target.value) })}
                                  min={0}
                                  max={newPromotion.type === "percentage" ? 100 : undefined}
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="start-date">시작일</Label>
                                  <Input
                                    id="start-date"
                                    type="date"
                                    value={newPromotion.startDate}
                                    onChange={(e) => setNewPromotion({ ...newPromotion, startDate: e.target.value })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="end-date">종료일</Label>
                                  <Input
                                    id="end-date"
                                    type="date"
                                    value={newPromotion.endDate}
                                    onChange={(e) => setNewPromotion({ ...newPromotion, endDate: e.target.value })}
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>적용 카테고리</Label>
                                <Select
                                  value={newPromotion.categories[0]}
                                  onValueChange={(value) => setNewPromotion({ ...newPromotion, categories: [value] })}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="카테고리 선택" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="전체">전체 카테고리</SelectItem>
                                    {categories.map((category) => (
                                      <SelectItem key={category} value={category}>
                                        {category}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="promo-active"
                                  checked={newPromotion.isActive}
                                  onCheckedChange={(checked) => setNewPromotion({ ...newPromotion, isActive: checked })}
                                />
                                <Label htmlFor="promo-active">즉시 활성화</Label>
                              </div>
                            </div>

                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsNewPromoDialogOpen(false)}>
                                취소
                              </Button>
                              <Button
                                onClick={addNewPromotion}
                                disabled={!newPromotion.name || !newPromotion.startDate || !newPromotion.endDate}
                              >
                                프로모션 추가
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {promotions.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">등록된 프로모션이 없습니다.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {promotions.map((promo) => (
                            <Card key={promo.id}>
                              <CardContent className="p-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`p-2 rounded-md ${promo.isActive ? "bg-green-100" : "bg-gray-100"}`}
                                    >
                                      {promo.type === "percentage" ? (
                                        <Percent
                                          className={`h-5 w-5 ${promo.isActive ? "text-green-500" : "text-gray-500"}`}
                                        />
                                      ) : (
                                        <Tag
                                          className={`h-5 w-5 ${promo.isActive ? "text-green-500" : "text-gray-500"}`}
                                        />
                                      )}
                                    </div>
                                    <div>
                                      <h3 className="font-medium">{promo.name}</h3>
                                      <p className="text-sm text-muted-foreground">
                                        {promo.type === "percentage"
                                          ? `${promo.value}% 할인`
                                          : `${promo.value.toLocaleString()}원 할인`}
                                        {promo.categories.includes("전체")
                                          ? " (전체 카테고리)"
                                          : ` (${promo.categories.join(", ")})`}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm">
                                        {promo.startDate} ~ {promo.endDate}
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                      <div className="flex items-center gap-2">
                                        <Switch
                                          id={`promo-active-${promo.id}`}
                                          checked={promo.isActive}
                                          onCheckedChange={(checked) => togglePromotionStatus(promo.id, checked)}
                                        />
                                        <Label htmlFor={`promo-active-${promo.id}`} className="text-sm">
                                          {promo.isActive ? "활성" : "비활성"}
                                        </Label>
                                      </div>

                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem>
                                            <Edit className="h-4 w-4 mr-2" />
                                            편집
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            <Copy className="h-4 w-4 mr-2" />
                                            복제
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem
                                            className="text-red-500"
                                            onClick={() => deletePromotion(promo.id)}
                                          >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            삭제
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

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

