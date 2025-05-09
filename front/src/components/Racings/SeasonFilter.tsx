"use client";

import { SeasonFilterProps } from "@/lib/types";

export const SeasonFilter = ({
  seasons,
  selected,
  onChange,
}: SeasonFilterProps) => {
  return (
    <div className="w-full max-w-xs mx-auto">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-3xl border border-gray-300 text-lg shadow-sm text-gray-800 
        focus:outline-none focus:border-[var(--primary-red)] focus:ring-1 focus:ring-[var(--primary-red)]/50"
      >
        <option value="">All seasons</option>
        {seasons.map((season) => (
          <option key={season} value={season}>
            Season {season}
          </option>
        ))}
      </select>
    </div>
  );
};
