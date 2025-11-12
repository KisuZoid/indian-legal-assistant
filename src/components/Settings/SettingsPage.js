/**
 * SettingsPage - Modernized version with polished UI
 * - Keeps original logic and structure
 * - Visual style inspired by the refined first version
 */

import React, { useState, useEffect } from 'react';
import ConfirmDialog from '../Common/ConfirmDialog';
import UserPopup from './UserPopup';
import {
  ArrowLeft,
  Palette,
  Type,
  Zap,
  User,
  Trash2,
  AlertCircle,
  Moon,
  Sun,
} from 'lucide-react';

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

  const handleResetConversations = () => setShowConfirm(true);
  const confirmReset = () => {
    localStorage.removeItem('conversations_demo');
    setShowConfirm(false);
    alert('Conversations reset (demo).');
  };

  const handleLogin = (userObj) => setUser(userObj);
  const handleLogout = () => setUser(null);

  const SettingCard = ({ icon: Icon, title, description, children }) => (
    <div
      className={`rounded-2xl p-6 border transition-all ${
        darkMode
          ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
          : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`p-3 rounded-xl ${
            darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
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
            className={`text-sm mb-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {description}
          </p>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-slate-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-4xl mx-auto p-6 lg:p-12">
        <button
          onClick={() => setActiveView('chat')}
          className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-xl transition-colors ${
            darkMode
              ? 'bg-slate-800 hover:bg-slate-700 text-white'
              : 'bg-white hover:bg-gray-50 text-gray-900 shadow-sm'
          }`}
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        <div className="mb-8">
          <h1
            className={`text-3xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Settings
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Customize your Legal Assistant experience
          </p>
        </div>

        <div className="space-y-6">
          <SettingCard
            icon={Palette}
            title="Appearance"
            description="Customize the look and feel of your interface"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="h-5 w-5 text-blue-400" />
                ) : (
                  <Sun className="h-5 w-5 text-yellow-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Dark Mode
                </span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  darkMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    darkMode ? 'translate-x-7' : ''
                  }`}
                />
              </button>
            </div>
          </SettingCard>

          <SettingCard
            icon={Type}
            title="Typography"
            description="Adjust text size for better readability"
          >
            <div className="flex gap-2">
              {['sm', 'base', 'lg'].map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all ${
                    fontSize === size
                      ? 'bg-blue-600 text-white'
                      : darkMode
                      ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {size === 'sm'
                    ? 'Small'
                    : size === 'base'
                    ? 'Medium'
                    : 'Large'}
                </button>
              ))}
            </div>
          </SettingCard>

          <SettingCard
            icon={Zap}
            title="Performance"
            description="Toggle animations for better performance"
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Enable Animations
              </span>
              <button
                onClick={() => setAnimations(!animations)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  animations ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    animations ? 'translate-x-7' : ''
                  }`}
                />
              </button>
            </div>
          </SettingCard>

          <SettingCard
            icon={User}
            title="Account"
            description="Manage your profile and authentication"
          >
            <button
              onClick={() => setOpenUserPopup(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {user ? 'Manage Profile' : 'Sign In / Sign Up'}
            </button>
          </SettingCard>

          <SettingCard
            icon={Trash2}
            title="Data Management"
            description="Clear your conversation history"
          >
            <button
              onClick={handleResetConversations}
              className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Reset All Conversations
            </button>
          </SettingCard>
        </div>

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
            <p
              className={`text-sm ${
                darkMode ? 'text-amber-200' : 'text-amber-900'
              }`}
            >
              <strong>Privacy Note:</strong> All settings are stored locally on
              your device. We do not collect or transmit your personal data.
            </p>
          </div>
        </div>
      </div>

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
