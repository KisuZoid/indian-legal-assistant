/**
 * UserPopup - Polished Login / Signup / Profile modal
 * - Inspired by FlorinPop17 aesthetic
 * - Dark/light adaptive, polished design
 */

import React, { useState } from 'react';
import { X, User } from 'lucide-react';

export default function UserPopup({
  open,
  onClose,
  onLogin,
  onLogout,
  user,
  darkMode,
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      name: isSignUp ? formData.name : formData.email.split('@')[0],
      email: formData.email,
    };
    onLogin(userObj);
    localStorage.setItem('demo_logged_in', JSON.stringify(userObj));
    setFormData({ name: '', email: '', password: '' });
    onClose();
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('demo_logged_in');
    onLogout();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden ${
          darkMode ? 'bg-slate-800' : 'bg-white'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none"></div>

        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          >
            <X className="h-5 w-5" />
          </button>

          {!user ? (
            <>
              <div className="text-center mb-6">
                <div
                  className={`inline-flex p-3 rounded-2xl mb-4 ${
                    darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                  }`}
                >
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <h2
                  className={`text-2xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p
                  className={`text-sm mt-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {isSignUp
                    ? 'Sign up to save your conversations'
                    : 'Sign in to continue'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        darkMode
                          ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>
                )}

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                      darkMode
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                      darkMode
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p
                  className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {isSignUp
                    ? 'Already have an account?'
                    : "Don't have an account?"}{' '}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-blue-500 hover:text-blue-600 font-medium transition"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div
                className={`inline-flex p-4 rounded-2xl ${
                  darkMode ? 'bg-green-900/30' : 'bg-green-100'
                }`}
              >
                <User className="h-12 w-12 text-green-600" />
              </div>
              <div>
                <h2
                  className={`text-2xl font-bold mb-1 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {user.name}
                </h2>
                <p
                  className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {user.email}
                </p>
              </div>
              <button
                onClick={handleLogoutClick}
                className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
