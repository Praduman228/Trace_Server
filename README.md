# Trace Backend - Workout Tracker API

The Trace API is a robust Node.js/Express backend that powers the Trace workout tracker. It handles secure user authentication, routine management, and exercise data distribution.

## ✨ Key Features

- **🛡️ Secure Auth**: OTP-based registration and JWT-secured login.
- **🏋️ Exercise Management**: Categorized database of exercises by muscle group.
- **📅 Routine Logic**: Complex data structures for managing weekly workout cycles.
- **🔒 Security**: Bcrypt.js password hashing and JWT middleware protection.

## 🚀 Tech Stack

- **Node.js & Express**: API framework.
- **MongoDB & Mongoose**: NoSQL data persistence.
- **JWT**: Token-based authorization.
- **Bcrypt.js**: Password encryption.
- **Cors**: Cross-origin resource sharing.

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in this directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

### 4. Development
```bash
npm run dev
```
The API will be listening on `http://localhost:3000`.

## 📡 API Endpoints

### Auth
- `POST /api/users/send-otp`: Request registration OTP
- `POST /api/users/register`: Verify OTP and create account
- `POST /api/users/login`: Login with email/password

### Routines
- `GET /api/routines/today`: Get workout for current day
- `GET /api/routines`: Get all user routines
- `POST /api/routines`: Create new routine

## 📄 License
MIT License
