import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/prisma.service';
import { ClerkClientProvider } from 'src/providers/clerk-client.provider';
import { PrometheusService } from 'src/prometheus.service'; // ✅ Ajoute l'import
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [
    UserService,
    UserResolver,
    PrismaService,
    ClerkClientProvider,
    PrometheusService,
  ],
  exports: [UserService],
})
export class UserModule {}
