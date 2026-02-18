import { IsString, IsOptional, IsBoolean, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLeagueDto {
  @ApiProperty({ example: 'My League' })
  @IsString()
  @MinLength(1, { message: 'Name must not be empty' })
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  private?: boolean;
}
