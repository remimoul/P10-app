import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ClerkClientProvider } from 'src/providers/clerk-client.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [ClerkClientProvider],
  exports: [PassportModule],
})
export class AuthModule {}
