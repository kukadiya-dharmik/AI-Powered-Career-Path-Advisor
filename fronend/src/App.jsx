import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import UserNavbar from './components/UserNavbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CareerExplorer from './pages/CareerExplorer.jsx';
import RoadmapBuilder from './pages/RoadmapBuilder.jsx';
import Profile from './pages/Profile.jsx';
import MentorConnect from './pages/MentorConnect.jsx';
import Footer from './components/Footer.jsx';

import LearningHub from './pages/LearningHub.jsx';
import ChatbotPage from './pages/ChatbotPage';

function App() {
  const { user, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <UserNavbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/career-explorer" element={user ? <CareerExplorer /> : <Navigate to="/login" />} />
          <Route path="/roadmap-builder" element={user ? <RoadmapBuilder /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/mentor-connect" element={user ? <MentorConnect /> : <Navigate to="/login" />} />
          <Route path="/learning-hub" element={user ? <LearningHub /> : <Navigate to="/login" />} />
          <Route path="/chatbot" element={user ? <ChatbotPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App; 