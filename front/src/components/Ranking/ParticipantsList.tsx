import { RankedUser } from "@/types";
import UserAvatar from "@/components/Ranking/UserAvatar";

interface ParticipantsListProps {
  participants: RankedUser[];
}

export const ParticipantsList = ({ participants }: ParticipantsListProps) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 w-full mt-10">
      <ul className="space-y-4">
        {participants.map((user, index) => (
          <li key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-bold text-gray-600 w-6">{index + 4}</span>
              <UserAvatar name={user.name} avatarUrl={user.avatar} />
              <span className="text-gray-800 font-medium">{user.name}</span>
            </div>
            <span className="text-red-600 font-bold">{user.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
