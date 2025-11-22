import { useNavigate } from 'react-router-dom';
import JobCard from '../components/jobs/JobCard';
import useSavedJobs from '../hooks/useSavedJobs';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

const SavedJobs = () => {
  const { savedJobs } = useSavedJobs();
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Saved Jobs</h1>
          <p className="text-gray-400">
            Jobs you've bookmarked
          </p>
        </div>

        {savedJobs.length === 0 ? (
          <div className="text-center py-12 md:py-20">
            <h3 className="text-xl font-semibold text-white mb-2">
              No saved jobs yet
            </h3>
            <p className="text-gray-400 mb-6">
              Start saving jobs you're interested in
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-200 font-medium transition-all"
            >
              Browse jobs
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-400 mb-4">
              {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'}
            </p>
            <div className="grid gap-4">
              {savedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
