import { useState, useEffect } from "react";
import axios from "axios";
import { SUPABASE_CONFIG, getSupabaseHeaders } from "../utils/constants";

/**
 * Custom hook to fetch jobs from Supabase REST API using Axios
 * @param {Object} filters - Filter object with location, salaryMin, salaryMax, jobType, workMode
 */
const useFetchJobs = (filters = {}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build query parameters for Supabase REST API
        const params = new URLSearchParams();

        // Select all fields
        params.append("select", "*");

        // Order by posted_date descending (newest first)
        params.append("order", "posted_date.desc");

        // Location filter (case-insensitive partial match)
        if (filters.location && filters.location !== "All Locations") {
          params.append("location", `ilike.*${filters.location}*`);
        }

        // Work Mode filter
        if (filters.workMode && filters.workMode !== "All Modes") {
          params.append("work_mode", `eq.${filters.workMode}`);
        }

        // Job Type filter
        if (filters.jobType && filters.jobType !== "All Types") {
          params.append("job_type", `eq.${filters.jobType}`);
        }

        // Salary range filter (min LPA)
        if (filters.salaryMin !== undefined && filters.salaryMin > 0) {
          params.append("salary_max_lpa", `gte.${filters.salaryMin}`);
        }

        // Salary range filter (max LPA)
        if (filters.salaryMax !== undefined && filters.salaryMax < 50) {
          params.append("salary_min_lpa", `lte.${filters.salaryMax}`);
        }

        // Search query filter (search in title and company_name)
        if (filters.searchQuery && filters.searchQuery.trim() !== "") {
          params.append(
            "or",
            `(title.ilike.*${filters.searchQuery}*,company_name.ilike.*${filters.searchQuery}*)`
          );
        }

        // Make API call using Axios
        const response = await axios.get(
          `${SUPABASE_CONFIG.REST_ENDPOINT}/jobs?${params.toString()}`,
          {
            headers: getSupabaseHeaders(),
          }
        );

        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(
          err.response?.data?.message || err.message || "Failed to fetch jobs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [
    filters.location,
    filters.salaryMin,
    filters.salaryMax,
    filters.jobType,
    filters.workMode,
    filters.searchQuery,
  ]);

  return { jobs, loading, error };
};

export default useFetchJobs;
