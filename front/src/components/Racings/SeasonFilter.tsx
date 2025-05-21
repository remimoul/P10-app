"use client";

import { SeasonFilterProps } from "@/lib/types/racing";
import { ChevronDownIcon } from "lucide-react";

export const SeasonFilter = ({
  seasons,
  selected,
  onChange,
}: SeasonFilterProps) => {
  return (
    <div className="w-full max-w-xs mx-auto relative">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 pr-10 py-2 rounded-3xl border border-[var(--secondary-gray)] text-lg text-semibold shadow-lg text-black appearance-none focus:outline-none focus:border-[var(--primary-red)] focus:ring-1 focus:ring-[var(--primary-red)]/50"
      >
        <option value="">All seasons</option>
        {seasons.map((season) => (
          <option key={season} value={season}>
            Season {season}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--primary-gray)]">
        <ChevronDownIcon className="w-5 h-5 text-semibold" />
      </div>
    </div>
  );
};
