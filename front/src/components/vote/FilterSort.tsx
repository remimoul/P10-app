import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FilterOptions } from "@/lib/types/vote";

interface FilterSortProps {
  onFilterChange: (filters: FilterOptions) => void;
  teams?: string[];
}

export const FilterSort = ({ onFilterChange, teams }: FilterSortProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    sortBy: "averagePosition",
    sortOrder: "asc",
    teamFilter: "all",
    minPoints: 0,
    maxPoints: 500,
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (
    key: keyof FilterOptions,
    value: string | number
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="w-full max-w-xs">
          <label className="block text-lg font-medium mb-2 text-gray-700">Search</label>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[var(--primary-red)] transition-colors duration-200" />
            <Input
              placeholder="Search for a driver ..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10 w-full border-2 border-gray-200 rounded-full
                focus:border-[var(--primary-red)] focus:ring-2 focus:ring-[var(--primary-red)]/20
                hover:border-[var(--primary-red)]/50 transition-all duration-200
                shadow-sm hover:shadow-md"
              style={{ minWidth: 0 }}
            />
          </div>
        </div>
        <div className="w-full max-w-xs">
          <label className="block text-lg font-medium mb-2 text-gray-700">Sort by</label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => handleFilterChange("sortBy", value)}
          >
            <SelectTrigger className="w-full border-2 border-gray-200 rounded-full
              focus:border-[var(--primary-red)] focus:ring-2 focus:ring-[var(--primary-red)]/20
              hover:border-[var(--primary-red)]/50 transition-all duration-200
              shadow-sm hover:shadow-md">
              <SelectValue placeholder="Select a criterion" />
            </SelectTrigger>
            <SelectContent className="border-2 border-gray-200 rounded-2xl shadow-lg bg-white">
              <SelectItem value="averagePosition" className="hover:bg-[var(--primary-red)]/10 focus:bg-[var(--primary-red)]/10 text-gray-800">Average position</SelectItem>
              <SelectItem value="points" className="hover:bg-[var(--primary-red)]/10 focus:bg-[var(--primary-red)]/10 text-gray-800">Points</SelectItem>
              <SelectItem value="wins" className="hover:bg-[var(--primary-red)]/10 focus:bg-[var(--primary-red)]/10 text-gray-800">Wins</SelectItem>
              <SelectItem value="teamPerformance" className="hover:bg-[var(--primary-red)]/10 focus:bg-[var(--primary-red)]/10 text-gray-800">
                Team performance
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full max-w-xs">
          <label className="block text-lg font-medium mb-2 text-gray-700">Order</label>
          <Select
            value={filters.sortOrder}
            onValueChange={(value: "asc" | "desc") =>
              handleFilterChange("sortOrder", value)
            }
          >
            <SelectTrigger className="w-full border-2 border-gray-200 rounded-full
              focus:border-[var(--primary-red)] focus:ring-2 focus:ring-[var(--primary-red)]/20
              hover:border-[var(--primary-red)]/50 transition-all duration-200
              shadow-sm hover:shadow-md">
              <SelectValue placeholder="Select order" />
            </SelectTrigger>
            <SelectContent className="border-2 border-gray-200 rounded-2xl shadow-lg bg-white">
              <SelectItem value="asc" className="hover:bg-[var(--primary-red)]/10 focus:bg-[var(--primary-red)]/10 text-gray-800">Ascending</SelectItem>
              <SelectItem value="desc" className="hover:bg-[var(--primary-red)]/10 focus:bg-[var(--primary-red)]/10 text-gray-800">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full max-w-xs">
          <label className="block text-lg font-medium mb-2 text-gray-700">Team</label>
          <Select
            value={filters.teamFilter}
            onValueChange={(value) => handleFilterChange("teamFilter", value)}
          >
            <SelectTrigger className="w-full border-2 border-gray-200 rounded-full
              focus:border-[var(--primary-red)] focus:ring-2 focus:ring-[var(--primary-red)]/20
              hover:border-[var(--primary-red)]/50 transition-all duration-200
              shadow-sm hover:shadow-md">
              <SelectValue placeholder="Select a team" />
            </SelectTrigger>
            <SelectContent className="border-2 border-gray-200 rounded-2xl shadow-lg bg-white">
              <SelectItem value="all" className="hover:bg-[var(--primary-red)]/10 focus:bg-[var(--primary-red)]/10 text-gray-800">All teams</SelectItem>
              {teams && teams.map(team => (
                <SelectItem key={team} value={team} className="hover:bg-[var(--primary-red)]/10 focus:bg-[var(--primary-red)]/10 text-gray-800">{team}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
