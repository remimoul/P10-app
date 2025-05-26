import { Injectable } from '@nestjs/common';
import { createClerkClient } from '@clerk/backend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClerkClientProvider {
  private clerkClient: any;

  constructor(private configService: ConfigService) {
    this.clerkClient = createClerkClient({
      publishableKey: this.configService.get('CLERK_PUBLISHABLE_KEY'),
      secretKey: this.configService.get('CLERK_SECRET_KEY'),
    });
  }

  getClient() {
    return this.clerkClient;
  }

  async verifyToken(token: string) {
    try {
      return await this.clerkClient.verifyToken(token);
    } catch (error) {
      throw new Error(`Token verification failed: ${error.message}`);
    }
  }
}
