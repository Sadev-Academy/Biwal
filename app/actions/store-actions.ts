"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateStoreSettings(storeId: string, data: {
  name?: string;
  subdomain?: string;
  customDomain?: string | null;
  primaryColor?: string;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Verify ownership
  const store = await prisma.store.findFirst({
    where: {
      id: storeId,
      ownerId: session.user.id,
    },
  });

  if (!store) {
    throw new Error("Store not found or unauthorized");
  }

  await prisma.store.update({
    where: { id: storeId },
    data,
  });

  revalidatePath("/admin/settings");
  revalidatePath("/"); // Revalidate home for branding changes
  
  return { success: true };
}
