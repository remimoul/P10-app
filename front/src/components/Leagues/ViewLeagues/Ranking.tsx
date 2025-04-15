import { Participant } from "@/lib/types";
import { motion } from "framer-motion";
import { GiPodiumWinner as GiPodium } from "react-icons/gi";

const Ranking = ({ participants }: { participants: Participant[] }) => (
  <div className="relative bg-gradient-to-br from-white to-red-50 rounded-3xl p-8 shadow-lg border border-red-500/30 overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />
    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />

    <div className="relative z-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <GiPodium className="text-4xl text-red-500" />
          <div className="flex flex-col">
            <h2 className="text-3xl font-black text-red-500">League Ranking</h2>
            <span className="text-sm text-red-500/70">Season 2024</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-red-500/70">
          <span className="text-sm uppercase tracking-wider">
            Total Players
          </span>
          <span className="text-xl font-bold">{participants.length}</span>
        </div>
      </div>

      <div className="space-y-4">
        {[...participants]
          .sort((a, b) => b.score - a.score)
          .map((participant, index) => (
            <motion.div
              key={participant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative p-4 rounded-full bg-white/80 backdrop-blur-sm flex justify-between items-center hover:bg-white/90 transition-all duration-300 border border-transparent hover:border-red-500/20"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center">
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
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-medium text-black group-hover:text-red-500 transition-colors">
                    {participant.name}
                  </span>
                  <span className="text-lg text-[#EF233C]/70">
                    {index === 0
                      ? "Champion"
                      : index === 1
                      ? "Runner-up"
                      : index === 2
                      ? "Third place"
                      : `Position ${index + 1}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-red-500 font-bold text-xl">
                    {participant.score}
                  </span>
                  <span className="text-sm text-red-500/70 uppercase tracking-wider">
                    pts
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  </div>
);

export default Ranking;
