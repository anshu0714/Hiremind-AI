# 🎨 HireMind AI - Frontend

## Overview

Frontend for **HireMind AI**, built using **React + Vite**.

This application provides the UI for:

- Authentication
- AI-powered interview generation
- Dashboard analytics
- Interview report management
- PDF download

## ✨ Key Highlights

- Built a **scalable feature-based architecture** for maintainable frontend development
- Implemented **centralized API handling with Axios interceptors** for consistent error, auth, and retry logic
- Designed **robust authentication flow** with persistent sessions and auto logout handling
- Created a **data normalization layer** to prevent UI inconsistencies from backend responses
- Developed a **responsive dashboard and reports system** powered by real-time backend data

## 🚀 Features

### 🔐 Authentication System

- Login & Register UI
- Persistent authentication using `getUser()`
- Global auth state via **React Context**
- Custom hook (`useAuth`) for auth logic
- Axios interceptor-based **auto logout on session expiry**
- Password visibility toggle (UX improvement)

### 📊 Dashboard

- Stats overview (average score, best score, range)
- Time-series performance chart
- Recent reports preview
- Backend-driven analytics integration

### 📄 Reports Management

- Paginated reports table
- Search, filter, and sorting (score/date)
- Delete report (optimistic UI update)
- Regenerate report (new version creation)
- Dropdown action menu
- Fully responsive layout
- Backend-driven pagination and filtering (no client-side heavy computation)

### 📑 Interview Report Page

- Match score visualization
- Skill gap analysis
- Technical & behavioral questions (accordion UI)
- Multi-day preparation plan
- Input drawer (resume / job description view)

### 📥 PDF Download

- Download report as PDF
- Blob handling for file download
- Dynamic file naming

### 🎨 UI & UX

- Responsive design (mobile + desktop)
- Loading states (buttons, pages, actions)
- Toast notifications (success / error / loading)
- Debounced search for better performance
- Reusable UI components

### ⚙️ Architecture

- Feature-based folder structure
- Separation of concerns:
  - UI (pages/components)
  - Logic (hooks)
  - State (context)
  - API (services)
- Centralized Axios client with interceptors
- Data normalization layer (`normalizeReport`)
- Logger utility for development

## 🛠️ Tech Stack

- **React**
- **Vite**
- **React Router**
- **SCSS**
- **Axios**
- **Recharts**

## 📁 Project Structure

```bash
src/
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── reports/
│   └── interview/
│
├── services/        # global API client
├── utils/           # logger and helpers
├── styles/          # shared styles
```

## ⚡ Getting Started

```bash
# navigate to frontend folder
cd frontend

# install dependencies
npm install

# run dev server
npm run dev
```

## 📌 Status

- Feature-complete for core flows
- Fully integrated with backend APIs
- Production-ready for main use cases

## 🧠 Notes

- Uses backend-driven data (no heavy frontend computation)
- Handles API errors using centralized interceptor logic
- Designed for scalability and clean state management
