import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import issueService from '../services/issueService';
import { ISSUE_CATEGORIES } from '../utils/constants';
import Toast from '../components/common/Toast';

const ReportIssue = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: {
      address: '',
      coordinates: {
        lat: 28.6139,
        lng: 77.2090
      }
    }
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'address') {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          address: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + images.length > 5) {
      setError('Maximum 5 images allowed');
      return;
    }

    setImages([...images, ...files]);

    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    // Revoke the URL to free memory
    URL.revokeObjectURL(imagePreviews[index]);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const getCurrentLocation = () => {
  setError('');
  
  if (!navigator.geolocation) {
    setError('Geolocation is not supported by your browser');
    return;
  }

  setToast({ message: 'Getting your location...', type: 'info' });

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      try {
        // Reverse geocoding using OpenStreetMap Nominatim (free)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        );
        const data = await response.json();

        // Format address
        const address = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

        setFormData({
          ...formData,
          location: {
            address: address,
            coordinates: { lat, lng },
            city: data.address?.city || data.address?.town || data.address?.village || '',
            state: data.address?.state || '',
            pincode: data.address?.postcode || ''
          }
        });

        setToast({ message: 'Location captured successfully!', type: 'success' });

      } catch (error) {
        console.error('Geocoding error:', error);
        
        // If geocoding fails, still set coordinates with basic address
        setFormData({
          ...formData,
          location: {
            address: `Latitude: ${lat.toFixed(6)}, Longitude: ${lng.toFixed(6)}`,
            coordinates: { lat, lng }
          }
        });

        setToast({ message: 'Location captured but address lookup failed', type: 'warning' });
      }
    },
    (error) => {
      let errorMessage = 'Unable to get your location. ';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage += 'Please allow location access.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage += 'Location information unavailable.';
          break;
        case error.TIMEOUT:
          errorMessage += 'Location request timed out.';
          break;
        default:
          errorMessage += 'An unknown error occurred.';
      }
      
      setError(errorMessage);
      setToast({ message: errorMessage, type: 'error' });
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
    );
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.title || formData.title.length < 5) {
      setError('Title must be at least 5 characters');
      setLoading(false);
      return;
    }

    if (!formData.description || formData.description.length < 10) {
      setError('Description must be at least 10 characters');
      setLoading(false);
      return;
    }

    if (!formData.category) {
      setError('Please select a category');
      setLoading(false);
      return;
    }

    if (!formData.location.address) {
      setError('Please provide a location');
      setLoading(false);
      return;
    }

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('location', JSON.stringify(formData.location));

      // Append images
      images.forEach((image) => {
        submitData.append('images', image);
      });

      await issueService.createIssue(submitData);
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/issues');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to report issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-civic-950 flex items-center justify-center relative overflow-hidden">
        <div className="hero-glow w-[500px] h-[500px] bg-teal-glow/15 top-1/4 left-1/4 animate-pulse-glow" />
        <div className="text-center relative z-10 glass-strong p-12 rounded-3xl animate-fade-up">
          <div className="w-12 h-1 rounded-full bg-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-display font-bold text-white mb-4">Issue Reported Successfully!</h2>
          <p className="text-slate-400">Redirecting to issues page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-civic-950 py-12 relative overflow-hidden">
      <div className="hero-glow w-[600px] h-[600px] bg-teal-glow/10 top-[-200px] left-[-200px] animate-pulse-glow" />
      <div className="hero-glow w-[500px] h-[500px] bg-amber-glow/5 bottom-[-100px] right-[-100px] animate-float" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-10 text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-glow/10 border border-teal-glow/20 text-teal-light text-xs font-semibold mb-4">
            Create Report
          </div>
          <h1 className="text-4xl font-display font-bold text-white">Report an Issue</h1>
          <p className="text-slate-400 mt-3 max-w-2xl mx-auto">Help improve your community by providing details about the local issue.</p>
        </div>

        {/* Form Card */}
        <div className="glass-strong rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10 animate-fade-up stagger-1">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-start gap-3 animate-shake">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-4">
                Select Category *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ISSUE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.value })}
                    className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                      formData.category === cat.value
                        ? 'border-teal-500 bg-teal-500/10 text-white shadow-[0_0_20px_rgba(20,184,166,0.15)]'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/30 hover:bg-white/10'
                    }`}
                  >
                    <span className={`block w-3 h-3 rounded-full mx-auto mb-3 ${cat.color}`} />
                    <div className="text-sm font-medium">{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Description Grid */}
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                  Issue Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Broken streetlight on Main Road"
                />
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-slate-500">{formData.title.length}/100</span>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="input-field resize-none"
                  placeholder="Provide detailed information about the issue..."
                />
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-slate-500">{formData.description.length}/1000</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-slate-300 mb-2">
                Location *
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.location.address}
                  onChange={handleChange}
                  className="input-field flex-1"
                  placeholder="Enter the exact location"
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="btn-amber sm:w-auto w-full px-6 whitespace-nowrap"
                >
                  Use Current Location
                </button>
              </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Upload Photos (Max 5)
              </label>
              
              <div className="mb-4">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 rounded-2xl bg-white/5 cursor-pointer hover:border-teal-500/50 hover:bg-teal-500/5 transition-all duration-300 group">
                  <span className="w-10 h-10 mb-3 rounded-full border border-white/20 flex items-center justify-center text-2xl text-slate-300 group-hover:border-teal-400/50 transition-colors">+</span>
                  <span className="text-sm font-medium text-slate-300">Click to upload images</span>
                  <span className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB each</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group rounded-xl overflow-hidden border border-white/10">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors transform hover:scale-110"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="divider-gradient !my-10" />

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate('/issues')}
                className="btn-secondary flex-1 py-4"
              >
                Cancel Report
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 py-4 text-base shadow-[0_0_30px_rgba(20,184,166,0.25)] hover:shadow-[0_0_50px_rgba(20,184,166,0.4)]"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <>Submit Report</>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm animate-fade-up stagger-2">
          <h3 className="font-semibold text-blue-400 mb-3">Tips for a great report:</h3>
          <ul className="text-sm text-slate-300 space-y-2 ml-7 list-disc marker:text-blue-500/50">
            <li>Be specific and clear in your description to help authorities understand the urgency.</li>
            <li>Include multiple clear photos from different angles.</li>
            <li>Ensure the location is as accurate as possible (use the location button).</li>
            <li>Report one issue per submission for better tracking and faster resolution.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;