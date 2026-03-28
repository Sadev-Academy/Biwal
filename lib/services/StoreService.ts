import { prisma } from "@/lib/prisma";
import { getStoreIdOrThrow } from "@/lib/tenant";

export class StoreService {
  /**
   * Get the current store's full details (branding, etc.)
   */
  static async getActiveStore() {
    const storeId = await getStoreIdOrThrow();
    return await prisma.store.findUnique({
      where: { id: storeId }
    });
  }

  /**
   * Get categories belonging to the current store
   */
  static async getCategories() {
    const storeId = await getStoreIdOrThrow();
    return await prisma.category.findMany({
      where: { storeId },
      orderBy: { name: "asc" }
    });
  }
}
