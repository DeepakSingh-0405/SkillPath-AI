# SkillPath AI

SkillPath AI is a full-stack learning roadmap platform that helps users plan, track, and improve their skill development journey. The application combines personalized learning roadmaps, progress tracking, project/resource management, and AI-assisted guidance in one dashboard.

## SDG Alignment

This project supports the United Nations Sustainable Development Goals, especially:

- **SDG 4: Quality Education** - makes learning paths more accessible, structured, and personalized.
- **SDG 8: Decent Work and Economic Growth** - helps learners build job-ready skills and organize career-focused projects.
- **SDG 10: Reduced Inequalities** - provides guided learning support that can help beginners and self-learners access clearer pathways.

## Tech Stack

**Frontend**

- React
- Vite
- React Router
- Axios
- Framer Motion
- Recharts
- React Hot Toast
- React Icons

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcryptjs
- Helmet
- CORS
- Cookie Parser

**AI Integration**

- Groq API
- Configurable Groq model support

**Deployment**

- Render
- Vercel-ready configuration
- MongoDB Atlas

## Features

- User registration and login
- JWT-based authentication
- Protected dashboard routes
- Admin routes and admin dashboard
- User profile management
- Personalized learning roadmaps
- Progress tracking
- Learning modules and quiz support
- AI chat support
- Project management
- Resource management
- Responsive React frontend
- REST API backend
- MongoDB database integration
- Production deployment support for Render and Vercel

## Project Structure

```txt
skillpath/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    utils/
    index.js
    package.json

  frontend/
    public/
    src/
      components/
      context/
      hooks/
      pages/
      routes/
      utils/
    package.json
    vite.config.js

  package.json
  vercel.json
```

## Getting Started

### Prerequisites

- Node.js `>=22.12.0 <23`
- npm
- MongoDB Atlas database or local MongoDB instance
- Groq API key, optional but recommended for AI features

### Install Dependencies

From the project root:

```bash
npm install
```

This installs dependencies for both workspaces:

- `backend`
- `frontend`

## Environment Variables

Create a `backend/.env` file:

```env
MONGO_URI=your_mongodb_connection_string
MONGO_DB_NAME=skillpath
JWT_SECRET=your_long_jwt_secret
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=your_admin_email@example.com
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```

For the frontend, create `frontend/.env` only if you need to override the API URL:

```env
VITE_API_URL=http://localhost:5001/api
```

In production, set:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

Never commit `.env` files. They are already ignored by `.gitignore`.

## Running Locally

Start the backend:

```bash
npm run dev:backend
```

Start the frontend in another terminal:

```bash
npm run dev:frontend
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5001/api`
- Health check: `http://localhost:5001/api/health`

## Useful Scripts

From the root:

```bash
npm run dev:backend
npm run dev:frontend
npm run build
npm start
```

From `frontend/`:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

From `backend/`:

```bash
npm run dev
npm start
```

## Deployment Guide

### Backend on Render

Create a Render Web Service for the backend.

Recommended settings:

```txt
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Set backend environment variables:

```env
MONGO_URI=your_mongodb_connection_string
MONGO_DB_NAME=skillpath
JWT_SECRET=your_long_jwt_secret
CLIENT_URL=https://your-frontend-url.onrender.com
ADMIN_EMAIL=your_admin_email@example.com
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```

### Frontend on Render

Create a Render Static Site for the frontend.

Recommended settings:

```txt
Root Directory: frontend
Build Command: npm ci --include=optional && npm run build
Publish Directory: dist
```

Set frontend environment variables:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

The file `frontend/public/_redirects` handles React Router routes in production:

```txt
/* /index.html 200
```

If routes like `/login` or `/dashboard` show `Not Found`, add a Render rewrite:

```txt
Source: /*
Destination: /index.html
Action: Rewrite
```

### Vercel

The project includes `vercel.json` for deploying the frontend and backend API together. Add the required environment variables in the Vercel project settings before deployment.

## Working on the Project

1. Pull the latest code.
2. Install dependencies with `npm install`.
3. Create or update local `.env` files.
4. Run backend and frontend dev servers.
5. Make changes in the appropriate workspace.
6. Run `npm run build` before pushing frontend changes.
7. Test authentication, protected routes, and API calls after changes that affect auth or routing.

## API Overview

The backend exposes routes under `/api`, including:

- `/api/health`
- `/api/auth`
- `/api/users`
- `/api/profiles`
- `/api/roadmaps`
- `/api/progress`
- `/api/learning`
- `/api/chat`
- `/api/projects`
- `/api/resources`
- `/api/admin`

## Notes

- Keep secrets out of Git.
- Use a strong `JWT_SECRET`.
- In production, `CLIENT_URL` must be the deployed frontend URL.
- In production, `VITE_API_URL` must point to the deployed backend API.
- If deploying on Render, clear the build cache after changing dependency or Node version settings.

