// src/components/Header/Header.js
/**
 * Header (Top Navigation)
 * - Matches App_old.js design
 * - Includes AI badge, dark/light toggle, and help tooltip
 * - Dynamic titles/subtitles based on activeView
 */

import React from 'react';
import { Menu, Sun, Moon, HelpCircle, Sparkles } from 'lucide-react';

export default function Header({
  darkMode,
  setDarkMode,
  onOpenSidebar,
  activeView,
  setActiveView,
  showInfoTooltip,
  setShowInfoTooltip
}) {
  return (
    <header
      className={`border-b px-4 lg:px-8 py-4 ${
        darkMode
          ? 'bg-slate-900 border-slate-800'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left side - title and menu */}
        <div className="flex items-center gap-4">
          {/* Hamburger menu (mobile only) */}
          <button
            onClick={onOpenSidebar}
            className={`lg:hidden p-2 rounded-lg ${
              darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'
            }`}
          >
            <Menu
              className={`h-6 w-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            />
          </button>

          {/* Title + Subtitle */}
          <div>
            <h2
              className={`text-xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {activeView === 'chat' && 'Legal Assistant'}
              {activeView === 'cases' && 'Case Law Search'}
              {activeView === 'document' && 'Document Analysis'}
              {activeView === 'info' && 'Help & Information'}
              {activeView === 'settings' && 'Settings'}
            </h2>
            <p
              className={`text-sm hidden sm:block ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {activeView === 'chat' && 'Ask any legal question'}
              {activeView === 'cases' && 'Search Indian case law database'}
              {activeView === 'document' && 'Analyze legal documents'}
              {activeView === 'info' && 'Get help and information'}
              {activeView === 'settings' && 'Adjust your preferences'}
            </p>
          </div>
        </div>

        {/* Right side - actions */}
        <div className="flex items-center gap-2">
          {/* AI-powered badge */}
          <div
            className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full ${
              darkMode ? 'bg-blue-900/30' : 'bg-green-50'
            }`}
          >
            <Sparkles
              className={`h-4 w-4 ${
                darkMode ? 'text-blue-400' : 'text-green-600'
              } animate-pulse`}
            />
            <span
              className={`text-sm font-medium ${
                darkMode ? 'text-blue-300' : 'text-green-700'
              }`}
            >
              AI-Powered
            </span>
          </div>

          {/* Dark/light mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? 'hover:bg-slate-800 text-yellow-400'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Help tooltip button */}
          <div
            className="relative"
            onMouseEnter={() => setShowInfoTooltip(true)}
            onMouseLeave={() => setShowInfoTooltip(false)}
            onTouchStart={() => setShowInfoTooltip(true)}
            onTouchEnd={() =>
              setTimeout(() => setShowInfoTooltip(false), 1500)
            }
          >
            <button
              onClick={() => setActiveView('info')}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'hover:bg-slate-800 text-gray-400'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <HelpCircle className="h-5 w-5" />
            </button>

            {showInfoTooltip && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800 text-white text-xs px-3 py-1 rounded-lg shadow-lg">
                Help
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
