import { Link } from 'react-router-dom';
import { formatDate, getCategoryInfo, getStatusInfo, truncateText } from '../../utils/helpers';
import { ISSUE_CATEGORIES, ISSUE_STATUS } from '../../utils/constants';

const STATUS_STYLES = {
  pending:     { bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)',  color: '#fbbf24' },
  in_progress: { bg: 'rgba(74,127,212,0.12)',  border: 'rgba(74,127,212,0.3)',  color: '#7aa8e8' },
  resolved:    { bg: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.3)',   color: '#4ade80' },
  rejected:    { bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.3)',   color: '#f87171' },
};

const IssueCard = ({ issue }) => {
  const category = getCategoryInfo(issue.category, ISSUE_CATEGORIES);
  const status = getStatusInfo(issue.status, ISSUE_STATUS);
  const statusStyle = STATUS_STYLES[issue.status] || STATUS_STYLES.pending;

  return (
    <Link to={`/issues/${issue._id}`} className="block group h-full">
      <div
        className="h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-400 cursor-pointer"
        style={{
          background: 'rgba(17,29,51,0.6)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(12px)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.border = '1px solid rgba(20,184,166,0.2)';
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(20,184,166,0.1)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Image or placeholder */}
        {issue.images && issue.images.length > 0 ? (
          <div className="relative h-48 overflow-hidden shrink-0">
            <img
              src={issue.images[0].url}
              alt={issue.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-civic-950/80 to-transparent" />
            {/* Status badge on image */}
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: statusStyle.bg, border: `1px solid ${statusStyle.border}`, color: statusStyle.color }}>
                {status.label}
              </span>
            </div>
          </div>
        ) : (
          <div className="relative h-48 shrink-0 flex items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(17,29,51,0.8), rgba(10,17,32,0.9))' }}>
            <div className="absolute inset-0 flex items-center justify-center opacity-10 text-9xl select-none">
              {category.icon}
            </div>
            <span className="text-5xl relative z-10 opacity-60 group-hover:scale-110 transition-transform duration-300">
              {category.icon}
            </span>
            {/* Status badge */}
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: statusStyle.bg, border: `1px solid ${statusStyle.border}`, color: statusStyle.color }}>
                {status.label}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Category + Date */}
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.15)', color: '#2dd4bf' }}>
              {category.icon} {category.label}
            </span>
            <span className="text-xs text-slate-600">{formatDate(issue.createdAt)}</span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-white text-base leading-snug mb-2 group-hover:text-teal-light transition-colors line-clamp-2">
            {issue.title}
          </h3>

          {/* Description */}
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
            {issue.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs max-w-[55%]">
              <span className="text-teal-glow/70">📍</span>
              <span className="truncate">{issue.location?.address}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-slate-500 hover:text-amber-light transition-colors">
                <span>👍</span>
                <span className="font-semibold">{issue.upvoteCount || 0}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 hover:text-teal-light transition-colors">
                <span>💬</span>
                <span className="font-semibold">{issue.comments?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default IssueCard;