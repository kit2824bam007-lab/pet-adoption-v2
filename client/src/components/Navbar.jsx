import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Dog, Search, User, PlusCircle, Sparkles, LogOut, Menu, X, Heart, MessageSquare } from 'lucide-react';

const Navbar = ({ user, handleLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navLinks = [
    { name: 'Pet Match', path: '/pet-match', icon: <Sparkles size={20} /> },
    { name: 'Messages', path: '/messages', icon: <MessageSquare size={20} /> },
    { name: 'Success Stories', path: '/adopted', icon: <Heart size={20} /> },
    { name: 'Add Pet', path: '/add-pet', icon: <PlusCircle size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="bg-pink-500 p-2 rounded-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-pink-200">
              <Dog className="text-white" size={28} />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight hidden sm:block">
              PetMatch
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Find your perfect companion..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-pink-500 transition-colors" size={20} />
            </form>
          </div>

          {/* Right Side Menu Items (Desktop) */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl font-bold transition-all ${
                  isActive(link.path)
                    ? 'bg-pink-50 text-pink-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-pink-500'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            
            <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>
            
            <button
              onClick={() => {
                handleLogout();
                navigate('/login');
              }}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all font-bold"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button className="text-gray-600 p-2 rounded-xl hover:bg-gray-50">
              <Search size={24} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-50 text-gray-600 p-2 rounded-xl hover:bg-pink-50 hover:text-pink-500 transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="p-4 space-y-3">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search pets..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-2xl border-transparent focus:bg-white focus:ring-2 focus:ring-pink-500 transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
            </div>

            <div className="grid grid-cols-1 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-4 p-4 rounded-2xl font-bold transition-all ${
                    isActive(link.path)
                      ? 'bg-pink-50 text-pink-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={`${isActive(link.path) ? 'text-pink-500' : 'text-gray-400'}`}>
                    {link.icon}
                  </div>
                  <span>{link.name}</span>
                </Link>
              ))}
              <button
                onClick={() => {
                  handleLogout();
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center space-x-4 p-4 rounded-2xl text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all font-bold"
              >
                <div className="text-gray-400 group-hover:text-red-500">
                  <LogOut size={20} />
                </div>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
