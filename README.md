# 🏙️ CivicSpot - Community Issue Reporting Platform

A full-stack web application that enables citizens to report local issues and helps authorities track and resolve them efficiently.

## ✨ Features

- 🔐 User Authentication (JWT)
- 📝 Report Issues with Images
- 📍 Geolocation & Reverse Geocoding
- 🗺️ Interactive Map View
- 👍 Upvote & Comment System
- 👨‍💼 Admin Dashboard
- 🌙 Dark Mode Interface
- 📱 Fully Responsive

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- Leaflet

**Backend:**
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary (Image Upload)

## 🚀 Live Demo

- **Frontend:** https://civicspot.vercel.app/
- **Backend API:** https://civicspot-api.onrender.com

## 📦 Installation

### Prerequisites
- Node.js v18+
- MongoDB
- Cloudinary Account

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in your environment variables
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 👨‍💻 Author

**Your Name**
- GitHub: [@HarshDhoriyani](https://github.com/HarshDhoriyani)
- LinkedIn: [Harsh Dhoriyani](https://www.linkedin.com/in/harshdhoriyani/)

## 📄 License

MIT License

## 🙏 Acknowledgments

- OpenStreetMap for geocoding
- Cloudinary for image hosting
- All contributors who helped test the platform
