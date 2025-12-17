# AI-Powered Career Path Advisor

An AI-powered web application that helps students and young professionals discover and plan career paths based on their interests, skills, profile, and goals.  

The platform combines an interactive React dashboard, smart backend APIs, and an AI-style chatbot experience to provide guidance on careers, learning resources, roadmaps, and mentoring.

## Features

- **Authentication & User Profiles**  
  - User registration and login with protected routes in the UI.  
  - Auth state is managed via a global `AuthContext`, and only logged-in users can access core dashboards and tools.  

- **Career Explorer** (`/career-explorer`)  
  - Explore different career paths and roles using data served from the backend (via `career` routes).  
  - Helps users understand what each career involves and which paths might be a good fit.  

- **Roadmap Builder** (`/roadmap-builder`)  
  - Lets users build a structured roadmap for their chosen career.  
  - Focuses on steps such as fundamentals, projects, internships, and job applications.  

- **Learning Hub** (`/learning-hub`)  
  - Central hub of curated learning materials fetched from the backend `LearningHub` API.  
  - Can list courses, resources, and skill-based learning tracks.  

- **AI Chatbot for Career Guidance** (`/chatbot`)  
  - Chat-style interface (frontend `ChatbotPage` + `Chatbot` component) talking to the backend `/chatbot` route.  
  - Users can ask questions about skills, career choices, or next steps and receive automated guidance-style responses.  

- **Mentor Connect** (`/mentor-connect`)  
  - UI page intended for connecting users with mentors or guidance profiles (can be integrated with APIs / database).  

- **Personal Dashboard & Profile** (`/dashboard`, `/profile`)  
  - Overview of user activity and profile details (skills, interests, goals).  

- **Modern, Responsive UI**  
  - Built with React, React Router, and Tailwind CSS.  
  - Includes reusable components like `Sidebar`, `UserNavbar`, `Footer`, and loading skeletons/spinners for a smooth UX.

## Tech Stack

- **Frontend**  
  - React 18 (SPA)  
  - Vite (fast dev server and bundler)  
  - React Router DOM for client-side routing  
  - Tailwind CSS for styling  
  - `lucide-react` for icons and `react-hot-toast` for notifications  

- **Backend**  
  - Node.js with Express  
  - REST APIs for users, careers, learning hub, and chatbot endpoints  
  - Organized into `controllers`, `routes`, and `models`  

- **Database**  
  - MongoDB with Mongoose ODM (`User` and `Job` models, and others as needed)  
  - Connection handled via `mongoose.connect` with URI from `MONGO_URI` in `.env`  

- **Other**  
  - `dotenv` for environment configuration  
  - `cors` to allow the frontend (Vite dev server) to talk to the backend  
  - `bcryptjs` (ready for secure password hashing)  
  - `nodemon` for backend hot-reload in development

## How It Works (High Level)

1. **User signs up / logs in**  
   - Auth flow handled by the backend `userRoutes` (`/api/users`) and the frontend `AuthContext`.  
   - Protected routes redirect unauthenticated users to `/login`.  

2. **Explore careers & resources**  
   - Frontend pages like `CareerExplorer`, `LearningHub`, and `JobMarket` call backend APIs (`/career`, `/learninghub`, etc.).  
   - Backend controllers (`career`, `LearningHub`, `jobController`) fetch and shape data from MongoDB.  

3. **Build a roadmap**  
   - `RoadmapBuilder` page lets the user design their own step-by-step journey based on the data and guidance.  

4. **Ask the chatbot for help**  
   - `ChatbotPage` communicates with the backend `/chatbot` route.  
   - This can be wired to AI logic (rule-based or external LLM) for more intelligent answers.  

5. **Iterate & refine**  
   - Users can keep adjusting their choices and revisit different sections of the app to refine their plan.

## Getting Started

1. **Clone the repository**  
   ```bash
   git clone <your-repo-url>
   cd "AI-Powered Career Path Advisor"
   ```

2. **Backend setup**  
   ```bash
   cd backend
   npm install
   npm run dev   # or: npm start
   ```

3. **Frontend setup**  
   ```bash
   cd ../fronend
   npm install
   npm run dev   # Vite dev server
   ```

4. **Environment variables**

   In the `backend` folder, create a `.env` file:

   ```bash
   MONGO_URI=mongodb://localhost:27017/zeni
   PORT=5000
   ```

   Adjust `MONGO_URI` to your own MongoDB instance (local or cloud).

## Future Enhancements

- **Deeper AI Personalization**: Use more advanced models to consider personality traits, work style, and values.  
- **Resume / LinkedIn Parsing**: Automatically analyze existing profiles to pre-fill skills and experience.  
- **Real-time Job Market Insights**: Integrate APIs to show live job demand, salary ranges, and locations.  
- **Multilingual Support**: Support users in multiple languages.  
