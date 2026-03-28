import { prisma } from "@/lib/prisma";
import { getStoreIdOrThrow } from "@/lib/tenant";

export class OrderService {
  /**
   * Create a new order with stock reservation, scoped to the current store
   */
  static async createOrder(data: {
    userId: string;
    items: { productId: string; variantId: string; quantity: number; price: number }[];
    totalAmount: number;
    stripeSessionId?: string;
  }) {
    const storeId = await getStoreIdOrThrow();
    const { userId, items, totalAmount, stripeSessionId } = data;

    // Transaction to ensure atomicity
    return await prisma.$transaction(async (tx) => {
      // 1. Create the order
      const order = await tx.order.create({
        data: {
          storeId,
          userId,
          totalAmount,
          status: "pending",
          stripeSessionId,
          orderItems: {
            create: items.map(item => ({
              productId: item.productId,
              variantId: item.variantId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });

      // 2. Decrement stock for each item (verified within the same store via variants)
      for (const item of items) {
        await tx.productVariant.update({
          where: { 
            id: item.variantId,
            product: { storeId } // Safety check
          },
          data: { stock: { decrement: item.quantity } }
        });
      }

      return order;
    });
  }

  /**
   * Get order details, scoped to the current store
   */
  static async getOrderById(id: string) {
    const storeId = await getStoreIdOrThrow();
    return await prisma.order.findFirst({
      where: { 
        id,
        storeId
      },
      include: {
        orderItems: {
          include: {
            product: true,
            variant: true,
          }
        }
      }
    });
  }

  /**
   * Update order status (e.g. from Stripe Webhook)
   */
  static async updateOrderStatus(sessionId: string, status: string) {
    // Session IDs are unique across the platform
    return await prisma.order.update({
      where: { stripeSessionId: sessionId },
      data: { status }
    });
  }
}
