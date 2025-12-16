import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Clock, Users, MessageCircle, Video, Calendar, Award, Briefcase, GraduationCap } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const MentorConnect = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('All');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const expertiseAreas = [
    'All', 'Software Development', 'Data Science', 'Product Management', 
    'Design', 'Marketing', 'Finance', 'Entrepreneurship', 'Career Guidance'
  ];

  const mentors = [
    {
      id: '1',
      name: 'Priya Sharma',
      title: 'Senior Software Engineer',
      company: 'Google',
      expertise: ['Software Development', 'System Design', 'Career Guidance'],
      experience: '8+ years',
      rating: 4.9,
      reviews: 127,
      location: 'Bangalore, India',
      languages: ['English', 'Hindi'],
      hourlyRate: '₹2,500/hour',
      availability: 'Weekends',
      bio: 'Passionate software engineer with expertise in distributed systems and mentoring junior developers. Helped 50+ engineers advance their careers.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
      verified: true,
      responseTime: '< 2 hours',
      mentees: 45
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      title: 'Data Science Manager',
      company: 'Microsoft',
      expertise: ['Data Science', 'Machine Learning', 'Analytics'],
      experience: '10+ years',
      rating: 4.8,
      reviews: 89,
      location: 'Hyderabad, India',
      languages: ['English', 'Hindi', 'Telugu'],
      hourlyRate: '₹3,000/hour',
      availability: 'Evenings',
      bio: 'Leading data science teams and building ML products at scale. Specialized in helping professionals transition into data science roles.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh',
      verified: true,
      responseTime: '< 4 hours',
      mentees: 32
    },
    {
      id: '3',
      name: 'Sneha Patel',
      title: 'Product Manager',
      company: 'Amazon',
      expertise: ['Product Management', 'Strategy', 'Leadership'],
      experience: '6+ years',
      rating: 4.9,
      reviews: 156,
      location: 'Mumbai, India',
      languages: ['English', 'Hindi', 'Gujarati'],
      hourlyRate: '₹2,800/hour',
      availability: 'Flexible',
      bio: 'Product leader with experience in e-commerce and fintech. Passionate about helping aspiring PMs break into the field.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha',
      verified: true,
      responseTime: '< 1 hour',
      mentees: 67
    },
    {
      id: '4',
      name: 'Arjun Singh',
      title: 'UX Design Lead',
      company: 'Flipkart',
      expertise: ['Design', 'User Experience', 'Design Systems'],
      experience: '7+ years',
      rating: 4.7,
      reviews: 94,
      location: 'Delhi, India',
      languages: ['English', 'Hindi'],
      hourlyRate: '₹2,200/hour',
      availability: 'Weekdays',
      bio: 'Design leader focused on creating user-centered products. Mentored 30+ designers and helped them build strong portfolios.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
      verified: true,
      responseTime: '< 3 hours',
      mentees: 28
    },
    {
      id: '5',
      name: 'Kavya Reddy',
      title: 'Marketing Director',
      company: 'Zomato',
      expertise: ['Marketing', 'Brand Strategy', 'Growth'],
      experience: '9+ years',
      rating: 4.8,
      reviews: 112,
      location: 'Bangalore, India',
      languages: ['English', 'Hindi', 'Kannada'],
      hourlyRate: '₹2,600/hour',
      availability: 'Weekends',
      bio: 'Growth marketing expert with experience in building brands from scratch. Specialized in digital marketing and customer acquisition.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kavya',
      verified: true,
      responseTime: '< 2 hours',
      mentees: 41
    },
    {
      id: '6',
      name: 'Vikram Agarwal',
      title: 'Investment Banker',
      company: 'Goldman Sachs',
      expertise: ['Finance', 'Investment Banking', 'Career Guidance'],
      experience: '12+ years',
      rating: 4.9,
      reviews: 78,
      location: 'Mumbai, India',
      languages: ['English', 'Hindi'],
      hourlyRate: '₹4,000/hour',
      availability: 'Evenings',
      bio: 'Senior investment banker with expertise in M&A and capital markets. Helping finance professionals advance their careers.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram',
      verified: true,
      responseTime: '< 6 hours',
      mentees: 23
    }
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesExpertise = selectedExpertise === 'All' || mentor.expertise.includes(selectedExpertise);
    return matchesSearch && matchesExpertise;
  });

  const handleBookSession = (mentor) => {
    setSelectedMentor(mentor);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    toast.success(`🎉 Session booked with ${selectedMentor?.name}! You'll receive a confirmation email shortly.`);
    setShowBookingModal(false);
    setSelectedMentor(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-4">
            Mentor Connect
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with industry experts and experienced professionals who can guide you 
            on your career journey. Get personalized advice, insights, and support.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search mentors by name, company, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
              />
            </div>
            
            <select
              value={selectedExpertise}
              onChange={(e) => setSelectedExpertise(e.target.value)}
              className="px-6 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white"
            >
              {expertiseAreas.map(expertise => (
                <option key={expertise} value={expertise}>{expertise}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Mentor Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-16 h-16 rounded-2xl"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                        {mentor.verified && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <Award className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-blue-600 font-semibold">{mentor.title}</p>
                      <p className="text-gray-600">{mentor.company}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold text-gray-900">{mentor.rating}</span>
                    <span className="text-gray-500">({mentor.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{mentor.mentees} mentees</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.slice(0, 2).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {mentor.expertise.length > 2 && (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                      +{mentor.expertise.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Mentor Details */}
              <div className="p-6">
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{mentor.bio}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Location:
                    </span>
                    <span className="font-medium text-gray-700">{mentor.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Response:
                    </span>
                    <span className="font-medium text-gray-700">{mentor.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      Experience:
                    </span>
                    <span className="font-medium text-gray-700">{mentor.experience}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-green-600">{mentor.hourlyRate}</span>
                  <span className="text-sm text-gray-500">{mentor.availability}</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => toast.success(`Message sent to ${mentor.name}!`)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Message</span>
                  </button>
                  <button
                    onClick={() => handleBookSession(mentor)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Video className="h-4 w-4" />
                    <span>Book</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No mentors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all mentors.</p>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Our Mentors?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Experts</h3>
              <p className="text-gray-600">
                All mentors are verified professionals with proven track records in their fields
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Book sessions that fit your schedule with mentors available across time zones
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Guidance</h3>
              <p className="text-gray-600">
                Get tailored advice based on your specific goals and career aspirations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Session</h2>
            
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={selectedMentor.avatar}
                alt={selectedMentor.name}
                className="w-16 h-16 rounded-2xl"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedMentor.name}</h3>
                <p className="text-blue-600 font-semibold">{selectedMentor.title}</p>
                <p className="text-gray-600">{selectedMentor.company}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Session Type</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300">
                  <option>1-on-1 Video Call (60 min)</option>
                  <option>Career Review Session (45 min)</option>
                  <option>Quick Consultation (30 min)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300">
                  <option>10:00 AM - 11:00 AM</option>
                  <option>2:00 PM - 3:00 PM</option>
                  <option>6:00 PM - 7:00 PM</option>
                  <option>8:00 PM - 9:00 PM</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">What would you like to discuss?</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 resize-none"
                  placeholder="Brief description of topics you'd like to cover..."
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-6 p-4 bg-green-50 rounded-2xl">
              <span className="font-semibold text-gray-900">Total Cost:</span>
              <span className="text-2xl font-bold text-green-600">{selectedMentor.hourlyRate}</span>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-2xl font-semibold hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorConnect; 