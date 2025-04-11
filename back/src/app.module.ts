import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { UserService } from './user/user.service';
import { TrackService } from './track/track.service';
import { TeamService } from './team/team.service';
import { PilotteamService } from './pilotteam/pilotteam.service';
import { PilotService } from './pilot/pilot.service';
import { LeagueService } from './league/league.service';
import { GrandprixRankingService } from './grandprix-ranking/grandprix-ranking.service';
import { GrandprixService } from './grandprix/grandprix.service';
import { BetService } from './bet/bet.service';
import { AvatarService } from './avatar/avatar.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      introspection: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService, AvatarService, BetService, GrandprixService, GrandprixRankingService, LeagueService, PilotService, PilotteamService, TeamService, TrackService, UserService, PrismaService],
})
export class AppModule { }
