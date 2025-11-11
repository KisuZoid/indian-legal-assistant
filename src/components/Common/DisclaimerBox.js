// src/components/Common/DisclaimerBox.js
/**
 * DisclaimerBox - consistent legal disclaimer banner
 * - Used in ChatView, InfoPage, etc.
 * - Clean, readable, and theme-aware
 */

import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function DisclaimerBox({ darkMode }) {
  return (
    <div
      className={`rounded-2xl p-4 border ${
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
        <p
          className={`text-sm ${
            darkMode ? 'text-amber-200' : 'text-amber-900'
          }`}
        >
          <strong>Legal Disclaimer:</strong> This app provides <em>legal
          information</em>, not legal advice. For professional guidance, consult
          a qualified lawyer.
        </p>
      </div>
    </div>
  );
}
