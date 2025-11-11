// src/components/Cases/CasesView.js
/**
 * CasesView - Search and browse Indian landmark cases
 * - Matches your App_old.js design
 * - Supports dark/light mode
 * - Ready for API expansion
 */

import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function CasesView({ darkMode, legalDatabase }) {
  const [caseSearch, setCaseSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleCaseSearch = () => {
    if (!caseSearch.trim()) return;
    const results = legalDatabase.cases.filter(
      (c) =>
        c.title.toLowerCase().includes(caseSearch.toLowerCase()) ||
        c.principle.toLowerCase().includes(caseSearch.toLowerCase()) ||
        c.category.toLowerCase().includes(caseSearch.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto w-full">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={caseSearch}
            onChange={(e) => setCaseSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCaseSearch()}
            placeholder="Search by case name, legal principle, or topic..."
            className={`flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              darkMode
                ? 'bg-slate-800 text-white placeholder-gray-500 border-slate-700'
                : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
            }`}
          />
          <button
            onClick={handleCaseSearch}
            className="bg-blue-600 text-white px-4 sm:px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
          >
            <Search className="h-5 w-5" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h3
          className={`font-semibold text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {searchResults.length > 0 ? 'Search Results' : 'Landmark Cases Database'}
        </h3>

        {(searchResults.length > 0
          ? searchResults
          : legalDatabase.cases
        ).map((caseItem) => (
          <div
            key={caseItem.id}
            className={`border rounded-2xl p-6 hover:shadow-lg transition-shadow ${
              darkMode
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {caseItem.title}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {caseItem.citation}
                </p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium w-fit">
                {caseItem.category}
              </span>
            </div>
            <p
              className={`mb-3 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              <strong>Legal Principle:</strong> {caseItem.principle}
            </p>
            <div
              className={`flex items-center gap-4 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <span>📅 {caseItem.year}</span>
              <span>⚖️ {caseItem.court}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
