import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PilotService {
    constructor(private prisma: PrismaService) { }
}
