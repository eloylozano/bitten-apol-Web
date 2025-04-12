# 🛒 BittenApol - Web Client

This is the client-side of BittenApol, an e-commerce application built with **Next.js**, **TypeScript**, and **MongoDB**. It allows users to browse products, manage their cart, and handle their shipping information.

## 📌 Features
- Add/remove products from the cart
- Auto-filled shipping address based on user data
- Integration with MongoDB to store user info and addresses
- Google login
- Checkout flow (WIP)

## 🛠️ Technologies Used
- **Frontend:** Next.js, React, TypeScript
- **Backend:** API Routes in Next.js
- **Database:** MongoDB with Mongoose, AWS
- **Auth:** Google Cloud
- **State Management:** React Context API

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/eloylozano/bitten-apol-web.git
cd bitten-apol-web
```

2️⃣ Install dependencies
```bash
npm install
```

3️⃣ Configure environment variables

Create a .env.local file with the following values:

```env
MONGO_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/your_db
NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
```

4️⃣ Run the project
```bash
npm run dev
```
Access it at http://localhost:3000

📁 Project Structure
```bash
📂 app/
 ├── 📂 models/          # Mongoose models
 ├── 📂 api/             # API routes
 ├── 📂 account/         # User profile page
 ├── 📂 cart/            # Shopping cart
 ├── 📂 checkout/        # Checkout page
 ├── 📂 components/      # Reusable components
 ├── 📜 layout.tsx       # Main layout
 ├── 📜 page.tsx         # Home page
```

📜 License
This project is licensed under the MIT License.
