
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Sparkles, TrendingUp, BookOpen, Target } from 'lucide-react';

const API_URL = window.REACT_APP_API_URL || 'http://localhost:5000';

export default function CareerExplorer() {
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRecommendations([]);
    setError('');
    setLoading(true);
    const notify = toast.loading('Getting career advice...');
    try {
      const res = await fetch(`${API_URL}/career/recommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          education,
          skills: skills.split(',').map(s => s.trim()).filter(Boolean),
          interests: interests.split(',').map(i => i.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const detailedError = data.error
          ? (typeof data.error === 'object' ? JSON.stringify(data.error) : `${data.message}: ${data.error}`)
          : (data.message || 'Error');
        throw new Error(detailedError);
      }
      setRecommendations(data.recommendations || []);
      toast.success('Career advice received!', { id: notify });
    } catch (err) {
      setError(err.message || 'Failed to get advice');
      toast.error(err.message || 'Failed to get advice', { id: notify });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh] ">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered Career Advisor
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-4">
            Career Explorer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the best career paths for you based on your education, skills, and interests. Get personalized AI-powered recommendations to guide your journey.
          </p>
        </div>

        {/* Advisor Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 mb-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="education" className="block text-sm font-semibold text-gray-700 mb-2">Education</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                <input
                  id="education"
                  name="education"
                  value={education}
                  onChange={e => setEducation(e.target.value)}
                  placeholder="e.g. B.Tech in Computer Science"
                  className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg bg-gray-50"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
              <div className="relative">
                <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-400" />
                <input
                  id="skills"
                  name="skills"
                  value={skills}
                  onChange={e => setSkills(e.target.value)}
                  placeholder="Comma separated, e.g. Python, Data Analysis"
                  className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-lg bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label htmlFor="interests" className="block text-sm font-semibold text-gray-700 mb-2">Interests</label>
              <div className="relative">
                <Target className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
                <input
                  id="interests"
                  name="interests"
                  value={interests}
                  onChange={e => setInterests(e.target.value)}
                  placeholder="Comma separated, e.g. AI, Finance"
                  className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 text-lg bg-gray-50"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>Ask for Advisor</span>
                </>
              )}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded border border-red-300 text-center">
              {error}
            </div>
          )}
        </div>

        {/* Recommendations */}
        {Array.isArray(recommendations) && recommendations.length > 0 && (
          <>
            <h3 className="mb-6 text-2xl font-semibold text-center text-blue-700">Top Career Recommendations</h3>
            <div className="grid gap-8 sm:grid-cols-2">
              {recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-200 border border-gray-100 p-8 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🎯</span>
                    <span className="font-bold text-lg text-blue-800">{rec.career_title || rec.title || 'No Title'}</span>
                  </div>
                  <div className="text-gray-700 mb-2">{rec.reason || 'No reason provided.'}</div>
                  <div className="flex flex-wrap gap-2 text-xs mb-1 items-center">
                    <span className="flex items-center gap-1"><span className="text-lg">💰</span><b>Salary:</b> <span className="text-green-700">{rec.average_salary || rec.salaryRange || 'N/A'}</span></span>
                    <span className="flex items-center gap-1"><span className="text-lg">📈</span><b>Demand:</b> <span className={
                      (rec.demand_level || rec.demandLevel || '').toLowerCase().includes('high')
                        ? 'text-green-700'
                        : (rec.demand_level || rec.demandLevel || '').toLowerCase().includes('medium')
                          ? 'text-yellow-700'
                          : 'text-red-700'
                    }>{rec.demand_level || rec.demandLevel || 'N/A'}</span></span>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center mb-1">
                    <span className="text-lg">🛠️</span>
                    {(rec.required_skills || rec.skills || []).length > 0 ? (
                      (rec.required_skills || rec.skills).map((skill, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">{skill}</span>
                      ))
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 items-center mb-1">
                    <span className="text-lg">🎓</span>
                    {(rec.learning_resources || rec.learningSuggestions || []).length > 0 ? (
                      (rec.learning_resources || rec.learningSuggestions).map((res, idx) => (
                        <span key={idx} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium break-all">{res}</span>
                      ))
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {!Array.isArray(recommendations) && recommendations && typeof recommendations === 'object' && 'reason' in recommendations && (
          <div className="mt-8 p-4 rounded border bg-gray-50 shadow mb-4 text-center">
            <div className="font-bold text-lg mb-1">AI Output</div>
            <div className="text-sm text-gray-600 mb-2">{recommendations.reason || 'No details available.'}</div>
          </div>
        )}
      </div>
    </div>
  );
} 