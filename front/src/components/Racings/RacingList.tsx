import { GrandPrix } from "@/types";
import { RacingCard } from "./RacingCard";

interface RacingListProps {
  grandPrixList: GrandPrix[];
  isPast: boolean;
}

export const RacingList = ({ grandPrixList, isPast }: RacingListProps) => {
  return (
    <div className="px-4 py-6 space-y-4">
      {grandPrixList.map((gp) => (
        <RacingCard key={gp.id} grandPrix={gp} isPast={isPast} />
      ))}
    </div>
  );
};
