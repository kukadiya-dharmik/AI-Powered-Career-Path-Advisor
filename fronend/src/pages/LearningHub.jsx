
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BookOpen } from 'lucide-react';

// Backend API URL
const API_URL = window.REACT_APP_API_URL || 'http://localhost:5000';
// const API_URL = window.REACT_APP_API_URL || 'http://localhost:5000';

export default function LearningHub() {
  const [topic, setTopic] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCourses([]);
    setError('');
    setLoading(true);
    const notify = toast.loading('Getting course recommendations...');
    try {
      const res = await fetch(`${API_URL}/learninghub/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: topic }),
      });

      // Check if response is JSON
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        throw new Error('Server did not return JSON. Response: ' + text.slice(0, 100));
      }

      const data = await res.json();
      if (!res.ok) {
        const detailedError = data.error
          ? (typeof data.error === 'object' ? JSON.stringify(data.error) : `${data.message}: ${data.error}`)
          : (data.message || 'Error');
        throw new Error(detailedError);
      }
      setCourses(data.courses || []);
      toast.success('Course recommendations received!', { id: notify });
    } catch (err) {
      setError(err.message || 'Failed to get recommendations');
      toast.error(err.message || 'Failed to get recommendations', { id: notify });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh] ">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-4">
            <BookOpen className="h-4 w-4 mr-2" />
            Gemini Course Search
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-4">
            Learning Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the best online courses for your interests. Get personalized AI-powered course recommendations!
          </p>
        </div>

        {/* Course Search Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 mb-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-2">Course Topic</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                <input
                  id="topic"
                  name="topic"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="e.g. React, Data Science, UI/UX"
                  className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg bg-gray-50"
                  required
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
                <span>Get Course Recommendations</span>
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
        {Array.isArray(courses) && courses.length > 0 && (
          <>
            <h3 className="mb-6 text-2xl font-semibold text-center text-blue-700">Top Course Recommendations</h3>
            <div className="grid gap-8 sm:grid-cols-2">
              {courses.map((course, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-200 border border-gray-100 p-8 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📚</span>
                    <span className="font-bold text-lg text-blue-800">{course.title || course.name || 'No Title'}</span>
                  </div>
                  {course.instructor && <div className="text-blue-700 text-sm mb-1">By {course.instructor}</div>}
                  {course.description && <div className="text-gray-700 text-sm mb-2 line-clamp-3">{course.description}</div>}
                  {course.link && <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs underline break-all">{course.link}</a>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 