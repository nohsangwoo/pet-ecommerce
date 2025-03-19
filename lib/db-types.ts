// User Types
export type UserRole = "general" | "hospital" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  hospitalId?: string // For general members, which hospital they're associated with
  createdAt: Date
  updatedAt: Date
}

// Hospital Types
export interface Hospital {
  id: string
  name: string
  address: string
  city: string
  postalCode: string
  email: string
  phone: string
  isActive: boolean
  operatingHours: OperatingHours
  autoSchedule: boolean
  createdAt: Date
  updatedAt: Date
}

export interface OperatingHours {
  monday: { open: string; close: string }
  tuesday: { open: string; close: string }
  wednesday: { open: string; close: string }
  thursday: { open: string; close: string }
  friday: { open: string; close: string }
  saturday: { open: string; close: string }
  sunday: { open: string; close: string }
}

// Product Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  discountedPrice?: number
  category: string
  imageUrl: string
  stock: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Hospital Product Relationship
export interface HospitalProduct {
  hospitalId: string
  productId: string
  isDisplayed: boolean
  customPrice?: number
  customDiscount?: number
}

// Order Types
export interface Order {
  id: string
  userId: string
  hospitalId: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  deliveryMethod: DeliveryMethod
  deliveryAddress: Address
  specialInstructions?: string
  createdAt: Date
  updatedAt: Date
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"
export type PaymentMethod = "card" | "bank_transfer"
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded"
export type DeliveryMethod = "motorcycle" | "courier"

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Address {
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  postalCode: string
  phone: string
}

// Review Types
export interface Review {
  id: string
  userId: string
  productId: string
  orderId: string
  rating: number
  comment?: string
  createdAt: Date
  updatedAt: Date
}

// Event and Notification Types
export interface Event {
  id: string
  title: string
  description: string
  imageUrl?: string
  startDate: Date
  endDate: Date
  isActive: boolean
  hospitalId?: string // If null, it's a system-wide event
  createdAt: Date
  updatedAt: Date
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: NotificationType
  isRead: boolean
  linkUrl?: string
  createdAt: Date
}

export type NotificationType = "order" | "promotion" | "system" | "event"

// Product Request Types
export interface ProductRequest {
  id: string
  userId: string
  hospitalId: string
  productName: string
  description?: string
  status: RequestStatus
  createdAt: Date
  updatedAt: Date
}

export type RequestStatus = "pending" | "approved" | "rejected" | "fulfilled"

