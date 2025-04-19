import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateWatchlistDto {
  @IsString()
  user: string;

  @IsString()
  anime: string;

  @IsNumber()
  @IsOptional()
  progress?: number;
}
