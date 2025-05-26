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
          <label className="block text-sm font-medium mb-2">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search for a driver ..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10 w-full"
              style={{ minWidth: 0 }}
            />
          </div>
        </div>
        <div className="w-full max-w-xs">
          <label className="block text-sm font-medium mb-2">Sort by</label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => handleFilterChange("sortBy", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a criterion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="averagePosition">Average position</SelectItem>
              <SelectItem value="points">Points</SelectItem>
              <SelectItem value="wins">Wins</SelectItem>
              <SelectItem value="teamPerformance">
                Team performance
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full max-w-xs">
          <label className="block text-sm font-medium mb-2">Order</label>
          <Select
            value={filters.sortOrder}
            onValueChange={(value: "asc" | "desc") =>
              handleFilterChange("sortOrder", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full max-w-xs">
          <label className="block text-sm font-medium mb-2">Team</label>
          <Select
            value={filters.teamFilter}
            onValueChange={(value) => handleFilterChange("teamFilter", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All teams</SelectItem>
              {teams && teams.map(team => (
                <SelectItem key={team} value={team}>{team}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
