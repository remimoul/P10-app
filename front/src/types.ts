export interface League {
  name: string;
  members: number;
  points: number;
  position: number;
  type: "public" | "private";
}

export interface LeagueSectionProps {
  title: string;
  leagues: League[];
  isPublic: boolean;
}

export interface LeagueCardProps {
  league: League;
  index: number;
  isPublic: boolean;
}

export interface SectionHeaderProps {
  title: string;
  isPublic: boolean;
}

export interface CreateLeagueProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (league: { name: string; isPrivate: boolean }) => void;
}

export interface JoinLeagueProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (joinCode: string) => void;
}
