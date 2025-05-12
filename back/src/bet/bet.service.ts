import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BetService {
    constructor(private prisma: PrismaService) { }
}
