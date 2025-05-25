import { LeagueSectionProps } from "@/lib/types/leagues";
import LeagueCard from "@/components/Leagues/LeagueCard";
import SectionHeader from "@/components/Leagues/SectionHeader";

const LeagueSection = ({ title, leagues, isPublic }: LeagueSectionProps) => (
  <section className="relative">
    <SectionHeader title={title} isPublic={isPublic} />

    {leagues.length === 0 ? (
      <p className="text-center text-gray-600 text-2xl sm:text-2xl">
        No league for the moment.
      </p>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {leagues.map((league, idx) => (
          <LeagueCard
            key={idx}
            league={league}
            index={idx}
            isPublic={isPublic}
          />
        ))}
      </div>
    )}
  </section>
);

export default LeagueSection;
