// src/components/Info/InfoPage.js
/**
 * InfoPage - Help & About section for Legal Assistant
 * - Clean, consistent with App_old.js
 * - Adaptive to dark/light mode
 * - Safe back navigation to Chat view
 */

import React from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function InfoPage({ darkMode, setActiveView }) {
  return (
    <div
      className={`p-6 lg:p-12 max-w-3xl mx-auto ${
        darkMode ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Back Button */}
      <button
        onClick={() => setActiveView('chat')}
        className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${
          darkMode
            ? 'bg-slate-800 hover:bg-slate-700'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        <ArrowLeft className="h-5 w-5" />
        Back
      </button>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-4">Help (About Legal Assistant)</h1>
      <p className="mb-4">
        This AI-powered assistant helps users understand Indian legal principles, IPC
        sections, case law, and more. It provides{' '}
        <strong>legal information</strong>, not legal advice.
      </p>

      {/* Features */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Features</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Instant answers to legal queries</li>
        <li>Case law and IPC section lookup</li>
        <li>Smart document analysis</li>
        <li>Dark/light theme support</li>
      </ul>

      {/* Disclaimer */}
      <div
        className={`mt-8 rounded-2xl p-4 border ${
          darkMode
            ? 'bg-amber-900/20 border-amber-800/50'
            : 'bg-amber-50 border-amber-200'
        }`}
      >
        <div className="flex items-start gap-3">
          <AlertCircle
            className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
              darkMode ? 'text-amber-400' : 'text-amber-600'
            }`}
          />
          <div>
            <p
              className={`text-sm ${
                darkMode ? 'text-amber-200' : 'text-amber-900'
              }`}
            >
              <strong>Legal Disclaimer:</strong> This provides legal information, not
              advice. For specific legal advice, consult a qualified lawyer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
