import { NextResponse } from "next/server"

// This would use Prisma in a real implementation
// For demo purposes, we'll use mock data
const mockProducts = [
  {
    id: "prod_1",
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog",
    price: 35000,
    discountedPrice: 32000,
    category: "Pet Food",
    imageUrl: "/placeholder.svg?height=300&width=300",
    stock: 25,
    isActive: true,
    isDisplayed: true,
    customPrice: null,
    customDiscount: 10, // 10% discount
  },
  {
    id: "prod_2",
    name: "Cat Dental Treats",
    description: "Helps maintain dental health for cats",
    price: 15000,
    discountedPrice: null,
    category: "Treats",
    imageUrl: "/placeholder.svg?height=300&width=300",
    stock: 42,
    isActive: true,
    isDisplayed: true,
    customPrice: null,
    customDiscount: null,
  },
  {
    id: "prod_3",
    name: "Flea & Tick Medication",
    description: "Monthly protection against parasites",
    price: 45000,
    discountedPrice: null,
    category: "Medication",
    imageUrl: "/placeholder.svg?height=300&width=300",
    stock: 18,
    isActive: true,
    isDisplayed: true,
    customPrice: 42000,
    customDiscount: null,
  },
]

export async function GET(request: Request, { params }: { params: { hospitalId: string } }) {
  try {
    const { hospitalId } = params

    // In a real implementation, this would fetch products from the database
    // that are associated with the specific hospital

    // For demo purposes, we'll return mock data
    return NextResponse.json({
      products: mockProducts,
      hospitalId,
    })
  } catch (error) {
    console.error("Error fetching hospital products:", error)
    return NextResponse.json({ error: "Failed to fetch hospital products" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { hospitalId: string } }) {
  try {
    const { hospitalId } = params
    const body = await request.json()

    // Validate the request data
    if (!body.productId) {
      return NextResponse.json({ error: "Missing product information" }, { status: 400 })
    }

    // In a real implementation, this would update the hospital-product relationship
    // For demo purposes, we'll simulate a successful update

    return NextResponse.json({
      success: true,
      message: `Product ${body.productId} updated for hospital ${hospitalId}`,
      data: {
        hospitalId,
        productId: body.productId,
        isDisplayed: body.isDisplayed ?? true,
        customPrice: body.customPrice,
        customDiscount: body.customDiscount,
      },
    })
  } catch (error) {
    console.error("Error updating hospital product:", error)
    return NextResponse.json({ error: "Failed to update hospital product" }, { status: 500 })
  }
}

