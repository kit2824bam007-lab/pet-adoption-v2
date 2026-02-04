🐾 PetMatch — Smart Pet Adoption & Matching Platform

PetMatch is a modern full-stack MERN web application designed to make pet adoption easier, smarter, and more personalized.
It connects pet owners and pet adopters through a lifestyle-based matching system and an in-app messaging feature.

This project is developed as a college mini project to demonstrate real-world full-stack web development using the MERN stack with a modern UI.

🌟 Project Overview

PetMatch helps users find pets that truly fit their lifestyle.
Users can register, create profiles, add pets for adoption, browse available pets, receive smart matches, and communicate directly with pet owners through a built-in chat system.

The platform focuses on responsible pet adoption by matching pets with suitable adopters based on home type, family details, free time, and pet-handling experience.

🚀 Key Features

  🔐 User Authentication (Register & Login)
  👤 User Profile Management
  🐕 Add & Manage Pets for Adoption
  🔍 Search & Filter Pets by Type (Dog, Cat, Birds, Rabbit, Others)
  ❤️ Smart Pet Matching System
  🏠 Lifestyle-Based Matching
   (Home type, kids, free time, experience)
  📸 Pet Photo Upload
  💬 Messaging / Chat between Pet Owner & Adopter
  🔐 Secure user-to-user communication
  🎨 Modern UI with Tailwind CSS
  ⚡ Fast and responsive React frontend
  🌐 RESTful API backend

  💬 Messaging & Chat Feature

PetMatch includes a secure messaging system that allows direct communication between pet owners and pet adopters.

🐾 How Messaging Works
Adopters can message the pet owner from the pet details page
Only registered users can access chat
Messages are stored securely in the database
Each chat is linked to a specific pet and users

✨ Messaging Features
One-to-one chat system
Message history preserved
Secure access using authentication
Clean and simple chat UI
Database-backed conversations

🛠 Tech Stack
Frontend
  React.js
  Tailwind CSS
  React Router DOM
  Axios

Backend 
  Node.js
  Express.js
  MongoDB
  Mongoose
  JWT Authentication
  Multer (Image Upload)

📁 Project Structure

petmatch
│
├── client/ # React + Tailwind Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/               # Node + Express Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   ├── uploads/
│   └── server.js
│
├── .gitignore
├── README.md
└── package.json

⚙️ Installation & Setup
1️⃣ Clone the Repository
       git clone https://github.com/kit2824bam007-lab/petmatch.git
cd petmatch

2️⃣ Backend Setup
       cd server
       npm install
Create a .env file inside server/:
       PORT=5000
       MONGO_URI=your_mongodb_connection_string
       JWT_SECRET=your_secret_key
Start the backend server:
       npm run dev
3️⃣ Frontend Setup
       cd client
       npm install
       npm start


OR (if using Vite):
      npm run dev
🎨 Tailwind CSS

Tailwind CSS is used for:

Responsive design
Clean and reusable UI components
Fast styling
Modern layout system

🔐 Environment Variables

The following environment variables are required in server/.env:

   PORT
   MONGO_URI
   JWT_SECRET

⚠️ Important:
.env files are ignored in GitHub for security reasons.

🧪 Sample API Endpoints
Authentication

POST /api/auth/register — Register a new user
POST /api/auth/login — Login user

Pets

POST /api/pets/add — Add a new pet
GET /api/pets — Get all pets
GET /api/pets/match — Get matched pets

Messaging

POST /api/messages/send — Send a message
GET /api/messages/:chatId — Get chat history
GET /api/messages/user/:userId — Get user conversations

conversations

🎓 Academic Purpose

This project demonstrates:
    Full-Stack Web Development
    MERN Stack Architecture
    React + Tailwind UI Design
    REST API Development
    Authentication & Authorization
    Secure Messaging System
    Real-world project workflow

👩‍💻 Developer Details

  Name: Archana Devi M
  Project Name: PetMatch
  Technology: React, Tailwind CSS, Node.js, Express, MongoDB
  Purpose: College Mini Project

🚀 Future Enhancements
      Real-time chat using Socket.IO
      Push notifications
      Admin dashboard
      Pet adoption request approval system
      Deployment on cloud platform

📜 License
   This project is developed for educational purposes only.

