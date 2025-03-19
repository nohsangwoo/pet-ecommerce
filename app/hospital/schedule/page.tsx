"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
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
import { Clock, CalendarIcon, Plus, Save, RefreshCw, AlertCircle, CheckCircle, X, Copy, Info } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

// 요일 데이터
const weekdays = [
  { id: "monday", label: "월요일" },
  { id: "tuesday", label: "화요일" },
  { id: "wednesday", label: "수요일" },
  { id: "thursday", label: "목요일" },
  { id: "friday", label: "금요일" },
  { id: "saturday", label: "토요일" },
  { id: "sunday", label: "일요일" },
]

// 시간 옵션 생성 (30분 간격)
const generateTimeOptions = () => {
  const options = []
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of [0, 30]) {
      const h = hour.toString().padStart(2, "0")
      const m = minute.toString().padStart(2, "0")
      const time = `${h}:${m}`
      const label = `${h}:${m}`
      options.push({ value: time, label })
    }
  }
  return options
}

const timeOptions = generateTimeOptions()

// 샘플 휴무일 데이터
const sampleHolidays = [
  { date: new Date(2024, 0, 1), name: "신정", isFullDay: true, openTime: null, closeTime: null },
  { date: new Date(2024, 2, 1), name: "삼일절", isFullDay: true, openTime: null, closeTime: null },
  { date: new Date(2024, 4, 5), name: "어린이날", isFullDay: true, openTime: null, closeTime: null },
  { date: new Date(2024, 5, 6), name: "현충일", isFullDay: true, openTime: null, closeTime: null },
  { date: new Date(2024, 7, 15), name: "광복절", isFullDay: true, openTime: null, closeTime: null },
  { date: new Date(2024, 9, 3), name: "개천절", isFullDay: true, openTime: null, closeTime: null },
  { date: new Date(2024, 9, 9), name: "한글날", isFullDay: true, openTime: null, closeTime: null },
  { date: new Date(2024, 11, 25), name: "크리스마스", isFullDay: true, openTime: null, closeTime: null },
  { date: new Date(2024, 11, 31), name: "연말 단축운영", isFullDay: false, openTime: "09:00", closeTime: "15:00" },
]

