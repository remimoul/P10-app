import FaqItems from "./data/faqItems";

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
  rank?: number | null;
  handleVote: () => void;
  isButton?: boolean;
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

export interface UserAvatarProps {
  avatarUrl?: string;
  fullName?: string;
}

// viewLeague pop-up
export type DialogContentProps = {
  onClose: () => void;
  onConfirmExit: () => void;
};

export type AddMemberContentProps = {
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
};

export interface EditLeagueNameProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newName: string) => void;
}

export interface DialogContentEditLeagueNameProps {
  leagueName: string;
  onLeagueNameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export interface HeaderProps {
  league: {
    name: string;
    type: string;
  };
  timeLeft: number;
  formatTime: (seconds: number) => string;
  handleAddMembers: () => void;
  handleLeaveLeague: () => void;
  handleEditLeagueName: () => void;
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

export interface RacingListProps {
  grandPrixList: RacingCardProps["grandPrix"][];
  isPast: boolean;
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

// page results
export interface Race {
  id: number;
  name: string;
  country: string;
  date: string;
  circuit: string;
  laps: number;
  length: string;
  lapRecord: string;
  recordHolder: string;
  recordYear: string;
  season: string;
}

export interface RaceResult {
  position: number;
  status: "Finished" | "DNF";
  time: string;
  laps: number;
}

export interface Driver {
  id: number;
  name: string;
  team: string;
  points: number;
  position: number;
  country: string;
  number: number;
  fastestLap: string;
  grid: number;
  status: "Finished" | "DNF";
  laps: number;
  time: string;
  gap: string;
  bestLap: number;
  teamColor: string;
  previousPosition: number;
  positionChange: number;
  car: string;
  raceResults?: Record<number, RaceResult>;
}

export type ViewMode = "race" | "championship";

export interface FiltersProps {
  selectedSeason: string;
  selectedRace: number;
  selectedCountry: string;
  filteredRaces: Race[];
  onSeasonChange: (season: string) => void;
  onRaceChange: (raceId: number) => void;
  onCountryChange: (country: string) => void;
  uniqueDates: string[];
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export interface NoRacesMessageProps {
  season: string;
}

export interface RaceInfoProps {
  race: Race;
}

export interface ResultsTableProps {
  drivers: Driver[];
  viewMode: ViewMode;
}

// faq page
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQListProps {
  items: typeof FaqItems;
}