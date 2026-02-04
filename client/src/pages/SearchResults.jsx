import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PetCard from '../components/PetCard';
import { ArrowLeft, Search as SearchIcon } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/pets/search/${query}`);
        setResults(response.data.pets);
      } catch (error) {
        console.error('Error searching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-[#fdf2f8] py-12 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-200 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full blur-[120px] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link to="/" className="inline-flex items-center text-pink-600 font-black hover:text-rose-600 mb-10 group bg-white/50 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/50 shadow-sm transition-all hover:-translate-x-1">
          <ArrowLeft size={20} className="mr-3 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="flex items-center space-x-6 mb-16 bg-white/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/60 shadow-xl shadow-pink-100/20">
          <div className="bg-gradient-to-tr from-pink-500 to-rose-400 p-5 rounded-[1.5rem] shadow-lg shadow-pink-200">
            <SearchIcon className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Search Results</h1>
            <p className="text-gray-500 text-lg font-medium mt-1">
              Showing matches for <span className="text-pink-600 font-bold">"{query}"</span>
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {results.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white/40 backdrop-blur-2xl rounded-[3rem] border-2 border-dashed border-gray-200 flex flex-col items-center">
            <div className="bg-gray-100 p-8 rounded-full mb-8">
              <SearchIcon size={48} className="text-gray-400" />
            </div>
            <h3 className="text-3xl font-black text-gray-800 mb-4 tracking-tight">No companions found</h3>
            <p className="text-gray-500 text-lg font-medium max-w-md mx-auto leading-relaxed">
              We couldn't find any pets matching your search. Try different keywords or check back later!
            </p>
            <Link to="/" className="mt-10 bg-pink-500 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-pink-600 transition-all shadow-xl shadow-pink-200">
              Explore All Pets
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
