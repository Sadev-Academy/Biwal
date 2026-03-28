import { prisma } from "./lib/prisma";

async function promoteToAdmin(email: string) {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" },
    });
    console.log(`User ${user.email} promoted to ADMIN.`);
  } catch (error) {
    console.error("Error promoting user:", error);
  }
}

const email = process.argv[2];
if (!email) {
  console.log("Please provide an email: npx tsx scripts/promote-admin.ts email@example.com");
} else {
  promoteToAdmin(email);
}
