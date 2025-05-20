"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { RacingCardProps } from "@/lib/types";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FaMapMarkerAlt, FaFlagCheckered } from "react-icons/fa";
import { ErgastResult } from "@/lib/types/racing";

export const RacingCard = ({ grandPrix, isPast }: RacingCardProps) => {
  const router = useRouter();
  const date = new Date(grandPrix.date);
  const day = format(date, "dd");
  const month = format(date, "MMM").toUpperCase();

  const handleClick = () => {
    if (!isPast) return;
    router.push(`/racing/${grandPrix.id}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.015,
        y: -2,
        boxShadow: "0px 8px 24px rgba(255, 30, 30, 0.4)",
        borderColor: "#ff1e1e",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-neutral-900 border border-neutral-700 rounded-xl p-5 flex flex-col justify-between text-white hover:shadow-red-700/40 transition-all duration-200 cursor-pointer"
    >
      <div className="grid grid-cols-[50px_1fr_auto] items-start gap-4">
        <div className="flex flex-col items-center sm:items-start leading-tight">
          <span className="text-3xl font-extrabold text-[#ff1e1e]">{day}</span>
          <span className="text-xs text-gray-400 tracking-widest">{month}</span>
        </div>

        <div className="overflow-hidden">
          <p className="text-[11px] text-[#00FFD1] uppercase font-semibold tracking-wider mb-1">
            Season {grandPrix.season}
          </p>
          <p className="text-base font-bold truncate">
            {grandPrix.ergastData?.raceName || grandPrix.track.countryName}
          </p>
          <p className="text-sm text-gray-400 truncate">
            {grandPrix.ergastData?.circuit.name || grandPrix.track.trackName}
          </p>
          {grandPrix.ergastData?.circuit && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center text-xs text-gray-400">
                <FaMapMarkerAlt className="mr-1" />
                <span>
                  {grandPrix.ergastData.circuit.location.locality},{" "}
                  {grandPrix.ergastData.circuit.location.country}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <FaFlagCheckered className="mr-1" />
                <span>
                  {grandPrix.ergastData.circuit.length} •{" "}
                  {grandPrix.ergastData.circuit.numberOfLaps} laps
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 min-w-[110px]">
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="text-[#ff1e1e]"
          >
            <HiOutlineArrowNarrowRight className="w-5 h-5" />
          </motion.div>

          <div className="flex flex-wrap justify-end gap-2 min-h-[30px]">
            {isPast && grandPrix.ergastData?.results ? (
              grandPrix.ergastData.results.slice(0, 3).map((result: ErgastResult) => (
                <motion.span
                  key={result.driver.number}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-1 px-2.5 py-[3px] text-[11px] rounded-full font-bold uppercase tracking-wide bg-red-700 text-red-100 shadow-sm"
                >
                  <span>P{result.position}</span>
                  {result.driver.name.split(" ")[1]}
                </motion.span>
              ))
            ) : isPast && grandPrix.ranking ? (
              grandPrix.ranking
                .filter((rank) => rank.isDNF || rank.position === 10)
                .map((rank) => (
                  <motion.span
                    key={rank.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`inline-flex items-center gap-1 px-2.5 py-[3px] text-[11px] rounded-full font-bold uppercase tracking-wide
                      ${
                        rank.isDNF
                          ? "bg-green-700 text-green-100"
                          : "bg-red-700 text-red-100"
                      } shadow-sm`}
                  >
                    <span>{rank.isDNF ? "DNF" : "P10"}</span>
                    {rank.pilot.acronym}
                  </motion.span>
                ))
            ) : (
              <span className="text-xs text-gray-600 italic">—</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
