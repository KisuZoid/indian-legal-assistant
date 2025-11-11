// src/components/Settings/SettingsPage.js
/**
 * SettingsPage - Handles appearance, data, and user settings
 * - Manages dark mode, font size, animations
 * - Includes ConfirmDialog for reset confirmation
 * - Includes UserPopup for login/signup/logout
 */

import React, { useState, useEffect } from 'react';
import ConfirmDialog from '../Common/ConfirmDialog';
import UserPopup from './UserPopup';
import { ArrowLeft} from 'lucide-react';

export default function SettingsPage({ darkMode, setDarkMode, setActiveView }) {
  const [fontSize, setFontSize] = useState('base');
  const [animations, setAnimations] = useState(true);
  const [openUserPopup, setOpenUserPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Load saved settings
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('app_settings') || '{}');
    if (saved) {
      setFontSize(saved.fontSize || 'base');
      setAnimations(saved.animations ?? true);
      setDarkMode(saved.darkMode ?? false);
    }
    const logged = JSON.parse(localStorage.getItem('demo_logged_in') || 'null');
    setUser(logged);
  }, [setDarkMode]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem(
      'app_settings',
      JSON.stringify({ fontSize, animations, darkMode })
    );
    document.documentElement.style.fontSize =
      fontSize === 'sm' ? '14px' : fontSize === 'lg' ? '18px' : '16px';
  }, [fontSize, animations, darkMode]);

  const handleResetConversations = () => {
    setShowConfirm(true);
  };

  const confirmReset = () => {
    localStorage.removeItem('conversations_demo');
    setShowConfirm(false);
    alert('Conversations reset (demo).');
  };

  const handleLogin = (userObj) => setUser(userObj);
  const handleLogout = () => setUser(null);

  return (
    <div
      className={`p-6 lg:p-12 max-w-3xl mx-auto transition-colors duration-300 ${
        darkMode ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
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
      <h1 className="text-3xl font-bold mb-4">Settings</h1>

      {/* Appearance Settings */}
      <section className="mb-8">
        <h2 className="font-semibold mb-3">Appearance</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-sm">Dark Mode</label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm">Font Size</label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="rounded-xl p-2 border border-gray-400/30"
            >
              <option value="sm">Small</option>
              <option value="base">Base</option>
              <option value="lg">Large</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm">Enable Animations</label>
            <input
              type="checkbox"
              checked={animations}
              onChange={(e) => setAnimations(e.target.checked)}
            />
          </div>
        </div>
      </section>

      {/* Data Controls */}
      <section className="mb-8">
        <h2 className="font-semibold mb-3">Data</h2>
        <div className="space-y-3">
          <button
            onClick={handleResetConversations}
            className="bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded-xl transition-colors"
          >
            Reset Conversations
          </button>
          <p className="text-sm text-gray-500 mt-1">
            Clears local conversation data (demo only).
          </p>
        </div>
      </section>

      {/* User Section */}
      <section>
        <h2 className="font-semibold mb-3">User</h2>
        <div className="space-y-3">
          <button
            onClick={() => setOpenUserPopup(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-colors"
          >
            {user ? 'Profile / Logout' : 'Login / Sign up'}
          </button>
          <p className="text-sm text-gray-500">
            Manage your profile, login, or create an account.
          </p>
        </div>
      </section>

      {/* ConfirmDialog & UserPopup */}
      <ConfirmDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmReset}
        darkMode={darkMode}
        message="Reset all conversations? This cannot be undone."
      />
      <UserPopup
        open={openUserPopup}
        onClose={() => setOpenUserPopup(false)}
        onLogin={handleLogin}
        onLogout={handleLogout}
        user={user}
        darkMode={darkMode}
      />
    </div>
  );
}
