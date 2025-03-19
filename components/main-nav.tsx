"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore, type UserRole } from "@/store/auth-store"

export function MainNav() {
  const pathname = usePathname()
  const { user, isAuthenticated, role, logout, switchRole } = useAuthStore()

  // 기본 메뉴 (모든 사용자에게 표시)
  const commonRoutes = [
    {
      href: "/",
      label: "홈",
      active: pathname === "/",
    },
    {
      href: "/products",
      label: "상품",
      active: pathname === "/products",
    },
    {
      href: "/requests",
      label: "상품 요청",
      active: pathname === "/requests",
    },
  ]

  // 일반 회원 메뉴
  const generalRoutes = [...commonRoutes]

  // 병원 회원 메뉴
  const hospitalRoutes = [
    ...commonRoutes,
    {
      href: "/hospital/qr",
      label: "QR 코드 관리",
      active: pathname === "/hospital/qr",
    },
    {
      href: "/hospital/hours",
      label: "영업시간 설정",
      active: pathname === "/hospital/hours",
    },
    {
      href: "/hospital/pricing",
      label: "가격 설정",
      active: pathname === "/hospital/pricing",
    },
    {
      href: "/hospital/notifications",
      label: "알림 관리",
      active: pathname === "/hospital/notifications",
    },
    {
      href: "/hospital/sales",
      label: "매출 데이터",
      active: pathname === "/hospital/sales",
    },
  ]

  // 관리자 메뉴
  const adminRoutes = [
    ...commonRoutes,
    {
      href: "/admin/products",
      label: "상품 관리",
      active: pathname === "/admin/products",
    },
    {
      href: "/admin/orders",
      label: "주문 관리",
      active: pathname === "/admin/orders",
    },
    {
      href: "/admin/members",
      label: "회원 관리",
      active: pathname === "/admin/members",
    },
    {
      href: "/admin/privacy",
      label: "개인정보 관리",
      active: pathname === "/admin/privacy",
    },
  ]

  // 현재 역할에 따른 메뉴 선택
  const routes = role === "hospital" ? hospitalRoutes : role === "admin" ? adminRoutes : generalRoutes

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole)
  }

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center">
        <Link href="/" className="font-bold text-xl mr-6">
          동물병원몰
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-black dark:text-white" : "text-muted-foreground",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>역할 전환</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => handleRoleSwitch("general")}
                    className={cn(role === "general" && "bg-muted")}
                  >
                    일반 회원
                  </DropdownMenuItem>
                  {user?.role === "hospital" || user?.role === "admin" ? (
                    <DropdownMenuItem
                      onClick={() => handleRoleSwitch("hospital")}
                      className={cn(role === "hospital" && "bg-muted")}
                    >
                      병원 회원
                    </DropdownMenuItem>
                  ) : null}
                  {user?.role === "admin" ? (
                    <DropdownMenuItem
                      onClick={() => handleRoleSwitch("admin")}
                      className={cn(role === "admin" && "bg-muted")}
                    >
                      관리자
                    </DropdownMenuItem>
                  ) : null}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full">
                      프로필
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders" className="w-full">
                      주문 내역
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>로그아웃</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/cart">
                <Button variant="ghost" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  <span className="sr-only">장바구니</span>
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  로그인
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">회원가입</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

