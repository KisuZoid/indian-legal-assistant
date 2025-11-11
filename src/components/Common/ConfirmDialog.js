// src/components/Common/ConfirmDialog.js
/**
 * ConfirmDialog - Modern reusable confirmation modal
 * - Replaces window.confirm()
 * - Smooth fade-in animation
 * - Fully dark/light adaptive
 */

import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({ open, onClose, onConfirm, darkMode, message }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`p-6 rounded-2xl shadow-xl w-full max-w-sm ${
          darkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle
            className={`h-6 w-6 ${
              darkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`}
          />
          <h2 className="text-lg font-semibold">Confirm Action</h2>
        </div>
        <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {message}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg transition ${
              darkMode
                ? 'bg-slate-700 hover:bg-slate-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
