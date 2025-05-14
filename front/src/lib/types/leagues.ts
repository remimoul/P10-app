export interface League {
  id?: string;
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
