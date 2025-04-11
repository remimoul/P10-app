import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeamService {
    constructor(private prisma: PrismaService) { }
}
