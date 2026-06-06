# 🚀 HireMind AI

## Overview

HireMind AI helps users:

- Generate AI-based interview reports
- Analyze resumes (PDF upload supported)
- Prepare for interviews with structured guidance

The application consists of a backend API and a frontend client.

## ✨ Key Highlights

- Built a **reliable AI pipeline** (parse → normalize → validate → store) to handle inconsistent LLM outputs
- Designed **backend-driven filtering, pagination, and analytics** for scalability
- Implemented **secure authentication** using HTTP-only cookies and interceptor-based session handling
- Solved real-world issues like **duplicate DB keys, stale UI state, and malformed AI JSON**
- Created **immutable regenerate system** to preserve historical reports

## 🛠️ Tech Stack

**Frontend:**

- React (Vite)
- SCSS
- Axios
- React Router

**Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose)
- Zod
- Multer
- pdf-parse

**AI:**

- Groq API (LLaMA 3.3 70B - Versatile)

## 🌐 Live Deployment

- 🔗 Frontend: https://hiremind-ai-brown.vercel.app/
- 🔗 Backend API: https://hiremind-ai-2izj.onrender.com/

<br>

> ⚠️ Note: Backend is hosted on Render (may take ~30–60 seconds to wake up on first request)  
> ⏱️ AI response time: ~3–6 seconds (LLM processing)

## 📁 Project Documentation

- 🔧 Backend: [backend/README.md](backend/README.md)
- 🎨 Frontend: [frontend/README.md](frontend/README.md)

## Folder Structure

```
hiremind-ai/
├── README.md
├── .gitignore
├── backend/
└── frontend/
```

## 🚀 Features

### 🔐 Authentication & Security

- JWT-based authentication
- Secure HTTP-only cookie sessions
- Session expiry handling with auto logout
- Token blacklist for logout invalidation
- Protected & public route system

### 🤖 AI Interview System

- AI-powered structured interview reports
- Role-specific questions (technical + behavioral)
- Skill gap analysis with severity levels
- Multi-day preparation plan
- Strict JSON validation (Zod) to prevent malformed AI responses
- AI response normalization to handle malformed or partial outputs

### 📊 Dashboard & Analytics

- Performance tracking (avg, best, range)
- Time-series chart for interview scores
- Recent reports preview
- Backend-driven analytics (not computed on frontend)

### 📄 Report Management

- Generate interview reports
- Regenerate reports (creates new version)
- Delete reports
- Paginated reports listing
- Search, filtering & sorting (score/date)
- Responsive table UI

### 📑 File Handling

- Resume upload (PDF)
- Text extraction using `pdf-parse`
- Smart input combination (resume + self description)

### 📥 Export & Sharing

- Download interview report as PDF
- Backend PDF generation using `pdfkit`

### ⚙️ Architecture & Engineering

- Full-stack separation of concerns
- Backend-driven filtering & pagination
- Centralized API client with interceptors

## 📌 Project Status

### Backend

- Stable for core workflows and deployed for public use.
- Handles:
  - Auth
  - AI processing
  - Reports system
  - PDF generation
  - Dashboard analytics

### Frontend

- Feature-complete for main flows
- Includes:
  - Auth system
  - Dashboard
  - Reports management
  - Interview generation
  - PDF download
  - Responsive UI

<br>

> Overall: Production-ready for core workflows with ongoing improvements in scalability and performance

## Notes

- Backend is feature-complete for core functionality
- Frontend is production-ready for core features and actively improving
- APIs follow a consistent response format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

## 🧠 Engineering Learnings

- Handling unreliable AI outputs using validation, normalization, and defensive parsing
- Preventing invalid data persistence through schema validation and normalization.
- Designing maintainable APIs using backend-driven filtering, pagination, and aggregation.
- Managing authentication using centralized interceptors and session-aware logic
- Debugging real-world production issues:
  - Duplicate key errors (MongoDB)
  - Stale frontend state after mutations
  - Malformed AI JSON responses
