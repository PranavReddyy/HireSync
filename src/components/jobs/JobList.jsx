import JobCard from './JobCard';

const JobList = ({ jobs, loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-xl">
        <p className="text-white font-medium">Error loading jobs</p>
        <p className="text-gray-400 text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-semibold text-white mb-2">
          No jobs found
        </h3>
        <p className="text-gray-400">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400">
        {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'}
      </p>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
