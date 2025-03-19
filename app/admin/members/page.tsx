"use client"

import { useState } from "react"
import { Search, UserPlus, Edit, Trash2, MoreHorizontal, UserCheck, UserX, Download, Upload, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// 회원 타입 정의
type Member = {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  joinDate: string
  lastActive: string
  avatar?: string
}

// 샘플 회원 데이터
const MEMBERS: Member[] = [
  {
    id: "M001",
    name: "김철수",
    email: "kim@example.com",
    role: "병원관리자",
    status: "active",
    joinDate: "2023-01-15",
    lastActive: "2023-03-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "M002",
    name: "이영희",
    email: "lee@example.com",
    role: "수의사",
    status: "active",
    joinDate: "2023-02-10",
    lastActive: "2023-03-19",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "M003",
    name: "박지민",
    email: "park@example.com",
    role: "간호사",
    status: "inactive",
    joinDate: "2023-01-20",
    lastActive: "2023-02-28",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "M004",
    name: "최동욱",
    email: "choi@example.com",
    role: "리셉션",
    status: "pending",
    joinDate: "2023-03-05",
    lastActive: "2023-03-05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "M005",
    name: "정수민",
    email: "jung@example.com",
    role: "수의사",
    status: "active",
    joinDate: "2022-11-15",
    lastActive: "2023-03-18",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "M006",
    name: "한지연",
    email: "han@example.com",
    role: "간호사",
    status: "active",
    joinDate: "2022-12-01",
    lastActive: "2023-03-17",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "M007",
    name: "송민준",
    email: "song@example.com",
    role: "병원관리자",
    status: "inactive",
    joinDate: "2022-10-10",
    lastActive: "2023-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "M008",
    name: "윤서연",
    email: "yoon@example.com",
    role: "리셉션",
    status: "active",
    joinDate: "2023-02-20",
    lastActive: "2023-03-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [isViewMemberOpen, setIsViewMemberOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  // 회원 필터링
  const filteredMembers = MEMBERS.filter((member) => {
    // 검색어 필터링
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase())

    // 탭 필터링
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && member.status === "active") ||
      (activeTab === "inactive" && member.status === "inactive") ||
      (activeTab === "pending" && member.status === "pending")

    // 역할 필터링
    const matchesRole = !selectedRole || member.role === selectedRole

    return matchesSearch && matchesTab && matchesRole
  })

  // 회원 상세 정보 보기
  const handleViewMember = (member: Member) => {
    setSelectedMember(member)
    setIsViewMemberOpen(true)
  }

  // 상태 배지 렌더링
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">활성</Badge>
      case "inactive":
        return <Badge variant="destructive">비활성</Badge>
      case "pending":
        return <Badge variant="outline">승인대기</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">회원 관리</h1>
        <Button onClick={() => setIsAddMemberOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          회원 추가
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>전체 회원</CardTitle>
            <CardDescription>등록된 모든 회원</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{MEMBERS.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>활성 회원</CardTitle>
            <CardDescription>현재 활성화된 회원</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{MEMBERS.filter((m) => m.status === "active").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>비활성 회원</CardTitle>
            <CardDescription>비활성화된 회원</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{MEMBERS.filter((m) => m.status === "inactive").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>승인 대기</CardTitle>
            <CardDescription>승인 대기 중인 회원</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{MEMBERS.filter((m) => m.status === "pending").length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="이름, 이메일, ID 검색..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <Select onValueChange={(value) => setSelectedRole(value === "all" ? null : value)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="역할별 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 역할</SelectItem>
              <SelectItem value="병원관리자">병원관리자</SelectItem>
              <SelectItem value="수의사">수의사</SelectItem>
              <SelectItem value="간호사">간호사</SelectItem>
              <SelectItem value="리셉션">리셉션</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">전체 회원</TabsTrigger>
          <TabsTrigger value="active">활성 회원</TabsTrigger>
          <TabsTrigger value="inactive">비활성 회원</TabsTrigger>
          <TabsTrigger value="pending">승인 대기</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>회원 ID</TableHead>
                    <TableHead>이름</TableHead>
                    <TableHead className="hidden md:table-cell">이메일</TableHead>
                    <TableHead className="hidden md:table-cell">역할</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead className="hidden md:table-cell">가입일</TableHead>
                    <TableHead className="hidden lg:table-cell">최근 활동</TableHead>
                    <TableHead className="text-right">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>{member.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span>{member.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{member.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{member.role}</TableCell>
                        <TableCell>{renderStatusBadge(member.status)}</TableCell>
                        <TableCell className="hidden md:table-cell">{member.joinDate}</TableCell>
                        <TableCell className="hidden lg:table-cell">{member.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>회원 관리</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewMember(member)}>
                                <Eye className="mr-2 h-4 w-4" />
                                상세 정보
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                정보 수정
                              </DropdownMenuItem>
                              {member.status === "active" ? (
                                <DropdownMenuItem>
                                  <UserX className="mr-2 h-4 w-4" />
                                  비활성화
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  활성화
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                삭제
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6">
                        검색 결과가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 회원 추가 다이얼로그 */}
      <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>새 회원 추가</DialogTitle>
            <DialogDescription>새로운 회원 정보를 입력하세요. 모든 필드는 필수입니다.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                이름
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                이메일
              </Label>
              <Input id="email" type="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                역할
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="역할 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="병원관리자">병원관리자</SelectItem>
                  <SelectItem value="수의사">수의사</SelectItem>
                  <SelectItem value="간호사">간호사</SelectItem>
                  <SelectItem value="리셉션">리셉션</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                상태
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="상태 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">활성</SelectItem>
                  <SelectItem value="inactive">비활성</SelectItem>
                  <SelectItem value="pending">승인대기</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                비밀번호
              </Label>
              <Input id="password" type="password" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirm-password" className="text-right">
                비밀번호 확인
              </Label>
              <Input id="confirm-password" type="password" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
              취소
            </Button>
            <Button type="submit">추가</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 회원 상세 정보 다이얼로그 */}
      <Dialog open={isViewMemberOpen} onOpenChange={setIsViewMemberOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>회원 상세 정보</DialogTitle>
            <DialogDescription>회원의 상세 정보를 확인합니다.</DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4 py-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                  <AvatarFallback className="text-2xl">{selectedMember.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{selectedMember.name}</h3>
                  <p className="text-muted-foreground">{selectedMember.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">회원 ID</p>
                  <p className="font-medium">{selectedMember.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">역할</p>
                  <p className="font-medium">{selectedMember.role}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">상태</p>
                  <div>{renderStatusBadge(selectedMember.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">가입일</p>
                  <p className="font-medium">{selectedMember.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">최근 활동</p>
                  <p className="font-medium">{selectedMember.lastActive}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">활동 내역</h4>
                <div className="space-y-2 text-sm">
                  <p>2023-03-20: 로그인</p>
                  <p>2023-03-19: 회원 정보 수정</p>
                  <p>2023-03-15: 제품 등록</p>
                  <p>2023-03-10: 발주 승인</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsViewMemberOpen(false)}>
              닫기
            </Button>
            <Button variant="default">
              <Edit className="mr-2 h-4 w-4" />
              정보 수정
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

