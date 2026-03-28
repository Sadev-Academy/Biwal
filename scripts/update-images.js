/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("./app/generated/prisma");
const prisma = new PrismaClient();

async function main() {
  // Update Hero Image path if needed (though we overwrote the old one)
  
  // Update Product images
  const products = await prisma.product.findMany();
  
  for (const product of products) {
    let newImage = "/products/apparel.png"; // Default
    
    if (product.name.toLowerCase().includes("shoe") || product.name.toLowerCase().includes("sneaker") || product.name.toLowerCase().includes("runner")) {
      newImage = "/products/sneaker.png";
    } else if (product.name.toLowerCase().includes("bag") || product.name.toLowerCase().includes("cap") || product.name.toLowerCase().includes("bottle")) {
      newImage = "/products/accessory.png";
    }
    
    await prisma.product.update({
      where: { id: product.id },
      data: { image: newImage }
    });
  }
  
  console.log("Database updated with premium image paths.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
