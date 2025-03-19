import { NextResponse } from "next/server"
import {
  calculateDistance,
  determineDeliveryMethod,
  calculateShippingCost,
  estimateDeliveryTime,
} from "@/lib/delivery-utils"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request data
    if (!body.customerLocation || !body.hospitalLocation) {
      return NextResponse.json({ error: "Missing location information" }, { status: 400 })
    }

    const { customerLocation, hospitalLocation } = body

    // Calculate distance between customer and hospital
    const distance = calculateDistance(
      customerLocation.latitude,
      customerLocation.longitude,
      hospitalLocation.latitude,
      hospitalLocation.longitude,
    )

    // Determine appropriate delivery method
    const recommendedMethod = determineDeliveryMethod(distance)

    // Calculate shipping costs for both methods
    const motorcycleCost = calculateShippingCost(distance, "motorcycle")
    const courierCost = calculateShippingCost(distance, "courier")

    // Estimate delivery times
    const motorcycleTime = estimateDeliveryTime(distance, "motorcycle")
    const courierTime = estimateDeliveryTime(distance, "courier")

    // Return delivery options
    return NextResponse.json({
      distance: distance.toFixed(2), // Distance in km
      recommendedMethod,
      deliveryOptions: {
        motorcycle: {
          available: distance <= 10,
          cost: motorcycleCost,
          estimatedTime: motorcycleTime,
        },
        courier: {
          available: true,
          cost: courierCost,
          estimatedTime: courierTime,
        },
      },
    })
  } catch (error) {
    console.error("Delivery distance check error:", error)
    return NextResponse.json({ error: "Failed to check delivery distance" }, { status: 500 })
  }
}

