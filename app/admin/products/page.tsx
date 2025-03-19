"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Search, Plus, MoreVertical, Edit, Trash2, ArrowUpDown, Upload, Download, RefreshCw } from "lucide-react"

// 제품 데이터 타입 정의
interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: "active" | "inactive"
  supplier: string
  sku: string
  createdAt: string
  updatedAt: string
  image: string
}

// 샘플 제품 데이터
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "프리미엄 강아지 사료",
    category: "사료",
    price: 45000,
    stock: 120,
    status: "active",
    supplier: "펫푸드코리아",
    sku: "DOG-FOOD-001",
    createdAt: "2023-10-15",
    updatedAt: "2024-03-01",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    name: "고양이 장난감 세트",
    category: "장난감",
    price: 15000,
    stock: 45,
    status: "active",
    supplier: "펫토이즈",
    sku: "CAT-TOY-002",
    createdAt: "2023-11-20",
    updatedAt: "2024-02-15",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "3",
    name: "반려동물 영양제",
    category: "건강관리",
    price: 35000,
    stock: 80,
    status: "active",
    supplier: "펫헬스케어",
    sku: "PET-HEALTH-003",
    createdAt: "2023-12-05",
    updatedAt: "2024-03-10",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "4",
    name: "강아지 샴푸",
    category: "미용",
    price: 18000,
    stock: 65,
    status: "active",
    supplier: "펫클린",
    sku: "DOG-CLEAN-004",
    createdAt: "2024-01-10",
    updatedAt: "2024-03-05",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "5",
    name: "고양이 화장실",
    category: "생활용품",
    price: 25000,
    stock: 30,
    status: "inactive",
    supplier: "펫라이프",
    sku: "CAT-LIFE-005",
    createdAt: "2024-01-25",
    updatedAt: "2024-02-28",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "6",
    name: "강아지 간식",
    category: "간식",
    price: 12000,
    stock: 150,
    status: "active",
    supplier: "펫스낵",
    sku: "DOG-SNACK-006",
    createdAt: "2024-02-05",
    updatedAt: "2024-03-15",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "7",
    name: "고양이 사료",
    category: "사료",
    price: 40000,
    stock: 100,
    status: "active",
    supplier: "펫푸드코리아",
    sku: "CAT-FOOD-007",
    createdAt: "2024-02-15",
    updatedAt: "2024-03-10",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "8",
    name: "강아지 목줄",
    category: "액세서리",
    price: 22000,
    stock: 55,
    status: "active",
    supplier: "펫패션",
    sku: "DOG-ACC-008",
    createdAt: "2024-02-20",
    updatedAt: "2024-03-12",
    image: "/placeholder.svg?height=80&width=80",
  },
]

