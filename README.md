# TaskFlow

A secure, scalable task management application built with modern web technologies.

## Approach

This project follows a full-stack architecture with clear separation between frontend and backend:

- **Backend**: RESTful API built with Express.js and MongoDB for data persistence
- **Frontend**: Next.js with React for a responsive, server-rendered user interface
- **Authentication**: JWT-based authentication with secure password hashing using bcrypt
- **Validation**: Input validation using Zod on both client and server
- **Styling**: Tailwind CSS with a monochrome design system

## Scalability

The project is structured for growth and maintainability:

```
backend/
├── controllers/     # Request handlers
├── models/          # MongoDB schemas
├── routes/          # API endpoints
├── middleware/      # Auth, validation, error handling
└── server.js

frontend/
├── src/
│   ├── app/         # Next.js pages
│   ├── components/  # Reusable UI components
│   ├── context/     # Global state management
│   └── api/         # API client functions
```

This modular structure allows for easy addition of new features, independent testing of components, and clear separation of concerns.

## Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)

### Environment Variables

Create a `.env` file in the `backend` folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_secret_key
```

## Running the Application

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Access
Open http://localhost:3000 in your browser.
