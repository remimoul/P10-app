import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { AvatarModule } from './avatar/avatar.module';
import { BetModule } from './bet/bet.module';
import { GrandprixModule } from './grandprix/grandprix.module';
import { GrandprixRankingModule } from './grandprix-ranking/grandprix-ranking.module';
import { LeagueModule } from './league/league.module';
import { PilotModule } from './pilot/pilot.module';
import { PilotteamModule } from './pilotteam/pilotteam.module';
import { TeamModule } from './team/team.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
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
    }),
    AvatarModule,
    BetModule,
    GrandprixModule,
    GrandprixRankingModule,
    LeagueModule,
    PilotModule,
    PilotteamModule,
    TeamModule,
    TrackModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
