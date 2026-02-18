import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaService } from '../prisma.service';

/** User from DB attached to request by this guard (when clerkId is present). */
export type DbUser = { id: string; clerkId: string; username: string; email: string };

@Injectable()
export class LoadDbUserGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = this.getRequest(context);
    const clerkId = req?.user?.clerkId ?? req?.auth?.userId;
    if (!clerkId) {
      return true;
    }

    const user = await this.prisma.user.findUnique({
      where: { clerkId },
      select: { id: true, clerkId: true, username: true, email: true },
    });
    if (!user) {
      throw new NotFoundException('User not found in the database');
    }
    (req as any).dbUser = user as DbUser;
    return true;
  }

  private getRequest(context: ExecutionContext): any {
    if (context.getType<'graphql'>() === 'graphql') {
      return GqlExecutionContext.create(context).getContext().req;
    }
    return context.switchToHttp().getRequest();
  }
}
