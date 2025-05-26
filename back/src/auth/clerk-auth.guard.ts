import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Vérifier si la route est marquée comme publique
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('🔒 ClerkAuthGuard.canActivate() called');
    console.log('=== CLERK AUTH GUARD DEBUG ===');
    console.log('Is public route:', isPublic);

    // Si c'est une route publique, permettre l'accès sans token
    if (isPublic) {
      console.log('Processing public route - access granted');
      return true;
    }

    // Obtenir le contexte GraphQL
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();

    // Extraire le token Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');

    console.log('Token found:', !!token);
    console.log('Auth header:', authHeader ? 'Present' : 'Missing');

    if (!token) {
      console.log('No token provided for protected route');
      throw new UnauthorizedException('No authentication token provided');
    }

    try {
      // Valider le token Clerk
      const decodedToken = await this.validateClerkToken(token);

      // Attacher les informations utilisateur au contexte
      req.user = {
        id: decodedToken.sub,
        clerkId: decodedToken.sub,
        email: decodedToken.email,
        userId: decodedToken.sub, // Ajouter userId aussi
      };

      req.auth = {
        userId: decodedToken.sub,
        ...decodedToken,
      };

      console.log('=== DEBUG CONTEXT ===');
      console.log('context.req.user:', req.user);
      console.log('context.req.auth:', req.auth);
      console.log('=== END DEBUG ===');

      return true;
    } catch (error) {
      console.log('Token validation failed:', error.message);
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
