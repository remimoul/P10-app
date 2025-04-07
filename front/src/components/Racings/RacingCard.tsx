"use client";

import { motion } from "framer-motion";
import { RacingCardProps } from "@/types";
import { format } from "date-fns";

export const RacingCard = ({ grandPrix, isPast }: RacingCardProps) => {
  const date = new Date(grandPrix.date);
  const day = format(date, "dd");
  const month = format(date, "MMM").toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.01,
        boxShadow: "0px 8px 24px rgba(255, 46, 46, 0.25)",
        borderColor: "#ff2e2e",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.6,
      }}
      className="bg-[#121212] border border-[#2a2a2a] rounded-xl px-4 py-4 text-white font-mono w-full h-full"
    >
      <div className="grid grid-cols-[50px_1fr_auto] items-start gap-4 h-full">
        <div className="flex flex-col items-center sm:items-start leading-tight">
          <span className="text-2xl font-extrabold text-[#FF3C38]">{day}</span>
          <span className="text-[11px] text-gray-400 tracking-wider">
            {month}
          </span>
        </div>

        <div className="flex flex-col justify-start overflow-hidden">
          <p className="text-[#00FFD1] text-[10px] uppercase font-bold tracking-wider mb-1">
            Season {grandPrix.season}
          </p>
          <p className="text-base font-semibold text-white truncate leading-tight">
            {grandPrix.track.countryName}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {grandPrix.track.trackName}
          </p>
        </div>

        <div className="flex flex-col items-end justify-start gap-2 min-w-[110px]">
          <div className="text-[#FF3C38] text-lg font-extrabold leading-none">
            &gt;
          </div>

          <div className="flex flex-wrap justify-end gap-2 min-h-[30px]">
            {isPast && grandPrix.ranking ? (
              grandPrix.ranking
                .filter((rank) => rank.isDNF || rank.position === 10)
                .map((rank) => (
                  <span
                    key={rank.id}
                    className={`inline-flex items-center gap-1 px-2.5 py-[4px] text-[11px] rounded-full font-bold uppercase tracking-wide
              ${
                rank.isDNF
                  ? "bg-green-700 text-green-100"
                  : "bg-red-700 text-red-100"
              }`}
                  >
                    <span className="text-[11px] font-extrabold">
                      {rank.isDNF ? "DNF" : "P10"}
                    </span>
                    <span className="text-[11px] font-medium">
                      {rank.pilot.acronym}
                    </span>
                  </span>
                ))
            ) : (
              <span className="text-[11px] text-gray-600 italic">—</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
