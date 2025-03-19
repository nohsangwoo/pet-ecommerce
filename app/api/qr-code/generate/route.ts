import { NextResponse } from "next/server"
import QRCode from "qrcode"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request data
    if (!body.hospitalId || !body.data) {
      return NextResponse.json({ error: "Missing required QR code information" }, { status: 400 })
    }

    const { hospitalId, data, size = 300 } = body

    // Create a URL for the hospital's shop
    const shopUrl = `${process.env.NEXT_PUBLIC_APP_URL}/shop/${hospitalId}`

    // Generate QR code with additional data embedded
    const qrData = JSON.stringify({
      url: shopUrl,
      hospitalId,
      ...data,
    })

    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      width: size,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    })

    // Return the QR code data URL
    return NextResponse.json({
      success: true,
      qrCode: qrCodeDataUrl,
      hospitalId,
      createdAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("QR code generation error:", error)
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 })
  }
}

