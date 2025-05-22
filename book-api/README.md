# 📖 Book API

This is the backend of the **Book App** – a secure REST API built with **Express**, **MongoDB**, and **TypeScript**.
It handles user registration, login, role-based access (admin), and CRUD functionality for users, books, and reviews.

> Part of the *API Development* course at **Medieinstitutet**.

---

## 🔐 Features

* JWT authentication with cookie-based login
* Password hashing with bcrypt
* Role-based access (admin/user)
* Full CRUD for:

  * Users (username, password, is\_admin, created\_at)
  * Books (title, description, author, genres, image, published\_year)
  * Reviews (name, content, rating, created\_at)
* MongoDB + Mongoose schemas with timestamps

---

## 📦 Tech Stack

![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat\&logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=flat\&logo=express\&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178c6?style=flat\&logo=typescript\&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat\&logo=mongodb\&logoColor=white)
![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat)
![JWT](https://img.shields.io/badge/-JWT-000000?style=flat\&logo=jsonwebtokens\&logoColor=white)

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

Create a `.env` file in the root of `book-api/`:

```env
# === SERVER CONFIGURATION ===
PORT=3000                            # Port where the Express API will run
NODE_ENV=development                 # Use 'production' in deployed environment

# === DATABASE ===
MONGO_URI=mongodb+srv://<username>:<password>@your-cluster.mongodb.net/book_db

# === AUTH ===
JWT_SECRET=yourSuperSecretKey        # Secret key for signing JWTs

# === CORS ===
CLIENT_URL=http://localhost:5173     # Comma-separated list of allowed frontend origins
```

> 🔐 Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

> ✅ Set `NODE_ENV=development` when running locally to avoid cookie issues without HTTPS.

> 🌐 Add all allowed client URLs to `CLIENT_URL`, separated by commas if needed.

### 3. Run the server

```bash
pnpm dev
```

Server runs at: `http://localhost:3000`

---

## 🔌 Available Routes

### 🔐 Auth

| Method | Route            | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/auth/register` | Register new user |
| POST   | `/auth/login`    | Log in            |
| POST   | `/auth/logout`   | Log out           |

### 👤 Users

| Method | Route        | Protected | Description    |
| ------ | ------------ | --------- | -------------- |
| GET    | `/users`     | No        | Get all users  |
| GET    | `/users/:id` | No        | Get user by ID |
| PATCH  | `/users/:id` | ✅ Yes     | Update user    |
| DELETE | `/users/:id` | ✅ Yes     | Delete user    |

### 📚 Books

| Method | Route        | Protected | Description              |
| ------ | ------------ | --------- | ------------------------ |
| GET    | `/books`     | No        | Get all books            |
| GET    | `/books/:id` | No        | Get book by ID + reviews |
| POST   | `/books`     | ✅ Yes     | Create new book          |
| PATCH  | `/books/:id` | ✅ Yes     | Update book              |
| DELETE | `/books/:id` | ✅ Yes     | Delete book              |

### ✍️ Reviews

| Method | Route          | Protected | Description       |
| ------ | -------------- | --------- | ----------------- |
| GET    | `/reviews`     | No        | Get all reviews   |
| GET    | `/reviews/:id` | No        | Get review by ID  |
| POST   | `/reviews`     | ✅ Yes     | Create new review |
| PATCH  | `/reviews/:id` | ✅ Yes     | Update review     |
| DELETE | `/reviews/:id` | ✅ Yes     | Delete review     |

---

## 🗃️ Project Structure

```bash
book-api/
├── src/
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Auth middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routers
│   ├── types/            # TypeScript interfaces
│   └── index.ts          # Entry point
├── .env
├── tsconfig.json
└── package.json
```

---

## 🧪 Testing

Use [Insomnia](https://insomnia.rest/) or Postman to test the routes.
Make sure to log in before accessing protected routes — the server sets a cookie (`accessToken`).

---

## 📚 Related Documentation

* 🔙 Project overview: [`../README.md`](../README.md)
* 🌐 Frontend client: [`../book-client/README.md`](../book-client/README.md)
