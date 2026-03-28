import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export class AdminService {
  /**
   * Resolves the store owned by the currently logged-in admin user.
   * Throws or redirects if no store is found.
   */
  static async getAdminStore() {
    const session = await auth();
    
    if (!session?.user?.id) {
      redirect("/login");
    }

    const store = await prisma.store.findFirst({
      where: { ownerId: session.user.id }
    });

    if (!store) {
      // In a real SaaS, we might redirect to a "Create Store" onboarding
      return null;
    }

    return store;
  }

  /**
   * Helper to get the store ID, throwing if not found.
   */
  static async getAdminStoreIdOrThrow() {
    const store = await this.getAdminStore();
    if (!store) {
      throw new Error("You do not own any stores.");
    }
    return store.id;
  }
}
