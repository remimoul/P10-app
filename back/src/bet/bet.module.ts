import { Module } from '@nestjs/common';
import { BetService } from './bet.service';
import { BetResolver } from './bet.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [BetService, BetResolver, PrismaService],
})
export class BetModule { }
