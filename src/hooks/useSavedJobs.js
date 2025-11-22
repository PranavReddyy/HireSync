import { useState, useEffect } from "react";
import { STORAGE_KEYS } from "../utils/constants";

/**
 * Custom hook to manage saved jobs in localStorage
 */
const useSavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  // Load saved jobs from localStorage on mount
  useEffect(() => {
    const loadSavedJobs = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
        if (saved) {
          setSavedJobs(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Error loading saved jobs:", error);
      }
    };

    loadSavedJobs();
  }, []);

  // Save job to localStorage
  const saveJob = (job) => {
    try {
      const isAlreadySaved = savedJobs.some((saved) => saved.id === job.id);

      if (isAlreadySaved) {
        return false; // Already saved
      }

      const updatedJobs = [...savedJobs, job];
      localStorage.setItem(
        STORAGE_KEYS.SAVED_JOBS,
        JSON.stringify(updatedJobs)
      );
      setSavedJobs(updatedJobs);
      return true; // Successfully saved
    } catch (error) {
      console.error("Error saving job:", error);
      return false;
    }
  };

  // Remove job from localStorage
  const unsaveJob = (jobId) => {
    try {
      const updatedJobs = savedJobs.filter((job) => job.id !== jobId);
      localStorage.setItem(
        STORAGE_KEYS.SAVED_JOBS,
        JSON.stringify(updatedJobs)
      );
      setSavedJobs(updatedJobs);
      return true;
    } catch (error) {
      console.error("Error removing saved job:", error);
      return false;
    }
  };

  // Check if a job is saved
  const isJobSaved = (jobId) => {
    return savedJobs.some((job) => job.id === jobId);
  };

  // Toggle save/unsave
  const toggleSaveJob = (job) => {
    if (isJobSaved(job.id)) {
      return unsaveJob(job.id);
    } else {
      return saveJob(job);
    }
  };

  return {
    savedJobs,
    saveJob,
    unsaveJob,
    isJobSaved,
    toggleSaveJob,
  };
};

export default useSavedJobs;
