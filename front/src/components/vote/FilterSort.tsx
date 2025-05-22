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
import { Slider } from "@/components/ui/slider";

interface FilterSortProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  search: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  teamFilter: string;
  minPoints: number;
  maxPoints: number;
}

export const FilterSort = ({ onFilterChange }: FilterSortProps) => {
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

  const handlePointsChange = (values: number[]) => {
    setFilters((prev) => ({
      ...prev,
      minPoints: values[0],
      maxPoints: values[1],
    }));
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Rechercher un pilote..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pl-10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Trier par</label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => handleFilterChange("sortBy", value)}
          >
            <SelectTrigger>
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

        <div>
          <label className="block text-sm font-medium mb-2">Ordre</label>
          <Select
            value={filters.sortOrder}
            onValueChange={(value: "asc" | "desc") =>
              handleFilterChange("sortOrder", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner l'ordre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Croissant</SelectItem>
              <SelectItem value="desc">Décroissant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Écurie</label>
          <Select
            value={filters.teamFilter}
            onValueChange={(value) => handleFilterChange("teamFilter", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une écurie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les écuries</SelectItem>
              <SelectItem value="red_bull">Red Bull Racing</SelectItem>
              <SelectItem value="mercedes">Mercedes</SelectItem>
              <SelectItem value="ferrari">Ferrari</SelectItem>
              <SelectItem value="mclaren">McLaren</SelectItem>
              <SelectItem value="alpine">Alpine</SelectItem>
              <SelectItem value="aston_martin">Aston Martin</SelectItem>
              <SelectItem value="williams">Williams</SelectItem>
              <SelectItem value="alfa">Alfa Romeo</SelectItem>
              <SelectItem value="haas">Haas F1 Team</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Points</label>
          <span className="text-sm text-gray-500">
            {filters.minPoints} - {filters.maxPoints}
          </span>
        </div>
        <Slider
          defaultValue={[filters.minPoints, filters.maxPoints]}
          max={500}
          step={1}
          value={[filters.minPoints, filters.maxPoints]}
          onValueChange={handlePointsChange}
          className="w-full"
        />
      </div>
    </div>
  );
};
