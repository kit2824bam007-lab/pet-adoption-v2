import React, { useState, useEffect } from 'react';
import { User, Home, Users, Clock, Star, Save, Phone, MapPin, Bell } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Profile = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    username: user?.username || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: user?.phone || '',
    address: user?.address || '',
    homeType: user?.profile?.homeType || 'Apartment',
    kidsAtHome: user?.profile?.hasKids ? 'Yes' : 'No',
    dailyFreeTime: user?.profile?.freeTime || 'Medium',
    experienceLevel: user?.profile?.petExperience || 'Beginner'
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/user/${user._id || user.id}`);
        setNotifications(response.data.user.notifications || []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const updateData = {
        phone: formData.phone,
        address: formData.address,
        profile: {
          homeType: formData.homeType,
          hasKids: formData.kidsAtHome === 'Yes',
          freeTime: formData.dailyFreeTime,
          petExperience: formData.experienceLevel
        }
      };

      await axios.put(`${API_URL}/auth/profile/${user._id || user.id}`, updateData);
      
      // Update local storage if needed
      const updatedUser = { ...user, ...updateData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Update profile error:', err);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf2f8] py-12 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-200 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full blur-[120px] opacity-40"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-10 py-16 text-white relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <User size={160} />
            </div>
            <div className="flex items-center space-x-8 relative z-10">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center border-4 border-white/30 shadow-2xl transform -rotate-6">
                <User size={64} className="text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-black tracking-tight">{formData.username}</h1>
                <p className="text-xl opacity-90 font-medium mt-2 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                  {formData.email}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-10 lg:p-14 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Phone */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-bold text-gray-700 space-x-2 uppercase tracking-wider ml-1">
                  <Phone size={18} className="text-pink-500" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold shadow-sm"
                />
              </div>

              {/* Address */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-bold text-gray-700 space-x-2 uppercase tracking-wider ml-1">
                  <MapPin size={18} className="text-pink-500" />
                  <span>Address</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Pet St, City, Country"
                  className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold shadow-sm"
                />
              </div>

              {/* Home Type */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-bold text-gray-700 space-x-2 uppercase tracking-wider ml-1">
                  <Home size={18} className="text-pink-500" />
                  <span>Home Type</span>
                </label>
                <select
                  name="homeType"
                  value={formData.homeType}
                  onChange={handleChange}
                  className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold appearance-none shadow-sm"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                </select>
              </div>

              {/* Kids at Home */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-bold text-gray-700 space-x-2 uppercase tracking-wider ml-1">
                  <Users size={18} className="text-pink-500" />
                  <span>Kids at Home</span>
                </label>
                <select
                  name="kidsAtHome"
                  value={formData.kidsAtHome}
                  onChange={handleChange}
                  className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold appearance-none shadow-sm"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              {/* Daily Free Time */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-bold text-gray-700 space-x-2 uppercase tracking-wider ml-1">
                  <Clock size={18} className="text-pink-500" />
                  <span>Daily Free Time</span>
                </label>
                <select
                  name="dailyFreeTime"
                  value={formData.dailyFreeTime}
                  onChange={handleChange}
                  className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold appearance-none shadow-sm"
                >
                  <option value="< 2 hours">&lt; 2 hours</option>
                  <option value="2-4 hours">2-4 hours</option>
                  <option value="4-6 hours">4-6 hours</option>
                  <option value="6+ hours">6+ hours</option>
                </select>
              </div>

              {/* Experience Level */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-bold text-gray-700 space-x-2 uppercase tracking-wider ml-1">
                  <Star size={18} className="text-pink-500" />
                  <span>Pet Experience Level</span>
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold appearance-none shadow-sm"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>

            <div className="mt-12 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-10 py-4 rounded-2xl font-black text-lg flex items-center space-x-3 transition-all shadow-[0_20px_40px_-12px_rgba(244,63,94,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(244,63,94,0.4)] transform hover:-translate-y-1 active:scale-[0.98] disabled:opacity-70"
              >
                {isSaving ? (
                  <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : <Save size={24} />}
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </form>

          {/* Notifications Section */}
          <div className="border-t border-gray-100 bg-gray-50/50 p-10 lg:p-14">
            <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
              <Bell size={24} className="text-pink-500 mr-3" />
              Notifications
            </h2>
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.slice().reverse().map((notif, index) => (
                  <div key={index} className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm flex items-start space-x-4">
                    <div className="bg-pink-100 p-2 rounded-xl mt-1">
                      <Bell size={18} className="text-pink-600" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-bold">{notif.message}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(notif.createdAt).toLocaleDateString()} at {new Date(notif.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
                  <Bell size={48} className="text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-400 font-bold text-lg">No notifications yet!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
