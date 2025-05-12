import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AvatarService {
    constructor(private prisma: PrismaService) { }

    async getAvatar(id: UUID) {
        return this.prisma.avatar.findUnique({
            where: { id },
        });
    }

    async getAvatars() {
        return this.prisma.avatar.findMany();
    }
}
