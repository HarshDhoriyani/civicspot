# 🏙️ CivicSpot - Community Issue Reporting Platform

A full-stack web application that enables citizens to report local issues and helps authorities track and resolve them efficiently.

## ✨ Features

- 🔐 **User Authentication**: Secure login and registration using JWT (JSON Web Tokens).
- 📝 **Report Issues**: Seamlessly report civic issues with text descriptions and image uploads.
- 📍 **Geolocation**: Integrated interactive maps (Leaflet) with reverse geocoding to accurately pinpoint issue locations.
- 👍 **Engagement**: Community interaction through upvoting and commenting on issues.
- 👨‍💼 **Admin & Moderation**: Dedicated admin capabilities to manage and update issue statuses.
- 🌙 **Modern UI**: Fully responsive, clean interface with Dark Mode support built using Tailwind CSS v4.

## 🛠️ Tech Stack

**Frontend:**
- [React 19](https://react.dev/)
- [Vite 7](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Router 7](https://reactrouter.com/)
- [React Leaflet 5](https://react-leaflet.js.org/) (Maps & Geolocation)
- [Axios](https://axios-http.com/)

**Backend:**
- [Node.js](https://nodejs.org/)
- [Express 5](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose 9](https://mongoosejs.com/)
- [JWT Authentication](https://jwt.io/)
- [Cloudinary](https://cloudinary.com/) (Image Upload via Multer)

## 🚀 Live Demo

- **Frontend:** https://civicspot.vercel.app/
- **Backend API:** https://civicspot-api.onrender.com

*(Note: Live demo links are placeholders and should be updated once deployed.)*

## 📦 Installation & Local Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas URI)
- Cloudinary Account (for image uploads)

### 1. Clone the repository
```bash
git clone https://github.com/HarshDhoriyani/civicspot.git
cd civicspot
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and configure the environment:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
Start the backend server:
```bash
npm start
# Server will run on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, install dependencies, and start the app:
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` folder and add your backend API URL:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
# App will run on http://localhost:5173
```

## 👨‍💻 Author

**Harsh Dhoriyani**
- GitHub: [@HarshDhoriyani](https://github.com/HarshDhoriyani)
- LinkedIn: [Harsh Dhoriyani](https://www.linkedin.com/in/harshdhoriyani/)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [OpenStreetMap](https://www.openstreetmap.org/) for geocoding and map tiles.
- [Cloudinary](https://cloudinary.com/) for reliable image hosting.
