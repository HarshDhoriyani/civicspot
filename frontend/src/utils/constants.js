export const ISSUE_CATEGORIES = [
  { value: 'pothole', label: 'Pothole', icon: '🕳️', color: 'bg-orange-500' },
  { value: 'streetlight', label: 'Street Light', icon: '💡', color: 'bg-yellow-500' },
  { value: 'garbage', label: 'Garbage', icon: '🗑️', color: 'bg-green-500' },
  { value: 'power_cut', label: 'Power Cut', icon: '⚡', color: 'bg-red-500' },
  { value: 'water_supply', label: 'Water Supply', icon: '💧', color: 'bg-blue-500' },
  { value: 'other', label: 'Other', icon: '📌', color: 'bg-gray-500' },
];

export const ISSUE_STATUS = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  { value: 'resolved', label: 'Resolved', color: 'bg-green-100 text-green-800' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
];

export const ISSUE_PRIORITY = [
  { value: 'low', label: 'Low', color: 'text-gray-600' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
  { value: 'high', label: 'High', color: 'text-orange-600' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-600' },
];

export const DEFAULT_LOCATION = {
  lat: 28.6139,
  lng: 77.2090,
  address: 'New Delhi, India',
};