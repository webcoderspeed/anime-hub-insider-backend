import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateStatsDto {
  @IsString()
  user: Types.ObjectId;

  @IsNumber()
  @IsOptional()
  totalWatched?: number;

  @IsNumber()
  @IsOptional()
  totalFavorites?: number;

  @IsNumber()
  @IsOptional()
  totalReviews?: number;
}
