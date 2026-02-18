import { IsString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class JoinLeagueDto {
  @ApiProperty({ description: 'League ID' })
  @IsString()
  @MinLength(1, { message: 'League ID is required' })
  leagueId: string;

  @ApiPropertyOptional({ description: 'Required for private leagues' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  joinCode?: string;
}
