# HireMind AI - Backend

## Overview

Backend service for HireMind AI - an AI-powered interview assistant.

Built using Node.js, Express, and MongoDB, the backend handles:

- Authentication & authorization
- File uploads (resume PDFs)
- AI-powered interview report generation
- Data persistence and API management

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication (HTTP-only cookies)
- Multer (file uploads - memory storage)
- PDF parsing (pdf-parse)
- Zod (schema validation)
- AI integration (Groq - llama-3.3-70b-versatile)

## Features

### 🔐 Authentication

- User registration, login, logout
- JWT-based authentication (stored in HTTP-only cookies)
- Secure cookie configuration (SameSite + Secure in production)
- Protected routes via middleware

### 🤖 AI Interview Report Generation

- Generates structured interview reports using LLM
- Role-based technical & behavioral questions
- Skill gap analysis with severity levels
- Multi-day preparation plan

**AI Output Guarantees:**

- Strict JSON structure (validated using Zod)
- No hallucinated personal experience
- Answers are **guidance-based (how to answer)**, not fake responses
- Behavioral answers follow **STAR method**

### 📄 Resume Upload & Parsing

- Upload resume as PDF (max 3MB)
- Extract text using `pdf-parse`
- Clean and limit text before AI processing
- Combine resume + self-description for better context

### 🛡️ Backend Architecture

- MVC pattern
- Centralized error handling
- Request logging with sensitive data masking
- Input validation (Zod + manual checks)
- Consistent API response structure
- AI response normalization layer (handles malformed AI output)

## API Endpoints

### Auth

| Method | Endpoint             | Description           | Access  |
| ------ | -------------------- | --------------------- | ------- |
| POST   | `/api/auth/register` | Register new user     | Public  |
| POST   | `/api/auth/login`    | Login user            | Public  |
| POST   | `/api/auth/logout`   | Logout user           | Private |
| GET    | `/api/auth/user`     | Get current user info | Private |

---

### Interview

| Method | Endpoint         | Description                  | Access  |
| ------ | ---------------- | ---------------------------- | ------- |
| POST   | `/api/interview` | Generate AI interview report | Private |

---

## Environment Variables

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
GROQ_API_KEY=your_groq_api_key
```

## Request Format (Interview API)

**Content-Type:** `multipart/form-data`

| Field           | Type       | Required |
| --------------- | ---------- | -------- |
| resume          | File (PDF) | Optional |
| jobDescription  | Text       | Required |
| selfDescription | Text       | Optional |

👉 At least one of the following is required:

- `resume`
- `selfDescription`

## Response Format

All APIs use a consistent response format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

## Notes

- Resume text is trimmed (~15k chars) before AI processing
- AI response time: ~3–6 seconds
- Low temperature (0.2) used for consistent structured output
- AI output is strictly validated (Zod) before database persistence to prevent corrupt data

## Future Improvements

- Get all interview reports
- Get single report
- Delete report

## Getting Started

```bash
# navigate to backend folder
cd backend

# install dependencies
npm install

# run development server
npm run dev
```
