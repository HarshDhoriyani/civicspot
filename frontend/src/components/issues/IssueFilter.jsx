import { ISSUE_CATEGORIES, ISSUE_STATUS } from '../../utils/constants';

const IssueFilter = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value, page: 1 });
  };

  const handleClear = () => {
    onFilterChange({
      category: '',
      status: '',
      search: '',
      page: 1
    });
  };

  return (
    <div className="glass-strong rounded-2xl shadow-xl p-6 mb-10 border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-glow/5 rounded-full blur-3xl" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 relative z-10">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Search
          </label>
          <input
            type="text"
            name="search"
            value={filters.search || ''}
            onChange={handleChange}
            placeholder="Search issues..."
            className="input-field"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Category
          </label>
          <select
            name="category"
            value={filters.category || ''}
            onChange={handleChange}
            className="input-field appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1em]"
          >
            <option value="" className="bg-civic-900">All Categories</option>
            {ISSUE_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value} className="bg-civic-900 text-white">
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Status
          </label>
          <select
            name="status"
            value={filters.status || ''}
            onChange={handleChange}
            className="input-field appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1em]"
          >
            <option value="" className="bg-civic-900">All Status</option>
            {ISSUE_STATUS.map((stat) => (
              <option key={stat.value} value={stat.value} className="bg-civic-900 text-white">
                {stat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Button */}
        <div className="flex items-end">
          <button
            onClick={handleClear}
            className="w-full btn-secondary py-3"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueFilter;