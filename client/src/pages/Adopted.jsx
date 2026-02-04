import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PetCard from '../components/PetCard';
import { Search, RefreshCcw, LayoutGrid, Heart, Sparkles, XCircle } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

// API Service
const adoptionService = {
  getAdoptions: async () => {
    try {
      const response = await axios.get(`${API_URL}/adoption/all`);
      // Map adoptions to include pet data and user info
      return response.data.map(adoption => ({
        ...adoption.pet,
        petDetails: adoption.pet, // Keep a reference to original pet object
        adoptedBy: adoption.user?.username || 'Someone',
        adopterId: adoption.user?._id || adoption.user?.id
      }));
    } catch (error) {
      console.error('Error fetching adoptions:', error);
      return [];
    }
  }
};

const Adopted = ({ user }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUnadopting, setIsUnadopting] = useState(false);
  const navigate = useNavigate();

  const fetchPets = async () => {
    setLoading(true);
    try {
      const data = await adoptionService.getAdoptions();
      setPets(data);
    } catch (error) {
      console.error('Error fetching adopted pets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleUnadopt = async (pet) => {
    if (!window.confirm(`Are you sure you want to unadopt ${pet.name || 'this pet'}?`)) return;
    
    setIsUnadopting(true);
    const userId = user._id || user.id;
    const petId = pet.petDetails?._id || pet._id;

    console.log('Attempting unadoption:', { userId, petId });

    try {
      await axios.post(`${API_URL}/adoption/unadopt`, {
        userId,
        petId
      });
      alert('Unadoption successful!');
      fetchPets(); // Refresh the list
    } catch (error) {
      console.error('Unadoption error:', error);
      const msg = error.response?.data?.message || 'Failed to unadopt pet';
      alert(msg);
    } finally {
      setIsUnadopting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf2f8] relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full blur-[120px] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-5 bg-white/50 backdrop-blur-xl rounded-[2rem] mb-6 shadow-xl shadow-pink-100 border border-white/50 transform hover:rotate-12 transition-transform cursor-default">
            <Sparkles className="text-pink-600" size={40} fill="currentColor" />
          </div>
          <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            Happy <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">Endings</span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-xl font-medium leading-relaxed">
            These adorable companions have found their forever homes. Join our community to start your own success story.
          </p>
        </div>

        {/* Content Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Success Stories</h2>
            <div className="flex items-center mt-2 space-x-2">
              <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-gray-500 font-medium">{pets.length} companions found their forever families</p>
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
                <div key={pet._id} className="relative group">
                  <PetCard pet={pet} />
                  <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2 z-20">
                    <Heart size={14} fill="currentColor" />
                    <span>Adopted by {pet.adoptedBy}</span>
                  </div>
                  
                  {/* Unadopt Button - only visible to the adopter */}
                  {user && (user._id === pet.adopterId || user.id === pet.adopterId) && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[2.5rem] flex items-center justify-center z-30">
                      <button
                        onClick={() => handleUnadopt(pet)}
                        disabled={isUnadopting}
                        className="bg-white text-red-600 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl transform hover:scale-110 active:scale-95 transition-all flex items-center space-x-3"
                      >
                        <XCircle size={24} />
                        <span>{isUnadopting ? 'Processing...' : 'Unadopt Pet'}</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {pets.length === 0 && (
              <div className="bg-white rounded-[3rem] text-center py-24 shadow-xl border border-gray-50">
                <div className="bg-pink-50 inline-flex p-10 rounded-full mb-8 relative">
                  <Heart size={64} className="text-pink-300" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">No stories yet</h3>
                <p className="text-gray-500 max-w-md mx-auto text-lg leading-relaxed mb-10">
                  Be the first one to adopt and start a new happy ending!
                </p>
                <button 
                  onClick={() => navigate('/')}
                  className="bg-pink-500 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-pink-600 transition-all shadow-xl shadow-pink-100 flex items-center justify-center mx-auto space-x-3"
                >
                  <RefreshCcw size={20} />
                  <span>View Pets for Adoption</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Adopted;
