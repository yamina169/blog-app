# Blog API

Welcome to the **Blog API**, a RESTful service built with NestJS and fully documented using Swagger. This API enables user registration, authentication, profile management, article publishing, tag interaction, and social features like following and favoriting.

---

## 🚀 Features

- User registration and login
- Article CRUD (Create, Update, Delete)
- Tag retrieval
- Follow/unfollownand get user profile
- Favorite/unfavorite articles
- Feed of articles from followed users

---

## 🔐 Authorization

Protected endpoints require a valid JWT token in the `Authorization` header:

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with these variables:

```env
JWT_SECRET=your_jwt_secret_key_here

```

> **Note:** Adjust database variables to match your setup.

---

## 📖 Documentation

Swagger UI is available at:

```
http://localhost:3000/api
```

Use it to explore endpoints, try requests, and inspect response schemas interactively.

---

## 🏁 Getting Started

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   - Create your `.env` as shown above

4. **Launch the server**

   ```bash
   npm run start:dev
   ```

5. **Open Swagger UI**
   Navigate to:

   ```
   http://localhost:3000/api
   ```

---
