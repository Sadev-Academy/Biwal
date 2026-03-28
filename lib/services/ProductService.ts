import { prisma } from "@/lib/prisma";
import { getStoreIdOrThrow } from "@/lib/tenant";

export class ProductService {
  /**
   * Fetch all products with optional filtering and search, scoped to the current store
   */
  static async getProducts(params: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    limit?: number;
  }) {
    const storeId = await getStoreIdOrThrow();
    const { category, search, minPrice, maxPrice, limit } = params;

    return await prisma.product.findMany({
      where: {
        storeId,
        AND: [
          category ? { category: { name: category } } : {},
          search ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } }
            ]
          } : {},
          minPrice ? { price: { gte: minPrice } } : {},
          maxPrice ? { price: { lte: maxPrice } } : {},
        ]
      },
      include: {
        category: true,
        images: true,
        variants: true,
      },
      take: limit || 50,
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Get a single product by ID with full details, scoped to the current store
   */
  static async getProductById(id: string) {
    const storeId = await getStoreIdOrThrow();
    return await prisma.product.findFirst({
      where: { 
        id,
        storeId
      },
      include: {
        category: true,
        images: true,
        variants: true,
      },
    });
  }

  /**
   * Update stock for a specific variant, verifying store ownership
   */
  static async updateStock(variantId: string, quantity: number) {
    const storeId = await getStoreIdOrThrow();
    const variant = await prisma.productVariant.findFirst({
      where: { 
        id: variantId,
        product: { storeId }
      }
    });

    if (!variant || variant.stock < quantity) {
      throw new Error("Insufficient stock or variant not found in your store");
    }

    return await prisma.productVariant.update({
      where: { id: variantId },
      data: { stock: { decrement: quantity } }
    });
  }

  /**
   * Get featured products for the current store
   */
  static async getFeaturedProducts() {
    const storeId = await getStoreIdOrThrow();
    return await prisma.product.findMany({
      where: { storeId },
      take: 4,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        images: true,
      },
    });
  }
}
