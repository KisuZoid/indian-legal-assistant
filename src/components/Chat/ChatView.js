// src/components/Chat/ChatView.js
/**
 * ChatView - Main chat interface for user queries
 * - Handles input, message rendering, and loading state
 * - Uses MessageBubble for consistent design
 * - Matches App_old.js style and flow
 */

import React, { useState } from 'react';
import { Search, Send, Loader2, Scale} from 'lucide-react';
import MessageBubble from './MessageBubble';
import PopularTopicCard from '../Common/PopularTopicCard';
import DisclaimerBox from '../Common/DisclaimerBox';
import generateResponse from '../../utils/generateResponse';

export default function ChatView({ darkMode }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = () => {
    if (!query.trim()) return;

    const userMessage = { type: 'user', content: query, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const currentQuery = query;
    setQuery('');

    setTimeout(() => {
      const response = generateResponse(currentQuery);
      const botMessage = { type: 'bot', ...response, timestamp: new Date() };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Empty State */}
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="max-w-4xl w-full text-center">
            <div className={`inline-flex p-4 rounded-3xl mb-6 ${
              darkMode ? 'bg-slate-800' : 'bg-slate-900'
            }`}>
              <Scale className="h-12 w-12 text-white" />
            </div>

            <h1 className={`text-3xl lg:text-4xl font-bold mb-3 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome to Legal Assistant
            </h1>

            <p className={`text-lg max-w-2xl mx-auto ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Get instant answers to your legal questions. Ask about contracts,
              tenant rights, employment law, and more.
            </p>

            {/* Input box in landing view */}
            <div className="mt-8 relative max-w-3xl mx-auto rounded-2xl shadow-2xl">
              <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                <Search
                  className={`h-5 w-5 ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}
                />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about IPC sections, legal rights, case law..."
                className={`w-full pl-14 pr-24 py-5 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? 'bg-slate-800 text-white placeholder-gray-500 border border-slate-700'
                    : 'bg-white text-gray-900 placeholder-gray-400 border border-gray-200'
                }`}
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !query.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Ask</span>
              </button>
            </div>

            {/* Disclaimer & Topics */}
            <div className="mt-8 space-y-8">
              <DisclaimerBox darkMode={darkMode} />
              <div>
                <h2
                  className={`text-sm font-semibold uppercase tracking-wider mb-6 text-center ${
                    darkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}
                >
                  Popular topics to get you started
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <PopularTopicCard
                    icon={Search}
                    title="Contract Review"
                    description="What should I look for when reviewing a contract?"
                    onClick={() =>
                      setQuery('What should I look for when reviewing a contract?')
                    }
                    darkMode={darkMode}
                  />
                  <PopularTopicCard
                    icon={Scale}
                    title="Tenant Rights"
                    description="What are my rights as a tenant in India?"
                    onClick={() => setQuery('What are my rights as a tenant in India?')}
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Chat messages
        <div className="flex-1 p-4 lg:p-8 space-y-6 max-w-4xl mx-auto w-full overflow-y-auto">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} msg={msg} darkMode={darkMode} />
          ))}

          {loading && (
            <div className="flex justify-start">
              <div
                className={`rounded-2xl px-4 py-3 ${
                  darkMode
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}
              >
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer input bar */}
      <div
        className={`border-t p-4 lg:p-6 ${
          darkMode
            ? 'bg-slate-900 border-slate-800'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className="max-w-4xl mx-auto flex gap-2 sm:gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about IPC sections, legal rights, case law..."
            className={`flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
              darkMode
                ? 'bg-slate-800 text-white placeholder-gray-500 border-slate-700'
                : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
            }`}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !query.trim()}
            className="bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
          >
            <Send className="h-5 w-5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
