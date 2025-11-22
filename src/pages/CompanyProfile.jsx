import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { SUPABASE_CONFIG, getSupabaseHeaders } from '../utils/constants';
import JobCard from '../components/jobs/JobCard';

const CompanyProfile = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);

        // Fetch company details
        const companyResponse = await axios.get(
          `${SUPABASE_CONFIG.REST_ENDPOINT}/companies?id=eq.${id}`,
          { headers: getSupabaseHeaders() }
        );

        if (companyResponse.data && companyResponse.data.length > 0) {
          setCompany(companyResponse.data[0]);

          // Fetch jobs for this company
          const jobsResponse = await axios.get(
            `${SUPABASE_CONFIG.REST_ENDPOINT}/jobs?company_id=eq.${id}&order=posted_date.desc`,
            { headers: getSupabaseHeaders() }
          );

          setJobs(jobsResponse.data);
        } else {
          setError('Company not found');
        }
      } catch (err) {
        console.error('Error fetching company:', err);
        setError(err.message || 'Failed to fetch company details');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center px-4">
          <h2 className="text-2xl font-bold text-white mb-2">Company not found</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <Link to="/" className="text-white hover:text-gray-300 font-medium transition-colors">
            ← Back to jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Header */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Company Logo */}
            <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              {company.logo_url ? (
                <img
                  src={company.logo_url}
                  alt={company.name}
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <span className="text-white text-3xl font-bold">
                  {company.name?.charAt(0).toUpperCase() || 'C'}
                </span>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {company.name}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-4">
                {company.location && (
                  <span className="px-3 py-1 bg-white/10 text-white rounded-lg text-sm font-medium">
                    {company.location}
                  </span>
                )}
                {company.website_url && (
                  <a
                    href={company.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-all"
                  >
                    Visit website
                  </a>
                )}
              </div>

              {company.about_text && (
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-white mb-2">About</h2>
                  <p className="text-gray-300 leading-relaxed">{company.about_text}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Jobs Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 md:mb-6">
            Open positions ({jobs.length})
          </h2>

          {jobs.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
              <p className="text-gray-400">No active job openings at the moment</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
