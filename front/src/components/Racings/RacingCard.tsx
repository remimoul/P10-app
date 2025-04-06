import { motion } from "framer-motion";
import { GrandPrix } from "@/types";
import { format } from "date-fns";

interface RacingCardProps {
  grandPrix: GrandPrix;
  isPast: boolean;
}

export const RacingCard = ({ grandPrix, isPast }: RacingCardProps) => {
  const date = new Date(grandPrix.date);
  const day = format(date, "dd");
  const month = format(date, "MMM");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        y: -4,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
      }}
      transition={{ type: "tween", stiffness: 200, damping: 10 }}
      className="bg-white rounded-xl shadow p-4 mb-4 space-y-2 cursor-pointer"
    >
      {/* Ligne : date + track info + chevron */}
      <div className="flex items-center gap-4 w-full">
        {/* Date */}
        <div className="flex flex-col items-center justify-center text-center min-w-[60px]">
          <span className="text-xl font-bold text-gray-800">{day}</span>
          <span className="text-xs text-gray-500 uppercase">{month}</span>
        </div>

        {/* Track Info */}
        <div className="flex-1">
          <p className="text-red-600 text-sm font-semibold">
            Saison {grandPrix.season}
          </p>
          <p className="text-lg sm:text-xl font-bold text-gray-900">
            {grandPrix.track.countryName}
          </p>
          <p className="text-sm text-gray-500">{grandPrix.track.trackName}</p>
        </div>

        {/* Résultats */}
        {isPast && grandPrix.ranking && (
          <div className="flex flex-wrap items-center gap-2">
            {grandPrix.ranking
              .filter((rank) => rank.isDNF || rank.position === 10)
              .map((rank) => (
                <span
                  key={rank.id}
                  className={`px-2 py-1 rounded-full text-xs flex font-semibold items-center gap-1 ${
                    rank.isDNF
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <span className="font-bold">
                    {rank.isDNF ? "DNF" : "P10"}
                  </span>
                  <span className="text-gray-700 font-semibold">
                    {rank.pilot.acronym}
                  </span>
                </span>
              ))}
          </div>
        )}
        {/* Chevron */}
        <div className="text-red-500 text-lg sm:text-xl flex items-center self-stretch">
          <span className="m-auto bold">&gt;</span>
        </div>
      </div>
    </motion.div>
  );
};
