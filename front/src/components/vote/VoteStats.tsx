import { motion } from "framer-motion";
import { DriverStats } from "@/lib/types/drivers";

interface VoteStatsProps {
  totalVotes: number;
  totalParticipants: number;
  topVotedDrivers: { driverId: string; votes: number }[];
  drivers: DriverStats[];
}

export const VoteStats = ({
  totalVotes,
  totalParticipants,
  topVotedDrivers,
  drivers,
}: VoteStatsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-white to-red-50 rounded-3xl p-8 shadow-lg border border-red-500/30 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
      <div className="relative z-10">
        <h3 className="text-3xl font-black text-[var(--primary-red)] mb-8">
          Statistiques globales
        </h3>
        <div className="space-y-6">
          <div className="group relative p-4 rounded-2xl bg-white/80 backdrop-blur-sm flex justify-between items-center hover:bg-white/90 transition-all duration-300 border border-transparent hover:border-red-500/20">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xl font-medium text-black group-hover:text-[var(--secondary-red)] transition-colors">
              Total des votes
            </span>
            <span className="text-2xl font-bold text-[var(--primary-red)]">
              {totalVotes}
            </span>
          </div>
          <div className="group relative p-4 rounded-2xl bg-white/80 backdrop-blur-sm flex justify-between items-center hover:bg-white/90 transition-all duration-300 border border-transparent hover:border-red-500/20">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xl font-medium text-black group-hover:text-[var(--secondary-red)] transition-colors">
              Participants
            </span>
            <span className="text-2xl font-bold text-[var(--primary-red)]">
              {totalParticipants}
            </span>
          </div>
          <div className="group relative p-4 rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 border border-transparent hover:border-red-500/20">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xl font-medium text-black group-hover:text-[var(--secondary-red)] transition-colors mb-4">
              Pilotes les plus votés
            </span>
            <div className="space-y-3">
              {topVotedDrivers.map((driver, index) => (
                <div
                  key={driver.driverId}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[var(--primary-red)]">
                      #{index + 1}
                    </span>
                    <span className="text-gray-700">
                      {
                        drivers.find((d) => d.driverId === driver.driverId)
                          ?.name
                      }
                    </span>
                  </div>
                  <span className="text-lg font-bold text-[var(--primary-red)]">
                    {driver.votes} votes
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
