import { useJobContext } from '../../hooks/useJobContext';
import { INDIAN_CITIES, JOB_TYPES, WORK_MODES, SALARY_RANGES } from '../../utils/constants';
import CustomSelect from '../ui/CustomSelect';
import { useState, useEffect, useRef } from 'react';

const JobFilter = () => {
  const { filters, updateFilter, resetFilters } = useJobContext();
  
  // Local state for salary sliders to prevent flickering
  const [localSalaryMin, setLocalSalaryMin] = useState(filters.salaryMin);
  const [localSalaryMax, setLocalSalaryMax] = useState(filters.salaryMax);
  const debounceTimerRef = useRef(null);

  // Debounced update for salary filters
  useEffect(() => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      if (localSalaryMin !== filters.salaryMin || localSalaryMax !== filters.salaryMax) {
        updateFilter('salaryMin', localSalaryMin);
        updateFilter('salaryMax', localSalaryMax);
      }
    }, 500); // 500ms debounce

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [localSalaryMin, localSalaryMax, filters.salaryMin, filters.salaryMax, updateFilter]);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Location Filter */}
      <CustomSelect
        label="Location"
        value={filters.location}
        onChange={(value) => updateFilter('location', value)}
        options={INDIAN_CITIES}
      />

      {/* Work Mode Filter */}
      <CustomSelect
        label="Work Mode"
        value={filters.workMode}
        onChange={(value) => updateFilter('workMode', value)}
        options={WORK_MODES}
      />

      {/* Job Type Filter */}
      <CustomSelect
        label="Job Type"
        value={filters.jobType}
        onChange={(value) => updateFilter('jobType', value)}
        options={JOB_TYPES}
      />

      {/* Salary Range Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Salary Range (LPA)
        </label>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-2">
              Min: <span className="text-blue-400 font-medium">₹{localSalaryMin}</span> LPA
            </label>
            <input
              type="range"
              min={SALARY_RANGES.MIN}
              max={SALARY_RANGES.MAX}
              step={SALARY_RANGES.STEP}
              value={localSalaryMin}
              onChange={(e) => setLocalSalaryMin(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-2">
              Max: <span className="text-blue-400 font-medium">₹{localSalaryMax}</span> LPA
            </label>
            <input
              type="range"
              min={SALARY_RANGES.MIN}
              max={SALARY_RANGES.MAX}
              step={SALARY_RANGES.STEP}
              value={localSalaryMax}
              onChange={(e) => setLocalSalaryMax(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
