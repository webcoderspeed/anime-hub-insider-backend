import { IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  user: string; // User ID

  @IsString()
  anime: string; // Anime ID
}
