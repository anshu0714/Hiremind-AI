# HireMind AI - Frontend

## Overview

Frontend for **HireMind AI** built using **React + Vite**.

This application will provide the user interface for authentication, interview generation, AI reports, and resume PDF creation.

## Current Implementation

### 🔐 Authentication System
- Login & Register UI
- Password visibility toggle (UX improvement)
- Authentication flow integrated with backend APIs
- Global auth state management using **React Context**
- Custom hook (`useAuth`) for handling auth logic
- API service layer with centralized request handling

### 🎨 UI & Styling
- Modern, responsive authentication UI
- Shared form styles
- Reusable button component styles
- SCSS-based scalable styling architecture

### ⚙️ Architecture
- Feature-based folder structure
- Clean separation of concerns:
  - UI (pages)
  - Logic (hooks)
  - State (context)
  - API layer (services)
- Centralized Axios client with error & response handling
- Development logger utility for debugging

### 🧭 Routing
- React Router setup for navigation

## Planned Features

- Protected routes (auth-based access control)
- Persistent authentication (session handling)
- AI-powered interview generation
- Interview report dashboard
- Resume PDF generation and preview
- Global error handling UI (toasts/alerts)
- Performance optimizations and API interceptors
  
## Tech Stack

- **React**
- **Vite**
- **React Router**
- **SCSS**
- **Axios**

## Project Structure (Frontend)

```bash
src/
│
├── features/
│   └── auth/
│       ├── pages/
│       ├── hooks/
│       ├── context/
│       ├── services/
│       └── components/
│
├── services/        # global API client
├── utils/           # logger and helpers
├── styles/          # shared styles
```

## Getting Started

```bash
# navigate to frontend folder
cd frontend

# install dependencies
npm install

# run dev server
npm run dev
```

## Notes

- Frontend is actively under development
- Architecture is designed to be scalable and production-ready
- Backend APIs are integrated for authentication
