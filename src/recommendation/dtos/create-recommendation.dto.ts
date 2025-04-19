import { IsString, IsOptional } from 'class-validator';

export class CreateRecommendationDto {
  @IsString()
  user: string;

  @IsString()
  anime: string;

  @IsString()
  @IsOptional()
  reason?: string;
}
