import { randomUUID } from "crypto";
import { GrandPrix, Track } from "../types";

const getGrandPrix = (args: { season?: string }): GrandPrix[] => {
  return [{
    id: randomUUID(),
    season: args.season || "2021",
    date: new Date("2021-06-20"),
    time: new Date("2021-06-20"),
    track: getTracks()[0],
    pilots: [
      {
        id: randomUUID(),
        name: "Lewis Hamilton",
        picture: "https://www.formula1.com/content/dam/fom-website/drivers/2021/lewis-hamilton.jpg",
        acronym: "HAM",
        currentTeam: {
          id: randomUUID(),
          name: "Mercedes",
          logo: "https://www.formula1.com/content/dam/fom-website/teams/2021/mercedes.jpg",
          color: "#00D2BE",
          pilots: [],
        },
        teamHistory: [],
      },
      {
        id: randomUUID(),
        name: "Max Verstappen",
        picture: "https://www.formula1.com/content/dam/fom-website/drivers/2021/max-verstappen.jpg",
        acronym: "VER",
        currentTeam: {
          id: randomUUID(),
          name: "Red Bull Racing",
          logo: "https://www.formula1.com/content/dam/fom-website/teams/2021/red-bull-racing.jpg",
          color: "#1E41FF",
          pilots: [],
        },
        teamHistory: [],
      },
    ],
  }];
}

const getGrandPrixById = (_args: { id: string }): GrandPrix | null => {
  return getGrandPrix({})[0];
}

const getTracks = (): Track[] => {
  return [{
    id: randomUUID(),
    name: "Paul Ricard",
    country: "France",
    pictureTrack: "https://www.f1-fansite.com/wp-content/uploads/2018/06/2018-f1-paul-ricard.jpg",
    pictureCountry: "https://www.formula1.com/content/dam/fom-website/flags/France.jpg",
  }, {
    id: randomUUID(),
    name: "Red Bull Ring",
    country: "Austria",
    pictureTrack: "https://www.f1-fansite.com/wp-content/uploads/2018/06/2018-f1-red-bull-ring.jpg",
    pictureCountry: "https://www.formula1.com/content/dam/fom-website/flags/Austria.jpg",
  }];
};

const getTrackById = (_args: { id: string }): Track | null => {
  return getTracks()[0];
}

export {
  getGrandPrix,
  getGrandPrixById,
  getTracks,
  getTrackById,
}
