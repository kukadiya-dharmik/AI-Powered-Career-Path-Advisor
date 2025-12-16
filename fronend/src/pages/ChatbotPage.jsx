import React from 'react';
import Chatbot from '../components/Chatbot';

export default function ChatbotPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      <div className="h-full flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">AI Chatbot</h1>
          <Chatbot />
        </div>
      </div>
    </div>
  );
} 