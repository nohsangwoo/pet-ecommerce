"use client"

import * as React from "react"
import { Check, ChevronsUpDown, User, Hospital, Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const roles = [
  {
    value: "general",
    label: "일반회원",
    icon: User,
  },
  {
    value: "hospital",
    label: "병원회원",
    icon: Hospital,
  },
  {
    value: "admin",
    label: "관리자",
    icon: Settings,
  },
]

export function RoleSwitcher({ className }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("general")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          <div className="flex items-center gap-2">
            {React.createElement(roles.find((role) => role.value === value)?.icon || User, { className: "h-4 w-4" })}
            <span>{roles.find((role) => role.value === value)?.label || "역할 선택"}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="역할 검색..." />
          <CommandList>
            <CommandEmpty>역할을 찾을 수 없습니다.</CommandEmpty>
            <CommandGroup>
              {roles.map((role) => (
                <CommandItem
                  key={role.value}
                  value={role.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    // 역할 변경 시 로컬 스토리지에 저장
                    localStorage.setItem("userRole", currentValue)
                    // 페이지 새로고침 없이 역할 변경을 적용하기 위해 이벤트 발생
                    window.dispatchEvent(new Event("roleChanged"))
                  }}
                >
                  <div className="flex items-center gap-2">
                    <role.icon className="h-4 w-4" />
                    {role.label}
                  </div>
                  <Check className={cn("ml-auto h-4 w-4", value === role.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

