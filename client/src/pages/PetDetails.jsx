import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Calendar, Tag, Shield, Activity, Home, Info, ArrowLeft, CheckCircle2, MessageSquare, X, Send } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const PetDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdopting, setIsAdopting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchPetDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/pets/${id}`);
        console.log('Fetched pet details:', response.data.pet);
        setPet(response.data.pet);
      } catch (error) {
        console.error('Error fetching pet details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id]);

  const handleAdopt = async () => {
    if (!user) {
      alert('Please login to adopt a pet');
      navigate('/login');
      return;
    }
    setIsAdopting(true);
    try {
      await axios.post(`${API_URL}/adoption/adopt`, { 
        petId: id, 
        userId: user._id || user.id 
      });
      setShowSuccess(true);
    } catch (error) {
      console.error('Adoption error:', error);
      alert(error.response?.data?.message || 'Failed to process adoption. Please try again.');
    } finally {
      setIsAdopting(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to message the owner');
      navigate('/login');
      return;
    }
    if (!message.trim()) return;

    setIsSending(true);
    try {
      const receiverId = pet.owner?._id || pet.owner;
      const senderId = user._id || user.id;

      if (!receiverId) {
        alert('Could not find pet owner information.');
        setIsSending(false);
        return;
      }

      if (receiverId === senderId) {
        alert('You cannot message yourself!');
        setIsSending(false);
        return;
      }

      await axios.post(`${API_URL}/messages`, {
        senderId: senderId,
        receiverId: receiverId,
        petId: id,
        content: message
      });
      setShowMessageModal(false);
      setMessage('');
      navigate('/messages');
    } catch (error) {
      console.error('Error sending message:', error);
      alert(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf2f8]">
        <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdf2f8] p-4">
        <h2 className="text-3xl font-black text-gray-900 mb-4">Pet not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-pink-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-600 transition-all"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdf2f8] p-6">
        <div className="bg-white rounded-[3rem] p-12 text-center shadow-2xl max-w-xl w-full border border-pink-100">
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Congratulations!</h2>
          <p className="text-gray-600 text-xl font-medium mb-10 leading-relaxed">
            You've started the adoption process for <span className="text-pink-600 font-bold">{pet.name}</span>! Our team will contact you shortly with the next steps.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-pink-500 transition-all shadow-xl shadow-gray-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf2f8] py-12 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full blur-[120px] opacity-40"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center space-x-2 text-gray-600 hover:text-pink-600 font-bold transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-white flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 h-[500px] lg:h-auto relative">
            <img 
              src={pet.image || pet.photo || `https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1074`} 
              alt={pet.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-2 rounded-2xl text-sm font-black text-pink-600 shadow-xl uppercase tracking-widest">
              {pet.type}
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tighter">{pet.name}</h1>
                <div className="flex items-center text-gray-500 font-bold text-lg">
                  <MapPin size={20} className="text-pink-500 mr-2" />
                  <span>{pet.location}</span>
                </div>
              </div>
              <button className="bg-pink-50 p-4 rounded-[1.5rem] text-pink-500 hover:bg-pink-500 hover:text-white transition-all shadow-lg shadow-pink-100">
                <Heart size={28} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <div className="flex items-center space-x-3 text-gray-400 mb-2">
                  <Calendar size={18} />
                  <span className="text-xs font-black uppercase tracking-wider">Age</span>
                </div>
                <p className="text-xl font-black text-gray-800">{pet.age} Years</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <div className="flex items-center space-x-3 text-gray-400 mb-2">
                  <Tag size={18} />
                  <span className="text-xs font-black uppercase tracking-wider">Breed</span>
                </div>
                <p className="text-xl font-black text-gray-800">{pet.breed || 'Mixed'}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <div className="flex items-center space-x-3 text-gray-400 mb-2">
                  <Activity size={18} />
                  <span className="text-xs font-black uppercase tracking-wider">Activity</span>
                </div>
                <p className="text-xl font-black text-gray-800">{pet.activityLevel || 'Medium'}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <div className="flex items-center space-x-3 text-gray-400 mb-2">
                  <Home size={18} />
                  <span className="text-xs font-black uppercase tracking-wider">Home Type</span>
                </div>
                <p className="text-xl font-black text-gray-800">{pet.homeType || 'Any'}</p>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center">
                <Info size={24} className="text-pink-500 mr-3" />
                About {pet.name}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed font-medium">
                {pet.description || `${pet.name} is a wonderful ${pet.type} looking for a loving home. They are healthy, vaccinated, and ready to meet their new family!`}
              </p>
            </div>

            <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-6">
              <button 
                onClick={handleAdopt}
                disabled={isAdopting || pet.status === 'adopted'}
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-5 rounded-[2rem] font-black text-xl hover:from-pink-600 hover:to-rose-600 transition-all shadow-2xl shadow-pink-200 active:scale-95 flex items-center justify-center space-x-3 disabled:opacity-70"
              >
                {isAdopting ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Heart size={24} fill="currentColor" />
                    <span>{pet.status === 'adopted' ? 'Adopted' : `Adopt ${pet.name}`}</span>
                  </>
                )}
              </button>
              <button 
                onClick={() => {
                  if (!pet.owner) {
                    alert('Pet owner information is unavailable.');
                    return;
                  }
                  if (user && (pet.owner?._id === (user._id || user.id) || pet.owner === (user._id || user.id))) {
                    navigate('/messages');
                  } else {
                    setShowMessageModal(true);
                  }
                }}
                disabled={!pet.owner}
                className={`flex-1 bg-white text-gray-900 py-5 rounded-[2rem] font-black text-xl border-4 border-gray-900 hover:bg-gray-900 hover:text-white transition-all shadow-xl flex items-center justify-center space-x-3 ${!pet.owner ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <MessageSquare size={24} />
                <span>
                  {!pet.owner 
                    ? 'Owner Unavailable'
                    : user && (pet.owner?._id === (user._id || user.id) || pet.owner === (user._id || user.id)) 
                    ? 'View Messages' 
                    : 'Message Owner'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-white">
            <div className="p-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white flex justify-between items-center">
              <h3 className="text-2xl font-black flex items-center">
                <MessageSquare className="mr-3" /> Message Owner
              </h3>
              <button onClick={() => setShowMessageModal(false)} className="hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSendMessage} className="p-8">
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-3 text-lg">Your Message</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Hi! I'm interested in adopting ${pet.name}...`}
                  className="w-full h-40 p-6 bg-gray-50 border-2 border-gray-100 rounded-3xl focus:border-pink-500 focus:ring-0 outline-none transition-all resize-none font-medium text-lg"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSending || !message.trim()}
                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-pink-500 transition-all shadow-xl flex items-center justify-center space-x-3 disabled:opacity-50"
              >
                {isSending ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send size={24} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetDetails;
