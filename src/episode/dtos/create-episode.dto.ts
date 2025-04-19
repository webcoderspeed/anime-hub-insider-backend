import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  anime: string; // Anime ID

  @IsNumber()
  number: number;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  videoUrl?: string;
}
