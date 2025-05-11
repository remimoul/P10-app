import { Injectable } from '@nestjs/common';
import { createClerkClient, ClerkClient } from '@clerk/backend';
import { User, CreateUserInput, GetUserInput } from './user.graphmodel';

@Injectable()
export class UserService {
  private clerkClient: ClerkClient;

  constructor() {
    this.clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    });
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const clerkUser = await this.clerkClient.users.createUser({
      firstName: createUserInput.firstName,
      lastName: createUserInput.lastName,
      username: createUserInput.username,
      emailAddress: [createUserInput.email],
      password: createUserInput.password,
    });

    // Map Clerk user to your GraphQL User model
    return {
      id: clerkUser.id as any,
      clerkId: clerkUser.id,
      email: createUserInput.email,
      password: createUserInput.password,
      leagues: [],
    };
  }

  async getUser(getUserInput: GetUserInput): Promise<User> {
    let clerkUser;

    if (getUserInput.clerkId) {
      clerkUser = await this.clerkClient.users.getUser(getUserInput.clerkId);
    } else if (getUserInput.email) {
      const userList = await this.clerkClient.users.getUserList({
        emailAddress: [getUserInput.email],
      });
      clerkUser = userList.data.length > 0 ? userList.data[0] : null;
    }

    if (!clerkUser) {
      throw new Error('User not found');
    }

    // Map Clerk user to your GraphQL User model
    return {
      id: clerkUser.id as any,
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
      password: '', // Password is not retrievable from Clerk
      leagues: [],
    };
  }
}
