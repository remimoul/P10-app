"use client";

import { ChangeEvent, useState } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInputProps } from "@/lib/types";

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange("");
  };

  const isActive = value.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative w-full"
    >
      <motion.div
        initial={false}
        animate={{
          color: isActive || isFocused ? "#ef4444" : "#9ca3af",
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 top-1/2 -translate-y-1/2"
      >
        <Search className="w-5 h-5" />
      </motion.div>

      <AnimatePresence>
        {isActive && (
          <motion.button
            key="clear"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search for a circuit or country ..."
        className={`w-full pl-12 pr-10 py-2.5 text-lg font-medium rounded-xl border
          transition-all duration-200 bg-white shadow-md
          placeholder-gray-400 text-gray-800 focus:outline-none
          ${
            isActive || isFocused
              ? "border-red-500 ring-2 ring-red-500"
              : "border-gray-300 hover:border-gray-400"
          }`}
      />
    </motion.div>
  );
};
