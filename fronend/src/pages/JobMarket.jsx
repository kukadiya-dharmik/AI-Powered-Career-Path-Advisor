import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Briefcase, TrendingUp, Users, Star, ArrowRight, Building, Calendar } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const JobMarket = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);

  const locations = ['All', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Chennai', 'Remote'];
  const jobTypes = ['All', 'Full-time', 'Part-time', 'Internship', 'Contract'];
  const categories = ['All', 'Technology', 'Design', 'Marketing', 'Finance', 'Sales', 'Operations', 'HR'];

  const jobs = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹8-15 LPA',
      description: 'We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for building user-facing features and ensuring great user experience.',
      requirements: ['React.js', 'JavaScript', 'HTML/CSS', 'Git', 'REST APIs'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Learning Budget', 'Remote Work'],
      postedDate: '2 days ago',
      applicants: 45,
      logo: '🚀',
      featured: true,
      remote: false,
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Data Science Intern',
      company: 'DataMinds Analytics',
      location: 'Mumbai',
      type: 'Internship',
      experience: 'Fresher',
      salary: '₹25,000/month',
      description: 'Join our data science team as an intern and work on real-world machine learning projects. Perfect opportunity for recent graduates.',
      requirements: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Pandas'],
      benefits: ['Mentorship', 'Certificate', 'Full-time Opportunity', 'Training'],
      postedDate: '1 day ago',
      applicants: 128,
      logo: '📊',
      featured: false,
      remote: true,
      category: 'Technology'
    },
    {
      id: '3',
      title: 'UX Designer',
      company: 'DesignStudio Pro',
      location: 'Delhi',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹10-18 LPA',
      description: 'Create intuitive and engaging user experiences for our digital products. Work closely with product managers and developers.',
      requirements: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Usability Testing'],
      benefits: ['Creative Freedom', 'Latest Tools', 'Conference Budget', 'Flexible Schedule'],
      postedDate: '3 days ago',
      applicants: 67,
      logo: '🎨',
      featured: true,
      remote: false,
      category: 'Design'
    },
    {
      id: '4',
      title: 'Digital Marketing Specialist',
      company: 'GrowthHackers Inc',
      location: 'Hyderabad',
      type: 'Full-time',
      experience: '1-3 years',
      salary: '₹6-12 LPA',
      description: 'Drive digital marketing campaigns across multiple channels. Analyze performance and optimize for better ROI.',
      requirements: ['Google Ads', 'Facebook Ads', 'SEO', 'Analytics', 'Content Marketing'],
      benefits: ['Performance Bonus', 'Training Programs', 'Team Outings', 'Growth Opportunities'],
      postedDate: '1 week ago',
      applicants: 89,
      logo: '📱',
      featured: false,
      remote: true,
      category: 'Marketing'
    },
    {
      id: '5',
      title: 'Financial Analyst',
      company: 'FinanceFirst Ltd',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹9-16 LPA',
      description: 'Analyze financial data, prepare reports, and support strategic decision-making. Work with cross-functional teams.',
      requirements: ['Excel', 'Financial Modeling', 'SQL', 'PowerBI', 'CFA/FRM preferred'],
      benefits: ['Stock Options', 'Professional Development', 'Health Benefits', 'Bonus'],
      postedDate: '4 days ago',
      applicants: 34,
      logo: '💰',
      featured: false,
      remote: false,
      category: 'Finance'
    },
    {
      id: '6',
      title: 'Product Manager',
      company: 'InnovateTech',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '4-7 years',
      salary: '₹18-30 LPA',
      description: 'Lead product strategy and execution. Work with engineering, design, and business teams to deliver exceptional products.',
      requirements: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research', 'Roadmap Planning'],
      benefits: ['Equity', 'Unlimited PTO', 'Learning Budget', 'Premium Healthcare'],
      postedDate: '5 days ago',
      applicants: 156,
      logo: '🚀',
      featured: true,
      remote: false,
      category: 'Technology'
    }
  ];

  const marketTrends = [
    {
      skill: 'Artificial Intelligence',
      demand: 95,
      growth: '+45%',
      avgSalary: '₹15-35 LPA',
      color: 'from-purple-500 to-pink-500'
    },
    {
      skill: 'Cloud Computing',
      demand: 88,
      growth: '+38%',
      avgSalary: '₹12-28 LPA',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      skill: 'Data Science',
      demand: 82,
      growth: '+32%',
      avgSalary: '₹10-25 LPA',
      color: 'from-green-500 to-emerald-500'
    },
    {
      skill: 'Cybersecurity',
      demand: 79,
      growth: '+29%',
      avgSalary: '₹11-24 LPA',
      color: 'from-red-500 to-orange-500'
    },
    {
      skill: 'Digital Marketing',
      demand: 75,
      growth: '+25%',
      avgSalary: '₹6-18 LPA',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation || (selectedLocation === 'Remote' && job.remote);
    const matchesType = selectedType === 'All' || job.type === selectedType;
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    return matchesSearch && matchesLocation && matchesType && matchesCategory;
  });

  const handleApply = (job) => {
    toast.success(`Application submitted for ${job.title} at ${job.company}!`);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Full-time':
        return 'bg-green-100 text-green-800';
      case 'Part-time':
        return 'bg-blue-100 text-blue-800';
      case 'Internship':
        return 'bg-purple-100 text-purple-800';
      case 'Contract':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-4">
            <Briefcase className="h-4 w-4 mr-2" />
            Explore Opportunities
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-4">
            Job Market Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the latest job opportunities, market trends, and career insights 
            to accelerate your professional growth.
          </p>
        </div>

        {/* Market Trends */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Trending Skills in Demand
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {marketTrends.map((trend, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${trend.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{trend.skill}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${trend.color} h-2 rounded-full`}
                        style={{ width: `${trend.demand}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-700">{trend.demand}%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="font-semibold text-green-600">{trend.growth} growth</div>
                    <div className="text-gray-500">{trend.avgSalary}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white"
              >
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Listings */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border ${
                    job.featured ? 'border-blue-200 ring-2 ring-blue-100' : 'border-gray-100'
                  } overflow-hidden cursor-pointer`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-2xl">
                          {job.logo}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-blue-600 font-semibold">{job.company}</p>
                        </div>
                      </div>
                      
                      {job.featured && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{job.location}</span>
                        {job.remote && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">Remote</span>}
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{job.experience}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm font-semibold text-green-600">{job.salary}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {req}
                        </span>
                      ))}
                      {job.requirements.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                          +{job.requirements.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(job.type)}`}>
                          {job.type}
                        </span>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">{job.applicants} applicants</span>
                        </div>
                        <span className="text-sm text-gray-500">{job.postedDate}</span>
                      </div>
                      
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job Details Sidebar */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 h-fit sticky top-24">
            {selectedJob ? (
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl">
                    {selectedJob.logo}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                    <p className="text-blue-600 font-semibold">{selectedJob.company}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold text-gray-900">{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-semibold text-gray-900">{selectedJob.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Salary:</span>
                    <span className="font-semibold text-green-600">{selectedJob.salary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(selectedJob.type)}`}>
                      {selectedJob.type}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Requirements</h3>
                  <div className="space-y-2">
                    {selectedJob.requirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Benefits</h3>
                  <div className="space-y-2">
                    {selectedJob.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleApply(selectedJob)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Apply Now
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Select a Job</h3>
                <p className="text-gray-600">Click on any job listing to view detailed information and apply.</p>
              </div>
            )}
          </div>
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all available positions.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMarket; 