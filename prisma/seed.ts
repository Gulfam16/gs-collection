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

  // 5. Seed Products & Variants
  for (const prod of MOCK_PRODUCTS) {
    const existing = await prisma.product.findUnique({ where: { slug: prod.slug } });
    if (!existing) {
      await prisma.product.create({
        data: {
          id: prod.id,
          name: prod.name,
          slug: prod.slug,
          description: prod.description,
          fabricMaterial: prod.fabricMaterial,
          careInstructions: prod.careInstructions,
          gender: prod.gender,
          ageGroup: prod.ageGroup,
          basePrice: prod.basePrice,
          salePrice: prod.salePrice || null,
          isFeatured: prod.isFeatured,
          isNewArrival: prod.isNewArrival,
          isActive: prod.isActive,
          categoryId: prod.categoryId,
          images: {
            create: prod.images.map((img) => ({
              id: img.id,
              imageUrl: img.imageUrl,
              altText: img.altText,
              isPrimary: img.isPrimary,
              displayOrder: img.displayOrder,
            })),
          },
          variants: {
            create: prod.variants.map((v) => ({
              id: v.id,
              sizeId: v.sizeId,
              colorId: v.colorId,
              sku: v.sku,
              stockQuantity: v.stockQuantity,
              priceOverride: v.priceOverride || null,
            })),
          },
        },
      });
    }
  }
  console.log("✓ Products & Variants seeded.");

  console.log("🎉 All live database records seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
