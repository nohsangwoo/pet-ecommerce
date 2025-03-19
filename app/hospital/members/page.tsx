"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  MoreHorizontal,
  User,
  Mail,
  Phone,
  Calendar,
  Tag,
  FileText,
  Edit,
  Trash2,
  Bell,
  MessageSquare,
  ShoppingBag,
  Plus,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Dog,
  Cat,
  Rabbit,
  Bird,
  Info,
  UserPlus,
} from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

// 샘플 회원 데이터
const sampleMembers = [
  {
    id: "mem_1",
    name: "김민지",
    email: "minji.kim@example.com",
    phone: "010-1234-5678",
    joinDate: new Date(2023, 5, 15), // 2023년 6월 15일
    lastVisit: new Date(2024, 4, 10), // 2024년 5월 10일
    status: "active",
    tags: ["VIP", "강아지"],
    pets: [{ name: "초코", type: "dog", breed: "포메라니안", age: 3, gender: "male" }],
    totalSpent: 450000,
    orderCount: 8,
    notes: "알러지: 닭고기",
    isSubscribed: true,
  },
  {
    id: "mem_2",
    name: "이준호",
    email: "junho.lee@example.com",
    phone: "010-2345-6789",
    joinDate: new Date(2023, 8, 22), // 2023년 9월 22일
    lastVisit: new Date(2024, 3, 5), // 2024년 4월 5일
    status: "active",
    tags: ["고양이"],
    pets: [{ name: "나비", type: "cat", breed: "러시안 블루", age: 2, gender: "female" }],
    totalSpent: 280000,
    orderCount: 5,
    notes: "",
    isSubscribed: true,
  },
  {
    id: "mem_3",
    name: "박서연",
    email: "seoyeon.park@example.com",
    phone: "010-3456-7890",
    joinDate: new Date(2022, 11, 10), // 2022년 12월 10일
    lastVisit: new Date(2024, 2, 20), // 2024년 3월 20일
    status: "active",
    tags: ["강아지", "고양이"],
    pets: [
      { name: "맥스", type: "dog", breed: "골든 리트리버", age: 4, gender: "male" },
      { name: "루시", type: "cat", breed: "페르시안", age: 3, gender: "female" },
    ],
    totalSpent: 820000,
    orderCount: 15,
    notes: "정기 건강검진 알림 요청",
    isSubscribed: true,
  },
  {
    id: "mem_4",
    name: "최도윤",
    email: "doyun.choi@example.com",
    phone: "010-4567-8901",
    joinDate: new Date(2024, 0, 5), // 2024년 1월 5일
    lastVisit: new Date(2024, 0, 5), // 2024년 1월 5일
    status: "inactive",
    tags: ["토끼"],
    pets: [{ name: "당근", type: "rabbit", breed: "네덜란드 드워프", age: 1, gender: "male" }],
    totalSpent: 45000,
    orderCount: 1,
    notes: "",
    isSubscribed: false,
  },
  {
    id: "mem_5",
    name: "정하은",
    email: "haeun.jung@example.com",
    phone: "010-5678-9012",
    joinDate: new Date(2023, 2, 8), // 2023년 3월 8일
    lastVisit: new Date(2024, 4, 15), // 2024년 5월 15일
    status: "active",
    tags: ["새"],
    pets: [{ name: "파랑", type: "bird", breed: "잉꼬", age: 2, gender: "male" }],
    totalSpent: 120000,
    orderCount: 3,
    notes: "새 사료 알레르기 있음",
    isSubscribed: true,
  },
  {
    id: "mem_6",
    name: "강민수",
    email: "minsu.kang@example.com",
    phone: "010-6789-0123",
    joinDate: new Date(2023, 7, 20), // 2023년 8월 20일
    lastVisit: new Date(2024, 1, 12), // 2024년 2월 12일
    status: "active",
    tags: ["강아지"],
    pets: [{ name: "바둑이", type: "dog", breed: "말티즈", age: 5, gender: "male" }],
    totalSpent: 350000,
    orderCount: 7,
    notes: "",
    isSubscribed: true,
  },
  {
    id: "mem_7",
    name: "윤지원",
    email: "jiwon.yoon@example.com",
    phone: "010-7890-1234",
    joinDate: new Date(2022, 5, 30), // 2022년 6월 30일
    lastVisit: new Date(2023, 11, 5), // 2023년 12월 5일
    status: "inactive",
    tags: ["고양이"],
    pets: [{ name: "미미", type: "cat", breed: "먼치킨", age: 3, gender: "female" }],
    totalSpent: 180000,
    orderCount: 4,
    notes: "6개월 이상 방문 없음",
    isSubscribed: false,
  },
  {
    id: "mem_8",
    name: "송지훈",
    email: "jihoon.song@example.com",
    phone: "010-8901-2345",
    joinDate: new Date(2024, 3, 2), // 2024년 4월 2일
    lastVisit: new Date(2024, 4, 18), // 2024년 5월 18일
    status: "active",
    tags: ["VIP", "강아지"],
    pets: [{ name: "몽이", type: "dog", breed: "시바 이누", age: 2, gender: "male" }],
    totalSpent: 520000,
    orderCount: 6,
    notes: "프리미엄 사료 선호",
    isSubscribed: true,
  },
]

