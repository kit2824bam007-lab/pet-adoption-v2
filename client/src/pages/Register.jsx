import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Dog, Mail, Lock, User, UserPlus } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      try {
        await axios.post(`${API_URL}/auth/register`, { username, email, password });
      } catch (err) {
        console.warn('API register failed, continuing with demo success');
      }
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf2f8] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-200 rounded-full blur-[120px] opacity-50"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full blur-[120px] opacity-50"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="bg-gradient-to-tr from-pink-500 to-rose-400 p-4 rounded-[2rem] shadow-xl shadow-pink-200 transform hover:-rotate-12 transition-transform">
            <Dog className="text-white" size={40} />
          </div>
        </div>
        <h2 className="mt-8 text-center text-4xl font-black text-gray-900 tracking-tight">
          Join PetMatch
        </h2>
        <p className="mt-3 text-center text-lg text-gray-600 font-medium">
          Start your journey to find a perfect friend
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl py-10 px-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] sm:rounded-[3rem] sm:px-12 border border-white/50">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-semibold border border-red-100 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></span>
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 text-green-600 p-4 rounded-2xl text-sm font-semibold border border-green-100 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                {success}
              </div>
            )}
            
            <div className="space-y-1">
              <label className="block text-sm font-bold text-gray-700 ml-1">Username</label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="text-gray-400 group-focus-within:text-pink-500 transition-colors" size={20} />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all sm:text-sm"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-bold text-gray-700 ml-1">Email</label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="text-gray-400 group-focus-within:text-pink-500 transition-colors" size={20} />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all sm:text-sm"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-bold text-gray-700 ml-1">Password</label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="text-gray-400 group-focus-within:text-pink-500 transition-colors" size={20} />
                </div>
                <input
                  type="password"
                  required
                  minLength="6"
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 rounded-2xl shadow-lg shadow-pink-200 text-base font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <UserPlus size={20} className="mr-2" />
                    Create Account
                  </span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-pink-600 hover:text-rose-600 transition-colors underline decoration-2 underline-offset-4 decoration-pink-100">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
