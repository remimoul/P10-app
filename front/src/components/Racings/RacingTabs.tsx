"use client";

import { motion } from "framer-motion";

interface RacingTabsProps {
  activeTab: "upcoming" | "past";
  onTabChange: (tab: "upcoming" | "past") => void;
}

export const RacingTabs = ({ activeTab, onTabChange }: RacingTabsProps) => {
  return (
    <div className="relative flex border-b border-gray-200">
      {["upcoming", "past"].map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab as "upcoming" | "past")}
          className={`w-1/2 py-3 text-sm font-semibold transition-colors duration-300 ${
            activeTab === tab ? "text-red-600" : "text-gray-400"
          }`}
        >
          {tab === "upcoming" ? "À venir" : "Passées"}
        </button>
      ))}

      {/* Barre animée */}
      <motion.div
        layout
        className="absolute bottom-0 h-1 bg-red-600 w-1/2"
        animate={{ x: activeTab === "upcoming" ? "0%" : "100%" }}
        transition={{ type: "tween", stiffness: 300, damping: 30 }}
      />
    </div>
  );
};
