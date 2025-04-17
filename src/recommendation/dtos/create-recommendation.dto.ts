import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateRecommendationDto {
  @IsMongoId()
  @IsNotEmpty()
  animeId: string;

  @IsString()
  reason?: string;
}
