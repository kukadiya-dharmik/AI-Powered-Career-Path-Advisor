import React, { useState, useEffect } from 'react';
import { User, Mail, BookOpen, TrendingUp, Heart, Save, Edit3, Award, Target, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import toast, { Toaster } from 'react-hot-toast';

const API_URL = window.REACT_APP_API_URL || 'http://localhost:5000';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const [privacy, setPrivacy] = useState(user?.privacy ?? true); // true = public, false = private
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    title: 'Aspiring Software Developer',
    location: 'Mumbai, India',
    education: '12th Grade - Science Stream (PCM)',
    experience: 'Fresher - Looking for opportunities',
    skills: 'JavaScript, Python, HTML/CSS, React Basics, Problem Solving',
    interests: 'Web Development, Mobile Apps, AI/ML, Gaming, Open Source',
    bio: 'Passionate about technology and eager to start my career in software development. Currently learning modern web technologies and building projects to strengthen my skills.',
    achievements: 'School Topper in Mathematics, Built 3 personal projects, Completed online coding bootcamp',
    goals: 'Get internship at tech company, Master full-stack development, Contribute to open source projects'
  });

  // Fetch latest profile data from backend on mount and when user changes
  useEffect(() => {
    async function fetchProfile() {
      if (!user?.email) return;
      try {
        const res = await fetch(`${API_URL}/api/users/profile?email=${encodeURIComponent(user.email)}`);
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        if (data.user) {
          setFormData({
            name: data.user.name || '',
            email: data.user.email || '',
            title: data.user.title || 'Aspiring Software Developer',
            location: data.user.location || 'Mumbai, India',
            education: data.user.education || '12th Grade - Science Stream (PCM)',
            experience: data.user.experience || 'Fresher - Looking for opportunities',
            skills: data.user.skills || 'JavaScript, Python, HTML/CSS, React Basics, Problem Solving',
            interests: data.user.interests || 'Web Development, Mobile Apps, AI/ML, Gaming, Open Source',
            bio: data.user.bio || 'Passionate about technology and eager to start my career in software development. Currently learning modern web technologies and building projects to strengthen my skills.',
            achievements: data.user.achievements || 'School Topper in Mathematics, Built 3 personal projects, Completed online coding bootcamp',
            goals: data.user.goals || 'Get internship at tech company, Master full-stack development, Contribute to open source projects'
          });
          setPrivacy(typeof data.user.privacy === 'boolean' ? data.user.privacy : true);
        }
      } catch (err) {
        // Optionally show a toast or log error
      }
    }
    fetchProfile();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    // Save profile to backend (including privacy)
    try {
      // Always use the logged-in user's email for update
      const updateData = { ...formData, email: user.email, privacy };
      console.log('Updating profile for email:', updateData.email);
      const res = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      toast.success('🎉 Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      title: 'Aspiring Software Developer',
      location: 'Mumbai, India',
      education: '12th Grade - Science Stream (PCM)',
      experience: 'Fresher - Looking for opportunities',
      skills: 'JavaScript, Python, HTML/CSS, React Basics, Problem Solving',
      interests: 'Web Development, Mobile Apps, AI/ML, Gaming, Open Source',
      bio: 'Passionate about technology and eager to start my career in software development. Currently learning modern web technologies and building projects to strengthen my skills.',
      achievements: 'School Topper in Mathematics, Built 3 personal projects, Completed online coding bootcamp',
      goals: 'Get internship at tech company, Master full-stack development, Contribute to open source projects'
    });
    setIsEditing(false);
  };

  const handlePrivacyToggle = () => setPrivacy((prev) => !prev);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/users/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, ...passwords }),
      });
      if (!res.ok) throw new Error('Failed to change password');
      toast.success('Password changed successfully!');
      setShowPasswordModal(false);
      setPasswords({ oldPassword: '', newPassword: '' });
    } catch (err) {
      toast.error(err.message || 'Failed to change password');
    }
  };

  const skillsArray = formData.skills.split(',').map(skill => skill.trim());
  const interestsArray = formData.interests.split(',').map(interest => interest.trim());
  const achievementsArray = formData.achievements.split(',').map(achievement => achievement.trim());
  const goalsArray = formData.goals.split(',').map(goal => goal.trim());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Toaster position="top-right" />
      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Old Password</label>
                <input type="password" value={passwords.oldPassword} onChange={e => setPasswords(p => ({ ...p, oldPassword: e.target.value }))} className="w-full px-4 py-2 border rounded" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">New Password</label>
                <input type="password" value={passwords.newPassword} onChange={e => setPasswords(p => ({ ...p, newPassword: e.target.value }))} className="w-full px-4 py-2 border rounded" required />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowPasswordModal(false)} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Change</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
              <User className="h-16 w-16 text-white" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-2">
                {formData.name}
              </h1>
              <p className="text-xl text-blue-600 font-semibold mb-2">{formData.title}</p>
              <div className="flex items-center justify-center md:justify-start space-x-4 text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{formData.location}</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed max-w-2xl">{formData.bio}</p>
            </div>
            
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Edit3 className="h-5 w-5" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="ml-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>Change Password</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <User className="h-6 w-6 mr-3 text-blue-600" />
                Personal Information
              </h2>
              {/* Privacy Toggle */}
              <div className="flex items-center mb-6">
                <label className="mr-3 font-semibold text-gray-700">Profile Privacy:</label>
                <button
                  type="button"
                  onClick={handlePrivacyToggle}
                  className={`px-4 py-2 rounded-full font-bold ${privacy ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}
                  disabled={!isEditing}
                >
                  {privacy ? 'Public' : 'Private'}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Status</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
            {/* Academic & Professional Details */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="h-6 w-6 mr-3 text-green-600" />
                Academic & Professional Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Education</label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">About Me</label>
                  <textarea
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                  />
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            {isEditing && (
              <div className="flex space-x-4">
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-gray-700 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Achievements */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-600" />
                Achievements
              </h3>
              {isEditing ? (
                <textarea
                  name="achievements"
                  rows={4}
                  value={formData.achievements}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all duration-300 resize-none"
                  placeholder="Separate achievements with commas"
                />
              ) : (
                <div className="space-y-3">
                  {achievementsArray.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <span className="text-gray-700 text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Career Goals */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2 text-red-600" />
                Career Goals
              </h3>
              {isEditing ? (
                <textarea
                  name="goals"
                  rows={4}
                  value={formData.goals}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 resize-none"
                  placeholder="Separate goals with commas"
                />
              ) : (
                <div className="space-y-3">
                  {goalsArray.map((goal, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="text-gray-700 text-sm">{goal}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Skills & Interests */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-3 text-purple-600" />
                Skills & Interests
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
                  {isEditing ? (
                    <textarea
                      name="skills"
                      rows={3}
                      value={formData.skills}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 resize-none"
                      placeholder="Separate skills with commas"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {skillsArray.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Career Interests</label>
                  {isEditing ? (
                    <textarea
                      name="interests"
                      rows={3}
                      value={formData.interests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 resize-none"
                      placeholder="Separate interests with commas"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {interestsArray.map((interest, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 