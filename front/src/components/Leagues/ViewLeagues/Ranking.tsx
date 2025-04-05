import { Participant } from "@/types";
import { motion } from "framer-motion";
import { GiPodiumWinner as GiPodium } from "react-icons/gi";

const Ranking = ({ participants }: { participants: Participant[] }) => (
  <div className="bg-gradient-to-br from-white to-red-50 rounded-3xl p-8 shadow-lg border border-red-500/30">
    <h2 className="text-3xl font-black text-red-500 mb-6 flex items-center gap-3">
      <GiPodium className="text-4xl" /> League Ranking
    </h2>
    <div className="space-y-4">
      {[...participants]
        .sort((a, b) => b.score - a.score)
        .map((participant, index) => (
          <motion.div
            key={participant.id}
            className="p-4 rounded-xl bg-white/80 backdrop-blur-sm flex justify-between items-center hover:bg-white/90 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span
                className={`text-2xl font-bold ${
                  index === 0
                    ? "text-yellow-500"
                    : index === 1
                    ? "text-gray-500"
                    : index === 2
                    ? "text-amber-500"
                    : "text-red-500"
                }`}
              >
                {index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : `#${index + 1}`}
              </span>
              <span className="text-xl font-medium text-black">
                {participant.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500 font-bold">
                {participant.score}
              </span>
            </div>
          </motion.div>
        ))}
    </div>
  </div>
);

export default Ranking;
