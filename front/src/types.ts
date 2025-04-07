//Page leagues
export interface League {
  name: string;
  members: number;
  points: number;
  position: number;
  type: "public" | "private";
  onClick?: () => void;
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
  isUserMember?: boolean;
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

//page viewLeague
export interface Participant {
  id: string;
  name: string;
  score: number;
  hasVoted: boolean;
  avatar?: string;
}

export interface UserCardProps {
  participant?: Participant;
  timeLeft: number;
  rank: number | null;
  handleVote: () => void;
}

export interface AddMemberProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvitation: (email: string) => void;
}

export interface ExitLeagueProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmExit: () => void;
}

// page racing
export interface Track {
  id: string;
  countryName: string;
  trackName: string;
  pictureCountry?: string;
  pictureTrack?: string;
}

export interface GrandPrixRanking {
  id: string;
  position: number;
  isDNF: boolean;
  pilot: {
    id: string;
    name: string;
    acronym: string;
  };
}

export interface GrandPrix {
  id: string;
  season: string;
  date: string;
  time: string;
  track: Track;
  ranking?: GrandPrixRanking[];
}

export interface RacingCardProps {
  grandPrix: GrandPrix;
  isPast: boolean;
}

export interface RacingListProps {
  grandPrixList: GrandPrix[];
  isPast: boolean;
}

export interface RacingTabsProps {
  activeTab: "upcoming" | "past";
  onTabChange: (tab: "upcoming" | "past") => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}
export interface SeasonFilterProps {
  seasons: string[];
  selected: string;
  onChange: (value: string) => void;
}

// page ranking
export interface RankedUser {
  id: string;
  name: string;
  avatar?: string;
  points: number;
}

export interface LeagueRankingData {
  grandPrixName: string;
  leagueName: string;
  participants: RankedUser[];
}

export interface LeagueShort {
  id: string;
  name: string;
  avatar?: string;
}
