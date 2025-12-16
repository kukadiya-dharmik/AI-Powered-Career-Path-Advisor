# Backend for AIwithserver

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and update with your MongoDB URI and desired PORT:
   ```bash
   cp .env.example .env
   # Edit .env as needed
   ```
3. Start the server:
   ```bash
   npm run dev
   # or
   npm start
   ```

## Folder Structure
- `server.js` - Main entry point
- `routes/` - API route definitions
- `controllers/` - Route logic
- `models/` - Mongoose schemas

## Endpoints
- `/api/users/register` - Register user
- `/api/users/login` - Login user
- `/api/jobs` - CRUD for jobs

## Notes
- Ensure MongoDB is running locally or use a cloud URI (e.g., MongoDB Atlas).
- CORS is enabled for frontend-backend communication. 