import { IsString } from 'class-validator';

export class GetAnimeDto {
  @IsString()
  id: string;
}
