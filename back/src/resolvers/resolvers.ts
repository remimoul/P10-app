import { randomUUID } from "crypto";

type Pet = {
  id: string;
  name: string;
  age: number;
  pictureUri: string;
  ownerName: string;
};

const getPet = (_args: { id: string }): Pet | undefined => {
  return { id: "1", name: "Rex", age: 5, pictureUri: "https://example.com", ownerName: "John Doe" };
};

const getPets = (): Pet[] => {
  return [
    { id: "1", name: "Rex", age: 5, pictureUri: "https://example.com", ownerName: "John Doe" },
    { id: "2", name: "Max", age: 3, pictureUri: "https://example.com", ownerName: "Jane Doe" },
  ];
};

const createPet = (args: {
  name: string;
  age: number;
  pictureUri: string;
  ownerName: string;
}): Pet => {
  const generatedId = randomUUID().toString();
  const pet = { id: generatedId, ...args };
  return pet;
};

const updatePet = (args: {
  id: string;
  name?: string;
  age?: number;
  pictureUri?: string;
  ownerName?: string;
}): Pet => {
  let pet = { id: args.id, name: "Rex", age: 5, pictureUri: "https://example.com", ownerName: "John Doe" };
  return pet;
};

const deletePet = (args: { id: string }): string => {
  return args.id;
};

export const resolvers = {
  getPet,
  getPets,
  createPet,
  updatePet,
  deletePet,
};
