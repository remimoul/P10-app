import { randomUUID, UUID } from "crypto";
import { User } from "../types";

const getUser = (args: { id: UUID }): User => {
  return {
    id: args.id,
    clerkId: "1234",
    avatar: {
      id: randomUUID(),
      url: "https://www.example.com/avatar.jpg",
    },
    leagues: [],
  };
};

const getUsers = (): User[] => {
  return [
    {
      id: randomUUID(),
      clerkId: "1234",
      avatar: {
        id: randomUUID(),
        url: "https://www.example.com/avatar.jpg",
      },
      leagues: [],
    },
    {
      id: randomUUID(),
      clerkId: "5678",
      avatar: {
        id: randomUUID(),
        url: "https://www.example.com/avatar.jpg",
      },
      leagues: [],
    },
  ];
};

const createUser = (args: { clerkId: string, avatarId?: UUID }): User => {
  return {
    id: randomUUID(),
    clerkId: args.clerkId,
    avatar: {
      id: args.avatarId || randomUUID(),
      url: "https://www.example.com/avatar.jpg",
    },
    leagues: [],
  };
};

const updateUser = (args: { id: UUID, avatarId?: UUID }): User => {
  return {
    id: args.id,
    clerkId: "1234",
    avatar: {
      id: args.avatarId || randomUUID(),
      url: "https://www.example.com/avatar.jpg",
    },
    leagues: [],
  };
};

const deleteUser = (args: { id: UUID }): User => {
  return {
    id: args.id,
    clerkId: "1234",
    avatar: {
      id: randomUUID(),
      url: "https://www.example.com/avatar.jpg",
    },
    leagues: [],
  };
};

export {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
