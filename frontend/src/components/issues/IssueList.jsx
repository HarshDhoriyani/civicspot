import IssueCard from './IssueCard';
import Loader from '../common/Loader';

const IssueList = ({ issues, loading }) => {
  if (loading) {
    return <Loader />;
  }

  if (!issues || issues.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No issues found</h3>
        <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or be the first to report an issue!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {issues.map((issue) => (
        <IssueCard key={issue._id} issue={issue} />
      ))}
    </div>
  );
};

export default IssueList;