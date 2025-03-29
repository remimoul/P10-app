import { randomUUID, UUID } from "crypto";
import { League } from "../types";

const getPublicLeagues = (): League[] => {
  return [
    {
      id: randomUUID(),
      name: "League1",
      admin: {
        id: randomUUID(),
        clerkId: "1234",
        leagues: []
      },
      avatar: {
        id: randomUUID(),
        url: "url"
      },
      private: false,
      joinCode: "1NROH2312",
      members: []
    }
  ]
}

const getLeague = (args: { id: UUID }): League | undefined => {
  return {
    id: args.id,
    name: "League1",
    admin: {
      id: randomUUID(),
      clerkId: "1234",
      leagues: []
    },
    avatar: {
      id: randomUUID(),
      url: "url"
    },
    private: false,
    joinCode: "1NROH2312",
    members: []
  }
};

const createLeague = (args: { name: string, adminId: UUID, private: boolean, avatarId?: UUID }): League => {
  return {
    id: randomUUID(),
    name: args.name,
    admin: {
      id: args.adminId,
      clerkId: "1234",
      leagues: []
    },
    avatar: {
      id: args.avatarId || randomUUID(),
      url: "url"
    },
    private: args.private,
    joinCode: "1NROH2312",
    members: []
  }
};

const updateLeague = (args: { id: UUID, name?: string, private?: boolean, leagueAdmin?: UUID, avatarId?: UUID }): League => {
  return {
    id: args.id,
    name: args.name || "League1",
    admin: {
      id: args.leagueAdmin || randomUUID(),
      clerkId: "1234",
      leagues: []
    },
    avatar: {
      id: args.avatarId || randomUUID(),
      url: "url"
    },
    private: args.private || false,
    joinCode: "1NROH2312",
    members: []
  }
};

const joinLeague = (args: { leagueId: UUID, memberId: UUID, joinCode?: string }): League => {
  return {
    id: args.leagueId,
    name: "League1",
    admin: {
      id: randomUUID(),
      clerkId: "1234",
      leagues: []
    },
    avatar: {
      id: randomUUID(),
      url: "url"
    },
    private: false,
    joinCode: "1NROH2312",
    members: [
      {
        id: args.memberId,
        clerkId: "1234",
        leagues: []
      }
    ]
  }
};

const leaveLeague = (args: { leagueId: UUID, memberId: UUID }): League => {
  // Remember to replace the league's admin if the admin leaves
  return {
    id: args.leagueId,
    name: "League1",
    admin: {
      id: randomUUID(),
      clerkId: "1234",
      leagues: []
    },
    avatar: {
      id: randomUUID(),
      url: "url"
    },
    private: false,
    joinCode: "1NROH2312",
    members: []
  }
};

export {
  getPublicLeagues,
  getLeague,
  createLeague,
  updateLeague,
  joinLeague,
  leaveLeague
};
