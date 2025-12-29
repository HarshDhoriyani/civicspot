const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">🏙️ CivicSpot</h3>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Empowering citizens to report and resolve community issues together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400 dark:text-gray-500">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/issues" className="hover:text-white transition">Browse Issues</a></li>
              <li><a href="/report" className="hover:text-white transition">Report Issue</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Email: harshdhoriyani2005@gmail.com<br />
              Phone: +91 7620821907
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400 dark:text-gray-500">
          <p>&copy; 2025 CivicSpot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;