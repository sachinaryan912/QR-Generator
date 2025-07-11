# 🧿 PixQR - Smart QR Code Generator

<img width="230" height="230" alt="Screenshot 2025-07-11 at 10 43 38 AM" src="https://github.com/user-attachments/assets/91508e6d-a0df-4d2b-8e31-eb8b69c7775d" /></br>
PixQR is a sleek, modern, and customizable QR code generator web app built with **React.js**, **Firebase**, and **Framer Motion**. It allows users to generate stunning QR codes with options for customization, including logo embedding, background gradients, and color schemes. It features a beautiful dashboard, real-time data storage, and tier-based user access.

## 🔗 Live Demo

Visit the live app: [https://pixqr.online](https://pixqr.online)

---

## ✨ Screenshots

<img width="1139" height="642" alt="Screenshot 2025-07-11 at 10 43 38 AM" src="https://github.com/user-attachments/assets/716a36dc-60df-4fab-a25f-8aa7f2c516ff" />
<img width="1089" height="643" alt="Screenshot 2025-07-11 at 10 47 44 AM" src="https://github.com/user-attachments/assets/8991da18-b568-4dfd-a681-e447149eba8c" />



## ✨ Features

### ✅ Free Tier
- Generate QR codes for:
  - URL
  - Text
  - Email
  - SMS
  - Wifi
  - vCard
  - Location
- Basic color customization
- Download QR as PNG

### 👑 Premium Tier *(One-time payment)*
- Upload custom logos inside QR
- Add background images
- Use gradient and advanced color combinations
- Brand-focused styling
- Premium badge in dashboard

### 🔒 User Authentication
- Firebase Authentication (Email/Password)
- User metadata: token count, join date, level

### 📊 Dashboard
- Responsive black-golden glassmorphic theme
- Animated QR type cards
- User dropdown with:
  - Level
  - User since
  - Logout
- Token usage display
- Pages for each QR type generator

### ⚙️ Tech Stack
- **Frontend:** React.js, Tailwind CSS, Framer Motion
- **Backend:** Firebase Realtime Database, Firebase Auth
- **Other Libraries:** `react-icons`, `qrcode.react`

---

## 📁 Project Structure

```bash
PixQR/
├── public/
├── src/
│   ├── components/        # Reusable UI components (Navbar, Cards)
│   ├── pages/             # Dashboard and Generator Pages
│   ├── context/           # Auth context provider
│   ├── firebase.js        # Firebase configuration
│   └── App.jsx            # Main app entry
├── tailwind.config.js
├── package.json
└── README.md
