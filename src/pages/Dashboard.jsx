import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SUPABASE_CONFIG, getSupabaseHeaders } from '../utils/constants';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchApplications = async () => {
      try {
        setLoading(true);
        
        // Fetch applications with job and company details
        const response = await axios.get(
          `${SUPABASE_CONFIG.REST_ENDPOINT}/applications?user_id=eq.${user.id}&select=*,jobs(id,title,company_id,companies(name))&order=applied_at.desc`,
          { headers: getSupabaseHeaders() }
        );

        setApplications(response.data);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError(err.message || 'Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'bg-white/10 text-white';
      case 'Shortlisted':
        return 'bg-white/20 text-white';
      case 'Interview Scheduled':
        return 'bg-white/20 text-white';
      case 'Rejected':
        return 'bg-white/5 text-gray-400';
      default:
        return 'bg-white/10 text-gray-300';
    }
  };

  const getStatusCount = (status) => {
    return applications.filter(app => app.status === status).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl backdrop-blur-xl">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Welcome back, {user?.user_metadata?.full_name || user?.email || 'User'}!
          </h1>
          <p className="text-gray-400">
            Track your job applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6">
            <p className="text-xs md:text-sm text-gray-400 mb-1">Total Applications</p>
            <p className="text-2xl md:text-3xl font-bold text-white">{applications.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6">
            <p className="text-xs md:text-sm text-gray-400 mb-1">Applied</p>
            <p className="text-2xl md:text-3xl font-bold text-white">{getStatusCount('Applied')}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6">
            <p className="text-xs md:text-sm text-gray-400 mb-1">Shortlisted</p>
            <p className="text-2xl md:text-3xl font-bold text-white">{getStatusCount('Shortlisted')}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6">
            <p className="text-xs md:text-sm text-gray-400 mb-1">Interviews</p>
            <p className="text-2xl md:text-3xl font-bold text-white">{getStatusCount('Interview Scheduled')}</p>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 md:p-6 border-b border-white/10">
            <h2 className="text-lg md:text-xl font-bold text-white">My Applications</h2>
          </div>
          
          {applications.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-400 mb-4">You haven't applied to any jobs yet</p>
              <Link
                to="/"
                className="inline-block px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-200 font-medium transition-all"
              >
                Browse jobs
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Applied On
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="text-sm font-medium text-white">
                          {app.jobs?.title || 'N/A'}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="text-sm text-gray-300">
                          {app.jobs?.companies?.name || 'N/A'}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="text-sm text-gray-400">
                          {new Date(app.applied_at).toLocaleDateString('en-IN')}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-lg ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-sm">
                        <Link
                          to={`/jobs/${app.job_id}`}
                          className="text-white hover:text-gray-300 font-medium transition-colors"
                        >
                          View Job
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
