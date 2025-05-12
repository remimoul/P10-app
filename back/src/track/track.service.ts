import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TrackService {
    constructor(private prisma: PrismaService) { }
}
