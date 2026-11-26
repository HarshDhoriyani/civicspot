import { useState, useEffect } from 'react';
import IssueList from '../components/issues/IssueList';
import IssueFilter from '../components/issues/IssueFilter';
import issueService from '../services/issueService';

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    search: '',
    page: 1,
    limit: 9
  });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchIssues();
  }, [filters]);

  const fetchIssues = async() => {
    setLoading(true);
    try {
        const response = await issueService.getAllIssues(filters);
        setIssues(response.data);
        setTotalPages(response.pages);
    }
    catch (error) {
        console.error('Error fetching issues: ', error);
    }
    finally {
        setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (newPage) => {
    setFilters({...filters, page: newPage});
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <div className="min-h-screen bg-civic-950 py-12 relative overflow-hidden">
        <div className="hero-glow w-[500px] h-[500px] bg-teal-glow/10 top-[-100px] right-[-100px] animate-pulse-glow" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/*Header*/}
            <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-glow/10 border border-teal-glow/20 text-teal-light text-xs font-semibold mb-4">
                  Explore Issues
                </div>
                <h1 className="text-4xl font-display font-bold text-white">Community Issues</h1>
                <p className="text-slate-400 mt-2">Browse and track reported issues in your area</p>
            </div>
            {/*Filters*/}
            <IssueFilter filters={filters} onFilterChange={handleFilterChange}/>
            {/* Issue List */}
            <IssueList issues={issues} loading={loading}/>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                    <button
                        onClick={() => handlePageChange(filters.page - 1)}
                        disabled={filters.page === 1}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm">
                        Previous
                    </button>
                
                <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <button 
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium text-sm transition-colors ${
                                filters.page === index + 1 ? 'bg-teal-600 text-white shadow-[0_0_15px_rgba(20,184,166,0.3)]' : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                            }`}
                            >
                                {index + 1}
                        </button>
                    ))}
                </div> 

                <button
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={filters.page === totalPages}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                >
                    Next
                </button>
                </div>   
            )}
        </div>
    </div>
  );
};

export default Dashboard;