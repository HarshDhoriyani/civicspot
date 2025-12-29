import { Link } from 'react-router-dom';
import { formatDate, getCategoryInfo, getStatusInfo, truncateText } from '../../utils/helpers';
import { ISSUE_CATEGORIES, ISSUE_STATUS } from '../../utils/constants';

const IssueCard = ({ issue }) => {
  const category = getCategoryInfo(issue.category, ISSUE_CATEGORIES);
  const status = getStatusInfo(issue.status, ISSUE_STATUS);

  return (
    <Link to={`/issues/${issue._id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1">
        {/* Image */}
        {issue.images && issue.images.length > 0 ? (
          <div className="relative h-48 overflow-hidden">
            <img
              src={issue.images[0].url}
              alt={issue.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                {status.label}
              </span>
            </div>
          </div>
        ) : (
          <div className="h-48 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-6xl opacity-50">{category.icon}</span>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`${category.color} text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(issue.createdAt)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2  group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {truncateText(issue.title, 60)}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {truncateText(issue.description, 100)}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>📍</span>
              <span className="truncate">{truncateText(issue.location.address, 30)}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <span>👍</span>
                <span>{issue.upvoteCount || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>💬</span>
                <span>{issue.comments?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default IssueCard;