// Utility functions for delivery distance calculation and method determination

/**
 * Calculate the distance between two coordinates using the Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in km
  return distance
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}

/**
 * Determine the appropriate delivery method based on distance
 * @param distance Distance in kilometers
 * @returns Recommended delivery method
 */
export function determineDeliveryMethod(distance: number): "motorcycle" | "courier" {
  // If distance is over 10km, use courier service
  return distance > 10 ? "courier" : "motorcycle"
}

/**
 * Calculate the shipping cost based on distance and delivery method
 * @param distance Distance in kilometers
 * @param method Delivery method
 * @returns Shipping cost in KRW
 */
export function calculateShippingCost(distance: number, method: "motorcycle" | "courier"): number {
  if (method === "motorcycle") {
    // Base rate for motorcycle delivery
    return 3000 + Math.max(0, distance - 3) * 500 // 3000 KRW base + 500 KRW per km after 3km
  } else {
    // Courier service has a higher base rate
    return 5000 + distance * 300 // 5000 KRW base + 300 KRW per km
  }
}

/**
 * Estimate delivery time based on distance and method
 * @param distance Distance in kilometers
 * @param method Delivery method
 * @returns Estimated delivery time in minutes
 */
export function estimateDeliveryTime(distance: number, method: "motorcycle" | "courier"): number {
  if (method === "motorcycle") {
    // Motorcycle is faster for short distances
    return 15 + distance * 3 // 15 min preparation + 3 min per km
  } else {
    // Courier takes longer
    return 30 + distance * 2 // 30 min preparation + 2 min per km
  }
}

