"use client"

import { useState } from "react"
import { User, Mail, Phone, Shield, Key, Clock, Save, Upload, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// 관리자 정보 타입
type AdminProfile = {
  id: string
  name: string
  email: string
  phone: string
  role: string
  department: string
  avatar?: string
  lastPasswordChange: string
  twoFactorEnabled: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  loginHistory: Array<{
    id: number
    date: string
    time: string
    ip: string
    device: string
    location: string
    status: "success" | "failed"
  }>
}

// 샘플 관리자 정보
const ADMIN_PROFILE: AdminProfile = {
  id: "A001",
  name: "김관리",
  email: "admin@example.com",
  phone: "010-1234-5678",
  role: "시스템 관리자",
  department: "IT 부서",
  avatar: "/placeholder.svg?height=128&width=128",
  lastPasswordChange: "2023-01-15",
  twoFactorEnabled: true,
  emailNotifications: true,
  smsNotifications: false,
  loginHistory: [
    {
      id: 1,
      date: "2023-03-20",
      time: "14:30:25",
      ip: "192.168.1.1",
      device: "Chrome / Windows",
      location: "서울, 대한민국",
      status: "success",
    },
    {
      id: 2,
      date: "2023-03-18",
      time: "09:15:10",
      ip: "192.168.1.1",
      device: "Safari / macOS",
      location: "서울, 대한민국",
      status: "success",
    },
    {
      id: 3,
      date: "2023-03-15",
      time: "18:45:33",
      ip: "211.45.67.89",
      device: "Firefox / Linux",
      location: "부산, 대한민국",
      status: "success",
    },
    {
      id: 4,
      date: "2023-03-10",
      time: "11:20:05",
      ip: "192.168.1.1",
      device: "Chrome / Windows",
      location: "서울, 대한민국",
      status: "failed",
    },
    {
      id: 5,
      date: "2023-03-05",
      time: "08:10:15",
      ip: "192.168.1.1",
      device: "Chrome / Android",
      location: "서울, 대한민국",
      status: "success",
    },
  ],
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<AdminProfile>(ADMIN_PROFILE)
  const [isEditing, setIsEditing] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // 프로필 수정 토글
  const toggleEditing = () => {
    setIsEditing(!isEditing)
  }

  // 프로필 저장
  const saveProfile = () => {
    // 실제로는 API 호출 등을 통해 저장
    setIsEditing(false)
    // 성공 메시지 표시 등의 로직 추가
  }

  // 비밀번호 변경
  const changePassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.")
      return
    }

    if (newPassword.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.")
      return
    }

    // 실제로는 API 호출 등을 통해 비밀번호 변경
    setPasswordError("")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    // 성공 메시지 표시 등의 로직 추가
  }

  // 알림 설정 변경
  const toggleNotification = (type: "email" | "sms") => {
    setProfile((prev) => ({
      ...prev,
      emailNotifications: type === "email" ? !prev.emailNotifications : prev.emailNotifications,
      smsNotifications: type === "sms" ? !prev.smsNotifications : prev.smsNotifications,
    }))
  }

  // 2단계 인증 설정 변경
  const toggle2FA = () => {
    setProfile((prev) => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled,
    }))
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">내 프로필</h1>
        {!isEditing ? (
          <Button onClick={toggleEditing}>프로필 수정</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={toggleEditing}>
              취소
            </Button>
            <Button onClick={saveProfile}>
              <Save className="mr-2 h-4 w-4" />
              저장
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">개인 정보</TabsTrigger>
          <TabsTrigger value="security">보안</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
          <TabsTrigger value="activity">활동 내역</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>프로필 정보</CardTitle>
              <CardDescription>개인 정보를 확인하고 수정할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="text-4xl">{profile.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      이미지 변경
                    </Button>
                  )}
                </div>

                <div className="grid gap-4 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">이름</Label>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          value={profile.name}
                          readOnly={!isEditing}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          readOnly={!isEditing}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">전화번호</Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={profile.phone}
                          readOnly={!isEditing}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">역할</Label>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        {isEditing ? (
                          <Select
                            defaultValue={profile.role}
                            onValueChange={(value) => setProfile({ ...profile, role: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="역할 선택" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="시스템 관리자">시스템 관리자</SelectItem>
                              <SelectItem value="제품 관리자">제품 관리자</SelectItem>
                              <SelectItem value="주문 관리자">주문 관리자</SelectItem>
                              <SelectItem value="고객 관리자">고객 관리자</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input id="role" value={profile.role} readOnly className="bg-muted" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">부서</Label>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        {isEditing ? (
                          <Select
                            defaultValue={profile.department}
                            onValueChange={(value) => setProfile({ ...profile, department: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="부서 선택" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="IT 부서">IT 부서</SelectItem>
                              <SelectItem value="마케팅 부서">마케팅 부서</SelectItem>
                              <SelectItem value="영업 부서">영업 부서</SelectItem>
                              <SelectItem value="고객지원 부서">고객지원 부서</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input id="department" value={profile.department} readOnly className="bg-muted" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="id">관리자 ID</Label>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <Input id="id" value={profile.id} readOnly className="bg-muted" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            {isEditing && (
              <CardFooter className="flex justify-end">
                <Button onClick={saveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  저장
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>비밀번호 변경</CardTitle>
              <CardDescription>계정 보안을 위해 정기적으로 비밀번호를 변경하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {passwordError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>오류</AlertTitle>
                  <AlertDescription>{passwordError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="current-password">현재 비밀번호</Label>
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">새 비밀번호</Label>
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  비밀번호는 8자 이상이어야 하며, 숫자와 특수문자를 포함해야 합니다.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">비밀번호 확인</Label>
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                마지막 변경: {profile.lastPasswordChange}
              </div>
              <Button onClick={changePassword}>비밀번호 변경</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2단계 인증</CardTitle>
              <CardDescription>계정 보안을 강화하기 위한 2단계 인증을 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">2단계 인증</div>
                  <div className="text-sm text-muted-foreground">로그인 시 추가 인증 단계를 요구합니다.</div>
                </div>
                <Switch checked={profile.twoFactorEnabled} onCheckedChange={toggle2FA} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>알림 설정</CardTitle>
              <CardDescription>알림 수신 방법을 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">이메일 알림</div>
                  <div className="text-sm text-muted-foreground">중요 알림을 이메일로 받습니다.</div>
                </div>
                <Switch checked={profile.emailNotifications} onCheckedChange={() => toggleNotification("email")} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">SMS 알림</div>
                  <div className="text-sm text-muted-foreground">중요 알림을 SMS로 받습니다.</div>
                </div>
                <Switch checked={profile.smsNotifications} onCheckedChange={() => toggleNotification("sms")} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>로그인 기록</CardTitle>
              <CardDescription>최근 로그인 활동 내역을 확인합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>날짜</TableHead>
                    <TableHead>시간</TableHead>
                    <TableHead className="hidden md:table-cell">IP 주소</TableHead>
                    <TableHead className="hidden md:table-cell">기기</TableHead>
                    <TableHead className="hidden lg:table-cell">위치</TableHead>
                    <TableHead>상태</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profile.loginHistory.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>{log.time}</TableCell>
                      <TableCell className="hidden md:table-cell">{log.ip}</TableCell>
                      <TableCell className="hidden md:table-cell">{log.device}</TableCell>
                      <TableCell className="hidden lg:table-cell">{log.location}</TableCell>
                      <TableCell>
                        {log.status === "success" ? (
                          <span className="text-green-600 font-medium">성공</span>
                        ) : (
                          <span className="text-red-600 font-medium">실패</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

