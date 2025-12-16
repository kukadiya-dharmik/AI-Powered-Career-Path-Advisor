import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { User, LogOut, Settings } from 'lucide-react';

const UserNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  if (!user) {
    return (
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-3">
        <Link
          to="/login"
          className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-4 py-2 rounded-xl hover:bg-white/80 backdrop-blur-md"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Get Started
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center space-x-3">
        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-3 p-2 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-100 hover:bg-white transition-all duration-300"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="hidden sm:block font-medium text-gray-700">{user.name}</span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <Link
                to="/profile"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              {/* <button
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button> */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNavbar; 