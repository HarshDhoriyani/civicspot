import IssueCard from './IssueCard';
import Loader from '../common/Loader';

const IssueList = ({ issues, loading }) => {
  if (loading) {
    return <Loader />;
  }

  if (!issues || issues.length === 0) {
    return (
      <div className="text-center py-16 glass-strong rounded-2xl border border-white/10">
        <div className="text-6xl mb-6 animate-bounce">📭</div>
        <h3 className="text-2xl font-display font-bold text-white mb-2">No issues found</h3>
        <p className="text-slate-400 max-w-md mx-auto">Try adjusting your filters or be the first to report an issue in this area!</p>
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