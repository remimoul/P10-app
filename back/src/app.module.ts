import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { ThrottlerModule } from '@nestjs/throttler';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const depthLimit = require('graphql-depth-limit') as (maxDepth: number) => unknown;
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
import { ConfigModule } from '@nestjs/config';
import { ClerkClientProvider } from './providers/clerk-client.provider';
import { ClerkAuthGuard } from './auth/clerk-auth.guard';
import { LoadDbUserGuard } from './auth/load-db-user.guard';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UserController } from './user/user.controller';
import { LeagueController } from './league/league.controller';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    HealthModule,
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000, limit: 10 },
      { name: 'medium', ttl: 10000, limit: 50 },
      { name: 'long', ttl: 60000, limit: 100 },
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      validationRules: [depthLimit(10) as import('graphql').ValidationRule],
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      introspection: true,
      context: ({ req }) => ({ req }),
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
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, UserController, LeagueController],
  providers: [
    AppService,
    PrismaService,
    ClerkClientProvider,
    { provide: APP_GUARD, useClass: ClerkAuthGuard },
    { provide: APP_GUARD, useClass: LoadDbUserGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule { }
