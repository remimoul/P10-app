import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GrandprixService {
    constructor(private prisma: PrismaService) { }
}
