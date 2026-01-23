🐾 PetMatch — Smart Pet Adoption & Matching Platform

PetMatch is a modern full-stack web application built using React, Tailwind CSS, Node.js, Express, and MongoDB. The platform helps users find and match with pets based on their lifestyle, preferences, and experience, making pet adoption easier and more personalized.

🌟 Project Overview

PetMatch connects pet adopters with suitable pets using a smart matching system. Users can register, create profiles, browse available pets, and get personalized matches based on their home type, family details, and pet experience.

This project is developed as a college mini project to demonstrate full-stack web development using the MERN stack with a modern UI.

🚀 Key Features

🔐 User Authentication (Register & Login)

👤 User Profile Management

🐕 Add & Manage Pets

🔍 Search & Filter by Pet Type (Dog, Cat, Birds, Rabbit, Others)

❤️ Pet Matching System

📸 Pet Photo Upload

🏠 Lifestyle-Based Matching (Home type, kids, free time, experience)

🎨 Modern UI with Tailwind CSS

⚡ Fast Frontend with React

🌐 RESTful API Backend

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

petmatch/
│
├── client/               # React + Tailwind Frontend
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


Start backend server:

npm run dev

3️⃣ Frontend Setup (React + Tailwind)
cd client
npm install
npm start


OR (if using Vite):

npm run dev

🎨 Tailwind CSS

Tailwind CSS is used for:

Responsive design

Clean UI components

Fast styling

Modern layout system

🔐 Environment Variables

The following environment variables are required in server/.env:

PORT

MONGO_URI

JWT_SECRET

⚠️ Important:
.env is ignored in GitHub for security reasons.

🧪 Sample API Endpoints

POST /api/auth/register — Register new user

POST /api/auth/login — Login user

POST /api/pets/add — Add new pet

GET /api/pets — Get all pets

GET /api/pets/match — Get matched pets


🎓 Academic Purpose

This project is created as a college mini project to demonstrate:

Full Stack Web Development

MERN Stack Architecture

React + Tailwind UI Design

REST API Development

Authentication & Authorization

Real-World Project Workflow

👩‍💻 Developer Details

Name: Archana Devi M
Project Name: PetMatch
Technology: React, Tailwind CSS, Node.js, Express, MongoDB
Purpose: College Mini Project

📜 License

This project is developed for educational purposes only.