# 💗 Book Client

Frontend for the **Book App**, built with **Vue 3**, **TypeScript**, and **Vite**.  
This SPA will interface with the Book API to manage users, books, and reviews.

---

## ⚙️ Planned Features

- 🔐 Login & registration forms
- 🛠 Admin panel for managing users and books
- 📚 Public book list with search and filters
- 📖 Individual book view with reviews
- ✍️ Submit reviews as logged-in user

---

## 🛠 Tech Stack

| Tech       | Purpose                   |
|------------|---------------------------|
| Vue 3      | JavaScript framework      |
| TypeScript | Typed JavaScript          |
| Vite       | Dev & build tooling       |
| Pinia      | State management          |
| SCSS       | Styling                   |

---

## 🚀 Getting Started

```bash
pnpm install
pnpm dev
````

Runs at: `http://localhost:5173`
Requires backend `book-api` running on port `3000`.

---

## 📁 Project Structure (WIP)

```
book-client/
├── public/
│   ├── favicon/                 # Favicons
│   └── logotype/                # Branding assets
├── src/
│   ├── assets/                  # Static files
│   ├── components/              # Vue components
│   ├── router/                  # Vue Router setup
│   ├── scss/                    # Global styles (style.scss)
│   ├── stores/                  # Pinia stores
│   ├── views/                   # Routed views (Home, Admin etc)
│   ├── App.vue                  # Main layout
│   └── main.ts                  # App entry point
├── index.html                   # App shell & meta config
└── README.md
```

---

## 🎨 Branding

Includes:

* Custom favicon set
* Social share image
* Google Fonts: **Quicksand** & **Lato**

---

## 🔗 Related Docs

* 🔙 Project overview: [`../README.md`](../README.md)
* 🌐 Backend: [`../book-api/README.md`](../book-api/README.md)

---

