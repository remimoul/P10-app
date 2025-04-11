import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PilotteamService {
    constructor(private prisma: PrismaService) { }
}
