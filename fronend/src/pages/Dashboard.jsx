import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { 
  User, 
  TrendingUp, 
  BookOpen, 
  ArrowRight, 
  BarChart3, 
  Target, 
  Clock, 
  Award, 
  Zap, 
  Star, 
  Calendar, 
  Users,
  Compass,
  Map,
  Briefcase,
  GraduationCap
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Career Score',
      value: '87%',
      change: '+12%',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Skills Mastered',
      value: '24',
      change: '+3',
      icon: Award,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Learning Streak',
      value: '15 days',
      change: '+2',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Opportunities',
      value: '42',
      change: '+8',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    }
  ];

  const quickActions = [
    {
      title: 'Career Explorer',
      description: 'Discover career paths across all streams',
      icon: Compass,
      color: 'from-blue-500 to-cyan-500',
      link: '/career-explorer',
      badge: 'Popular'
    },
    {
      title: 'Build Roadmap',
      description: 'Create your personalized career roadmap',
      icon: Map,
      color: 'from-green-500 to-emerald-500',
      link: '/roadmap-builder',
      badge: 'New'
    },
    {
      title: 'Skill Assessment',
      description: 'Evaluate your current skill level',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
      link: '/skill-assessment',
      badge: null
    },
    {
      title: 'Learning Hub',
      description: 'Access curated courses and resources',
      icon: GraduationCap,
      color: 'from-indigo-500 to-purple-500',
      link: '/learning-hub',
      badge: null
    },
    {
      title: 'Job Market',
      description: 'Explore current job opportunities',
      icon: Briefcase,
      color: 'from-orange-500 to-red-500',
      link: '/job-market',
      badge: 'Hot'
    },
    {
      title: 'Mentor Connect',
      description: 'Connect with industry experts',
      icon: Users,
      color: 'from-teal-500 to-blue-500',
      link: '/mentor-connect',
      badge: 'Premium'
    }
  ];

  const recentActivity = [
    {
      title: 'Completed React Advanced Course',
      description: 'Earned certificate in React Development',
      time: '2 hours ago',
      type: 'achievement',
      icon: Award
    },
    {
      title: 'Career Assessment Updated',
      description: 'New recommendations available',
      time: '1 day ago',
      type: 'assessment',
      icon: Target
    },
    {
      title: 'Skill Badge Earned',
      description: 'JavaScript Expert level achieved',
      time: '2 days ago',
      type: 'skill',
      icon: Star
    },
    {
      title: 'Mentor Session Scheduled',
      description: 'Meeting with Sarah Johnson tomorrow',
      time: '3 days ago',
      type: 'meeting',
      icon: Calendar
    }
  ];

  const skillProgress = [
    { name: 'JavaScript', level: 92, color: 'bg-yellow-500' },
    { name: 'React', level: 85, color: 'bg-blue-500' },
    { name: 'Node.js', level: 78, color: 'bg-green-500' },
    { name: 'TypeScript', level: 65, color: 'bg-blue-600' },
    { name: 'Python', level: 45, color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 text-lg">Ready to advance your career today?</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.title}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="h-6 w-6 mr-2 text-blue-600" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="group relative p-6 border border-gray-200 rounded-2xl hover:border-transparent hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <action.icon className="h-6 w-6 text-white" />
                        </div>
                        {action.badge && (
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            action.badge === 'Popular' ? 'bg-blue-100 text-blue-800' :
                            action.badge === 'New' ? 'bg-green-100 text-green-800' :
                            action.badge === 'Hot' ? 'bg-red-100 text-red-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {action.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{action.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Skill Progress */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                Skill Progress
              </h2>
              <div className="space-y-6">
                {skillProgress.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">{skill.name}</span>
                      <span className="text-sm font-bold text-gray-700">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`${skill.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="h-6 w-6 mr-2 text-purple-600" />
              Recent Activity
            </h2>
            <div className="space-y-6">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activity.type === 'achievement' ? 'bg-yellow-100' :
                    activity.type === 'assessment' ? 'bg-blue-100' :
                    activity.type === 'skill' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    <activity.icon className={`h-5 w-5 ${
                      activity.type === 'achievement' ? 'text-yellow-600' :
                      activity.type === 'assessment' ? 'text-blue-600' :
                      activity.type === 'skill' ? 'text-green-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{activity.title}</p>
                    <p className="text-gray-600 text-xs mb-1">{activity.description}</p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 