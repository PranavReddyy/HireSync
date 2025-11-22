import { useState } from 'react';
import { JobContext } from './JobContextDefinition';
import { SALARY_RANGES } from '../utils/constants';

export const JobProvider = ({ children }) => {
  // Filter state
  const [filters, setFilters] = useState({
    location: 'All Locations',
    salaryMin: SALARY_RANGES.MIN,
    salaryMax: SALARY_RANGES.MAX,
    jobType: 'All Types',
    workMode: 'All Modes',
    searchQuery: ''
  });

  // Update individual filter
  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Update multiple filters at once
  const updateFilters = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  // Reset all filters to default
  const resetFilters = () => {
    setFilters({
      location: 'All Locations',
      salaryMin: SALARY_RANGES.MIN,
      salaryMax: SALARY_RANGES.MAX,
      jobType: 'All Types',
      workMode: 'All Modes',
      searchQuery: ''
    });
  };

  const value = {
    filters,
    updateFilter,
    updateFilters,
    resetFilters
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};
