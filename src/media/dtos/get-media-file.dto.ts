import { IsString } from 'class-validator';

export class GetMediaFileDto {
  @IsString()
  relativePath: string;
}
