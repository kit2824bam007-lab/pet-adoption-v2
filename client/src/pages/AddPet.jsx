import React, { useState } from 'react';
import { Camera, Dog, MapPin, Calendar, FileText, Send, X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPet = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    age: '',
    location: '',
    description: '',
    contactEmail: user?.email || '',
    contactPhone: user?.phone || '',
    homeType: 'Any',
    careLevel: 'Medium',
    activityLevel: 'Medium',
    kidFriendly: true
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const petData = {
        ...formData,
        age: parseInt(formData.age),
        image: photoPreview,
        owner: user?._id || user?.id
      };

      await axios.post('http://localhost:5000/api/pets', petData);
      
      setIsSubmitting(false);
      alert('Pet registered successfully!');
      setFormData({ name: '', type: 'Dog', age: '', location: '', description: '' });
      setPhoto(null);
      setPhotoPreview(null);
      navigate('/');
    } catch (error) {
      console.error('Error registering pet:', error);
      const errorMessage = error.response?.data?.message || 'Failed to register pet. Please try again.';
      alert(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf2f8] py-12 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-pink-200 rounded-full blur-[100px] opacity-40"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-rose-200 rounded-full blur-[100px] opacity-40"></div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden">
          <div className="md:flex">
            {/* Sidebar / Info */}
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 md:w-1/3 p-10 text-white flex flex-col justify-between">
              <div>
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/30">
                  <Dog size={32} />
                </div>
                <h1 className="text-4xl font-black mb-6 leading-tight">Register a Pet</h1>
                <p className="text-lg opacity-90 leading-relaxed font-medium">
                  Be the bridge between a furry friend and their new forever home.
                </p>
              </div>
              
              <div className="mt-12 space-y-8">
                <div className="flex items-start space-x-5">
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/10 mt-1">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Detailed Info</h3>
                    <p className="text-sm opacity-80">Share their unique personality and traits.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-5">
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/10 mt-1">
                    <Camera size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">High Quality</h3>
                    <p className="text-sm opacity-80">Better photos increase adoption chances.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="md:w-2/3 p-10 lg:p-14 space-y-8 bg-white/40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pet Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Pet Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Buddy"
                    className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all placeholder-gray-400 font-medium"
                  />
                </div>

                {/* Pet Type */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Pet Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-medium appearance-none"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                {/* Breed */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Breed</label>
                  <input
                    required
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    placeholder="e.g. Golden Retriever"
                    className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all placeholder-gray-400 font-medium"
                  />
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Age (Years)</label>
                  <input
                    required
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                    className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all placeholder-gray-400 font-medium"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Location</label>
                  <div className="relative group">
                    <MapPin size={20} className="absolute left-4 top-4 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                    <input
                      required
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, State"
                      className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all placeholder-gray-400 font-medium"
                    />
                  </div>
                </div>

                {/* Home Type */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Required Home Type</label>
                  <select
                    name="homeType"
                    value={formData.homeType}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-medium appearance-none"
                  >
                    <option value="Any">Any</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Farm">Farm</option>
                  </select>
                </div>

                {/* Care Level */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Care Level</label>
                  <select
                    name="careLevel"
                    value={formData.careLevel}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-medium appearance-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                {/* Activity Level */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Activity Level</label>
                  <select
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-medium appearance-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                {/* Kid Friendly */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Kid Friendly</label>
                  <select
                    name="kidFriendly"
                    value={formData.kidFriendly}
                    onChange={(e) => setFormData(prev => ({ ...prev, kidFriendly: e.target.value === 'true' }))}
                    className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-medium appearance-none"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                {/* Contact Email */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Contact Email</label>
                  <input
                    required
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all placeholder-gray-400 font-medium"
                  />
                </div>

                {/* Contact Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Contact Phone</label>
                  <input
                    required
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all placeholder-gray-400 font-medium"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="What makes this pet special?"
                  className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all placeholder-gray-400 font-medium resize-none"
                ></textarea>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Pet Photo</label>
                {!photoPreview ? (
                  <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-200 rounded-[2rem] cursor-pointer hover:bg-pink-50/50 hover:border-pink-300 transition-all group bg-white/30">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                      <div className="bg-pink-100 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                        <Camera size={32} className="text-pink-500" />
                      </div>
                      <p className="text-base text-gray-600 font-bold">Drag and drop or click</p>
                      <p className="text-sm text-gray-400 font-medium mt-1">High resolution PNG, JPG up to 10MB</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                  </label>
                ) : (
                  <div className="relative h-64 w-full group">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="h-full w-full object-cover rounded-[2rem] shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] flex items-center justify-center backdrop-blur-[2px]">
                      <button
                        onClick={removePhoto}
                        className="bg-white/90 text-red-500 p-4 rounded-2xl hover:bg-red-500 hover:text-white shadow-xl transition-all transform hover:scale-110"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center space-x-3 transition-all shadow-[0_20px_40px_-12px_rgba(244,63,94,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(244,63,94,0.4)] transform hover:-translate-y-1 active:scale-[0.98] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : <Send size={24} />}
                  <span>{isSubmitting ? 'Registering...' : 'Register Pet'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPet;
