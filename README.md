# GS Collection — Gullu Shani Clothing
### Premium Children's Fashion & E-Commerce Platform

---

![GS Collection E-Commerce](https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1200&auto=format&fit=crop)

**GS Collection (Gullu Shani Clothing)** is a complete, modern, production-grade children's clothing e-commerce web application engineered with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**, specifically optimized for **$0 development and portfolio deployment**.

---

## 🌟 Key Highlights & Feature Matrix

### 🛍️ Customer Experience & Storefront
* **Homepage:** Dynamic Hero banner, Department spotlights (Boys, Girls, Baby & Toddler), Featured garments, New Arrivals, and Value Proposition trust badges.
* **Shop Catalog (`/shop`):** 
  * Live search with instant keyword matching across titles, descriptions, and fabric specs.
  * Multi-dimensional filtering by Category, Gender, Age Group (0–13Y), Available Sizes, Color swatches, Price range slider, and Sale badges.
  * Sorting: Newest Arrivals, Price (Low to High / High to Low), Customer Ratings, and Discount Size.
* **Product Detail Page (`/shop/[slug]`):** Multi-angle photo gallery, dynamic size & color variant selector, real-time stock indicator (with out-of-stock guards), fabric & care instructions, customer review submission, and related style recommendations.
* **Shopping Cart & Slide-out Drawer:** Persistent cart powered by Zustand with localStorage sync, live free-shipping progress meter (Free shipping over Rs. 3,000), and coupon validation.
* **Cash on Delivery (COD) Checkout (`/checkout`):** Real Pakistani address validation, province selection, customer notes, order breakdown, and instant order confirmation (`/checkout/success`).
* **Database-backed Wishlist (`/wishlist`):** Save favorite garments across browsing sessions.
* **Customer Account Dashboard (`/account`):** Order tracking timeline, multi-address manager, and profile settings.

### 🛡️ Store Administration Panel (`/admin`)
* **Analytics Dashboard:** Net sales, order count, active products, and low-stock variant alerts.
* **Product & Variant Stock Manager (`/admin/products`):** Inline editing of stock levels per SKU (Size + Color combination), product deletion, and new garment creation modal.
* **Order Fulfillment Center (`/admin/orders`):** Order search, status progression (`PENDING` ➔ `CONFIRMED` ➔ `PROCESSING` ➔ `SHIPPED` ➔ `DELIVERED`), and Cash on Delivery payment status toggling.
* **Category Manager (`/admin/categories`):** Add, update, and manage departments.
* **Coupon Manager (`/admin/coupons`):** Create percentage or fixed PKR discounts with minimum order thresholds and expiry rules.
* **Customer Directory (`/admin/customers`):** View registered customer accounts and order histories.

### 🤖 AI Agent & MCP (Model Context Protocol) Compatibility
* Standardized API tool endpoint at `/api/agent/tools`.
* Pre-architected service functions (`ProductService`, `OrderService`, `AnalyticsService`) that can be safely called by LLMs (OpenAI, Gemini, Claude, or MCP clients) without raw database access.

---

## 🛠️ Technology Stack & $0 Free-Tier Feasibility

| Component | Technology | Free Tier Provider | Limits & Free Feasibility |
| :--- | :--- | :--- | :--- |
| **Frontend & SSR** | Next.js 16 (App Router) + Tailwind CSS | Vercel (Hobby) | 100% Free forever (100 GB bandwidth/month, Edge CDN). |
| **Backend & APIs** | Next.js Server Actions & Route Handlers | Vercel Serverless | Included in Vercel $0 tier. No cold starts. |
| **Database** | PostgreSQL + Prisma ORM | Supabase / Neon | Supabase: 500 MB Postgres, 50,000 monthly active users ($0). |
| **Media Delivery** | Cloudinary CDN | Cloudinary | 25 GB monthly transformation credits ($0). |
| **State & Types** | TypeScript, Zustand, Zod | Open Source | MIT License. |

---

## 🚀 Quick Start Guide (Local Development)

### 1. Prerequisites
Ensure you have **Node.js 18+** installed:
```bash
node -v
npm -v
```

### 2. Installation
Navigate to the project directory:
```bash
cd C:\Users\HP\.gemini\antigravity\scratch\gs-collection
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default local variables are pre-configured. To connect your live Supabase database, set:
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?sslmode=require"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?sslmode=require"
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Access Credentials

To test the platform immediately without filling out registration forms, 1-click demo login buttons are provided on the `/login` page:

* **Customer Demo:** `ayesha.malik@example.com`
* **Admin Demo:** `admin@gscollection.pk` (Direct access to `/admin` dashboard)

---

## 🎨 AI Image Generation Guide for Kids Clothing

To generate consistent, high-end e-commerce product photos for free, use **Microsoft Designer / Image Creator** or **Leonardo AI**:

### Studio Flat-Lay Prompt Template (Recommended for Safe, Model-Free Product Photos)
```
"High-end commercial e-commerce product photography of a [GARMENT_TYPE], [COLOR] color, designed for children aged [AGE_GROUP]. Laid completely flat on a seamless clean matte off-white studio background. Expertly pressed cotton fabric with visible organic weave texture, perfectly symmetrical fold, soft diffused overhead studio lighting, minimal gentle shadows, 4k ultra-detailed catalog photography, no watermark, no text, no models."
```

### Cheerful Child Model Prompt Template
```
"Professional commercial childrenswear lookbook photo of a happy [BOY / GIRL], age [AGE], naturally standing in a bright minimalist studio. Wearing a stylish [GARMENT_NAME] in [COLOR] paired with clean neutral pants. Joyful smile, soft rim lighting, family-friendly, crisp fabric textures, pastel backdrop, no watermark."
```

---

## 📦 Deploying for Free ($0 Cost)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "feat: complete GS Collection e-commerce website"
git remote add origin https://github.com/[your-username]/gs-collection.git
git push -u origin main
```

### Step 2: Deploy Database to Supabase ($0)
1. Go to [supabase.com](https://supabase.com) and create a free project.
2. Under **Project Settings > Database**, copy your **Connection String (URI)**.
3. Run migrations and seed data:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

### Step 3: Deploy Frontend & APIs to Vercel ($0)
1. Go to [vercel.com](https://vercel.com) and import your GitHub repository.
2. In the **Environment Variables** section, paste:
   * `DATABASE_URL`
   * `DIRECT_URL`
   * `NEXT_PUBLIC_APP_URL` (set to your Vercel domain e.g. `https://gs-collection.vercel.app`)
   * `NEXTAUTH_SECRET`
3. Click **Deploy**. Your e-commerce store will be live in ~60 seconds!

---

## 📄 License
This project is open-source and available under the **MIT License**.
GS Collection (Gullu Shani Clothing) branding and concept © 2026.
