import { RiTimerLine } from "react-icons/ri";
import { formatRemainingTime } from "@/lib/utils/dateAndTime";

interface VoteTimerProps {
  timeLeft: number;
  voteDeadline: Date | null;
  totalParticipants: number;
}

const VoteTimer = ({
  timeLeft,
  voteDeadline,
  totalParticipants,
}: VoteTimerProps) => {
  return (
    <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mb-12 gap-2 xs:gap-0">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-[var(--primary-red)]">
            Clôture des votes :
          </span>
          <span className="text-xl font-bold text-gray-800">
            {voteDeadline
              ? new Date(voteDeadline.getTime() + 5 * 60000).toLocaleDateString(
                  "fr-FR",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )
              : "Non définie"}
          </span>
        </div>
        <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 bg-gradient-to-br from-white/80 to-white/30 px-4 py-2 xs:px-6 xs:py-3 rounded-full border border-[#D90429] whitespace-nowrap w-fit">
          <div className="flex items-center gap-1">
            <RiTimerLine className="text-xl xs:text-2xl text-[#D90429]" />
            <span className="font-mono text-lg xs:text-2xl text-gray-800 font-bold tracking-wider">
              {formatRemainingTime(timeLeft)}
            </span>
            <span className="text-xs xs:text-sm text-gray-600 font-mono">
              LAP
            </span>
          </div>
        </div>
      </div>
      <div className="text-2xl text-gray-700 font-semibold xs:ml-8 xs:mt-0 mt-2 text-center xs:text-right">
        {totalParticipants} participants
      </div>
    </div>
  );
};

export default VoteTimer;
