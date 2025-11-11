// src/components/Chat/MessageBubble.js
/**
 * MessageBubble - Handles rendering of chat messages
 * - Supports user/bot messages
 * - Styled for dark/light mode
 * - Includes section headings & bullet formatting
 */

import React from 'react';
import { Scale, CheckCircle } from 'lucide-react';

export default function MessageBubble({ msg, darkMode }) {
  const isUser = msg.type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] sm:max-w-2xl rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-blue-600 text-white'
            : darkMode
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white border border-gray-200 shadow-sm'
        }`}
      >
        {/* Bot message header */}
        {!isUser && (
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-600 uppercase">
              Legal Assistant
            </span>
            {msg.confidence === 'high' && (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
          </div>
        )}

        {/* Message content */}
        <div
          className={`text-sm leading-relaxed whitespace-pre-wrap ${
            !isUser && darkMode ? 'text-gray-200' : ''
          }`}
        >
          {msg.content.split('\n').map((line, i) => {
            if (line.startsWith('**') && line.endsWith('**')) {
              return (
                <div key={i} className="font-bold mt-2 mb-1">
                  {line.replace(/\*\*/g, '')}
                </div>
              );
            }
            if (line.startsWith('• ')) {
              return <div key={i} className="ml-4">{line}</div>;
            }
            return <div key={i}>{line}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
