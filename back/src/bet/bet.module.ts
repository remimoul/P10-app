import { Module } from '@nestjs/common';
import { BetService } from './bet.service';
import { BetResolver } from './bet.resolver';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module'; // ✅ Import du module

@Module({
  imports: [UserModule], // ✅ Importe le module complet
  providers: [BetService, BetResolver, PrismaService], // ✅ Retire UserService
})
export class BetModule {}
