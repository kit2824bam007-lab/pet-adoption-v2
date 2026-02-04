import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PetCard from '../components/PetCard';
import { Search, Filter, RefreshCcw, Dog, Cat, Bird, Heart, LayoutGrid } from 'lucide-react';
import axios from 'axios';

// API Service
const petService = {
  getPets: async (filters = {}) => {
    try {
      const response = await axios.get('http://localhost:5000/api/pets');
      return response.data.pets;
    } catch (error) {
      console.error('Error fetching pets:', error);
      return [];
    }
  }
};

const Home = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const petType = searchParams.get('petType');

  const categories = [
    { name: 'All', icon: <LayoutGrid size={20} />, value: null },
    { name: 'Dogs', icon: <Dog size={20} />, value: 'dog' },
    { name: 'Cats', icon: <Cat size={20} />, value: 'cat' },
    { name: 'Birds', icon: <Bird size={20} />, value: 'bird' },
    { name: 'Rabbits', icon: <Heart size={20} />, value: 'rabbit' },
  ];

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const filters = {};
        if (petType && petType !== 'others' && petType !== 'all') {
          filters.type = petType;
        }
        const data = await petService.getPets(filters);
        
        const filteredData = petType && petType !== 'all'
          ? data.filter(p => p.type.toLowerCase() === petType.toLowerCase())
          : data;
          
        setPets(filteredData);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [petType]);

  return (
    <div className="min-h-screen bg-[#fdf2f8] relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full blur-[120px] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-pink-500 via-pink-600 to-rose-500 rounded-[3.5rem] p-10 md:p-20 mb-16 text-white relative overflow-hidden shadow-[0_32px_64px_-16px_rgba(244,63,94,0.3)] group">
          <div className="relative z-10 max-w-2xl transform transition-transform duration-500 group-hover:scale-[1.01]">
            <span className="inline-block px-5 py-2 bg-white/20 backdrop-blur-xl rounded-full text-sm font-black mb-8 tracking-widest uppercase border border-white/20">
              Adopt, Don't Shop 🐾
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1] tracking-tighter">
              Find your new <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-200">best friend</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-12 leading-relaxed font-medium max-w-xl">
              Thousands of adorable pets are waiting for a loving home. Start your journey today.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-white text-pink-600 px-12 py-5 rounded-3xl font-black text-xl hover:bg-yellow-100 transition-all transform hover:-translate-y-1 shadow-2xl active:scale-95">
                Adopt Now
              </button>
              <button className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-12 py-5 rounded-3xl font-black text-xl hover:bg-white/20 transition-all active:scale-95">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[40rem] h-[40rem] bg-white/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-pink-300/20 rounded-full blur-[80px]"></div>
        </div>

        {/* Categories / Filters Section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center space-x-4 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => navigate(cat.value ? `/?petType=${cat.value}` : '/')}
                  className={`flex items-center space-x-3 px-8 py-4 rounded-[1.5rem] font-black transition-all whitespace-nowrap shadow-lg border-2 ${
                    (petType === cat.value || (!petType && cat.name === 'All'))
                      ? 'bg-pink-500 text-white border-pink-400 shadow-pink-200 scale-105'
                      : 'bg-white/60 backdrop-blur-md text-gray-600 border-white/80 hover:border-pink-300 hover:text-pink-500 hover:bg-white'
                  }`}
                >
                  <span className={`${(petType === cat.value || (!petType && cat.name === 'All')) ? 'text-white' : 'text-pink-500'}`}>
                    {cat.icon}
                  </span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
            
            <button className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-md text-gray-800 font-black px-8 py-4 rounded-[1.5rem] border-2 border-white/80 hover:border-pink-300 hover:text-pink-600 transition-all shadow-lg group">
              <Filter size={20} className="group-hover:rotate-12 transition-transform" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Content Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
              {petType 
                ? `${petType.charAt(0).toUpperCase() + petType.slice(1)}${petType.toLowerCase() === 'others' ? '' : 's'}` 
                : 'Featured Pets'}
            </h2>
            <div className="flex items-center mt-2 space-x-2">
              <div className="h-1.5 w-1.5 bg-pink-500 rounded-full animate-pulse"></div>
              <p className="text-gray-500 font-medium">Showing {pets.length} adorable companions ready for home</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-50 h-[28rem] flex flex-col">
                <div className="bg-gray-100 animate-pulse rounded-2xl h-56 mb-6"></div>
                <div className="space-y-4 px-2">
                  <div className="h-8 bg-gray-100 animate-pulse rounded-xl w-3/4"></div>
                  <div className="h-5 bg-gray-100 animate-pulse rounded-xl w-1/2"></div>
                  <div className="h-5 bg-gray-100 animate-pulse rounded-xl w-2/3"></div>
                  <div className="pt-4 mt-auto">
                    <div className="h-12 bg-gray-100 animate-pulse rounded-xl w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Pets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {pets.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </div>

            {pets.length === 0 && (
              <div className="bg-white rounded-[3rem] text-center py-24 shadow-xl border border-gray-50">
                <div className="bg-pink-50 inline-flex p-10 rounded-full mb-8 relative">
                  <Search size={64} className="text-pink-300" />
                  <div className="absolute -top-2 -right-2 bg-white p-3 rounded-full shadow-lg">
                    <LayoutGrid size={24} className="text-pink-500" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">No companions found</h3>
                <p className="text-gray-500 max-w-md mx-auto text-lg leading-relaxed mb-10">
                  We couldn't find any {petType} matching your search. Try adjusting your filters or check back soon!
                </p>
                <button 
                  onClick={() => navigate('/')}
                  className="bg-pink-500 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-pink-600 transition-all shadow-xl shadow-pink-100 flex items-center justify-center mx-auto space-x-3"
                >
                  <RefreshCcw size={20} />
                  <span>View All Pets</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
