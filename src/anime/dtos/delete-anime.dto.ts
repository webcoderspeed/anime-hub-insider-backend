import { IsString } from 'class-validator';

export class DeleteAnimeDto {
  @IsString()
  id: string;
}