// 회원 상태에 따른 배지 컴포넌트
const MemberStatusBadge = ({ status }) => {
  if (status === "active") {
    return (
      <Badge variant="outline" className="bg-green-100 text-green-500">
        <CheckCircle className="h-3 w-3 mr-1" />
        활성
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="bg-gray-100 text-gray-500">
      <XCircle className="h-3 w-3 mr-1" />
      비활성
    </Badge>
  )
}

// 반려동물 타입에 따른 아이콘
const getPetIcon = (type) => {
  switch (type) {
    case "dog":
      return <Dog className="h-4 w-4" />
    case "cat":
      return <Cat className="h-4 w-4" />
    case "rabbit":
      return <Rabbit className="h-4 w-4" />
    case "bird":
      return <Bird className="h-4 w-4" />
    default:
      return <Dog className="h-4 w-4" />
  }
}

export default function HospitalMembersPage() {
  const [members, setMembers] = useState(sampleMembers)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [tagFilter, setTagFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedMembers, setSelectedMembers] = useState([])
  const [isAddNoteDialogOpen, setIsAddNoteDialogOpen] = useState(false)
  const [isAddTagDialogOpen, setIsAddTagDialogOpen] = useState(false)
  const [isSendNotificationDialogOpen, setIsSendNotificationDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newNote, setNewNote] = useState("")
  const [newTag, setNewTag] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")

  // 회원 필터링
  const getFilteredMembers = () => {
    let filtered = [...members]

    // 탭 필터링
    if (activeTab === "active") {
      filtered = filtered.filter((member) => member.status === "active")
    } else if (activeTab === "inactive") {
      filtered = filtered.filter((member) => member.status === "inactive")
    } else if (activeTab === "vip") {
      filtered = filtered.filter((member) => member.tags.includes("VIP"))
    } else if (activeTab === "recent") {
      filtered = filtered.filter((member) => {
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return member.joinDate >= thirtyDaysAgo
      })
    }

    // 검색어 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(query) ||
          member.email.toLowerCase().includes(query) ||
          member.phone.includes(query) ||
          member.pets.some((pet) => pet.name.toLowerCase().includes(query)),
      )
    }

    // 태그 필터링
    if (tagFilter !== "all") {
      filtered = filtered.filter((member) => member.tags.includes(tagFilter))
    }

    // 정렬
    if (sortBy === "recent") {
      filtered.sort((a, b) => b.lastVisit - a.lastVisit)
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => a.lastVisit - b.lastVisit)
    } else if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name))
    } else if (sortBy === "spent-desc") {
      filtered.sort((a, b) => b.totalSpent - a.totalSpent)
    }

    return filtered
  }

  const filteredMembers = getFilteredMembers()

  // 모든 태그 목록 (중복 제거)
  const allTags = [...new Set(members.flatMap((member) => member.tags))]

  // 회원 선택 토글
  const toggleMemberSelection = (memberId) => {
    setSelectedMembers((prev) => {
      if (prev.includes(memberId)) {
        return prev.filter((id) => id !== memberId)
      } else {
        return [...prev, memberId]
      }
    })
  }

  // 모든 회원 선택/해제
  const toggleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(filteredMembers.map((member) => member.id))
    }
  }

  // 회원 상태 토글
  const toggleMemberStatus = (memberId, status) => {
    setMembers((prev) => prev.map((member) => (member.id === memberId ? { ...member, status } : member)))
  }

  // 회원 메모 추가
  const addNoteToMember = () => {
    if (!selectedMember || !newNote.trim()) return

    setMembers((prev) =>
      prev.map((member) =>
        member.id === selectedMember.id
          ? {
              ...member,
              notes: member.notes ? `${member.notes}\n${newNote}` : newNote,
            }
          : member,
      ),
    )

    setIsAddNoteDialogOpen(false)
    setNewNote("")
  }

  // 회원 태그 추가
  const addTagToMembers = () => {
    if (!newTag.trim() || selectedMembers.length === 0) return

    setMembers((prev) =>
      prev.map((member) =>
        selectedMembers.includes(member.id)
          ? {
              ...member,
              tags: member.tags.includes(newTag) ? member.tags : [...member.tags, newTag],
            }
          : member,
      ),
    )

    setIsAddTagDialogOpen(false)
    setNewTag("")
    setSelectedMembers([])
  }

  // 알림 전송
  const sendNotification = () => {
    if (!notificationMessage.trim() || selectedMembers.length === 0) return

    // 실제 구현에서는 API 호출을 통해 알림 전송
    alert(`${selectedMembers.length}명의 회원에게 알림을 전송했습니다.`)

    setIsSendNotificationDialogOpen(false)
    setNotificationMessage("")
    setSelectedMembers([])
  }

  // 회원 삭제
  const deleteMember = () => {
    if (!selectedMember) return

    setMembers((prev) => prev.filter((member) => member.id !== selectedMember.id))
    setIsDeleteDialogOpen(false)
    setSelectedMember(null)
  }

  // 회원 상세 정보 보기
  const openMemberDetail = (member) => {
    setSelectedMember(member)
    setIsDetailDialogOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">회원 관리</h1>
              <p className="text-muted-foreground">병원 회원을 관리하고 소통하세요.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setIsSendNotificationDialogOpen(true)} disabled={selectedMembers.length === 0}>
                <Bell className="h-4 w-4 mr-2" />
                알림 전송 ({selectedMembers.length})
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <MoreHorizontal className="h-4 w-4 mr-2" />더 보기
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>회원 관리</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsAddTagDialogOpen(true)} disabled={selectedMembers.length === 0}>
                    <Tag className="h-4 w-4 mr-2" />
                    태그 추가
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    회원 목록 내보내기
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Upload className="h-4 w-4 mr-2" />
                    회원 일괄 업로드
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserPlus className="h-4 w-4 mr-2" />
                    회원 추가
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
                    <label className="text-sm font-medium" htmlFor="search-members">
                      회원 검색
                    </label>
                    <div className="flex mt-1">
                      <Input
                        id="search-members"
                        placeholder="이름, 이메일, 전화번호..."
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
                    <label className="text-sm font-medium">태그</label>
                    <Select value={tagFilter} onValueChange={setTagFilter}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="모든 태그" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 태그</SelectItem>
                        {allTags.map((tag) => (
                          <SelectItem key={tag} value={tag}>
                            {tag}
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
                        <SelectItem value="recent">최근 방문순</SelectItem>
                        <SelectItem value="oldest">오래된 방문순</SelectItem>
                        <SelectItem value="name-asc">이름 (오름차순)</SelectItem>
                        <SelectItem value="name-desc">이름 (내림차순)</SelectItem>
                        <SelectItem value="spent-desc">구매액 (높은순)</SelectItem>
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
                  <CardTitle>회원 통계</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">총 회원</p>
                      <p className="text-2xl font-bold">{members.length}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">활성 회원</p>
                      <p className="text-2xl font-bold">{members.filter((m) => m.status === "active").length}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">VIP 회원</p>
                      <p className="text-2xl font-bold">{members.filter((m) => m.tags.includes("VIP")).length}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">평균 구매액</p>
                      <p className="text-2xl font-bold">
                        ₩
                        {Math.round(
                          members.reduce((sum, m) => sum + m.totalSpent, 0) / members.length,
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-3/4">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">전체</TabsTrigger>
                  <TabsTrigger value="active">활성</TabsTrigger>
                  <TabsTrigger value="vip">VIP</TabsTrigger>
                  <TabsTrigger value="recent">최근 가입</TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>회원 목록</CardTitle>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={toggleSelectAll}>
                            {selectedMembers.length === filteredMembers.length ? "전체 선택 해제" : "전체 선택"}
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
                                    filteredMembers.length > 0 && selectedMembers.length === filteredMembers.length
                                  }
                                  onCheckedChange={toggleSelectAll}
                                  aria-label="전체 선택"
                                />
                              </TableHead>
                              <TableHead>회원 정보</TableHead>
                              <TableHead>반려동물</TableHead>
                              <TableHead>태그</TableHead>
                              <TableHead className="text-right">구매 정보</TableHead>
                              <TableHead className="text-center">상태</TableHead>
                              <TableHead className="w-[100px] text-right">작업</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredMembers.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                  검색 결과가 없습니다.
                                </TableCell>
                              </TableRow>
                            ) : (
                              filteredMembers.map((member) => (
                                <TableRow key={member.id}>
                                  <TableCell>
                                    <Checkbox
                                      checked={selectedMembers.includes(member.id)}
                                      onCheckedChange={() => toggleMemberSelection(member.id)}
                                      aria-label={`${member.name} 선택`}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex flex-col">
                                      <div className="font-medium">{member.name}</div>
                                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Mail className="h-3 w-3" />
                                        {member.email}
                                      </div>
                                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Phone className="h-3 w-3" />
                                        {member.phone}
                                      </div>
                                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                        <Calendar className="h-3 w-3" />
                                        가입: {format(member.joinDate, "yyyy.MM.dd", { locale: ko })}
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="space-y-1">
                                      {member.pets.map((pet, index) => (
                                        <div key={index} className="flex items-center gap-1">
                                          {getPetIcon(pet.type)}
                                          <span className="text-sm">{pet.name}</span>
                                          <span className="text-xs text-muted-foreground">
                                            ({pet.breed}, {pet.age}세)
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                      {member.tags.map((tag, index) => (
                                        <Badge key={index} variant="outline">
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="space-y-1">
                                      <div className="font-medium">₩{member.totalSpent.toLocaleString()}</div>
                                      <div className="text-sm text-muted-foreground">{member.orderCount}건 주문</div>
                                      <div className="text-xs text-muted-foreground">
                                        최근 방문: {format(member.lastVisit, "yyyy.MM.dd", { locale: ko })}
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <div className="flex flex-col items-center gap-2">
                                      <MemberStatusBadge status={member.status} />
                                      <Switch
                                        id={`status-${member.id}`}
                                        size="sm"
                                        checked={member.status === "active"}
                                        onCheckedChange={(checked) =>
                                          toggleMemberStatus(member.id, checked ? "active" : "inactive")
                                        }
                                      />
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => openMemberDetail(member)}>
                                          <User className="h-4 w-4 mr-2" />
                                          상세 정보
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => {
                                            setSelectedMember(member)
                                            setIsAddNoteDialogOpen(true)
                                          }}
                                        >
                                          <FileText className="h-4 w-4 mr-2" />
                                          메모 추가
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <MessageSquare className="h-4 w-4 mr-2" />
                                          메시지 보내기
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <ShoppingBag className="h-4 w-4 mr-2" />
                                          주문 내역
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                          className="text-red-500"
                                          onClick={() => {
                                            setSelectedMember(member)
                                            setIsDeleteDialogOpen(true)
                                          }}
                                        >
                                          <Trash2 className="h-4 w-4 mr-2" />
                                          삭제
                                        </DropdownMenuItem>
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
                    <CardFooter className="flex justify-between">
                      <p className="text-sm text-muted-foreground">
                        총 {filteredMembers.length}명의 회원 중 {selectedMembers.length}명 선택됨
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsAddTagDialogOpen(true)}
                          disabled={selectedMembers.length === 0}
                        >
                          <Tag className="h-4 w-4 mr-2" />
                          태그 추가
                        </Button>
                        <Button
                          onClick={() => setIsSendNotificationDialogOpen(true)}
                          disabled={selectedMembers.length === 0}
                        >
                          <Bell className="h-4 w-4 mr-2" />
                          알림 전송
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      {/* 메모 추가 다이얼로그 */}
      <Dialog open={isAddNoteDialogOpen} onOpenChange={setIsAddNoteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>회원 메모 추가</DialogTitle>
            <DialogDescription>{selectedMember?.name}님에 대한 메모를 추가합니다.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {selectedMember?.notes && (
              <div className="space-y-2">
                <Label>기존 메모</Label>
                <div className="p-3 bg-muted rounded-md text-sm">
                  {selectedMember.notes.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="new-note">새 메모</Label>
              <Textarea
                id="new-note"
                placeholder="회원에 대한 메모를 입력하세요"
                rows={4}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddNoteDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={addNoteToMember} disabled={!newNote.trim()}>
              메모 추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 태그 추가 다이얼로그 */}
      <Dialog open={isAddTagDialogOpen} onOpenChange={setIsAddTagDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>태그 추가</DialogTitle>
            <DialogDescription>선택한 {selectedMembers.length}명의 회원에게 태그를 추가합니다.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>기존 태그</Label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setNewTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-tag">새 태그</Label>
              <Input
                id="new-tag"
                placeholder="태그 이름 입력 또는 위에서 선택"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">태그는 회원을 분류하고 그룹화하는 데 사용됩니다.</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTagDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={addTagToMembers} disabled={!newTag.trim()}>
              태그 추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 알림 전송 다이얼로그 */}
      <Dialog open={isSendNotificationDialogOpen} onOpenChange={setIsSendNotificationDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>알림 전송</DialogTitle>
            <DialogDescription>선택한 {selectedMembers.length}명의 회원에게 알림을 전송합니다.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="notification-message">알림 메시지</Label>
              <Textarea
                id="notification-message"
                placeholder="전송할 알림 메시지를 입력하세요"
                rows={4}
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
              />
            </div>

            <div className="bg-muted p-3 rounded-md">
              <div className="flex items-center gap-2 text-sm">
                <Info className="h-4 w-4 text-muted-foreground" />
                <p>알림은 회원의 이메일 또는 앱 푸시 알림으로 전송됩니다. 알림 수신에 동의한 회원에게만 전송됩니다.</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSendNotificationDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={sendNotification} disabled={!notificationMessage.trim()}>
              알림 전송
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 회원 상세 정보 다이얼로그 */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedMember && (
            <>
              <DialogHeader>
                <DialogTitle>회원 상세 정보</DialogTitle>
                <DialogDescription>{selectedMember.name}님의 상세 정보 및 활동 내역</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">기본 정보</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">이름:</span>
                          <span className="font-medium">{selectedMember.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">이메일:</span>
                          <span>{selectedMember.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">전화번호:</span>
                          <span>{selectedMember.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">가입일:</span>
                          <span>{format(selectedMember.joinDate, "PPP", { locale: ko })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">최근 방문:</span>
                          <span>{format(selectedMember.lastVisit, "PPP", { locale: ko })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">상태:</span>
                          <MemberStatusBadge status={selectedMember.status} />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">반려동물 정보</h3>
                      <div className="space-y-3">
                        {selectedMember.pets.map((pet, index) => (
                          <div key={index} className="p-3 border rounded-md">
                            <div className="flex items-center gap-2 mb-2">
                              {getPetIcon(pet.type)}
                              <span className="font-medium">{pet.name}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">종류:</span> {pet.breed}
                              </div>
                              <div>
                                <span className="text-muted-foreground">나이:</span> {pet.age}세
                              </div>
                              <div>
                                <span className="text-muted-foreground">성별:</span>{" "}
                                {pet.gender === "male" ? "수컷" : "암컷"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/2 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">구매 정보</h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">총 구매액</p>
                              <p className="text-2xl font-bold">₩{selectedMember.totalSpent.toLocaleString()}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">주문 횟수</p>
                              <p className="text-2xl font-bold">{selectedMember.orderCount}회</p>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full mt-4">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            주문 내역 보기
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">태그</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                        <Button variant="outline" size="sm" className="h-6">
                          <Plus className="h-3 w-3 mr-1" />
                          태그 추가
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-muted-foreground">메모</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setIsDetailDialogOpen(false)
                            setIsAddNoteDialogOpen(true)
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          메모 추가
                        </Button>
                      </div>
                      {selectedMember.notes ? (
                        <div className="p-3 bg-muted rounded-md text-sm">
                          {selectedMember.notes.split("\n").map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                      ) : (
                        <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground">메모가 없습니다.</div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">알림 설정</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notification-subscription">알림 수신</Label>
                          <p className="text-xs text-muted-foreground">이메일 및 앱 푸시 알림 수신 여부</p>
                        </div>
                        <Switch
                          id="notification-subscription"
                          checked={selectedMember.isSubscribed}
                          onCheckedChange={(checked) => {
                            setMembers((prev) =>
                              prev.map((member) =>
                                member.id === selectedMember.id ? { ...member, isSubscribed: checked } : member,
                              ),
                            )
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedMember(selectedMember)
                      setIsDetailDialogOpen(false)
                      setIsDeleteDialogOpen(true)
                    }}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    삭제
                  </Button>
                  <Button variant="outline">
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

      {/* 회원 삭제 확인 다이얼로그 */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>회원 삭제</DialogTitle>
            <DialogDescription>정말로 이 회원을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
          </DialogHeader>

          {selectedMember && (
            <div className="py-4">
              <div className="flex items-center gap-3 p-3 border rounded-md">
                <div className="p-2 bg-muted rounded-full">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{selectedMember.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedMember.email}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={deleteMember}>
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

