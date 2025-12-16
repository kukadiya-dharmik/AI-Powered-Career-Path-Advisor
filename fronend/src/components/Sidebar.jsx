import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { 
  Sparkles, 
  Home, 
  Compass, 
  Map, 
  BookOpen,
  Target,
  Users,
  Briefcase,
  GraduationCap
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Career Explorer', path: '/career-explorer', icon: Compass, protected: true },
    { name: 'Roadmap Builder', path: '/roadmap-builder', icon: Map, protected: true },
    { name: 'Courses', path: '/learning-hub', icon: GraduationCap, protected: true },
    { name: 'Mentor Connect', path: '/mentor-connect', icon: Users, protected: true },
    { name: 'AI Chatbot', path: '/chatbot', icon: BookOpen, protected: true },
  ];

  const visibleNavItems = navItems.filter(item => !item.protected || user);



  return (
    <>
      {/* Sidebar */}
      <div 
        className={`sidebar fixed top-0 left-0 h-full bg-white/95 backdrop-blur-md shadow-2xl border-r border-gray-100 z-50 transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header - Fixed at top */}
          <div className="flex-shrink-0 p-6 bg-transperant backdrop-blur-md">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 group cursor-pointer"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 ${
                  isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
                } ${
                  isOpen ? 'opacity-100 w-auto ' : 'opacity-0 w-0 overflow-hidden'
                }`}>
                  CareerPath Pro
                </span>
              </button>
            </div>
          </div>

          {/* Navigation Items - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="py-4 space-y-2 px-4">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default Sidebar; 