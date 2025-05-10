import { RankedUser } from "@/lib/types";

interface PodiumProps {
  top3: RankedUser[];
}

export const Podium = ({ top3 }: PodiumProps) => {
  return (
    <div className="flex justify-center gap-4 items-end h-60 mt-4">
      {/* 2nd */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-gray-300 mb-1" />
        <div className="bg-[#B03C3C] w-12 h-20 rounded-t-md text-white text-center flex items-end justify-center text-sm font-bold">
          2
        </div>
        <p className="text-sm mt-1">{top3[1]?.name}</p>
      </div>

      {/* 1st */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-gray-300 mb-1" />
        <div className="bg-[#E30613] w-14 h-28 rounded-t-md text-white text-center flex items-end justify-center text-sm font-bold">
          1
        </div>
        <p className="text-sm mt-1">{top3[0]?.name}</p>
      </div>

      {/* 3rd */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-gray-300 mb-1" />
        <div className="bg-[#F28B82] w-12 h-16 rounded-t-md text-white text-center flex items-end justify-center text-sm font-bold">
          3
        </div>
        <p className="text-sm mt-1">{top3[2]?.name}</p>
      </div>
    </div>
  );
};
