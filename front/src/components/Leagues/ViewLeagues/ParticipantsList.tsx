import { Participant } from "@/lib/types";
import { motion } from "framer-motion";
import { RiUser3Fill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";

const ParticipantsList = ({
  participants,
  currentUser,
}: {
  participants: Participant[];
  currentUser?: string;
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
    <div className="col-span-full flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center">
          <FaUserFriends className="text-5xl text-[#2A3439]" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-[#2A3439]">
            Participants
          </h2>
          <span className="text-lg text-[#2B2D42]">
            {participants.length} players
          </span>
        </div>
      </div>
    </div>
    {participants
      .filter((p) => p.id !== currentUser)
      .map((participant) => (
        <motion.div
          key={participant.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="group relative bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md border border-red-500/30 hover:border-red-600/50 transition-all duration-300 hover:shadow-lg hover:translate-y-[-1px]"
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-15 h-15 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <RiUser3Fill className="text-xl text-red-500 group-hover:text-red-600 transition-colors" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-black group-hover:text-red-500 transition-colors">
                  {participant.name}
                </h3>
                <span className="text-red-500/70 text-xl group-hover:text-red-500 transition-colors">
                  • {participant.score} points
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
  </div>
);

export default ParticipantsList;
