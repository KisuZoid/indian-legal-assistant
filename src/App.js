// src/App.js
/**
 * Main App controller
 * - Mirrors the polished App_old.js behaviour and visuals
 * - Uses modular components (Header, Sidebar, ChatView, CasesView, DocumentAnalyzer, InfoPage, SettingsPage)
 * - Sidebar remains always dark (styling enforced in Sidebar component)
 *
 * Notes:
 * - Replace generateResponse & legalDatabase contents in /utils and /data to connect to real backend
 * - Conversations persistence uses localStorage (demo)
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ChatView from './components/Chat/ChatView';
import CasesView from './components/Cases/CasesView';
import DocumentAnalyzer from './components/Document/DocumentAnalyzer';
import InfoPage from './components/Info/InfoPage';
import SettingsPage from './components/Settings/SettingsPage';
import legalDatabase from './data/legalDatabase';
import generateResponse from './utils/generateResponse';

export default function App() {
  // --- Layout / UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('chat'); // 'chat' | 'cases' | 'document' | 'info' | 'settings'
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);

  // --- Chat state
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]); // array of { type: 'user'|'bot', content, ... }
  const [loading, setLoading] = useState(false);

  // --- Other module state
  const [documentText, setDocumentText] = useState('');
  const [caseSearch, setCaseSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // --- Preferences
  const [darkMode, setDarkMode] = useState(true);

  // --- Demo conversation list
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Contract Review Question', time: '2 hours ago' },
    { id: 2, title: 'Employment Law Inquiry', time: 'Yesterday' },
    { id: 3, title: 'Tenant Rights Question', time: '2 days ago' }
  ]);

  // Load persisted app settings (if any)
  useEffect(() => {
    try {
      const settings = JSON.parse(localStorage.getItem('app_settings') || '{}');
      if (settings.darkMode !== undefined) setDarkMode(settings.darkMode);
      // font-size handled in SettingsPage (applies document.documentElement.style)
    } catch (e) {
      // ignore
    }
  }, []);

  // Persist preference changes (only darkMode here)
  useEffect(() => {
    try {
      const prev = JSON.parse(localStorage.getItem('app_settings') || '{}');
      localStorage.setItem('app_settings', JSON.stringify({ ...prev, darkMode }));
    } catch (e) {
      // ignore
    }
  }, [darkMode]);

  // --- Message send / response logic (keeps the old behavior)
  const handleSendMessage = () => {
    if (!query.trim()) return;

    const userMessage = { type: 'user', content: query, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    const currentQuery = query;
    setQuery('');

    // simulate response time (old app used a short timeout)
    setTimeout(() => {
      const response = generateResponse(currentQuery);
      const botMessage = { type: 'bot', ...response, timestamp: new Date() };

      setMessages(prev => [...prev, botMessage]);
      setLoading(false);

      // Save to demo conversations in localStorage (append)
      try {
        const demo = JSON.parse(localStorage.getItem('conversations_demo') || '[]');
        demo.push({ id: Date.now(), messages: [...messages, userMessage, botMessage] });
        localStorage.setItem('conversations_demo', JSON.stringify(demo));
      } catch (e) {
        // ignore
      }
    }, 700);
  };

  // --- Case search (simple local filter)
  const handleCaseSearch = () => {
    if (!caseSearch.trim()) return;
    const results = legalDatabase.cases.filter(c =>
      c.title.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.principle.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.category.toLowerCase().includes(caseSearch.toLowerCase())
    );
        setSearchResults(results);
  };

  // --- Document analysis stub (old app used alert)
  const analyzeDocument = () => {
    if (!documentText.trim()) return;
    alert(
      'Document Analysis (demo):\n\n' +
      'Summary: This document appears to be a legal agreement containing standard clauses.\n\n' +
      'For production integrate with a document-analysis backend / LLM.'
    );
  };

  // --- Utilities
  const onNewConversation = () => {
    setMessages([]);
    // Optionally you can push a new conversation meta object to conversations state here
  };

  const setQueryFromTopic = (topicText) => setQuery(topicText);

  // --- Render
  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Sidebar (always dark) */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        darkMode={darkMode} // passed for internal icon styling if needed (but sidebar bg is locked dark)
        conversations={conversations}
        onNewConversation={onNewConversation}
        setActiveView={(v) => { setActiveView(v); setSidebarOpen(false); }}
        setMessages={setMessages}
      />

      {/* Overlay for mobile when sidebar open */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" />
      )}

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenSidebar={() => setSidebarOpen(true)}
          activeView={activeView}
          setActiveView={setActiveView}
          showInfoTooltip={showInfoTooltip}
          setShowInfoTooltip={setShowInfoTooltip}
        />

        {/* Top nav bar (only on main views) */}
        {activeView !== 'settings' && activeView !== 'info' && (
          <div id="navbar" className={`border-b px-4 lg:px-8 overflow-x-auto ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
            <div className="flex gap-1 min-w-max">
              <button
                onClick={() => setActiveView('chat')}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-all whitespace-nowrap ${
                  activeView === 'chat'
                    ? (darkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600')
                    : (darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600')
                }`}
              >
                <span className="hidden sm:inline">Legal Query</span>
                <span className="sm:hidden">Chat</span>
              </button>

              <button
                onClick={() => setActiveView('cases')}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-all whitespace-nowrap ${
                  activeView === 'cases'
                    ? (darkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600')
                    : (darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600')
                }`}
              >
                <span className="hidden sm:inline">Case Law</span>
                <span className="sm:hidden">Cases</span>
              </button>

              <button
                onClick={() => setActiveView('document')}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-all whitespace-nowrap ${
                  activeView === 'document'
                    ? (darkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600')
                    : (darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600')
                }`}
              >
                <span className="hidden sm:inline">Documents</span>
                <span className="sm:hidden">Docs</span>
              </button>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          {activeView === 'chat' && (
            <ChatView
              query={query}
              setQuery={setQuery}
              handleSendMessage={handleSendMessage}
              messages={messages}
              loading={loading}
              darkMode={darkMode}
              setQueryFromTopic={setQueryFromTopic}
            />
          )}

          {activeView === 'cases' && (
            <CasesView
              caseSearch={caseSearch}
              setCaseSearch={setCaseSearch}
              handleCaseSearch={handleCaseSearch}
              searchResults={searchResults}
              legalDatabase={legalDatabase}
              darkMode={darkMode}
            />
          )}

          {activeView === 'document' && (
            <DocumentAnalyzer
              documentText={documentText}
              setDocumentText={setDocumentText}
              analyzeDocument={analyzeDocument}
              darkMode={darkMode}
            />
          )}

          {activeView === 'info' && (
            <InfoPage setActiveView={setActiveView} darkMode={darkMode} />
          )}

          {activeView === 'settings' && (
            <SettingsPage darkMode={darkMode} setDarkMode={setDarkMode} setActiveView={setActiveView} />
          )}
        </div>
      </main>
    </div>
  );
}
