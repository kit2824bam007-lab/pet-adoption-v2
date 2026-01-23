import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, RefreshCw, Info } from 'lucide-react';
import PetCard from '../components/PetCard';

const PetMatch = ({ user }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating matching algorithm based on user profile
    const fetchMatches = async () => {
      setLoading(true);
      setTimeout(() => {
        setMatches([
          { _id: '1', name: 'Buddy', type: 'Dog', age: 2, location: 'New York', breed: 'Golden Retriever', photo: '' },
          { _id: '4', name: 'Max', type: 'Dog', age: 4, location: 'Bronx', breed: 'German Shepherd', photo: '' },
        ]);
        setLoading(false);
      }, 1500);
    };

    fetchMatches();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#fdf2f8] py-12 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full blur-[120px] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-5 bg-white/50 backdrop-blur-xl rounded-[2rem] mb-6 shadow-xl shadow-pink-100 border border-white/50 transform hover:rotate-12 transition-transform cursor-default">
            <Sparkles className="text-pink-600" size={40} />
          </div>
          <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">Matches</span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-xl font-medium leading-relaxed">
            We've analyzed your lifestyle and preferences to find these adorable companions who would fit perfectly into your home.
          </p>
        </div>

        {/* User Preferences Summary */}
        <div className="bg-white/40 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)] mb-16">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center space-x-3 bg-white/60 px-6 py-3 rounded-2xl shadow-sm border border-white/80">
              <div className="w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.5)]"></div>
              <span className="font-bold text-gray-700">Apartment Friendly</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/60 px-6 py-3 rounded-2xl shadow-sm border border-white/80">
              <div className="w-3 h-3 bg-rose-500 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.5)]"></div>
              <span className="font-bold text-gray-700">Good with Kids</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/60 px-6 py-3 rounded-2xl shadow-sm border border-white/80">
              <div className="w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.5)]"></div>
              <span className="font-bold text-gray-700">Medium Activity</span>
            </div>
            <button className="text-pink-600 font-black hover:text-rose-600 flex items-center space-x-2 transition-colors bg-pink-50/50 px-6 py-3 rounded-2xl border-2 border-pink-100 hover:border-pink-200">
              <RefreshCw size={18} className="animate-spin-slow" />
              <span>Update Preferences</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white/30 backdrop-blur-md rounded-[3rem] border border-white/50">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
              <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-500 animate-pulse" size={24} />
            </div>
            <p className="text-gray-600 font-black text-2xl mt-8 tracking-tight">Finding your new best friend...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {matches.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
              
              {/* Call to action card */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center border-2 border-dashed border-pink-200/60 shadow-xl shadow-pink-100/20 group hover:border-pink-400/50 transition-all transform hover:-translate-y-2">
                <div className="bg-white p-6 rounded-[2rem] shadow-xl mb-8 group-hover:scale-110 transition-transform shadow-pink-100">
                  <Heart className="text-pink-500" size={40} fill="currentColor" />
                </div>
                <h3 className="text-2xl font-black text-gray-800 mb-3 tracking-tight">Want more matches?</h3>
                <p className="text-gray-500 mb-8 font-medium leading-relaxed">
                  Refine your profile details to get even better recommendations tailored for you.
                </p>
                <button className="bg-white text-pink-600 px-8 py-4 rounded-[1.5rem] font-black hover:bg-pink-600 hover:text-white transition-all shadow-xl shadow-pink-200/50 border-2 border-pink-100 hover:border-pink-600">
                  Refine Profile
                </button>
              </div>
            </div>

            <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 shadow-2xl shadow-blue-200/50 border border-white/20">
              <div className="bg-white/20 p-5 rounded-[2rem] backdrop-blur-xl border border-white/30 shadow-xl">
                <Info className="text-white" size={32} />
              </div>
              <div>
                <h4 className="font-black text-white text-2xl mb-3 tracking-tight">How matching works</h4>
                <p className="text-blue-50 text-lg font-medium opacity-90 leading-relaxed">
                  Our algorithm considers your home type, family structure, and available time to match you with pets whose energy levels and needs align with your lifestyle. This ensures a happy environment for both you and your new pet!
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PetMatch;
