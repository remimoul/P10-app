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
    console.log('Token (first 50 chars):', token?.substring(0, 50) + '...');

    if (isPublic) {
      console.log('Processing public route...');
      if (token) {
        try {
          console.log('Attempting to verify token for public route...');
          const payload = await this.verifyToken(token);
          console.log('Token verification successful:', payload);
          console.log('Setting user on request with clerkId:', payload.sub);

          request.user = { clerkId: payload.sub };
          request.auth = { userId: payload.sub };

          console.log('Request.user after setting:', request.user);
          console.log('Request.auth after setting:', request.auth);
        } catch (error) {
          console.log(
            'Token verification failed for public route:',
            error.message,
          );
          console.log('Full error:', error);
        }
      } else {
        console.log('No token provided for public route');
      }

      console.log('=== END GUARD DEBUG ===');
      return true;
    }

    // Routes protégées
    console.log('Processing protected route...');
    if (!token) {
      console.log('No token provided for protected route');
      console.log('=== END GUARD DEBUG ===');
      return false;
    }

    try {
      console.log('Attempting to verify token for protected route...');
      const payload = await this.verifyToken(token);
      console.log('Token verification successful:', payload);

      request.user = { clerkId: payload.sub };
      request.auth = { userId: payload.sub };

      console.log('=== END GUARD DEBUG ===');
      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      console.log('=== END GUARD DEBUG ===');
      return false;
    }
  }

  private getRequest(context: ExecutionContext) {
    const contextType = context.getType<'http' | 'ws' | 'rpc'>();
    console.log('Context type:', contextType);

    if (contextType === 'http') {
      return context.switchToHttp().getRequest();
    } else {
      try {
        const gqlContext = GqlExecutionContext.create(context);
        return gqlContext.getContext().req;
      } catch (error) {
        console.log('Error getting GraphQL context:', error);
        return context.getArgs()[2]?.req || context.switchToHttp().getRequest();
      }
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers?.authorization;
    console.log('Authorization header exists:', !!authHeader);

    if (!authHeader) return undefined;

    if (authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return authHeader;
  }

  private async verifyToken(token: string) {
    try {
      console.log('Using ClerkClient to verify token...');
      const client = this.clerkClient.getClient();
      console.log('ClerkClient obtained:', !!client);

      const payload = await client.verifyToken(token);
      console.log('Token payload received:', payload);

      return payload;
    } catch (error) {
      console.error('ClerkClient.verifyToken error:', error);
      throw new Error(`Token verification failed: ${error.message}`);
    }
  }
}
