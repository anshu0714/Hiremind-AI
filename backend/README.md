# ⚙️ HireMind AI - Backend

## Overview

Backend service for HireMind AI — an AI-powered interview assistant.

Built using Node.js, Express, and MongoDB, the backend handles:

- Authentication & authorization
- AI-powered interview report generation
- Resume parsing (PDF upload)
- Reports management & analytics
- PDF generation and API management

## ✨ Key Highlights

- Built a **reliable AI pipeline** (parse → normalize → validate → store) to handle inconsistent LLM outputs
- Designed **backend-driven architecture** with filtering, pagination, and aggregation
- Implemented **secure authentication** using HTTP-only cookies and session handling
- Prevented data corruption using **Zod validation and normalization layers**
- Developed **immutable regenerate system** for safe report versioning

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication (HTTP-only cookies)
- Zod (schema validation)
- Multer (file uploads - memory storage)
- pdf-parse (resume parsing)
- pdfkit (PDF generation)
- Groq API (LLaMA 3.3 70B - Versatile)

## 🚀 Features

### 🔐 Authentication

- User registration, login, logout
- JWT-based authentication (HTTP-only cookies)
- Secure cookie configuration (SameSite + Secure in production)
- Protected routes via middleware
- Session validation & auto-expiry handling

### 🤖 AI Interview System

- Generates structured interview reports using LLM
- Role-based technical & behavioral questions
- Skill gap analysis with severity levels
- Multi-day preparation plan
- **AI Reliability Guarantees**:
  - JSON extraction from LLM responses
  - Strict schema validation (Zod)
  - Normalization layer for malformed outputs
  - Prevents invalid data from being stored in DB

### 📄 Resume Upload & Parsing

- Upload resume as PDF (max 3MB)
- Extract text using `pdf-parse`
- Trim and clean input before AI processing
- Combine resume + self-description for better context

### 📊 Dashboard & Analytics

- Aggregated statistics:
  - Average score
  - Best score
  - Score range (min/max)
- Time-based performance data
- Backend-driven computation (no frontend calculation)

### 📚 Reports Management

- Generate interview reports
- Get all reports (pagination, filtering, sorting)
- Get single report
- Delete report
- Regenerate report (creates new immutable record)

### 📥 PDF Generation

- Generate downloadable interview reports
- Structured formatting using `pdfkit`
- Stream-based response handling

### 🛡️ Backend Architecture

- MVC pattern
- Centralized error handling (`AppError`)
- Structured logging with sensitive data masking
- Input validation (Zod + manual checks)
- Consistent API response format
- ObjectId validation to prevent crashes
- Defensive programming practices for handling unreliable external systems (AI)

## 📡 API Endpoints

### Auth

| Method | Endpoint             | Description           | Access  |
| ------ | -------------------- | --------------------- | ------- |
| POST   | `/api/auth/register` | Register new user     | Public  |
| POST   | `/api/auth/login`    | Login user            | Public  |
| POST   | `/api/auth/logout`   | Logout user           | Private |
| GET    | `/api/auth/user`     | Get current user info | Private |

---

### Interview & Reports

| Method | Endpoint                        | Description               | Access  |
| ------ | ------------------------------- | ------------------------- | ------- |
| POST   | `/api/interview`                | Generate interview report | Private |
| GET    | `/api/interview`                | Get all reports           | Private |
| GET    | `/api/interview/:id`            | Get single report         | Private |
| DELETE | `/api/interview/:id`            | Delete report             | Private |
| POST   | `/api/interview/:id/regenerate` | Regenerate report         | Private |
| GET    | `/api/interview/:id/download`   | Download report PDF       | Private |

---

### Dashboard

| Method | Endpoint         | Description         | Access  |
| ------ | ---------------- | ------------------- | ------- |
| GET    | `/api/dashboard` | Get dashboard stats | Private |

---

## ⚙️ Environment Variables

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
GROQ_API_KEY=your_groq_api_key
```

## 📥 Request Format (Interview API)

**Content-Type:** `multipart/form-data`

| Field           | Type       | Required |
| --------------- | ---------- | -------- |
| resume          | File (PDF) | Optional |
| jobDescription  | Text       | Required |
| selfDescription | Text       | Optional |

👉 At least one of the following is required:

- `resume`
- `selfDescription`

## 📤 Response Format

All APIs use a consistent response format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

## ⚡ Getting Started

```bash
# navigate to backend folder
cd backend

# install dependencies
npm install

# run development server
npm run dev
```

## 📌 Status

- Production-ready for core features
- Handles real-world edge cases (AI failures, invalid input, session expiry)

## 🧠 Notes

- Resume text is trimmed (~15k chars) before AI processing
- AI response time: ~3–6 seconds
- Low temperature (~0.2) ensures consistent structured output
- AI output is validated before DB persistence to prevent corruption
