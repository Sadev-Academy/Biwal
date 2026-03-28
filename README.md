# BIWAL — Premium Full-Stack E-Commerce

> [!NOTE]
> **Minimalist Sustainable Fashion Store** - Built to demonstrate production-ready full-stack architecture with Next.js 15, Stripe, and Prisma.

---

## 🖼️ Visual Showcase

| Homepage | Admin Dashboard |
| :---: | :---: |
| ![Homepage Placeholder](/public/logo.png) | ![Admin Dashboard Placeholder](/public/logo.png) |
| *Modern minimalist design* | *Real-time inventory control* |

| Checkout Flow | Mobile Responsive |
| :---: | :---: |
| ![Checkout Placeholder](/public/logo.png) | ![Mobile Placeholder](/public/logo.png) |
| *End-to-end Stripe integration* | *Optimized for all devices* |

---

## 🌟 Key Features

### 🛍️ Customer Experience
- **Browsing & Discovery**: Intuitive category filtering and high-speed product galleries.
- **Persistent Global Cart**: Shopping session preservation powered by Zustand.
- **Frictionless Checkout**: Integrated Stripe payment processing with automated webhooks.

### 🔐 Security & Account Management
- **Role-Based Auth**: Secure User and Admin access levels via Auth.js (NextAuth v5).
- **Order Tracking**: Complete visibility of order status from processing to paid.

### 📊 Administrative Tools
- **Product Management**: Full CRUD operations for products and categories.
- **Sales Analytics**: Dashboard overview of revenue and total orders.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Database**: [Neon (PostgreSQL)](https://neon.tech/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Authentication**: [Auth.js](https://authjs.dev/)
- **Payments**: [Stripe API](https://stripe.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- A Stripe account (for test mode keys)
- A Neon (PostgreSQL) database instance

### Installation

1. **Clone & Install:**
   ```bash
   git clone https://github.com/your-username/biwal.git
   cd biwal
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file from the placeholder values in the repository:
   ```env
   DATABASE_URL="your-postgresql-url"
   AUTH_SECRET="your-nextauth-secret"
   STRIPE_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

3. **Database Setup:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Launch:**
   ```bash
   npm run dev
   ```

---

## 🛡️ Demo Credentials

To explore the admin features, use the following credentials:
- **Admin**: `test@example.com` / `password123`
- **User**: `jane@example.com` / `password123`

---

## 🌩️ Production Deployment (Vercel)

1. Connect your repository to Vercel.
2. Configure all environment variables in the Vercel dashboard.
3. For Stripe, set up a webhook endpoint pointing to your production URL.
4. Enable **Vercel Analytics** to monitor live performance.

---

## 📄 License & Attribution

Designed and developed by **[Your Name]**. Built with a commitment to sustainable, high-performance web development.
