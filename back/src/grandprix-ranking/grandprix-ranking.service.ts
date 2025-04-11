import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GrandprixRankingService {
    constructor(private prisma: PrismaService) { }
}
