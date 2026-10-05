import { MOCK_ORDERS } from "@/lib/mockData";
import { Order, OrderStatus } from "@/types";

export class OrderService {
  /**
   * Safe public order tracking (returns only non-sensitive shipping progress)
   */
  static async trackOrder(orderNumber: string): Promise<{
    found: boolean;
    orderNumber?: string;
    status?: OrderStatus;
    destinationCity?: string;
    itemCount?: number;
    estimatedDelivery?: string;
  }> {
    const order = MOCK_ORDERS.find(
      (o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase()
    );

    if (!order) {
      return { found: false };
    }

    return {
      found: true,
      orderNumber: order.orderNumber,
      status: order.status,
      destinationCity: order.shippingAddress.city,
      itemCount: order.items.reduce((sum, i) => sum + i.quantity, 0),
      estimatedDelivery: "2–3 business days via priority courier",
    };
  }

  /**
   * Get all orders (Authorized / Admin use only)
   */
  static async getAllOrders(): Promise<Order[]> {
    return MOCK_ORDERS;
  }
}

export class AnalyticsService {
  /**
   * Get high-level store sales and inventory health (Admin Only)
   */
  static async getStoreMetrics() {
    const totalSales = MOCK_ORDERS.reduce((acc, o) => acc + o.totalAmount, 0);
    const totalOrders = MOCK_ORDERS.length;

    return {
      totalSales,
      totalOrders,
      averageOrderValue: totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0,
      currency: "PKR",
    };
  }
}
