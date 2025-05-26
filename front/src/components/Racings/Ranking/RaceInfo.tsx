import { GiTrophyCup } from "react-icons/gi";
import { FiMap } from "react-icons/fi";
import { CalendarDays } from "lucide-react";

interface RaceInfoProps {
  raceName: string;
  date: string;
  circuit: string;
  podium: {
    first: string;
    ten: string;
  };
}

export default function RaceInfo({
  raceName,
  date,
  circuit,
  podium,
}: RaceInfoProps) {
  return (
    <div className="relative bg-gradient-to-br from-white to-red-50 rounded-3xl p-8 shadow-lg border border-red-500/30 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <h2 className="text-3xl font-black text-[var(--primary-red)]">
                {raceName}
              </h2>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-3">
                  <CalendarDays className="text-xl text-red-500/70" />
                  <p className="text-xl text-red-500/70">{date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <FiMap className="text-xl text-red-500/70" />
                  <p className="text-xl text-red-500/70">{circuit}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-red-500/20">
            <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-[var(--primary-red)]">
              <GiTrophyCup className="text-yellow-500 w-8 h-8" />
              Results
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-white font-medium">
                  1
                </span>
                <div>
                  <p className="font-medium">{podium.first}</p>
                  <p className="text-sm text-red-500/70">Winner</p>
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-red-500/20" />
              <div className="flex items-center gap-2 mt-3 sm:mt-0">
                <span className="w-7 h-7 bg-gray-400 rounded-full flex items-center justify-center text-white font-medium">
                  10
                </span>
                <div>
                  <p className="font-medium">{podium.ten}</p>
                  <p className="text-sm text-red-500/70">10th</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
