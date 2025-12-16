import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles,
  BookOpen, 
  Map, 
  Users, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter,
  Heart,
  ArrowUp
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Career Path Pro
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Your comprehensive career development platform powered by AI. Explore careers, build roadmaps, 
              connect with mentors, and enhance your skills with personalized learning paths.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center">
                  <Map className="h-4 w-4 mr-2" />
                  Career Explorer
                </Link>
              </li>
              <li>
                <Link to="/roadmap-builder" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center">
                  <Map className="h-4 w-4 mr-2" />
                  Roadmap Builder
                </Link>
              </li>
              <li>
                <Link to="/mentor-connect" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Mentor Connect
                </Link>
              </li>
              <li>
                <Link to="/learning-hub" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Learning Hub
                </Link>
              </li>
              <li>
                <Link to="/resume-analyzer" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Resume Analyzer
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Career Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Skill Assessments
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Industry Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Blog & Articles
                </a>
              </li>
            </ul>
          </div> */}

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-blue-400" />
                <span className="text-gray-300 text-sm">techtitans@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-blue-400" />
                <span className="text-gray-300 text-sm">+910987654321</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-blue-400" />
                <span className="text-gray-300 text-sm">Rajkot , Gujrat , India</span>
              </div>
            </div>
            
          </div>
          <div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2 text-blue-300">Stay Updated</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg text-sm font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-sm text-gray-400 mb-4 md:mb-0">
              <span>@2025 CodeArena Made By Tech Titans </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
} 