// 카테고리 목록
const categories = ["전체", "사료", "간식", "장난감", "건강관리", "미용", "생활용품", "액세서리"]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [selectedStatus, setSelectedStatus] = useState("전체")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product | null
    direction: "ascending" | "descending" | null
  }>({ key: null, direction: null })

  // 제품 필터링
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "전체" || product.category === selectedCategory

    const matchesStatus =
      selectedStatus === "전체" ||
      (selectedStatus === "활성" && product.status === "active") ||
      (selectedStatus === "비활성" && product.status === "inactive")

    return matchesSearch && matchesCategory && matchesStatus
  })

  // 정렬 처리
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.direction) return 0

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  // 정렬 토글
  const requestSort = (key: keyof Product) => {
    let direction: "ascending" | "descending" | null = "ascending"

    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending"
      } else if (sortConfig.direction === "descending") {
        direction = null
      }
    }

    setSortConfig({ key, direction })
  }

  // 제품 추가
  const handleAddProduct = (newProduct: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString().split("T")[0]
    const newId = (Math.max(...products.map((p) => Number.parseInt(p.id))) + 1).toString()

    const product: Product = {
      id: newId,
      ...newProduct,
      createdAt: now,
      updatedAt: now,
    }

    setProducts([...products, product])
    setIsAddProductOpen(false)
  }

  // 제품 수정
  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) =>
        p.id === updatedProduct.id ? { ...updatedProduct, updatedAt: new Date().toISOString().split("T")[0] } : p,
      ),
    )
    setIsEditProductOpen(false)
    setCurrentProduct(null)
  }

  // 제품 삭제
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  // 제품 상태 변경
  const handleStatusChange = (id: string, newStatus: "active" | "inactive") => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, status: newStatus, updatedAt: new Date().toISOString().split("T")[0] } : p,
      ),
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">제품 관리</h1>
          <p className="text-muted-foreground">병원에서 판매하는 제품을 관리하고 재고를 확인하세요.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            내보내기
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            가져오기
          </Button>
          <Button onClick={() => setIsAddProductOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            제품 추가
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="all">전체 제품</TabsTrigger>
          <TabsTrigger value="low-stock">재고 부족</TabsTrigger>
          <TabsTrigger value="out-of-stock">품절</TabsTrigger>
          <TabsTrigger value="inactive">비활성 제품</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex w-full md:w-96 items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="제품명, SKU, 공급업체 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="카테고리" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="상태" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="전체">전체</SelectItem>
                      <SelectItem value="활성">활성</SelectItem>
                      <SelectItem value="비활성">비활성</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="w-16">이미지</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => requestSort("name")}>
                        <div className="flex items-center">
                          제품명
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => requestSort("category")}>
                        <div className="flex items-center">
                          카테고리
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => requestSort("price")}>
                        <div className="flex items-center">
                          가격
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => requestSort("stock")}>
                        <div className="flex items-center">
                          재고
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => requestSort("supplier")}>
                        <div className="flex items-center">
                          공급업체
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => requestSort("updatedAt")}>
                        <div className="flex items-center">
                          최종 수정일
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="h-24 text-center">
                          검색 결과가 없습니다.
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.price.toLocaleString()}원</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {product.stock}
                              {product.stock <= 10 && (
                                <Badge variant="destructive" className="ml-2">
                                  부족
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={product.status === "active" ? "default" : "secondary"}>
                              {product.status === "active" ? "활성" : "비활성"}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.supplier}</TableCell>
                          <TableCell>{product.updatedAt}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>작업</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setCurrentProduct(product)
                                    setIsEditProductOpen(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  수정
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(product.id, product.status === "active" ? "inactive" : "active")
                                  }
                                >
                                  <Switch className="mr-2" checked={product.status === "active"} />
                                  {product.status === "active" ? "비활성화" : "활성화"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                      <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                                      <span className="text-destructive">삭제</span>
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>제품 삭제</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        정말로 이 제품을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>취소</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        삭제
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                총 {sortedProducts.length}개 제품 중 {sortedProducts.length}개 표시
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="low-stock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>재고 부족 제품</CardTitle>
              <CardDescription>재고가 10개 이하인 제품 목록입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="w-16">이미지</TableHead>
                      <TableHead>제품명</TableHead>
                      <TableHead>카테고리</TableHead>
                      <TableHead>가격</TableHead>
                      <TableHead>재고</TableHead>
                      <TableHead>공급업체</TableHead>
                      <TableHead className="text-right">관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products
                      .filter((p) => p.stock <= 10 && p.stock > 0)
                      .map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.price.toLocaleString()}원</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {product.stock}
                              <Badge variant="destructive" className="ml-2">
                                부족
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>{product.supplier}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              발주 요청
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="out-of-stock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>품절 제품</CardTitle>
              <CardDescription>재고가 0인 제품 목록입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="w-16">이미지</TableHead>
                      <TableHead>제품명</TableHead>
                      <TableHead>카테고리</TableHead>
                      <TableHead>가격</TableHead>
                      <TableHead>재고</TableHead>
                      <TableHead>공급업체</TableHead>
                      <TableHead className="text-right">관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.filter((p) => p.stock === 0).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          품절된 제품이 없습니다.
                        </TableCell>
                      </TableRow>
                    ) : (
                      products
                        .filter((p) => p.stock === 0)
                        .map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <Checkbox />
                            </TableCell>
                            <TableCell>
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="h-10 w-10 rounded-md object-cover"
                              />
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.price.toLocaleString()}원</TableCell>
                            <TableCell>
                              <Badge variant="destructive">품절</Badge>
                            </TableCell>
                            <TableCell>{product.supplier}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                발주 요청
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>비활성 제품</CardTitle>
              <CardDescription>현재 판매하지 않는 제품 목록입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="w-16">이미지</TableHead>
                      <TableHead>제품명</TableHead>
                      <TableHead>카테고리</TableHead>
                      <TableHead>가격</TableHead>
                      <TableHead>재고</TableHead>
                      <TableHead>공급업체</TableHead>
                      <TableHead className="text-right">관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products
                      .filter((p) => p.status === "inactive")
                      .map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.price.toLocaleString()}원</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>{product.supplier}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusChange(product.id, "active")}
                            >
                              활성화
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 제품 추가 다이얼로그 */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>새 제품 추가</DialogTitle>
            <DialogDescription>새로운 제품 정보를 입력하세요. 모든 필드는 필수입니다.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">제품명</Label>
                <Input id="product-name" placeholder="제품명을 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-category">카테고리</Label>
                <Select>
                  <SelectTrigger id="product-category">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-price">가격</Label>
                <Input id="product-price" type="number" placeholder="가격을 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-stock">재고</Label>
                <Input id="product-stock" type="number" placeholder="재고 수량을 입력하세요" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-supplier">공급업체</Label>
                <Input id="product-supplier" placeholder="공급업체를 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-sku">SKU</Label>
                <Input id="product-sku" placeholder="SKU를 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-status">상태</Label>
                <Select defaultValue="active">
                  <SelectTrigger id="product-status">
                    <SelectValue placeholder="상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">활성</SelectItem>
                    <SelectItem value="inactive">비활성</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-image">이미지</Label>
                <div className="border-2 border-dashed rounded-md p-4 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">이미지를 드래그하거나 클릭하여 업로드하세요</p>
                    <Input id="product-image" type="file" className="hidden" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
              취소
            </Button>
            <Button>제품 추가</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 제품 수정 다이얼로그 */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>제품 수정</DialogTitle>
            <DialogDescription>제품 정보를 수정하세요.</DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-product-name">제품명</Label>
                  <Input id="edit-product-name" defaultValue={currentProduct.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-product-category">카테고리</Label>
                  <Select defaultValue={currentProduct.category}>
                    <SelectTrigger id="edit-product-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-product-price">가격</Label>
                  <Input id="edit-product-price" type="number" defaultValue={currentProduct.price} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-product-stock">재고</Label>
                  <Input id="edit-product-stock" type="number" defaultValue={currentProduct.stock} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-product-supplier">공급업체</Label>
                  <Input id="edit-product-supplier" defaultValue={currentProduct.supplier} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-product-sku">SKU</Label>
                  <Input id="edit-product-sku" defaultValue={currentProduct.sku} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-product-status">상태</Label>
                  <Select defaultValue={currentProduct.status}>
                    <SelectTrigger id="edit-product-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">활성</SelectItem>
                      <SelectItem value="inactive">비활성</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-product-image">이미지</Label>
                  <div className="flex items-center gap-4">
                    <img
                      src={currentProduct.image || "/placeholder.svg"}
                      alt={currentProduct.name}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="border-2 border-dashed rounded-md p-4 text-center flex-1">
                      <div className="flex flex-col items-center">
                        <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                        <p className="text-xs text-muted-foreground">새 이미지 업로드</p>
                        <Input id="edit-product-image" type="file" className="hidden" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditProductOpen(false)
                setCurrentProduct(null)
              }}
            >
              취소
            </Button>
            <Button
              onClick={() => {
                if (currentProduct) {
                  handleEditProduct(currentProduct)
                }
              }}
            >
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

