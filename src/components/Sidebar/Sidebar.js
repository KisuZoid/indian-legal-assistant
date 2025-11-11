// src/components/Sidebar/Sidebar.js
/**
 * Sidebar (Always Dark)
 * - Mirrors the appearance and functionality of your old App_old.js sidebar
 * - Responsive (slide-in on mobile, fixed on desktop)
 * - Displays conversation list, and navigation buttons for main views
 */

import React from 'react';
import {
  Scale,
  Plus,
  MessageSquare,
  FileText,
  Book,
  Settings,
  X
} from 'lucide-react';

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  conversations,
  onNewConversation,
  setActiveView,
  setMessages
}) {
  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 flex flex-col
        transform transition-transform duration-300 ease-in-out
        bg-slate-950 text-white
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl">
            <Scale className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Legal Assistant</h1>
            <p className="text-xs text-slate-400">AI-Powered Legal Help</p>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 hover:bg-slate-800 rounded-lg"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* New Conversation */}
      <div className="p-4">
        <button
          onClick={() => {
            setMessages([]);
            onNewConversation();
            setActiveView('chat');
            setSidebarOpen(false);
          }}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
        >
          <Plus className="h-5 w-5" />
          New Conversation
        </button>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-4">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Recent Conversations
        </h2>
        <div className="space-y-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSidebarOpen(false)}
              className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-left group"
            >
              <MessageSquare className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate group-hover:text-blue-300">
                  {conv.title}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{conv.time}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer nav */}
      <div className="border-t border-slate-800 p-4 space-y-1">
        <button
          onClick={() => {
            setActiveView('document');
            setSidebarOpen(false);
          }}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
        >
          <FileText className="h-5 w-5" />
          <span className="text-sm font-medium">Documents</span>
        </button>

        <button
          onClick={() => {
            setActiveView('cases');
            setSidebarOpen(false);
          }}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
        >
          <Book className="h-5 w-5" />
          <span className="text-sm font-medium">Resources</span>
        </button>

        <button
          onClick={() => {
            setActiveView('settings');
            setSidebarOpen(false);
          }}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
        >
          <Settings className="h-5 w-5" />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>
    </aside>
  );
}
