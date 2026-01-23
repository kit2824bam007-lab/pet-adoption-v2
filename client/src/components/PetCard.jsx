import React from 'react';
import { MapPin, Calendar, Tag, ArrowRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 hover:shadow-2xl hover:shadow-pink-100 transition-all duration-500 overflow-hidden border border-gray-50 flex flex-col h-full group">
      {/* Photo */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={pet.photo || `https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1074`}
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl text-xs font-black text-pink-600 shadow-sm uppercase tracking-wider">
          {pet.type}
        </div>
        <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-2.5 rounded-2xl text-gray-400 hover:text-pink-500 transition-colors shadow-sm">
          <Heart size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">{pet.name}</h3>
        </div>

        <div className="space-y-3 mb-8 flex-1">
          <div className="flex items-center text-gray-500 font-medium">
            <div className="bg-pink-50 p-2 rounded-xl mr-3">
              <Calendar size={18} className="text-pink-500" />
            </div>
            <span>{pet.age} years old</span>
          </div>
          <div className="flex items-center text-gray-500 font-medium">
            <div className="bg-pink-50 p-2 rounded-xl mr-3">
              <MapPin size={18} className="text-pink-500" />
            </div>
            <span>{pet.location}</span>
          </div>
          <div className="flex items-center text-gray-500 font-medium">
            <div className="bg-pink-50 p-2 rounded-xl mr-3">
              <Tag size={18} className="text-pink-500" />
            </div>
            <span>{pet.breed || 'Unknown Breed'}</span>
          </div>
        </div>

        <button 
          onClick={() => navigate(`/pet/${pet._id}`)}
          className="w-full bg-gray-900 text-white hover:bg-pink-500 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-3 group/btn shadow-lg shadow-gray-200 hover:shadow-pink-200"
        >
          <span>View Details</span>
          <ArrowRight size={20} className="group-hover/btn:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default PetCard;
