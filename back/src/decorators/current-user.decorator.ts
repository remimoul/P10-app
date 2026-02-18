import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { DbUser } from '../auth/load-db-user.guard';

function getRequest(context: ExecutionContext): any {
  if (context.getType<'graphql'>() === 'graphql') {
    return GqlExecutionContext.create(context).getContext().req;
  }
  return context.switchToHttp().getRequest();
}

/**
 * Returns the DB user (id, clerkId, username, email) when LoadDbUserGuard has run.
 * Use on protected routes that need the current user's DB id.
 */
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext): DbUser | undefined => {
    const req = getRequest(context);
    return req?.dbUser ?? req?.user;
  },
);
