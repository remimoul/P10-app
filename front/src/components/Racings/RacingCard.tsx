"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { RacingCardProps } from "@/lib/types/racing";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

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
      className="relative bg-gradient-to-b from-neutral-900 via-neutral-900 to-black border-t-2 rounded-2xl w-full max-w-[320px] h-[150px] flex flex-col justify-center p-5 shadow-inner cursor-pointer overflow-hidden group transition-transform duration-200 hover:scale-105 hover:shadow-red-600"
      style={{ minHeight: 150 }}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern
              id="f1-checker"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="8"
                height="8"
                fill="#fff"
                fillOpacity="0.025"
              />
              <rect
                x="8"
                y="8"
                width="8"
                height="8"
                fill="#fff"
                fillOpacity="0.025"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#f1-checker)" />
        </svg>
        <div className="absolute left-0 top-0 w-2/3 h-1/2 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-full blur-2xl" />
      </div>

      <div className="absolute left-2 right-2 top-0 h-5 bg-gradient-to-b from-white/10 to-transparent rounded-t-xl pointer-events-none z-10" />

      <div className="absolute right-5 top-4 z-20">
        <span className="bg-red-900/40 text-[var(--secondary-red)] text-sm px-3 py-0.5 rounded-full font-medium tracking-wide shadow-sm">
          Season {grandPrix.season}
        </span>
      </div>

      {isPast && (
        <motion.div
          className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center bg-black/30 rounded-full p-2 group-hover:bg-[var(--primary-red)]/80 transition-colors duration-200"
          whileHover={{ x: 16 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
        >
          <HiOutlineArrowNarrowRight className="w-6 h-6 text-[var(--secondary-red)] group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.7)] transition-all duration-300" />
        </motion.div>
      )}

      <div className="flex flex-row items-center gap-4 z-10">
        <div className="flex flex-col items-center min-w-[40px]">
          <span className="text-2xl font-extrabold text-[var(--primary-red)] leading-none">
            {day}
          </span>
          <span className="text-xl text-[var(--primary-grey)] tracking-widest mt-0.5 font-medium">
            {month}
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <span className="text-lg font-bold text-white leading-tight mb-0.5">
            {grandPrix.ergastData?.raceName || grandPrix.track.countryName}
          </span>
          <span className="text-lg text-[var(--primary-white)] leading-tight">
            {grandPrix.ergastData?.circuit?.name || grandPrix.track.trackName}
          </span>
          {grandPrix.ergastData?.circuit?.location?.locality &&
            grandPrix.ergastData?.circuit?.location?.country && (
              <span className="text-sm text-[var(--primary-grey)] mt-0.5 block">
                {grandPrix.ergastData.circuit.location.locality},{" "}
                {grandPrix.ergastData.circuit.location.country}
              </span>
            )}
        </div>
      </div>
    </motion.div>
  );
};
