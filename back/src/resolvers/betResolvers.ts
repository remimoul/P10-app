import { randomUUID, UUID } from "crypto"
import { Bet } from "../types"

const getBetsByUser = (args: { userId: UUID }): Bet[] => {
  return [
    {
      id: randomUUID(),
      user: {
        id: args.userId,
        clerkId: "1234",
        leagues: []
      },
      grandPrix: {
        id: randomUUID(),
        season: "2025",
        date: new Date(),
        time: new Date(),
        track: {
          id: randomUUID(),
          name: "Circuit de Barcelona-Catalunya",
          country: "Spain",
          pictureTrack: "url",
          pictureCountry: "url"
        },
        pilots: [
          {
            id: randomUUID(),
            name: "Lewis Hamilton",
            picture: "url",
            acronym: "HAM",
            currentTeam: {
              id: randomUUID(),
              name: "Mercedes",
              logo: "url",
              color: "Silver",
              pilots: []
            },
            teamHistory: []
          }
        ],
      },
      pilot: {
        id: randomUUID(),
        name: "Lewis Hamilton",
        picture: "url",
        acronym: "HAM",
        currentTeam: {
          id: randomUUID(),
          name: "Mercedes",
          logo: "url",
          color: "Silver",
          pilots: []
        },
        teamHistory: []
      }
    }
  ]
}

const getBetsByLeague = (args: { leagueId: UUID }): Bet[] => {
  return [
    {
      id: randomUUID(),
      user: {
        id: randomUUID(),
        clerkId: "1234",
        leagues: []
      },
      grandPrix: {
        id: randomUUID(),
        season: "2025",
        date: new Date(),
        time: new Date(),
        track: {
          id: randomUUID(),
          name: "Circuit de Barcelona-Catalunya",
          country: "Spain",
          pictureTrack: "url",
          pictureCountry: "url"
        },
        pilots: [
          {
            id: randomUUID(),
            name: "Lewis Hamilton",
            picture: "url",
            acronym: "HAM",
            currentTeam: {
              id: randomUUID(),
              name: "Mercedes",
              logo: "url",
              color: "Silver",
              pilots: []
            },
            teamHistory: []
          }
        ],
      },
      pilot: {
        id: randomUUID(),
        name: "Lewis Hamilton",
        picture: "url",
        acronym: "HAM",
        currentTeam: {
          id: randomUUID(),
          name: "Mercedes",
          logo: "url",
          color: "Silver",
          pilots: []
        },
        teamHistory: []
      }
    }
  ]
};

const placeBet = (args: { userId: UUID, gpId: UUID, piloteP10Id: UUID }): Bet => {
  return {
    id: randomUUID(),
    user: {
      id: args.userId,
      clerkId: "1234",
      leagues: []
    },
    grandPrix: {
      id: randomUUID(),
      season: "2025",
      date: new Date(),
      time: new Date(),
      track: {
        id: randomUUID(),
        name: "Circuit de Barcelona-Catalunya",
        country: "Spain",
        pictureTrack: "url",
        pictureCountry: "url"
      },
      pilots: [
        {
          id: randomUUID(),
          name: "Lewis Hamilton",
          picture: "url",
          acronym: "HAM",
          currentTeam: {
            id: randomUUID(),
            name: "Mercedes",
            logo: "url",
            color: "Silver",
            pilots: []
          },
          teamHistory: []
        }
      ],
    },
    pilot: {
      id: randomUUID(),
      name: "Lewis Hamilton",
      picture: "url",
      acronym: "HAM",
      currentTeam: {
        id: randomUUID(),
        name: "Mercedes",
        logo: "url",
        color: "Silver",
        pilots: []
      },
      teamHistory: []
    }
  }
}

const updateBet = (args: { betId: UUID, piloteP10Id?: UUID }): Bet => {
  return {
    id: args.betId,
    user: {
      id: randomUUID(),
      clerkId: "1234",
      leagues: []
    },
    grandPrix: {
      id: randomUUID(),
      season: "2025",
      date: new Date(),
      time: new Date(),
      track: {
        id: randomUUID(),
        name: "Circuit de Barcelona-Catalunya",
        country: "Spain",
        pictureTrack: "url",
        pictureCountry: "url"
      },
      pilots: [
        {
          id: randomUUID(),
          name: "Lewis Hamilton",
          picture: "url",
          acronym: "HAM",
          currentTeam: {
            id: randomUUID(),
            name: "Mercedes",
            logo: "url",
            color: "Silver",
            pilots: []
          },
          teamHistory: []
        }
      ],
    },
    pilot: {
      id: randomUUID(),
      name: "Lewis Hamilton",
      picture: "url",
      acronym: "HAM",
      currentTeam: {
        id: randomUUID(),
        name: "Mercedes",
        logo: "url",
        color: "Silver",
        pilots: []
      },
      teamHistory: []
    }
  }
};

export {
  getBetsByUser,
  getBetsByLeague,
  placeBet,
  updateBet
};
