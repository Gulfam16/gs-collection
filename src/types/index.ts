export type UserRole = "CUSTOMER" | "ADMIN";

export type GenderCategory = "BOYS" | "GIRLS" | "BABY" | "UNISEX";

export type AgeGroup =
  | "0-1Y"
  | "1-2Y"
  | "2-3Y"
  | "4-5Y"
  | "6-7Y"
  | "8-9Y"
  | "10-11Y"
  | "12-13Y";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentMethod = "COD" | "STRIPE" | "EASYPAISA" | "JAZZCASH";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export type DiscountType = "PERCENTAGE" | "FIXED";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  parentId?: string | null;
  displayOrder: number;
  isActive: boolean;
  productCount?: number;
}

export interface Size {
  id: string;
  name: string;
  displayOrder: number;
}

export interface Color {
  id: string;
  name: string;
  hexCode: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sizeId: string;
  colorId: string;
  sku: string;
  stockQuantity: number;
  priceOverride?: number | null;
  size: Size;
  color: Color;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  altText?: string | null;
  isPrimary: boolean;
  displayOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  fabricMaterial?: string | null;
  careInstructions?: string | null;
  gender: GenderCategory;
  ageGroup?: string | null;
  basePrice: number;
  salePrice?: number | null;
  isFeatured: boolean;
  isNewArrival: boolean;
  isActive: boolean;
  categoryId: string;
  category?: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  sizes?: Size[];
  colors?: Color[];
  ratingAverage?: number;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  image: string;
  sizeName: string;
  colorName: string;
  colorHex: string;
  price: number;
  originalPrice?: number | null;
  quantity: number;
  maxStock: number;
}

export interface Address {
  id?: string;
  recipientName: string;
  phone: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode?: string;
  country: string;
  isDefault?: boolean;
}

export interface OrderItem {
  id: string;
  orderId: string;
  variantId?: string | null;
  productId: string;
  productName: string;
  productSlug?: string;
  productImage?: string;
  sizeName: string;
  colorName: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string | null;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  couponCode?: string | null;
  shippingAddress: Address;
  customerNotes?: string | null;
  adminNotes?: string | null;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number | null;
  usageLimit?: number | null;
  timesUsed: number;
  startDate: string;
  expiryDate: string;
  isActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title?: string | null;
  comment: string;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string | null;
  role: UserRole;
  addresses?: Address[];
  createdAt: string;
}

export interface ProductFilterState {
  search?: string;
  category?: string;
  gender?: GenderCategory;
  ageGroup?: string;
  size?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  onSaleOnly?: boolean;
  isNewArrival?: boolean;
  sortBy?:
    | "newest"
    | "price_asc"
    | "price_desc"
    | "popular"
    | "rating"
    | "discount";
}

export interface AdminAnalyticsSummary {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  lowStockCount: number;
  recentOrders: Order[];
  topProducts: {
    id: string;
    name: string;
    salesCount: number;
    revenue: number;
    imageUrl: string;
  }[];
}
