import { RankedUser } from "@/types";

interface RankingTableProps {
  participants: RankedUser[];
}

export const RankingTable = ({ participants }: RankingTableProps) => {
  return (
    <div className="mt-10 bg-white rounded-xl shadow p-6 w-full max-w-2xl mx-auto">
      {participants.map((user, index) => (
        <div
          key={user.id}
          className="flex justify-between items-center py-3 border-b last:border-none border-gray-200"
        >
          <div className="flex gap-3 items-center">
            <span className="font-semibold text-gray-700 w-4">{index + 4}</span>
            <div className="w-6 h-6 rounded-full bg-gray-300" />
            <span className="text-sm text-gray-800">{user.name}</span>
          </div>
          <span className="text-sm font-bold text-gray-900">
            {user.points}pt
          </span>
        </div>
      ))}
    </div>
  );
};
