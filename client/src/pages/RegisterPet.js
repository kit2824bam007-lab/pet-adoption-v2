import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const RegisterPet = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    age: '',
    image: '',
    homeType: 'Any',
    careLevel: 'Medium',
    activityLevel: 'Medium',
    kidFriendly: true,
    description: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post('http://localhost:5000/api/pets', formData);
      setMessage('Pet registered successfully! 🐾');
      setFormData({
        name: '',
        type: 'Dog',
        breed: '',
        age: '',
        image: '',
        homeType: 'Any',
        careLevel: 'Medium',
        activityLevel: 'Medium',
        kidFriendly: true,
        description: ''
      });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to register pet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <h2>🐾 Register a Pet</h2>
        <p>Add a new pet available for adoption</p>

        {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Pet Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter pet name"
              required
            />
          </div>

          <div className="form-group">
            <label>Pet Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Breed</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Enter breed"
            />
          </div>

          <div className="form-group">
            <label>Age (years)</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              required
            />
          </div>

          <div className="form-group">
            <label>Pet Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {formData.image && <img src={formData.image} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
          </div>

          <div className="form-group">
            <label>Ideal Home Type</label>
            <select name="homeType" value={formData.homeType} onChange={handleChange}>
              <option value="Any">Any</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
            </select>
          </div>

          <div className="form-group">
            <label>Care Level</label>
            <select name="careLevel" value={formData.careLevel} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Activity Level</label>
            <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="kidFriendly"
                checked={formData.kidFriendly}
                onChange={handleChange}
              />
              Kid Friendly?
            </label>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about the pet..."
              rows="4"
            ></textarea>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register Pet'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterPet;
