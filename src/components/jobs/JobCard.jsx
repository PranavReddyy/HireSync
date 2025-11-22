import { Link, useNavigate } from 'react-router-dom';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import useSavedJobs from '../../hooks/useSavedJobs';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

const JobCard = ({ job }) => {
  const { isJobSaved, toggleSaveJob } = useSavedJobs();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const saved = isJobSaved(job.id);

  const handleSaveClick = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    toggleSaveJob(job);
    if (!saved) {
      toast.success('Job saved successfully');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-IN');
  };

  return (
    <Link to={`/jobs/${job.id}`}>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:border-blue-500/30 hover:bg-white/10 transition-all duration-200 cursor-pointer group">
        {/* Main Content - Left and Right Split */}
        <div className="flex items-start justify-between gap-6">
          {/* Left Side - Job Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                {job.title}
              </h3>
              <span className="px-2.5 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded text-xs font-medium shrink-0">
                ₹{job.salary_min_lpa}-{job.salary_max_lpa}L
              </span>
            </div>
            
            <Link
              to={`/companies/${job.company_id}`}
              onClick={(e) => e.stopPropagation()}
              className="text-gray-400 hover:text-white transition-colors text-sm inline-block mb-2"
            >
              {job.companies?.name || job.company_name}
            </Link>

            {/* Description */}
            {job.description && (
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                {job.description}
              </p>
            )}

            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{job.location}</span>
              <span>•</span>
              <span>{job.work_mode}</span>
              <span>•</span>
              <span>{job.job_type}</span>
              {job.experience_yrs && (
                <>
                  <span>•</span>
                  <span>{job.experience_yrs}</span>
                </>
              )}
            </div>
          </div>

          {/* Right Side - Date and Save */}
          <div className="flex flex-col items-end gap-3 shrink-0">
            <button
              onClick={handleSaveClick}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label={saved ? 'Unsave job' : 'Save job'}
            >
              {saved ? (
                <BookmarkSolid className="w-5 h-5 text-blue-400" />
              ) : (
                <BookmarkOutline className="w-5 h-5 text-gray-400 group-hover:text-gray-300" />
              )}
            </button>
            
            <span className="text-xs text-gray-500">
              {formatDate(job.posted_date)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
