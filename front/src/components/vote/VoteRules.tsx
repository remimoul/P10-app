import { motion } from "framer-motion";
import { RiUserAddLine, RiTimeLine, RiTrophyLine } from "react-icons/ri";

export const VoteRules = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative bg-gradient-to-br from-white to-red-50 rounded-3xl p-8 shadow-lg border border-red-500/30 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
      <div className="relative z-10">
        <h3 className="text-3xl font-black text-[var(--primary-red)] mb-8">
          Voting Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-red-50/50 backdrop-blur-sm hover:from-white hover:to-red-50 transition-all duration-300 border border-red-500/20 hover:border-red-500/40 hover:shadow-lg">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform">
                <RiUserAddLine className="text-3xl text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-6">
                How to vote?
              </h4>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-[var(--primary-red)]">
                      1
                    </span>
                  </span>
                  <span>Select the driver you think will finish 10th</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-[var(--primary-red)]">
                      2
                    </span>
                  </span>
                  <span>Click the &quot;Bet&quot; button</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-[var(--primary-red)]">
                      3
                    </span>
                  </span>
                  <span>You can change your vote until the deadline</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-red-50/50 backdrop-blur-sm hover:from-white hover:to-red-50 transition-all duration-300 border border-red-500/20 hover:border-red-500/40 hover:shadow-lg">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform">
                <RiTimeLine className="text-3xl text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-6">
                Voting Deadline
              </h4>
              <div className="flex flex-col items-center gap-4 text-gray-700">
                <div className="flex items-center gap-3 bg-red-50/50 px-6 py-4 rounded-xl">
                  <RiTimeLine className="text-2xl text-[var(--primary-red)]" />
                  <p className="text-lg">
                    Voting closes 5 minutes before the race starts
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-red-50/50 backdrop-blur-sm hover:from-white hover:to-red-50 transition-all duration-300 border border-red-500/20 hover:border-red-500/40 hover:shadow-lg">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform">
                <RiTrophyLine className="text-3xl text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-6">
                Points Allocation
              </h4>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-[var(--primary-red)]">
                      3
                    </span>
                  </span>
                  <div>
                    <span className="font-bold text-[var(--primary-red)]">
                      3 points
                    </span>
                    <p>for the correct driver</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-[var(--primary-red)]">
                      1
                    </span>
                  </span>
                  <div>
                    <span className="font-bold text-[var(--primary-red)]">
                      1 point
                    </span>
                    <p>if the driver finishes within 3 positions (8th-12th)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-[var(--primary-red)]">
                      0
                    </span>
                  </span>
                  <div>
                    <span className="font-bold text-[var(--primary-red)]">
                      0 points
                    </span>
                    <p>in all other cases</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
