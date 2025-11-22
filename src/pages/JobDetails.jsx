import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { SUPABASE_CONFIG, getSupabaseHeaders } from '../utils/constants';
import useSavedJobs from '../hooks/useSavedJobs';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const { isJobSaved, toggleSaveJob } = useSavedJobs();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${SUPABASE_CONFIG.REST_ENDPOINT}/jobs?id=eq.${id}&select=*,companies(*)`,
          {
            headers: getSupabaseHeaders()
          }
        );

        if (response.data && response.data.length > 0) {
          setJob(response.data[0]);
          
          // Check if user has already applied
          if (isAuthenticated && user) {
            const appResponse = await axios.get(
              `${SUPABASE_CONFIG.REST_ENDPOINT}/applications?job_id=eq.${id}&user_id=eq.${user.id}`,
              {
                headers: getSupabaseHeaders()
              }
            );
            setHasApplied(appResponse.data.length > 0);
          }
        } else {
          setError('Job not found');
        }
      } catch (err) {
        console.error('Error fetching job:', err);
        setError(err.message || 'Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, isAuthenticated, user]);

  const handleSaveClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (job) {
      const wasSaved = isJobSaved(job.id);
      toggleSaveJob(job);
      if (!wasSaved) {
        toast.success('Job saved successfully');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center px-4">
          <h2 className="text-2xl font-bold text-white mb-2">Job Not Found</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-white text-black rounded-xl hover:bg-gray-200 font-medium transition-all"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const saved = isJobSaved(job.id);

  return (
    <div className="py-6 md:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-4 md:mb-6 text-gray-400 hover:text-white font-medium flex items-center gap-2 transition-colors"
        >
          ← Back
        </button>

        {/* Job Header */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 lg:p-8 mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4 md:mb-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {job.title}
              </h1>
              <Link 
                to={`/companies/${job.company_id}`}
                className="text-lg md:text-xl text-gray-400 font-medium mb-3 md:mb-4 hover:text-white transition-colors inline-block"
              >
                {job.companies?.name || job.company_name}
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3 md:mb-4 mt-3">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs md:text-sm font-medium border border-blue-500/20">
                  {job.location}
                </span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs md:text-sm font-medium border border-blue-500/20">
                  {job.work_mode}
                </span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs md:text-sm font-medium border border-blue-500/20">
                  {job.job_type}
                </span>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveClick}
              className="p-3 hover:bg-white/5 rounded-xl transition-colors"
              aria-label={saved ? 'Unsave job' : 'Save job'}
            >
              {saved ? (
                <BookmarkSolid className="w-6 h-6 text-white" />
              ) : (
                <BookmarkOutline className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>

          {/* Salary */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-400 font-medium mb-1">Annual Salary</p>
            <p className="text-3xl font-bold text-white">
              ₹{job.salary_min_lpa} - {job.salary_max_lpa} LPA
            </p>
          </div>

          {/* Apply Button */}
          <button
            onClick={async () => {
              if (!isAuthenticated) {
                navigate('/login', { state: { from: `/jobs/${id}` } });
                return;
              }

              if (hasApplied) return;

              try {
                setApplying(true);
                await axios.post(
                  `${SUPABASE_CONFIG.REST_ENDPOINT}/applications`,
                  {
                    job_id: job.id,
                    user_id: user.id,
                    status: 'Applied'
                  },
                  {
                    headers: {
                      ...getSupabaseHeaders(),
                      'Prefer': 'return=minimal'
                    }
                  }
                );
                setHasApplied(true);
                toast.success('Application submitted successfully!');
              } catch (err) {
                console.error('Error applying:', err);
                toast.error('Failed to submit application. Please try again.');
              } finally {
                setApplying(false);
              }
            }}
            disabled={hasApplied || applying}
            className={`w-full px-8 py-3 rounded-xl font-medium transition-all text-sm ${
              hasApplied
                ? 'bg-green-500/10 text-green-400 cursor-not-allowed border border-green-500/30'
                : applying
                ? 'bg-blue-500/20 text-blue-400 cursor-wait border border-blue-500/30'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {hasApplied ? '✓ Applied' : applying ? 'Applying...' : 'Apply now'}
          </button>

          {/* Experience & Posted Date */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            {job.experience_yrs && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Experience</p>
                <p className="text-lg font-semibold text-white">{job.experience_yrs}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500 mb-1">Posted</p>
              <p className="text-lg font-semibold text-white">
                {formatDate(job.posted_date)}
              </p>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Description</h2>
          <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed">
              {job.description || 'Join our team and make an impact. This role offers an exciting opportunity to work with cutting-edge technologies and contribute to meaningful projects.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
