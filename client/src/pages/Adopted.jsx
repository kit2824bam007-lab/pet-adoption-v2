import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PetCard from '../components/PetCard';
import { Search, RefreshCcw, LayoutGrid, Heart } from 'lucide-react';

// Placeholder API Service
const petService = {
  getPets: async () => {
    // Simulating API call for adoptable pets
    return [
      { _id: '1', name: 'Buddy', type: 'Dog', age: 2, location: 'New York', breed: 'Golden Retriever', photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=612' },
      { _id: '2', name: 'Luna', type: 'Cat', age: 1, location: 'Brooklyn', breed: 'Siamese', photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1043' },
      { _id: '3', name: 'Charlie', type: 'Bird', age: 3, location: 'Queens', breed: 'Parrot', photo: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&q=80&w=687' },
      { _id: '4', name: 'Max', type: 'Dog', age: 4, location: 'Bronx', breed: 'German Shepherd', photo: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=746' },
      { _id: '5', name: 'Bella', type: 'Rabbit', age: 1, location: 'Staten Island', breed: 'Lop', photo: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=687' },
      { _id: '6', name: 'Daisy', type: 'Dog', age: 2, location: 'Manhattan', breed: 'Beagle', photo: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=694' },
    ];
  }
};

const Adopted = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const data = await petService.getPets();
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return (
    <div className="min-h-screen bg-[#fdf2f8] relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full blur-[120px] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-5 bg-white/50 backdrop-blur-xl rounded-[2rem] mb-6 shadow-xl shadow-pink-100 border border-white/50 transform hover:rotate-12 transition-transform cursor-default">
            <Heart className="text-pink-600" size={40} fill="currentColor" />
          </div>
          <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            Pets for <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">Adoption</span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-xl font-medium leading-relaxed">
            Browse our list of lovable companions waiting for their forever homes. Click on any pet to view details and start the adoption process.
          </p>
        </div>

        {/* Content Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Available Companions</h2>
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
                  We couldn't find any pets matching your search.
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

export default Adopted;
