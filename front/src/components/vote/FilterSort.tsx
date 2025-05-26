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
          <label className="block text-sm font-medium mb-2">Rechercher</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher un pilote ..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10 w-full"
              style={{ minWidth: 0 }}
            />
          </div>
        </div>
        <div className="w-full max-w-xs">
          <label className="block text-sm font-medium mb-2">Trier par</label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => handleFilterChange("sortBy", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner un critère" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="averagePosition">Position moyenne</SelectItem>
              <SelectItem value="points">Points</SelectItem>
              <SelectItem value="wins">Victoires</SelectItem>
              <SelectItem value="teamPerformance">
                Performance écurie
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full max-w-xs">
          <label className="block text-sm font-medium mb-2">Ordre</label>
          <Select
            value={filters.sortOrder}
            onValueChange={(value: "asc" | "desc") =>
              handleFilterChange("sortOrder", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner l'ordre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Croissant</SelectItem>
              <SelectItem value="desc">Décroissant</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full max-w-xs">
          <label className="block text-sm font-medium mb-2">Écurie</label>
          <Select
            value={filters.teamFilter}
            onValueChange={(value) => handleFilterChange("teamFilter", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner une écurie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les écuries</SelectItem>
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