export default function HospitalSchedulePage() {
  // 기본 운영 시간 상태
  const [regularHours, setRegularHours] = useState({
    monday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
    tuesday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
    wednesday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
    thursday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
    friday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
    saturday: { isOpen: true, openTime: "09:00", closeTime: "13:00" },
    sunday: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
  })

  // 휴무일 상태
  const [holidays, setHolidays] = useState(sampleHolidays)
  const [selectedDate, setSelectedDate] = useState(null)
  const [isHolidayDialogOpen, setIsHolidayDialogOpen] = useState(false)
  const [newHoliday, setNewHoliday] = useState({
    date: new Date(),
    name: "",
    isFullDay: true,
    openTime: "09:00",
    closeTime: "18:00",
  })

  // 자동 스케줄링 상태
  const [autoSchedule, setAutoSchedule] = useState(false)
  const [syncWithHospital, setSyncWithHospital] = useState(true)
  const [isShopOpen, setIsShopOpen] = useState(true)
  const [temporaryClosed, setTemporaryClosed] = useState(false)
  const [temporaryClosedReason, setTemporaryClosedReason] = useState("")
  const [temporaryClosedUntil, setTemporaryClosedUntil] = useState(null)

  // 운영 시간 변경 핸들러
  const handleRegularHoursChange = (day, field, value) => {
    setRegularHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }))
  }

  // 휴무일 추가
  const handleAddHoliday = () => {
    const newHolidayEntry = {
      date: newHoliday.date,
      name: newHoliday.name,
      isFullDay: newHoliday.isFullDay,
      openTime: newHoliday.isFullDay ? null : newHoliday.openTime,
      closeTime: newHoliday.isFullDay ? null : newHoliday.closeTime,
    }

    setHolidays((prev) => [...prev, newHolidayEntry])
    setIsHolidayDialogOpen(false)
    setNewHoliday({
      date: new Date(),
      name: "",
      isFullDay: true,
      openTime: "09:00",
      closeTime: "18:00",
    })
  }

  // 휴무일 삭제
  const handleDeleteHoliday = (date) => {
    setHolidays((prev) => prev.filter((holiday) => holiday.date.getTime() !== date.getTime()))
  }

  // 모든 요일에 같은 시간 적용
  const applyToAllDays = (openTime, closeTime) => {
    const updatedHours = {}
    Object.keys(regularHours).forEach((day) => {
      updatedHours[day] = {
        ...regularHours[day],
        openTime,
        closeTime,
      }
    })
    setRegularHours(updatedHours)
  }

  // 평일에만 같은 시간 적용
  const applyToWeekdays = (openTime, closeTime) => {
    const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"]
    const updatedHours = { ...regularHours }

    weekdays.forEach((day) => {
      updatedHours[day] = {
        ...updatedHours[day],
        openTime,
        closeTime,
      }
    })

    setRegularHours(updatedHours)
  }

  // 주말에만 같은 시간 적용
  const applyToWeekends = (openTime, closeTime) => {
    const weekends = ["saturday", "sunday"]
    const updatedHours = { ...regularHours }

    weekends.forEach((day) => {
      updatedHours[day] = {
        ...updatedHours[day],
        openTime,
        closeTime,
      }
    })

    setRegularHours(updatedHours)
  }

  // 설정 저장
  const saveSettings = () => {
    // 실제 구현에서는 API 호출을 통해 서버에 저장
    alert("운영 시간 설정이 저장되었습니다.")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">샵 운영 시간</h1>
              <p className="text-muted-foreground">온라인 쇼핑몰의 운영 시간과 휴무일을 관리하세요.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={saveSettings}>
                <Save className="h-4 w-4 mr-2" />
                설정 저장
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>샵 상태</CardTitle>
                      <CardDescription>현재 샵 운영 상태를 관리합니다.</CardDescription>
                    </div>
                    <Badge
                      className={
                        isShopOpen && !temporaryClosed ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
                      }
                    >
                      {isShopOpen && !temporaryClosed ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" /> 운영 중
                        </>
                      ) : (
                        <>
                          <X className="h-3 w-3 mr-1" /> 운영 중지
                        </>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="shop-status">샵 활성화</Label>
                      <p className="text-sm text-muted-foreground">샵을 활성화하면 고객이 상품을 주문할 수 있습니다.</p>
                    </div>
                    <Switch id="shop-status" checked={isShopOpen} onCheckedChange={setIsShopOpen} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="temporary-closed">임시 휴무</Label>
                      <p className="text-sm text-muted-foreground">특정 기간 동안 샵을 임시로 닫습니다.</p>
                    </div>
                    <Switch
                      id="temporary-closed"
                      checked={temporaryClosed}
                      onCheckedChange={setTemporaryClosed}
                      disabled={!isShopOpen}
                    />
                  </div>

                  {temporaryClosed && (
                    <div className="space-y-4 pl-6 border-l-2 border-muted">
                      <div className="grid gap-2">
                        <Label htmlFor="closed-reason">휴무 사유</Label>
                        <Input
                          id="closed-reason"
                          placeholder="휴무 사유를 입력하세요"
                          value={temporaryClosedReason}
                          onChange={(e) => setTemporaryClosedReason(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="closed-until">휴무 종료일</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {temporaryClosedUntil ? (
                                format(temporaryClosedUntil, "PPP", { locale: ko })
                              ) : (
                                <span>날짜 선택</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={temporaryClosedUntil}
                              onSelect={setTemporaryClosedUntil}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-schedule">자동 스케줄링</Label>
                      <p className="text-sm text-muted-foreground">
                        설정한 운영 시간에 따라 자동으로 샵을 열고 닫습니다.
                      </p>
                    </div>
                    <Switch
                      id="auto-schedule"
                      checked={autoSchedule}
                      onCheckedChange={setAutoSchedule}
                      disabled={!isShopOpen || temporaryClosed}
                    />
                  </div>

                  {autoSchedule && (
                    <div className="space-y-4 pl-6 border-l-2 border-muted">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sync-hospital">병원 운영 시간과 동기화</Label>
                          <p className="text-sm text-muted-foreground">
                            병원 운영 시간과 동일하게 샵 운영 시간을 설정합니다.
                          </p>
                        </div>
                        <Switch id="sync-hospital" checked={syncWithHospital} onCheckedChange={setSyncWithHospital} />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Tabs defaultValue="regular">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="regular">기본 운영 시간</TabsTrigger>
                  <TabsTrigger value="holidays">휴무일</TabsTrigger>
                </TabsList>

                <TabsContent value="regular" className="mt-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>기본 운영 시간</CardTitle>
                        <div className="flex gap-2">
                          <Select
                            onValueChange={(value) => {
                              const [openTime, closeTime] = value.split("-")
                              if (value === "custom") return

                              if (value === "apply-weekdays") {
                                applyToWeekdays(regularHours.monday.openTime, regularHours.monday.closeTime)
                                return
                              }

                              if (value === "apply-weekends") {
                                applyToWeekends(regularHours.saturday.openTime, regularHours.saturday.closeTime)
                                return
                              }

                              applyToAllDays(openTime, closeTime)
                            }}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="빠른 설정" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="09:00-18:00">09:00 - 18:00</SelectItem>
                              <SelectItem value="08:30-17:30">08:30 - 17:30</SelectItem>
                              <SelectItem value="10:00-19:00">10:00 - 19:00</SelectItem>
                              <SelectItem value="00:00-23:30">24시간 운영</SelectItem>
                              <SelectItem value="apply-weekdays">평일 동일 적용</SelectItem>
                              <SelectItem value="apply-weekends">주말 동일 적용</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {weekdays.map((day) => (
                          <div key={day.id} className="flex items-center gap-4">
                            <div className="w-24">
                              <Label>{day.label}</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                id={`${day.id}-open`}
                                checked={regularHours[day.id].isOpen}
                                onCheckedChange={(checked) => handleRegularHoursChange(day.id, "isOpen", checked)}
                              />
                              <Label htmlFor={`${day.id}-open`} className="text-sm">
                                {regularHours[day.id].isOpen ? "영업" : "휴무"}
                              </Label>
                            </div>
                            {regularHours[day.id].isOpen && (
                              <div className="flex items-center gap-2 flex-1">
                                <Select
                                  value={regularHours[day.id].openTime}
                                  onValueChange={(value) => handleRegularHoursChange(day.id, "openTime", value)}
                                >
                                  <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="오픈 시간" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeOptions.map((time) => (
                                      <SelectItem key={time.value} value={time.value}>
                                        {time.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <span>~</span>
                                <Select
                                  value={regularHours[day.id].closeTime}
                                  onValueChange={(value) => handleRegularHoursChange(day.id, "closeTime", value)}
                                >
                                  <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="마감 시간" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeOptions.map((time) => (
                                      <SelectItem key={time.value} value={time.value}>
                                        {time.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => {
                          // 기본값으로 초기화
                          setRegularHours({
                            monday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
                            tuesday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
                            wednesday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
                            thursday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
                            friday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
                            saturday: { isOpen: true, openTime: "09:00", closeTime: "13:00" },
                            sunday: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
                          })
                        }}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        기본값으로 초기화
                      </Button>
                      <Button onClick={saveSettings}>
                        <Save className="h-4 w-4 mr-2" />
                        저장
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="holidays" className="mt-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>휴무일 관리</CardTitle>
                        <Dialog open={isHolidayDialogOpen} onOpenChange={setIsHolidayDialogOpen}>
                          <DialogTrigger asChild>
                            <Button>
                              <Plus className="h-4 w-4 mr-2" />
                              휴무일 추가
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>휴무일 추가</DialogTitle>
                              <DialogDescription>샵 운영을 중단할 휴무일을 추가하세요.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="holiday-date">날짜</Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {newHoliday.date ? (
                                        format(newHoliday.date, "PPP", { locale: ko })
                                      ) : (
                                        <span>날짜 선택</span>
                                      )}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={newHoliday.date}
                                      onSelect={(date) => setNewHoliday({ ...newHoliday, date })}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="holiday-name">휴무일 이름</Label>
                                <Input
                                  id="holiday-name"
                                  placeholder="예: 설날, 추석, 창립기념일 등"
                                  value={newHoliday.name}
                                  onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="full-day-closed"
                                  checked={newHoliday.isFullDay}
                                  onCheckedChange={(checked) => setNewHoliday({ ...newHoliday, isFullDay: checked })}
                                />
                                <Label htmlFor="full-day-closed">종일 휴무</Label>
                              </div>

                              {!newHoliday.isFullDay && (
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                  <div className="space-y-2">
                                    <Label htmlFor="holiday-open-time">오픈 시간</Label>
                                    <Select
                                      value={newHoliday.openTime}
                                      onValueChange={(value) => setNewHoliday({ ...newHoliday, openTime: value })}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="오픈 시간" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {timeOptions.map((time) => (
                                          <SelectItem key={time.value} value={time.value}>
                                            {time.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="holiday-close-time">마감 시간</Label>
                                    <Select
                                      value={newHoliday.closeTime}
                                      onValueChange={(value) => setNewHoliday({ ...newHoliday, closeTime: value })}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="마감 시간" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {timeOptions.map((time) => (
                                          <SelectItem key={time.value} value={time.value}>
                                            {time.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsHolidayDialogOpen(false)}>
                                취소
                              </Button>
                              <Button onClick={handleAddHoliday} disabled={!newHoliday.name}>
                                추가
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {holidays.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">등록된 휴무일이 없습니다.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {holidays.map((holiday, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                              <div className="flex items-center gap-3">
                                <div className="bg-muted p-2 rounded-md">
                                  <CalendarIcon className="h-5 w-5" />
                                </div>
                                <div>
                                  <p className="font-medium">{format(holiday.date, "PPP", { locale: ko })}</p>
                                  <p className="text-sm text-muted-foreground">{holiday.name}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                {holiday.isFullDay ? (
                                  <Badge variant="outline">종일 휴무</Badge>
                                ) : (
                                  <Badge variant="outline">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {holiday.openTime} ~ {holiday.closeTime}
                                  </Badge>
                                )}
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteHoliday(holiday.date)}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="md:w-1/3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>운영 시간 미리보기</CardTitle>
                  <CardDescription>고객에게 표시되는 운영 시간입니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {temporaryClosed ? (
                      <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <div className="flex items-center gap-2 text-red-500 font-medium mb-2">
                          <AlertCircle className="h-5 w-5" />
                          <span>임시 휴무 중</span>
                        </div>
                        <p className="text-sm">{temporaryClosedReason || "휴무 중입니다."}</p>
                        {temporaryClosedUntil && (
                          <p className="text-sm mt-1">{format(temporaryClosedUntil, "PPP", { locale: ko })}까지 휴무</p>
                        )}
                      </div>
                    ) : !isShopOpen ? (
                      <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                        <div className="flex items-center gap-2 text-amber-500 font-medium">
                          <AlertCircle className="h-5 w-5" />
                          <span>샵이 비활성화되었습니다</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">기본 운영 시간</h3>
                          <div className="space-y-1">
                            {weekdays.map((day) => (
                              <div key={day.id} className="flex justify-between text-sm">
                                <span>{day.label}</span>
                                {regularHours[day.id].isOpen ? (
                                  <span>
                                    {regularHours[day.id].openTime} ~ {regularHours[day.id].closeTime}
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground">휴무</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {holidays.length > 0 && (
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">휴무일</h3>
                            <div className="space-y-1">
                              {holidays.slice(0, 3).map((holiday, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span>
                                    {format(holiday.date, "PPP", { locale: ko })} ({holiday.name})
                                  </span>
                                  {holiday.isFullDay ? (
                                    <span className="text-muted-foreground">휴무</span>
                                  ) : (
                                    <span>
                                      {holiday.openTime} ~ {holiday.closeTime}
                                    </span>
                                  )}
                                </div>
                              ))}
                              {holidays.length > 3 && (
                                <p className="text-xs text-muted-foreground text-right">
                                  외 {holidays.length - 3}개 더 있음
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {autoSchedule && (
                          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                            <div className="flex items-center gap-2 text-blue-500 text-sm">
                              <Info className="h-4 w-4" />
                              <span>자동 스케줄링이 활성화되었습니다.</span>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Copy className="h-4 w-4 mr-2" />
                    운영 시간 복사
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>도움말</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">자동 스케줄링이란?</h3>
                    <p className="text-sm text-muted-foreground">
                      자동 스케줄링을 활성화하면 설정한 운영 시간에 따라 샵이 자동으로 열리고 닫힙니다. 운영 시간 외에는
                      주문을 받지 않습니다.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">임시 휴무 설정</h3>
                    <p className="text-sm text-muted-foreground">
                      특별한 상황(휴가, 리모델링 등)으로 인해 일시적으로 샵을 닫아야 할 경우 임시 휴무를 설정하세요.
                      설정한 날짜까지 자동으로 샵이 닫힙니다.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">병원 운영 시간과 동기화</h3>
                    <p className="text-sm text-muted-foreground">
                      병원 운영 시간과 동기화를 활성화하면 병원 운영 시간이 변경될 때 샵 운영 시간도 자동으로
                      업데이트됩니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
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

