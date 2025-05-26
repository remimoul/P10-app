import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClerkClientProvider } from '../providers/clerk-client.provider';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private clerkClient: ClerkClientProvider,
  ) {
    console.log('🔒 ClerkAuthGuard initialized');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('🔒 ClerkAuthGuard.canActivate() called');

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = this.getRequest(context);
    const token = this.extractTokenFromHeader(request);

    console.log('=== CLERK AUTH GUARD DEBUG ===');
    console.log('Is public route:', isPublic);
    console.log('Token found:', !!token);

    if (isPublic) {
      console.log('Processing public route...');
      if (token) {
        try {
          console.log('Attempting to verify token for public route...');
          const payload = await this.verifyToken(token);
          console.log('Token verification successful:', payload);

          request.user = { clerkId: payload.sub };
          request.auth = { userId: payload.sub };

          console.log('Request.user after setting:', request.user);
        } catch (error) {
          console.log(
            'Token verification failed for public route:',
            error.message,
          );
        }
      }
      return true;
    }

    if (!token) {
      console.log('No token provided for protected route');
      return false;
    }

    try {
      console.log('Attempting to verify token for protected route...');
      const payload = await this.verifyToken(token);

      request.user = { clerkId: payload.sub };
      request.auth = { userId: payload.sub };

      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  }

  private getRequest(context: ExecutionContext) {
    const contextType = context.getType<'http' | 'ws' | 'rpc'>();

    if (contextType === 'http') {
      return context.switchToHttp().getRequest();
    } else {
      try {
        const gqlContext = GqlExecutionContext.create(context);
        return gqlContext.getContext().req;
      } catch (error) {
        return context.getArgs()[2]?.req || context.switchToHttp().getRequest();
      }
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers?.authorization;
    if (!authHeader) return undefined;

    if (authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return authHeader;
  }

  private async verifyToken(token: string) {
    try {
      const client = this.clerkClient.getClient();

      // Configuration des options de vérification avec les parties autorisées
      const verifyOptions = {
        authorizedParties: [
          'http://localhost:3000',
          'http://localhost:4500',
          'https://www.grineasy.com',
          'https://grineasy.online',
        ],
      };

      const payload = await client.verifyToken(token, verifyOptions);
      return payload;
    } catch (error) {
      console.error('ClerkClient.verifyToken error:', error);
      throw new Error(`Token verification failed: ${error.message}`);
    }
  }
}
