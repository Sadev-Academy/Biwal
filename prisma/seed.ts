import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapter = new PrismaPg(pool as any)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Start seeding SaaS foundation...')

  // 1. Create or get Super Admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@biwal.com' },
    update: {},
    create: {
      email: 'admin@biwal.com',
      name: 'Super Admin',
      password: 'password123', // In a real app, hash this
      role: 'ADMIN',
    },
  })

  // 2. Create the Default Store
  const defaultStore = await prisma.store.upsert({
    where: { subdomain: 'biwal' },
    update: {
      ownerId: adminUser.id,
    },
    create: {
      name: 'Biwal Global',
      subdomain: 'biwal',
      ownerId: adminUser.id,
      primaryColor: '#212121',
      secondaryColor: '#707072',
    },
  })

  console.log(`Store created: ${defaultStore.name}`)

  // Clear existing items for this store to prevent duplicates in re-seeding
  await prisma.orderItem.deleteMany({ where: { product: { storeId: defaultStore.id } } })
  await prisma.order.deleteMany({ where: { storeId: defaultStore.id } })
  await prisma.product.deleteMany({ where: { storeId: defaultStore.id } })
  await prisma.category.deleteMany({ where: { storeId: defaultStore.id } })

  // 3. Create Categories for the store
  const categoryTShirts = await prisma.category.create({ data: { name: 'T-Shirts', image: '/categories/tshirts.png', storeId: defaultStore.id } })
  const categoryHoodies = await prisma.category.create({ data: { name: 'Hoodies', image: '/categories/hoodies.png', storeId: defaultStore.id } })
  const categorySneakers = await prisma.category.create({ data: { name: 'Sneakers', image: '/categories/sneakers.png', storeId: defaultStore.id } })
  const categoryAccessories = await prisma.category.create({ data: { name: 'Accessories', image: '/categories/accessories.png', storeId: defaultStore.id } })

  // 4. Create Products for the store
  const products = [
    {
      name: 'Essential Cotton Tee',
      description: 'The foundation of any wardrobe. Made from 100% organic cotton for a soft, breathable feel.',
      price: 32.0,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
      categoryId: categoryTShirts.id,
      storeId: defaultStore.id,
    },
    {
      name: 'Boxy Heavyweight Tee',
      description: 'A modern, oversized fit with a substantial weight. Perfect for a premium streetwear look.',
      price: 45.0,
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800',
      categoryId: categoryTShirts.id,
      storeId: defaultStore.id,
    },
    {
      name: 'Cozy Knit Hoodie',
      description: 'Premium French Terry cotton with a brushed interior for ultimate comfort.',
      price: 89.0,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
      categoryId: categoryHoodies.id,
      storeId: defaultStore.id,
    },
    {
      name: 'Active Performance Hoodie',
      description: 'Moisture-wicking fabric with a sleek finish, designed for both style and movement.',
      price: 95.0,
      image: 'https://images.unsplash.com/photo-1509948914842-8332c54af400?auto=format&fit=crop&q=80&w=800',
      categoryId: categoryHoodies.id,
      storeId: defaultStore.id,
    },
    {
      name: 'Cloud Walker Sneakers',
      description: 'Ultra-lightweight foam sole with a recycled knit upper. Like walking on clouds.',
      price: 135.0,
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800',
      categoryId: categorySneakers.id,
      storeId: defaultStore.id,
    },
    {
      name: 'Urban Craft Sneakers',
      description: 'Handcrafted leather sneakers with a timeless design that only gets better with age.',
      price: 160.0,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
      categoryId: categorySneakers.id,
      storeId: defaultStore.id,
    },
    {
      name: 'Canvas Tote Bag',
      description: 'Durable cotton canvas with reinforced handles. Your perfect companion for daily errands.',
      price: 25.0,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
      categoryId: categoryAccessories.id,
      storeId: defaultStore.id,
    },
    {
      name: 'Minimalist Leather Wallet',
      description: 'Full-grain leather with a slim profile for the modern minimalist.',
      price: 55.0,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
      categoryId: categoryAccessories.id,
      storeId: defaultStore.id,
    },
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }

  console.log('Seeding finished. Platform ready for multi-tenancy.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
