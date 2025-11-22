import { useJobContext } from '../hooks/useJobContext';
import useFetchJobs from '../hooks/useFetchJobs';
import JobFilter from '../components/jobs/JobFilter';
import JobList from '../components/jobs/JobList';

const Home = () => {
  const { filters, updateFilter } = useJobContext();
  const { jobs, loading, error } = useFetchJobs(filters);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white/5 to-transparent border-b border-white/10 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Find your next role
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-10">
            Discover opportunities at top companies
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Search by job title or company..."
                value={filters.searchQuery}
                onChange={(e) => updateFilter('searchQuery', e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
              <button className="px-6 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-all whitespace-nowrap">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-20">
              <JobFilter />
            </div>
          </div>

          {/* Main Content - Job List */}
          <div className="lg:col-span-3">
            <JobList jobs={jobs} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
