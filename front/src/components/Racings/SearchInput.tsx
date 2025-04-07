"use client";

import { ChangeEvent } from "react";
import { Search, X } from "lucide-react";
import { SearchInputProps } from "@/types";

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange("");
  };

  const isActive = value.trim().length > 0;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Search
        className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200
          ${isActive ? "text-red-500" : "text-gray-400"}`}
      />

      {isActive && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <input
        type="text"
        placeholder="Search a circuit or country ..."
        value={value}
        onChange={handleChange}
        className={`w-full pl-10 pr-8 py-2 text-sm rounded-md border transition-all
          placeholder-gray-400 text-gray-900 shadow-md
          ${
            isActive
              ? "border-red-500 ring-1 ring-red-500"
              : "border-gray-300 focus:border-red-500 focus:ring-red-500"
          }
          focus:outline-none`}
      />
    </div>
  );
};
