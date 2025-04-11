# MealMart 🍔🥗

MealMart is a modern meal delivery platform connecting food lovers with local meal providers. Enjoy restaurant-quality meals prepared in home kitchens with the convenience of online ordering and delivery.

👉 **Live Demo:** [https://mealmart.vercel.app/](https://mealmart.vercel.app/)

## Features ✨

### For Customers 🛒

- Browse meals from multiple providers
- Secure payment processing (shurjoPay)
- Real-time order tracking
- Dietary preference filters
- Meal reviews and ratings

### For Providers 👩🍳

- Meal management dashboard
- Order fulfillment system
- Inventory tracking
- Provider verification system

### For Admins 🔒

- Provider verification
- Platform analytics
- Order fulfillment system

## Technologies 🛠️

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form
- **Icons**: Lucide React
- **Charts**: Recharts

### Backend

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + Bcrypt
- **Payments**: shurjoPay API
- **Validation**: Zod

## Getting Started 🚀

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/shihab-2021/MealMart-Client.git
   git clone https://github.com/shihab-2021/MealMart-Server.git
   ```

2. **Install dependencies**:

   ```bash
   # Install frontend dependencies
   cd MealMart-Client
   npm install

   # Install backend dependencies
   cd MealMart-Server
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env` file in the `backend` directory and add the following:
     ```env
      NODE_ENV=
      PORT=
      DEFAULT_PASS=
      JWT_ACCESS_SECRET=
      JWT_REFRESH_SECRET=
      JWT_ACCESS_EXPIRES_IN=
      JWT_REFRESH_EXPIRES_IN=
      BCRYPT_SALT_ROUNDS=
      SP_ENDPOINT=
      SP_USERNAME=
      SP_PASSWORD=
      SP_PREFIX=
      SP_RETURN_URL=
      DATABASE_URL=
     ```
   - Create a `.env.local` file in the `frontend` directory and add the following:
     ```env
      NEXT_PUBLIC_BASE_API=
      GITHUB_ID=
      GITHUB_SECRET=
      NEXTAUTH_SECRET=
      GOOGLE_ID=
      GOOGLE_SECRET=
      NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY=
      NEXT_PUBLIC_RECAPTCHA_SERVER_KEY=
      NEXT_PUBLIC_CLOUDINARY_PRESET=
      NEXT_PUBLIC_CLOUDINARY_URI=
     ```

4. **Run the backend server**:

   ```bash
   npm run dev
   ```

5. **Run the frontend development server**:

   ```bash
   npm run dev
   ```

6. **Open the application**:
   - Visit `http://localhost:3000` in your browser to view the frontend.
   - The backend API will be running at `http://localhost:5000`.

**MealMart** © 2024 - Hungry for Innovation 🚀
