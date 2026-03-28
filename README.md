# HireMind AI

## Overview

It helps users:

- Generate AI-based interview reports
- Analyze resumes (PDF upload supported)
- Prepare for interviews with structured guidance

The application consists of a backend API and a frontend client.

## Backend

See [backend/README.md](backend/README.md)

## Frontend

See [frontend/README.md](frontend/README.md)

## Folder Structure

```
hiremind-ai/
│   README.md
│   .gitignore
│
├───backend
│
└───frontend

```

## Features

- JWT-based authentication
- Secure cookie-based session handling
- AI-powered interview report generation
- Resume upload and parsing (PDF)
- Structured API responses
- Clean MVC architecture

## Notes

- Backend is feature-complete for core functionality
- Frontend is under active development
- APIs follow a consistent response format:

```bash
{
  "success": true,
  "message": "Operation successful",
  "data": { }
}
```
