import { motion } from "framer-motion";
import { RiSunLine } from "react-icons/ri";
import { formatDate } from "@/lib/utils/dateAndTime";
import { f1Service } from "@/lib/services/f1Service";
import { useEffect } from "react";

interface F1Driver {
  driver_number: number;
  first_name: string;
  last_name: string;
}

interface RaceInfoProps {
  raceInfo: {
    grandPrix: string;
    country: string;
    circuit: string;
    location: string;
    date: string;
    startTime: string;
    weather?: string;
    temperature?: string;
    humidity?: string;
  };
}

export const RaceInfo = ({ raceInfo }: RaceInfoProps) => {
  const {
    grandPrix,
    country,
    circuit,
    location,
    date,
    startTime,
    weather,
    temperature,
    humidity,
  } = raceInfo;

  const formattedDate = date ? formatDate(date) : "-";
  const formattedTime = startTime ? startTime.slice(0, 5) : "-";

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const sessions = await f1Service.getSessions("2024");
        const raceSession = sessions.find((s) => s.session_type === "Race");
        let f1Drivers: F1Driver[] = [];

        if (raceSession) {
          f1Drivers = await f1Service.getDrivers(
            String(raceSession.session_key)
          );
          const meetings = await f1Service.getMeetings("2024");
          const meeting = meetings.find(
            (m) => String(m.meeting_key) === String(raceSession.meeting_key)
          );

          if (meeting) {
            // Store meeting data if needed for future use
            console.log(`${meeting.circuit_short_name} - ${meeting.location}`);
          }
        }

        // Process driver data if needed for future use
        f1Drivers.forEach((d) => {
          const fullName = `${d.first_name} ${d.last_name}`;
          console.log(`Driver: ${fullName}, Number: ${d.driver_number}`);
        });
      } catch (error) {
        console.error("Error fetching race data:", error);
      }
    };

    fetchRaceData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-white to-red-50 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-red-500/30 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
      <div className="relative z-10">
        <h3 className="text-2xl sm:text-3xl font-black text-[var(--primary-red)] mb-4 sm:mb-8">
          Race Information
        </h3>
        <div className="space-y-4 sm:space-y-6">
          <div className="group relative p-3 sm:p-4 rounded-2xl bg-white/80 backdrop-blur-sm flex flex-col gap-1 hover:bg-white/90 transition-all duration-300 border border-transparent hover:border-red-500/20">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-lg sm:text-xl font-medium text-black group-hover:text-[var(--secondary-red)] transition-colors mb-1">
              {grandPrix}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-sm sm:text-base font-semibold text-black">
                {circuit}
              </span>
              <span className="text-xs sm:text-sm text-gray-700">
                {location}, {country}
              </span>
              <span className="text-xs sm:text-sm text-gray-700">
                Date: {formattedDate}
              </span>
              <span className="text-xs sm:text-sm text-gray-700">
                Start time: {formattedTime}
              </span>
            </div>
          </div>
          <div className="group relative p-3 sm:p-4 rounded-2xl bg-white/80 backdrop-blur-sm flex flex-col gap-1 hover:bg-white/90 transition-all duration-300 border border-transparent hover:border-red-500/20">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-lg sm:text-xl font-medium text-black group-hover:text-[var(--secondary-red)] transition-colors mb-1">
              Weather conditions
            </span>
            <div className="flex items-center gap-2">
              <RiSunLine className="text-yellow-500 text-lg sm:text-xl" />
              <span className="text-sm sm:text-base font-semibold text-black">
                {weather || "-"}
                {temperature ? `, ${temperature}` : ""}
              </span>
            </div>
            <span className="text-xs sm:text-sm text-gray-700">
              Humidity: {humidity || "-"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
