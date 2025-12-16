import React, { useState } from 'react';
import { Plus, Target, BookOpen, Award, Clock, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const RoadmapBuilder = () => {
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [roadmap, setRoadmap] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const streams = [
    { id: 'science', name: 'Science (PCM/PCB)', icon: '🔬' },
    { id: 'commerce', name: 'Commerce', icon: '💼' },
    { id: 'arts', name: 'Arts/Humanities', icon: '🎨' },
    { id: 'vocational', name: 'Vocational/Technical', icon: '⚙️' }
  ];

  const careersByStream = {
    science: [
      'Software Engineer', 'Data Scientist', 'Doctor', 'Engineer', 'Research Scientist',
      'Biotechnologist', 'Pharmacist', 'Architect', 'Pilot', 'Astronomer'
    ],
    commerce: [
      'Chartered Accountant', 'Investment Banker', 'Business Analyst', 'Marketing Manager',
      'Financial Advisor', 'Entrepreneur', 'HR Manager', 'Operations Manager', 'Economist'
    ],
    arts: [
      'Graphic Designer', 'Content Writer', 'Journalist', 'Psychologist', 'Lawyer',
      'Social Worker', 'Teacher', 'Historian', 'Linguist', 'Photographer'
    ],
    vocational: [
      'Web Developer', 'Digital Marketer', 'Chef', 'Fashion Designer', 'Interior Designer',
      'Event Manager', 'Travel Guide', 'Fitness Trainer', 'Makeup Artist', 'Mechanic'
    ]
  };

  const levels = [
    '10th Grade Completed',
    '12th Grade Completed',
    'Undergraduate Student',
    'Graduate',
    'Working Professional'
  ];

  const generateRoadmap = async () => {
    if (!selectedStream || !selectedCareer || !currentLevel) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsGenerating(true);
    const loadingToast = toast.loading('🤖 AI is creating your personalized roadmap...');

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      const mockRoadmap = {
        id: '1',
        title: `Path to ${selectedCareer}`,
        description: `A comprehensive roadmap to become a ${selectedCareer} starting from ${currentLevel}`,
        targetCareer: selectedCareer,
        currentLevel,
        estimatedDuration: '3-5 years',
        steps: [
          {
            id: '1',
            title: 'Foundation Building',
            description: 'Build strong fundamentals in core subjects',
            duration: '6-12 months',
            type: 'education',
            completed: false,
            resources: ['Khan Academy', 'NCERT Books', 'Online Courses']
          },
          {
            id: '2',
            title: 'Skill Development',
            description: 'Develop technical and soft skills relevant to your career',
            duration: '12-18 months',
            type: 'skill',
            completed: false,
            resources: ['Coursera', 'Udemy', 'YouTube Tutorials', 'Practice Projects']
          },
          {
            id: '3',
            title: 'Higher Education',
            description: 'Pursue relevant degree or certification programs',
            duration: '2-4 years',
            type: 'education',
            completed: false,
            resources: ['University Programs', 'Online Degrees', 'Professional Courses']
          },
          {
            id: '4',
            title: 'Practical Experience',
            description: 'Gain hands-on experience through internships or projects',
            duration: '6-12 months',
            type: 'experience',
            completed: false,
            resources: ['Internship Portals', 'Freelance Projects', 'Open Source Contributions']
          },
          {
            id: '5',
            title: 'Professional Certification',
            description: 'Obtain industry-recognized certifications',
            duration: '3-6 months',
            type: 'certification',
            completed: false,
            resources: ['Professional Bodies', 'Industry Certifications', 'Skill Assessments']
          }
        ]
      };

      setRoadmap(mockRoadmap);
      toast.success('🎉 Your personalized roadmap is ready!', { id: loadingToast });
    } catch (error) {
      toast.error('Failed to generate roadmap. Please try again.', { id: loadingToast });
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleStepCompletion = (stepId) => {
    if (!roadmap) return;
    
    setRoadmap({
      ...roadmap,
      steps: roadmap.steps.map(step =>
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    });
    
    toast.success('Progress updated! 🎯');
  };

  const getStepIcon = (type) => {
    switch (type) {
      case 'education': return BookOpen;
      case 'skill': return Target;
      case 'experience': return Award;
      case 'certification': return Award;
      default: return BookOpen;
    }
  };

  const getStepColor = (type) => {
    switch (type) {
      case 'education': return 'from-blue-500 to-cyan-500';
      case 'skill': return 'from-green-500 to-emerald-500';
      case 'experience': return 'from-purple-500 to-pink-500';
      case 'certification': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered Career Planning
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-4">
            Roadmap Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create a personalized step-by-step roadmap to achieve your career goals. 
            Get AI-powered guidance tailored to your current level and target career.
          </p>
        </div>

        {!roadmap ? (
          /* Roadmap Builder Form */
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <div className="space-y-8">
              {/* Stream Selection */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Stream</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {streams.map((stream) => (
                    <button
                      key={stream.id}
                      onClick={() => {
                        setSelectedStream(stream.id);
                        setSelectedCareer('');
                      }}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                        selectedStream === stream.id
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-4xl mb-3">{stream.icon}</div>
                      <h3 className="font-semibold text-gray-900">{stream.name}</h3>
                    </button>
                  ))}
                </div>
              </div>

              {/* Career Selection */}
              {selectedStream && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Target Career</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {careersByStream[selectedStream]?.map((career) => (
                      <button
                        key={career}
                        onClick={() => setSelectedCareer(career)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                          selectedCareer === career
                            ? 'border-green-500 bg-green-50 shadow-lg'
                            : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                        }`}
                      >
                        <h3 className="font-semibold text-gray-900">{career}</h3>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Level Selection */}
              {selectedCareer && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Current Level</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setCurrentLevel(level)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                          currentLevel === level
                            ? 'border-purple-500 bg-purple-50 shadow-lg'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                        }`}
                      >
                        <h3 className="font-semibold text-gray-900">{level}</h3>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Generate Button */}
              {selectedStream && selectedCareer && currentLevel && (
                <div className="text-center pt-8">
                  <button
                    onClick={generateRoadmap}
                    disabled={isGenerating}
                    className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 mx-auto"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Creating Your Roadmap...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                        <span>Generate My Roadmap</span>
                        <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Generated Roadmap */
          <div className="space-y-8">
            {/* Roadmap Header */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{roadmap.title}</h2>
                  <p className="text-gray-600 text-lg">{roadmap.description}</p>
                </div>
                <button
                  onClick={() => setRoadmap(null)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Create New Roadmap
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-1">Target Career</h3>
                  <p className="text-blue-700">{roadmap.targetCareer}</p>
                </div>
                <div className="bg-green-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-green-900 mb-1">Current Level</h3>
                  <p className="text-green-700">{roadmap.currentLevel}</p>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-purple-900 mb-1">Estimated Duration</h3>
                  <p className="text-purple-700">{roadmap.estimatedDuration}</p>
                </div>
              </div>
            </div>

            {/* Roadmap Steps */}
            <div className="space-y-6">
              {roadmap.steps.map((step, index) => {
                const StepIcon = getStepIcon(step.type);
                const isCompleted = step.completed;
                
                return (
                  <div
                    key={step.id}
                    className={`bg-white rounded-3xl shadow-lg p-8 border transition-all duration-300 ${
                      isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-100'
                    }`}
                  >
                    <div className="flex items-start space-x-6">
                      {/* Step Number & Icon */}
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`w-12 h-12 bg-gradient-to-r ${getStepColor(step.type)} rounded-2xl flex items-center justify-center`}>
                          <StepIcon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-bold text-gray-500">Step {index + 1}</span>
                      </div>

                      {/* Step Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                          <button
                            onClick={() => toggleStepCompletion(step.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                              isCompleted
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <CheckCircle className={`h-5 w-5 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`} />
                            <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
                          </button>
                        </div>
                        
                        <p className="text-gray-700 mb-4 leading-relaxed">{step.description}</p>
                        
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{step.duration}</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            step.type === 'education' ? 'bg-blue-100 text-blue-800' :
                            step.type === 'skill' ? 'bg-green-100 text-green-800' :
                            step.type === 'experience' ? 'bg-purple-100 text-purple-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
                          </span>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Recommended Resources:</h4>
                          <div className="flex flex-wrap gap-2">
                            {step.resources.map((resource, resourceIndex) => (
                              <span
                                key={resourceIndex}
                                className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {resource}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RoadmapBuilder; 