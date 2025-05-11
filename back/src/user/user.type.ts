// import { Injectable } from '@nestjs/common';
// import { ClerkClient } from '@clerk/backend';
// import { User, CreateUserInput, GetUserInput } from './user.graphmodel';

// @Injectable()
// export class UserService {
//   private readonly clerkClient: ClerkClient;

//   constructor() {
//     this.clerkClient = new ClerkClient({
//       secretKey: process.env.CLERK_SECRET_KEY,
//     });
//   }

//   async createUser(createUserInput: CreateUserInput): Promise<User> {
//     const clerkUser = await this.clerkClient.users.createUser({
//       firstName: createUserInput.firstName,
//       lastName: createUserInput.lastName,
//       email: [{ email: createUserInput.email }],
//       password: createUserInput.password,
//     });

//     // Map Clerk user to your GraphQL User model
//     return {
//       id: clerkUser.id as any,
//       clerkId: clerkUser.id,
//       leagues: [],
//     };
//   }

//   async getUser(getUserInput: GetUserInput): Promise<User> {
//     let clerkUser;

//     if (getUserInput.clerkId) {
//       clerkUser = await this.clerkClient.users.getUser(getUserInput.clerkId);
//     } else if (getUserInput.email) {
//       const userList = await this.clerkClient.users.getUserList({
//         emailAddress: [getUserInput.email],
//       });
//       clerkUser = userList.length > 0 ? userList[0] : null;
//     }

//     if (!clerkUser) {
//       throw new Error('User not found');
//     }

//     // Map Clerk user to your GraphQL User model
//     return {
//       id: clerkUser.id as any,
//       clerkId: clerkUser.id,
//       leagues: [],
//     };
//   }

//   async getAllUsers(): Promise<User[]> {
//     const clerkUsers = await this.clerkClient.users.getUserList();

//     return clerkUsers.map((user) => ({
//       id: user.id as any,
//       clerkId: user.id,
//       leagues: [],
//     }));
//   }
// }
