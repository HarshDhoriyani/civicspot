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
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            {/*Header*/}
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Community Issues</h1>
                <p className='text-gray-600 dark:text-gray-400 mt-2'>Browse and track reported issues in your area</p>
            </div>
            {/*Filters*/}
            <IssueFilter filters={filters} onFilterChange={handleFilterChange}/>
            {/* Issue List */}
            <IssueList issues={issues} loading={loading}/>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className='mt-8 flex justify-center gap-2'>
                    <button
                        onClick={() => handlePageChange(filters.page - 1)}
                        disabled={filters.page === 1}
                        className='px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'>
                        Previous
                    </button>
                
                <div className='flex gap-2'>
                    {[...Array(totalPages)].map((_, index) => (
                        <button 
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 rounded-lg ${
                                filters.page === index + 1 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                            >
                                {index + 1}
                        </button>
                    ))}
                </div> 

                <button
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={filters.page === totalPages}
                    className='px-4 py-2 bg-white border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
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