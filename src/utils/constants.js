// Indian Cities for Location Filter
export const INDIAN_CITIES = [
  "All Locations",
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Gurgaon",
  "Noida",
  "Mumbai",
  "Delhi",
  "Chennai",
  "Kolkata",
  "Remote",
];

// Salary Ranges (in Lakhs Per Annum)
export const SALARY_RANGES = {
  MIN: 0,
  MAX: 50,
  STEP: 1,
};

// Job Types
export const JOB_TYPES = [
  "All Types",
  "Full-time",
  "Contract",
  "Internship",
  "Part-time",
];

// Work Modes
export const WORK_MODES = ["All Modes", "Remote", "On-site", "Hybrid"];

// Supabase API Configuration
export const SUPABASE_CONFIG = {
  URL: import.meta.env.VITE_SUPABASE_URL,
  ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  REST_ENDPOINT: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`,
};

// LocalStorage Keys
export const STORAGE_KEYS = {
  SAVED_JOBS: "hiresync_saved_jobs",
};

// API Headers for Supabase REST API
export const getSupabaseHeaders = () => ({
  apikey: SUPABASE_CONFIG.ANON_KEY,
  Authorization: `Bearer ${SUPABASE_CONFIG.ANON_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
});
