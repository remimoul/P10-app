"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { VoteTabsProps } from "@/lib/types/vote";

const tabs = [
  { key: "Info", label: "Info" },
  { key: "Vote", label: "Vote" },
] as const;

export const VoteTabs = ({ activeTab, onTabChange }: VoteTabsProps) => {
  const idPrefix = useId();

  return (
    <div className="relative flex w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-md">
      {tabs.map(({ key, label }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            id={`${idPrefix}-${key}`}
            onClick={() => onTabChange(key)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`${idPrefix}-panel`}
            className={`relative z-10 w-1/2 py-3 text-lg font-bold uppercase tracking-wide transition-colors duration-300
              ${
                isActive ? "text-red-600" : "text-gray-400 hover:text-gray-700"
              }`}
          >
            {label}
          </button>
        );
      })}

      <motion.div
        layout
        className="absolute bottom-0 left-0 h-[3px] w-1/2 bg-red-600"
        animate={{ x: activeTab === "Info" ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      />
    </div>
  );
};
