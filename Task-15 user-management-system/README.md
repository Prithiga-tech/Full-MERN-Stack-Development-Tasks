# User Management System (MERN Stack)

A complete, beginner-friendly full-stack application for user registration,
login, and profile management, built with MongoDB, Express, React, and
Node.js (MERN). Includes JWT authentication and bcrypt password hashing.

Built as a final MERN Stack internship / portfolio project.

---

## Features

- User registration with hashed passwords (bcrypt)
- User login with JWT-based authentication
- Protected dashboard listing all registered users
- Profile page to update name, bio, and password
- Delete account
- Success/error feedback on every form
- Fully responsive UI (mobile, tablet, desktop)

---

## Tech Stack

**Frontend:** React (Vite), React Router DOM, Axios, plain CSS
**Backend:** Node.js, Express.js
**Database:** MongoDB Atlas with Mongoose
**Auth:** JSON Web Tokens (JWT), bcryptjs

---

## Project Structure

```
user-management-system/
├── server/                 # Express + MongoDB backend
│   ├── config/db.js        # MongoDB connection
│   ├── controllers/        # Route handler logic
│   ├── middleware/         # Auth guard + error handler
│   ├── models/User.js      # Mongoose user schema
│   ├── routes/             # /api/auth and /api/users routes
│   ├── utils/generateToken.js
│   ├── server.js           # App entry point
│   └── .env.example
│
└── client/                 # React (Vite) frontend
    ├── src/
    │   ├── api/axios.js        # Axios instance + JWT interceptor
    │   ├── context/AuthContext.jsx
    │   ├── components/         # Navbar, Message, ProtectedRoute
    │   ├── pages/               # Home, Register, Login, Dashboard, Profile
    │   └── styles/index.css
    └── .env.example
```

---

## API Endpoints

| Method | Endpoint            | Access  | Description                  |
|--------|----------------------|---------|-------------------------------|
| POST   | /api/auth/register    | Public  | Register a new user          |
| POST   | /api/auth/login       | Public  | Login and receive a JWT      |
| GET    | /api/users             | Private | Get all users                |
| GET    | /api/users/:id         | Private | Get a single user by ID      |
| PUT    | /api/users/:id         | Private | Update your own profile      |
| DELETE | /api/users/:id         | Private | Delete your own account      |

Private routes require an `Authorization: Bearer <token>` header.

> Note: for simplicity and security in this beginner project, a logged-in
> user can only update/delete **their own** account — not other users'.
> Everyone can still *view* the full user list on the dashboard.

---

## Local Setup

### Prerequisites

- Node.js v18+
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (or local MongoDB)

### 1. Clone / unzip the project

```bash
cd user-management-system
```

### 2. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` and fill in:
- `MONGO_URI` — your MongoDB Atlas connection string
- `JWT_SECRET` — any long random string
- `CLIENT_URL` — `http://localhost:5173` for local dev

Run the backend:

```bash
npm run dev
```

The API will start on `http://localhost:5000`.

### 3. Frontend setup

Open a new terminal:

```bash
cd client
npm install
cp .env.example .env
```

`client/.env` should point to your local API:

```
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## Deployment

### Backend → Render

1. Push the `server/` folder to a GitHub repo (or the whole project, and set
   Render's **Root Directory** to `server`).
2. On [Render](https://render.com), create a new **Web Service** from that repo.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables in Render's dashboard (Settings → Environment):
   - `MONGO_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
   - `CLIENT_URL` (your Vercel frontend URL, e.g. `https://your-app.vercel.app`)
6. Deploy. Render will give you a URL like `https://your-api.onrender.com`.

### Frontend → Vercel

1. Push the `client/` folder to GitHub (or set Vercel's **Root Directory** to `client`).
2. On [Vercel](https://vercel.com), import the repo as a new project.
3. Framework preset: **Vite**.
4. Add an environment variable:
   - `VITE_API_URL` = `https://your-api.onrender.com/api`
5. Deploy. Vercel will give you a URL like `https://your-app.vercel.app`.

### Connect them

- Make sure `CLIENT_URL` on Render matches your live Vercel URL exactly (no
  trailing slash), so CORS allows the frontend to call the API.
- Make sure `VITE_API_URL` on Vercel points to your live Render API `+ /api`.
- Redeploy both after changing environment variables.

---

## Screenshots

Add screenshots of the running app here before submitting, for example:

```
docs/screenshots/home.png
docs/screenshots/register.png
docs/screenshots/login.png
docs/screenshots/dashboard.png
docs/screenshots/profile.png
```

Then reference them in this README:

```md
### Home
![Home page](docs/screenshots/home.png)

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)
```

---

## Security Notes

- Passwords are hashed with bcrypt before being stored — plaintext passwords
  are never saved.
- JWTs are signed with a server-side secret and expire after 7 days by default.
- Private routes are protected with middleware that verifies the token on
  every request.
- Sensitive values (DB connection string, JWT secret) are kept in `.env`
  files, which are git-ignored and never committed.

---

## License

This project is free to use for learning and portfolio purposes.
