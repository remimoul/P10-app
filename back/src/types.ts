import { UUID } from "crypto";

type User = {
  id: UUID;
  clerkId: string;
  avatar?: Avatar;
  leagues: League[];
}

type Avatar = {
  id: UUID;
  url: string;
}

type League = {
  id: UUID;
  name: string;
  admin: User;
  private: boolean;
  joinCode: string;
  avatar: Avatar;
  members: User[];
}

type Pilot = {
  id: UUID;
  name: string;
  picture: string;
  acronym: string;
  currentTeam: Team;
  teamHistory: PilotTeam[];
}

type Team = {
  id: UUID;
  name: string;
  logo: string;
  color: string;
  pilots: PilotTeam[];
}

type PilotTeam = {
  id: UUID;
  pilot: Pilot;
  team: Team;
  year: string;
}

type GrandPrix = {
  id: UUID;
  season: String;
  date: Date;
  time: Date;
  track: Track;
  pilots: Pilot[];
  ranking?: GrandPrixRanking[];
}

type Track = {
  id: UUID;
  name: string;
  country: string;
  pictureTrack: string;
  pictureCountry: string;
}

type GrandPrixRanking = {
  id: UUID;
  grandPrix: GrandPrix;
  pilot: Pilot;
  position: number;
  isDNF: boolean;
}

type Bet = {
  id: UUID;
  user: User;
  grandPrix: GrandPrix;
  pilot: Pilot;
  points?: number;
}

export type { User, Avatar, League, Pilot, Team, PilotTeam, GrandPrix, Track, GrandPrixRanking, Bet };
