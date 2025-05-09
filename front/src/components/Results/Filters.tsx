import { FiltersProps } from "@/lib/types";
import { FaChevronDown } from "react-icons/fa";

const Filters = ({
  selectedSeason,
  selectedRace,
  filteredRaces,
  onSeasonChange,
  onRaceChange,
}: FiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mb-8">
      <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
        <select
          value={selectedSeason}
          onChange={(e) => onSeasonChange(e.target.value)}
          className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm hover:shadow-lg hover:shadow-red-100 transition-all duration-300 appearance-none cursor-pointer pr-10 text-lg"
        >
          {["2025", "2024", "2023"].map((season) => (
            <option key={season} value={season} className="py-2">
              {season} Season
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <FaChevronDown className="text-gray-500 text-xl group-hover:text-red-500 transition-colors duration-300" />
        </div>
      </div>

      <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
        <select
          value={selectedRace}
          onChange={(e) => onRaceChange(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm hover:shadow-lg hover:shadow-red-100 transition-all duration-300 appearance-none cursor-pointer pr-10 text-lg"
        >
          {filteredRaces.map((race) => (
            <option key={race.id} value={race.id} className="py-2">
              {race.name}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <FaChevronDown className="text-gray-500 text-xl group-hover:text-red-500 transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Filters;
