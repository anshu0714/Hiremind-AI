# HireMind AI - Backend

## Overview
Backend of **HireMind AI**, a full-stack AI-powered interview assistant application.  
Handles **authentication, session management, and API scaffolding** using Node.js, Express, and MongoDB.

## Completed Features
- User registration, login, logout (JWT)
- Token blacklisting for secure logout
- Centralized error handling
- Request logging with sensitive fields masked
- MongoDB integration using Mongoose
- MVC folder structure

## Planned Features
- AI-powered interview report generation
- Resume PDF generation
- Protected APIs for interview and report management

## API Endpoints
| Method | Endpoint             | Description              | Access  |
|--------|----------------------|--------------------------|---------|
| POST   | `/api/auth/register` | Register new user        | Public  |
| POST   | `/api/auth/login`    | Login user               | Public  |
| POST   | `/api/auth/logout`   | Logout user              | Private |
| GET    | `/api/auth/user`     | Get current user info    | Private |

## Environment Variables
- `PORT` - Backend port (default 3000)
- `MONGODB_URI` - MongoDB connection URI
- `JWT_SECRET` - Secret for JWT tokens

## Getting Started
```bash
# navigate to backend folder
cd backend

# install dependencies
npm install

# run development server
npm run dev
```

## Response Format
All APIs use a consistent response format:
```bash
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

## Notes
- Planned features will be added iteratively.
- Error responses are standardized for easy frontend integration.