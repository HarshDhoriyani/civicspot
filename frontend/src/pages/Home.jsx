import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-white sm:text-6xl">
            Welcome to <span className="text-blue-400">CivicSpot</span> 🏙️
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Your voice matters! Report community issues, track their progress, 
            and help make your neighborhood a better place to live.
          </p>
          
          <div className="mt-10 flex justify-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/report"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  Report an Issue
                </Link>
                <Link
                  to="/issues"
                  className="bg-gray-800 text-blue-400 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-400 hover:bg-gray-700 transition-all duration-200"
                >
                  Browse Issues
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link
                  to="/issues"
                  className="bg-gray-800 text-blue-400 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-400 hover:bg-gray-700 transition-all duration-200"
                >
                  View Issues
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          How CivicSpot Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700">
            <div className="text-5xl mb-4">📸</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Report Issues</h3>
            <p className="text-gray-400">
              Spot a pothole, broken streetlight, or garbage? Take a photo and report it instantly.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700">
            <div className="text-5xl mb-4">📍</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Track Progress</h3>
            <p className="text-gray-400">
              Monitor the status of your reported issues and see them on the map.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Get Resolved</h3>
            <p className="text-gray-400">
              Local authorities review and resolve issues, making your community better.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to make a difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of citizens working together for a better community.
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="bg-white text-blue-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 inline-block transition-all duration-200 transform hover:scale-105"
            >
              Sign Up Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;