"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff, Info, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuthStore } from "@/store/auth-store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  email: z.string().email({
    message: "유효한 이메일 주소를 입력해주세요.",
  }),
  password: z.string().min(1, {
    message: "비밀번호를 입력해주세요.",
  }),
})

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [error, setError] = useState("")

  const login = useAuthStore((state) => state.login)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    setMounted(true)

    // 이미 로그인된 경우 홈으로 리다이렉트
    if (isAuthenticated) {
      router.push("/")
    }

    return () => setMounted(false)
  }, [isAuthenticated, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError("")

    try {
      // 로그인 시도
      const success = await login(values.email, values.password)

      if (success) {
        router.push("/")
      } else {
        setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.")
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">다시 오신 것을 환영합니다</h1>
          <p className="text-sm text-muted-foreground">계정에 로그인하세요</p>
        </div>

        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-5 w-5 text-blue-500" />
          <AlertTitle className="text-blue-700 font-medium">테스트 계정 안내</AlertTitle>
          <AlertDescription className="text-blue-600">
            <div className="mt-2 p-3 bg-white rounded-md border border-blue-100 shadow-sm">
              <div className="flex flex-col space-y-2">
                <div className="text-sm font-semibold">일반 회원:</div>
                <div className="flex items-center mb-1 text-sm">
                  <span className="font-medium w-24">이메일:</span>
                  <code className="bg-blue-50 px-2 py-1 rounded text-blue-700">test@naver.com</code>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium w-24">비밀번호:</span>
                  <code className="bg-blue-50 px-2 py-1 rounded text-blue-700">test</code>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-blue-100">
                <div className="text-sm font-semibold">병원 회원:</div>
                <div className="flex items-center mb-1 text-sm">
                  <span className="font-medium w-24">이메일:</span>
                  <code className="bg-blue-50 px-2 py-1 rounded text-blue-700">hospital@example.com</code>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium w-24">비밀번호:</span>
                  <code className="bg-blue-50 px-2 py-1 rounded text-blue-700">test</code>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-blue-100">
                <div className="text-sm font-semibold">관리자:</div>
                <div className="flex items-center mb-1 text-sm">
                  <span className="font-medium w-24">이메일:</span>
                  <code className="bg-blue-50 px-2 py-1 rounded text-blue-700">admin@example.com</code>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium w-24">비밀번호:</span>
                  <code className="bg-blue-50 px-2 py-1 rounded text-blue-700">admin</code>
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <span>일반 회원</span>
            </TabsTrigger>
            <TabsTrigger value="hospital" className="flex items-center gap-2">
              <span>병원 회원</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">일반 회원 로그인</CardTitle>
                <CardDescription>네이버 또는 카카오 계정으로 로그인하세요</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-6">
                  <Button variant="outline" className="bg-[#03C75A] text-white hover:bg-[#03C75A]/90">
                    네이버
                  </Button>
                  <Button variant="outline" className="bg-[#FEE500] text-black hover:bg-[#FEE500]/90">
                    카카오
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">또는</span>
                  </div>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>이메일</FormLabel>
                          <FormControl>
                            <Input placeholder="name@example.com" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>비밀번호</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type={showPassword ? "text" : "password"} {...field} disabled={isLoading} />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          로그인 중...
                        </>
                      ) : (
                        "로그인"
                      )}
                    </Button>
                  </form>
                </Form>

                <div className="text-center text-sm">
                  <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                    계정이 없으신가요? 회원가입
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hospital">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">병원 회원 로그인</CardTitle>
                <CardDescription>병원 대시보드에 접근하기 위해 자격 증명을 입력하세요</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>이메일</FormLabel>
                          <FormControl>
                            <Input placeholder="hospital@example.com" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>비밀번호</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type={showPassword ? "text" : "password"} {...field} disabled={isLoading} />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          로그인 중...
                        </>
                      ) : (
                        "로그인"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link href="/contact" className="text-sm text-muted-foreground underline underline-offset-4">
                  병원 등록 문의하기
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {activeTab === "hospital" && (
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/admin-login" className="underline underline-offset-4 hover:text-primary">
              관리자 로그인
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}

