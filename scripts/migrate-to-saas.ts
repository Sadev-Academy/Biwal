import * as dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Starting SaaS Migration...");

  // 1. Find or create a system user to own the first store
  let user = await prisma.user.findFirst({
    where: { role: "ADMIN" }
  });

  if (!user) {
    user = await prisma.user.findFirst();
  }

  if (!user) {
    console.log("No users found. Please register a user first.");
    return;
  }

  console.log(`Using user ${user.email} as the owner of the default store.`);

  // 2. Create the default store
  const defaultStore = await prisma.store.upsert({
    where: { subdomain: "biwal" },
    update: {},
    create: {
      name: "Biwal Global",
      subdomain: "biwal",
      ownerId: user.id,
      primaryColor: "#212121",
      secondaryColor: "#707072",
    }
  });

  console.log(`Default store ready: ${defaultStore.name} (${defaultStore.id})`);

  // 3. Assign existing data to the default store
  // Products, Categories, and Orders are linked to Store
  const catCount = await prisma.category.updateMany({
    data: { storeId: defaultStore.id }
  });

  const prodCount = await prisma.product.updateMany({
    data: { storeId: defaultStore.id }
  });

  const orderCount = await prisma.order.updateMany({
    data: { storeId: defaultStore.id }
  });

  console.log(`Migration Results:`);
  console.log(`- Categories updated: ${catCount.count}`);
  console.log(`- Products updated: ${prodCount.count}`);
  console.log(`- Orders updated: ${orderCount.count}`);

  console.log("SaaS Migration successfully completed.");
}

main()
  .catch((e) => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
