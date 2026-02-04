import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PetMatch from './pages/PetMatch';
import Profile from './pages/Profile';
import AddPet from './pages/AddPet';
import SearchResults from './pages/SearchResults';
import Adopted from './pages/Adopted';
import PetDetails from './pages/PetDetails';
import Chat from './pages/Chat';

function App() {
  const [user, setUser] = useState(null);
  
  // Check if user is logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#fdf2f8]">
        {user && (
          <Navbar 
            user={user}
            handleLogout={handleLogout}
          />
        )}
        
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/register" 
            element={!user ? <Register /> : <Navigate to="/" />} 
          />
          <Route 
            path="/" 
            element={user ? <Home user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/pet-match" 
            element={user ? <PetMatch user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/search" 
            element={user ? <SearchResults /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/add-pet" 
            element={user ? <AddPet user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/adopted" 
            element={user ? <Adopted user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/pet/:id" 
            element={user ? <PetDetails user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/messages" 
            element={user ? <Chat user={user} /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;