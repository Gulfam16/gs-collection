import { PrismaClient } from "@prisma/client";
import { MOCK_CATEGORIES, MOCK_SIZES, MOCK_COLORS, MOCK_PRODUCTS, MOCK_COUPONS } from "../src/lib/mockData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting GS Collection database seed...");

  // 1. Seed Categories
  for (const cat of MOCK_CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        imageUrl: cat.imageUrl,
        displayOrder: cat.displayOrder,
        isActive: cat.isActive,
      },
    });
  }
  console.log("✓ Categories seeded.");

  // 2. Seed Sizes
  for (const size of MOCK_SIZES) {
    await prisma.size.upsert({
      where: { name: size.name },
      update: {},
      create: {
        id: size.id,
        name: size.name,
        displayOrder: size.displayOrder,
      },
    });
  }
  console.log("✓ Sizes seeded.");

  // 3. Seed Colors
  for (const color of MOCK_COLORS) {
    await prisma.color.upsert({
      where: { name: color.name },
      update: {},
      create: {
        id: color.id,
        name: color.name,
        hexCode: color.hexCode,
      },
    });
  }
  console.log("✓ Colors seeded.");

  // 4. Seed Coupons
  for (const coupon of MOCK_COUPONS) {
    await prisma.coupon.upsert({
      where: { code: coupon.code },
      update: {},
      create: {
        id: coupon.id,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        minOrderAmount: coupon.minOrderAmount,
        maxDiscountAmount: coupon.maxDiscountAmount,
        usageLimit: coupon.usageLimit,
        startDate: new Date(coupon.startDate),
        expiryDate: new Date(coupon.expiryDate),
        isActive: coupon.isActive,
      },
    });
  }
  console.log("✓ Coupons seeded.");

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
