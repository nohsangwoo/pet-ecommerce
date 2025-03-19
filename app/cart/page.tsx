"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

// Mock data for cart items
const initialCartItems = [
  {
    id: "1",
    name: "강아지 종합 영양제",
    price: 25000,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "고양이 사료 프리미엄",
    price: 45000,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "반려동물 샴푸",
    price: 18000,
    quantity: 3,
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Mock data for recommended products
const recommendedProducts = [
  {
    id: "4",
    name: "강아지 장난감 세트",
    price: 15000,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "5",
    name: "고양이 스크래처",
    price: 22000,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "6",
    name: "반려동물 브러쉬",
    price: 12000,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Simulate loading cart data
  useEffect(() => {
    const timer = setTimeout(() => {
      setCartItems(initialCartItems)
      setLoading(false)
      setMounted(true)
    }, 1000)

    return () => {
      clearTimeout(timer)
      setMounted(false)
    }
  }, [])

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Calculate shipping cost
  const calculateShipping = () => {
    const subtotal = calculateSubtotal()
    return subtotal > 50000 ? 0 : 3000
  }

  // Calculate tax
  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.1)
  }

  // Calculate total
  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax()
  }

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) newQuantity = 1
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
  }

  // If not mounted yet, show loading state
  if (!mounted) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">장바구니</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 animate-pulse">
              <div className="h-24 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-24 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-24 bg-gray-200 rounded-md"></div>
            </Card>
          </div>
          <div>
            <Card className="p-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-10 bg-gray-200 rounded-md"></div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">장바구니</h1>
        <Card className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">장바구니가 비어있습니다</h2>
          <p className="text-gray-500 mb-6">상품을 장바구니에 추가하고 쇼핑을 계속해보세요.</p>
          <Button asChild>
            <Link href="/products">
              쇼핑 시작하기 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Card>

        {/* Recommended products */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">추천 상품</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recommendedProducts.map((product) => (
              <Card key={`recommended-${product.id}`} className="p-4 flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-500">{product.price.toLocaleString()}원</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      setCartItems([
                        {
                          ...product,
                          quantity: 1,
                        },
                      ])
                    }}
                  >
                    장바구니에 추가
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Cart with items
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">장바구니</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">장바구니 상품 ({cartItems.length})</h2>
              <Button variant="outline" size="sm" onClick={clearCart}>
                <Trash2 className="h-4 w-4 mr-2" /> 장바구니 비우기
              </Button>
            </div>

            <Separator className="mb-4" />

            {/* Cart items list */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`cart-item-${item.id}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b"
                >
                  <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                  </div>

                  <div className="flex-grow mb-4 sm:mb-0">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500">{item.price.toLocaleString()}원</p>
                  </div>

                  <div className="flex items-center mr-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                      className="w-12 h-8 mx-1 text-center"
                      min="1"
                    />

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto">
                    <div className="font-medium sm:mr-4">{(item.price * item.quantity).toLocaleString()}원</div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/products">쇼핑 계속하기</Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* Order summary */}
        <div>
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">주문 요약</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">상품 소계</span>
                <span>{calculateSubtotal().toLocaleString()}원</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">배송비</span>
                <span>{calculateShipping() === 0 ? "무료" : `${calculateShipping().toLocaleString()}원`}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">세금</span>
                <span>{calculateTax().toLocaleString()}원</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>총 결제금액</span>
              <span>{calculateTotal().toLocaleString()}원</span>
            </div>

            <Button className="w-full">결제하기</Button>

            <div className="mt-4 text-sm text-gray-500">
              <p>50,000원 이상 구매 시 무료 배송</p>
              <p>결제 시 이용약관에 동의하는 것으로 간주됩니다.</p>
            </div>
          </Card>

          {/* Recommended products */}
          <div className="mt-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">추천 상품</h2>

              <div className="space-y-4">
                {recommendedProducts.map((product) => (
                  <div key={`recommended-${product.id}`} className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-medium text-sm">{product.name}</h3>
                      <p className="text-gray-500 text-sm">{product.price.toLocaleString()}원</p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCartItems([...cartItems, { ...product, quantity: 1 }])
                      }}
                    >
                      추가
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

