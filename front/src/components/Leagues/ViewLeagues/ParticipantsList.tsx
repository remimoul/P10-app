import { Participant } from "@/types";
import { motion } from "framer-motion";
import { RiUser3Fill } from "react-icons/ri";

const ParticipantsList = ({
  participants,
  currentUser,
}: {
  participants: Participant[];
  currentUser?: string;
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
    {participants
      .filter((p) => p.id !== currentUser)
      .map((participant) => (
        <motion.div
          key={participant.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-red-500/30 hover:border-red-600/50 transition-colors"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <RiUser3Fill className="text-xl text-red-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">
                  {participant.name}
                </h3>
                <p className="text-red-500 text-sm">
                  {participant.score} points
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
  </div>
);

export default ParticipantsList;
