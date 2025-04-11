import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LeagueService {
    constructor(private prisma: PrismaService) { }
}
