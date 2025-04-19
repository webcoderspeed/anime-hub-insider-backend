import { IsString, IsOptional } from 'class-validator';

export class CreateRecentActivityDto {
  @IsString()
  user: string; // User ID

  @IsString()
  activityType: string; // e.g. 'watched', 'favorited', 'rated'

  @IsString()
  targetId: string; // e.g. Anime ID, Episode ID, etc.

  @IsString()
  @IsOptional()
  details?: string;
}
