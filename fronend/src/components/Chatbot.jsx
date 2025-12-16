import React, { useState, useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

// Backend API URL
const API_URL = window.REACT_APP_API_URL || 'http://localhost:5000';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am your AI Chatbot. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const chatEndRef = useRef(null);
  const cancelStreamRef = useRef(false); // <-- Add this line
  const currentStreamedTextRef = useRef(''); // <-- Add this line

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, streaming]);

  // Helper to stream text one character at a time
  const streamBotReply = (fullText) => {
    setStreaming(true);
    cancelStreamRef.current = false; // Reset cancel flag
    currentStreamedTextRef.current = '';
    let i = 0;
    const stream = () => {
      if (cancelStreamRef.current) {
        // If cancelled, finish streaming with current streamed text
        setMessages((msgs) => {
          const last = msgs.length > 0 ? msgs[msgs.length - 1] : null;
          if (last && last.sender === 'bot' && last.streaming) {
            return [
              ...msgs.slice(0, -1),
              { sender: 'bot', text: currentStreamedTextRef.current }
            ];
          }
          return msgs;
        });
        setStreaming(false);
        return;
      }
      setMessages((msgs) => {
        const last = msgs.length > 0 ? msgs[msgs.length - 1] : null;
        if (last && last.sender === 'bot' && last.streaming) {
          currentStreamedTextRef.current = fullText.slice(0, i); // Track streamed text
          return [
            ...msgs.slice(0, -1),
            { sender: 'bot', text: currentStreamedTextRef.current, streaming: true }
          ];
        } else {
          currentStreamedTextRef.current = '';
          return [
            ...msgs,
            { sender: 'bot', text: '', streaming: true }
          ];
        }
      });
      i++;
      if (i <= fullText.length) {
        setTimeout(stream, 15); // speed of streaming
      } else {
        // Mark streaming as done
        setMessages((msgs) => {
          const last = msgs.length > 0 ? msgs[msgs.length - 1] : null;
          if (last && last.sender === 'bot' && last.streaming) {
            return [
              ...msgs.slice(0, -1),
              { sender: 'bot', text: fullText }
            ];
          }
          return msgs;
        });
        setStreaming(false);
      }
    };
    stream();
  };

  const stopThinking = () => {
    cancelStreamRef.current = true;
    setLoading(false);
    setStreaming(false);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput('');
    setLoading(true);
    cancelStreamRef.current = false; // Reset cancel flag on new message
    try {
      const res = await fetch(`${API_URL}/chatbot/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      // Start streaming the bot's reply
      streamBotReply(data.reply || 'No response.');
    } catch (err) {
      setMessages((msgs) => [...msgs, { sender: 'bot', text: 'Sorry, there was an error.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-0 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-2 px-8 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-3xl">
        <Sparkles className="h-6 w-6 text-blue-500" />
        <h2 className="text-xl font-bold text-blue-800">AI Chatbot</h2>
      </div>
      {/* Chat Area */}
      <div className="flex-1 min-h-0 max-h-[50vh] overflow-y-auto px-8 py-4 space-y-2 bg-white">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2 rounded-2xl max-w-xs break-words ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}>{msg.text}</div>
          </div>
        ))}
        {(loading || streaming) && (
          <div className="flex justify-start items-center gap-2">
            <div className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-900 flex items-center gap-2 animate-pulse">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-400 animate-bounce mr-1"></span>
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      {/* Input Area */}
      <form onSubmit={sendMessage} className="flex gap-2 px-8 py-4 border-t border-gray-100 bg-white rounded-b-3xl">
        <input
          type="text"
          className="flex-1 border-2 border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-lg bg-gray-50"
          placeholder="Type your question for Gemini..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading || streaming}
          autoFocus
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          disabled={loading || streaming || !input.trim()}
        >
          {(loading || streaming) ? (
            <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-blue-400 rounded-full"></span>
          ) : 'Send'}
        </button>
        {(loading || streaming) && (
          <button
            type="button"
            className="ml-2 px-3 py-3 rounded-2xl bg-red-500 text-white font-bold text-lg hover:bg-red-600 transition-all duration-200"
            onClick={stopThinking}
          >
            Stop Thinking
          </button>
        )}
      </form>
    </div>
  );
} 