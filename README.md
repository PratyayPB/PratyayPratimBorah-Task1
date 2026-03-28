# PratyayPratimBorah-Task1
Joineazy Technical Task Assignment

# 📘 Editorial Lab — Academic Management System

## 🧩 Overview of Implementation
\

- Student groups
- Assignments
- Submissions
- Role-based access (Student / Admin)

### Tech Stack

**Frontend**

- React.js
- Tailwind CSS
- React Router DOM

**Backend**

- Node.js
- Express.js
- Prisma ORM

**Database**

- MySQL (via Prisma)

**Authentication**

- JWT (JSON Web Tokens)

---

## ⚙️ Setup & Run Instructions

### 1. Clone the Repository

```bash
git clone <repo-url>
cd editorial-lab
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Create `.env`

```env
DATABASE_URL="mysql://user:password@localhost:3306/dbname"
JWT_SECRET="your_secret_key"
PORT=5000
```

#### Prisma Setup

```bash
npx prisma migrate dev
npx prisma generate
```

#### Run Backend

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App runs on:

```
http://localhost:5173
```

---

## 🔗 API Endpoint Details

### 🔐 Auth Routes

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login user    |

---

### 👤 User Routes

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| GET    | `/api/users/:id` | Get user details |

---

### 👥 Group Routes

| Method | Endpoint          | Description              |
| ------ | ----------------- | ------------------------ |
| GET    | `/api/groups`     | Get user-specific groups |
| POST   | `/api/groups`     | Create group             |
| GET    | `/api/groups/:id` | Get single group         |

---

### 📚 Assignment Routes

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | `/api/assignments` | Get assignments   |
| POST   | `/api/assignments` | Create assignment |

---

### 📤 Submission Routes

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | `/api/submissions` | Submit assignment |
| GET    | `/api/submissions` | Get submissions   |

---

## 🗄️ Database Schema & Relationships

### ER Diagram (Textual Representation)

```
User
 ├── id (PK)
 ├── name
 ├── email
 ├── password
 └── role

Group
 ├── id (PK)
 ├── name
 ├── createdBy (FK → User)
 └── creator

GroupMember
 ├── id (PK)
 ├── userId (FK → User)
 └── groupId (FK → Group)

Assignment
 ├── id (PK)
 ├── createdBy (FK → User)
 └── groupId (FK → Group)

Submission
 ├── id (PK)
 ├── assignmentId (FK)
 └── userId (FK)
```

---

## 🏗️ Architecture Overview

```
Frontend (React)
   ↓ (Axios HTTP Requests)
Backend (Express + Prisma)
   ↓
Database (MySQL)
```

---

## 🔐 Authentication Flow

1. User logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent in headers:

```
Authorization: Bearer <token>
```

5. Middleware verifies token and attaches user to req.user

---

## ⚡ Key Design Decisions

- JWT Authentication (stateless & scalable)
- Prisma ORM (type-safe & fast)
- Role-Based Access Control
- Nested Routing using Outlet
- Many-to-Many via GroupMember

---

## 👨‍💻 Author

Pratyay Pratim Borah
Fullstack Developer | Computer Science Student

