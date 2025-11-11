// src/components/Document/DocumentAnalyzer.js
/**
 * DocumentAnalyzer - Paste and analyze legal documents
 * - Clean and modern UI (matching App_old.js)
 * - Dark/light theme adaptive
 * - Placeholder for AI analysis logic
 */

import React from 'react';
import { Search, CheckCircle } from 'lucide-react';

export default function DocumentAnalyzer({
  documentText,
  setDocumentText,
  analyzeDocument,
  darkMode
}) {
  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto w-full flex flex-col">
      <h1
        className={`text-2xl font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Document Analysis
      </h1>
      <p
        className={`mb-6 text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        Paste a legal document (e.g., contract, agreement, notice) below for instant
        AI-assisted insights and risk detection.
      </p>

      <textarea
        value={documentText}
        onChange={(e) => setDocumentText(e.target.value)}
        placeholder="Paste your contract, agreement, or notice text here..."
        className={`w-full h-64 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mb-4 ${
          darkMode
            ? 'bg-slate-800 text-white placeholder-gray-500 border-slate-700'
            : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
        }`}
      />

      <button
        onClick={analyzeDocument}
        disabled={!documentText.trim()}
        className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium self-start"
      >
        <Search className="h-5 w-5" />
        Analyze Document
      </button>

      {/* Features Section */}
      <div
        className={`mt-8 p-6 rounded-2xl border ${
          darkMode
            ? 'bg-blue-900/20 border-blue-800/50'
            : 'bg-blue-50 border-blue-200'
        }`}
      >
        <h3
          className={`font-semibold mb-3 ${
            darkMode ? 'text-blue-300' : 'text-blue-900'
          }`}
        >
          Analysis Features
        </h3>
        <ul
          className={`text-sm space-y-2 ${
            darkMode ? 'text-blue-200' : 'text-blue-800'
          }`}
        >
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>Document summarization</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>Key clause identification</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>Risk flag detection</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>Legal terminology explanation</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>Relevant case law references</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
