// src/components/Settings/UserPopup.js
/**
 * UserPopup - Login / Signup / Profile modal
 * - Inspired by CodePen: FlorinPop17
 * - Dark/light adaptive
 */

import React, { useState } from 'react';

export default function UserPopup({ open, onClose, onLogin, onLogout, user, darkMode }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userObj = { name: formData.email.split('@')[0], email: formData.email };
    onLogin(userObj);
    localStorage.setItem('demo_logged_in', JSON.stringify(userObj));
    onClose();
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('demo_logged_in');
    onLogout();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div
        className={`rounded-2xl shadow-2xl w-full max-w-sm p-8 relative ${
          darkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {!user ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {isLogin ? 'Login' : 'Sign Up'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? 'bg-slate-700 border-slate-600 placeholder-gray-400 text-white'
                    : 'bg-gray-50 border-gray-300 placeholder-gray-500 text-gray-900'
                }`}
              />
              <input
                type="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? 'bg-slate-700 border-slate-600 placeholder-gray-400 text-white'
                    : 'bg-gray-50 border-gray-300 placeholder-gray-500 text-gray-900'
                }`}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              >
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              {isLogin ? (
                <>
                  Don’t have an account?{' '}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-blue-500 hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-blue-500 hover:underline"
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold mb-2">Welcome, {user.name}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
            <button
              onClick={handleLogoutClick}
              className="bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded-lg w-full transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
