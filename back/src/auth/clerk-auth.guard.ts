import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private readonly logger = new Logger(ClerkAuthGuard.name);

  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    this.logger.debug(`canActivate: isPublic=${isPublic}`);

    if (isPublic) {
      return true;
    }

    const req =
      context.getType<'http'>() === 'http'
        ? context.switchToHttp().getRequest()
        : GqlExecutionContext.create(context).getContext().req;

    const authHeader = req?.headers?.authorization;
    const token = authHeader?.replace('Bearer ', '');

    this.logger.debug(`Token present: ${!!token}`);

    if (!token) {
      this.logger.warn('No token provided for protected route');
      throw new UnauthorizedException('No authentication token provided');
    }

    try {
      const decodedToken = await this.validateClerkToken(token);
      req.user = {
        id: decodedToken.sub,
        clerkId: decodedToken.sub,
        email: decodedToken.email,
        userId: decodedToken.sub,
      };

      req.auth = {
        userId: decodedToken.sub,
        ...decodedToken,
      };

      return true;
    } catch (error: any) {
      this.logger.warn(`Token validation failed: ${error?.message}`);
      throw new UnauthorizedException('Invalid authentication token');
    }
  }

  private async validateClerkToken(token: string): Promise<any> {
    try {
      // Pour l'instant, une validation basique - remplacez par la vraie validation Clerk
      const base64Payload = token.split('.')[1];
      if (!base64Payload) {
        throw new Error('Invalid token format');
      }

      const payload = JSON.parse(
        Buffer.from(base64Payload, 'base64').toString(),
      );

      // Vérifications basiques
      if (!payload.sub) {
        throw new Error('Invalid token - no subject');
      }

      return payload;
    } catch (error) {
      throw new Error(`Token validation failed: ${error.message}`);
    }
  }
}
