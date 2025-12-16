import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Users, 
  BookOpen,
  Award,
  Compass,
  Map,
  Briefcase,
  GraduationCap,
  Star,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Compass,
      title: 'Career Explorer',
      description: 'Discover career paths across Arts, Commerce, Science, and more',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Map,
      title: 'Personalized Roadmaps',
      description: 'Get step-by-step guidance from 10th grade to your dream career',
      color: 'from-green-500 to-emerald-500'
    },
    // {
    //   icon: Target,
    //   title: 'Skill Assessment',
    //   description: 'Identify your strengths and areas for improvement',
    //   color: 'from-purple-500 to-pink-500'
    // },
    {
      icon: Users,
      title: 'Mentor Connect',
      description: 'Connect with industry professionals and career mentors',
      color: 'from-orange-500 to-red-500'
    },
    // {
    //   icon: Briefcase,
    //   title: 'Job Market Insights',
    //   description: 'Stay updated with latest job trends and opportunities',
    //   color: 'from-indigo-500 to-purple-500'
    // },
    {
      icon: GraduationCap,
      title: 'Courses',
      description: 'Access curated courses and resources for skill development',
      color: 'from-teal-500 to-blue-500'
    }
  ];

  const careerPaths = [
    {
      category: 'Science & Technology',
      paths: ['Software Engineering', 'Data Science', 'Biotechnology', 'Aerospace Engineering', 'Medical Research'],
      icon: '🔬',
      color: 'from-blue-100 to-cyan-100'
    },
    {
      category: 'Arts & Creative',
      paths: ['Graphic Design', 'Digital Marketing', 'Content Creation', 'Film Production', 'Fine Arts'],
      icon: '🎨',
      color: 'from-purple-100 to-pink-100'
    },
    {
      category: 'Commerce & Business',
      paths: ['Business Analytics', 'Finance', 'Entrepreneurship', 'Marketing', 'International Trade'],
      icon: '💼',
      color: 'from-green-100 to-emerald-100'
    },
    {
      category: 'Healthcare & Medicine',
      paths: ['Medicine', 'Nursing', 'Pharmacy', 'Physiotherapy', 'Public Health'],
      icon: '⚕️',
      color: 'from-red-100 to-orange-100'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer at Google',
      content: 'CareerPath Pro helped me navigate from 12th Science to becoming a software engineer. The roadmap was incredibly detailed!',
      rating: 5
    },
    {
      name: 'Arjun Patel',
      role: 'Digital Marketing Manager',
      content: 'I was confused about career options after Commerce. This platform showed me paths I never knew existed!',
      rating: 5
    },
    {
      name: 'Sneha Reddy',
      role: 'Graphic Designer',
      content: 'The mentor connect feature was amazing. I got guidance from industry professionals who helped shape my career.',
      rating: 5
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-8">
              <Sparkles className="h-4 w-4 mr-2" />
              Your Future Starts Here
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-8 leading-tight">
              Discover Your
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Perfect Career Path
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Navigate your journey from 10th grade to your dream career with AI-powered guidance, 
              personalized roadmaps, and expert mentorship across all streams - Science, Commerce, Arts, and beyond.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {user ? (
                <Link
                  to="/career-explorer"
                  className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-3 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2"
                >
                  <span>Explore Careers</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-3 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2"
                  >
                    <span>Start Your Journey</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/career-explorer"
                    className="group bg-white text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center space-x-3 shadow-xl hover:shadow-2xl border border-gray-200"
                  >
                    <Compass className="h-6 w-6" />
                    <span>Explore Careers</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and resources to guide you through every step of your career journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              // Define routes for each feature
              const getRoute = (title) => {
                switch (title) {
                  case 'Career Explorer':
                    return '/career-explorer';
                  case 'Personalized Roadmaps':
                    return '/roadmap-builder';
                  case 'Mentor Connect':
                    return '/mentor-connect';
                  case 'Courses':
                    return '/learning-hub';
                  default:
                    return '#';
                }
              };

              const route = getRoute(feature.title);
              
              return (
                <Link
                  key={index}
                  to={route}
                  className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 cursor-pointer"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6">
              Explore Career Paths
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover opportunities across all major streams and find the perfect fit for your interests and skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careerPaths.map((category, index) => (
              <div key={index} className={`bg-gradient-to-br ${category.color} rounded-3xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-4xl">{category.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
                </div>
                <div className="space-y-3">
                  {category.paths.map((path, pathIndex) => (
                    <div key={pathIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700 font-medium">{path}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how CareerPath Pro has helped thousands of students achieve their career goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-blue-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Shape Your Future?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of students who have already started their journey to success. 
            Get personalized guidance, expert mentorship, and the tools you need to achieve your career goals.
          </p>
          {!user && (
            <Link
              to="/register"
              className="inline-flex items-center space-x-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-6 w-6" />
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default Home; 