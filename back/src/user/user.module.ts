import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/prisma.service';
import { ClerkClientProvider } from 'src/providers/clerk-client.provider';

@Module({
  providers: [UserService, UserResolver, PrismaService, ClerkClientProvider],
  exports: [UserService],
})
export class UserModule {}
