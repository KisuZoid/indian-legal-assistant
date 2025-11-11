// src/components/Common/PopularTopicCard.js
/**
 * PopularTopicCard - reusable clickable card for common legal topics
 * - Matches App_old.js UI polish
 * - Adaptive for dark/light mode
 */

import React from 'react';

export default function PopularTopicCard({ icon: Icon, title, description, onClick, darkMode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-4 p-6 rounded-2xl border transition-all text-left w-full group ${
        darkMode
          ? 'bg-slate-800 border-slate-700 hover:border-blue-500 hover:bg-slate-750'
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg'
      }`}
    >
      <div
        className={`p-3 rounded-xl transition-colors ${
          darkMode
            ? 'bg-blue-900/30 group-hover:bg-blue-900/50'
            : 'bg-blue-50 group-hover:bg-blue-100'
        }`}
      >
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <div className="flex-1">
        <h3
          className={`font-semibold mb-1 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {description}
        </p>
      </div>
    </button>
  );
}
