import {
  IsOptional,
  IsString,
  IsArray,
  IsBoolean,
  IsNumberString,
  IsIn,
} from 'class-validator';

export class GetAllAnimeDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];

  @IsOptional()
  @IsIn(['tv', 'movie', 'ova', 'ona', 'special', 'music'])
  type?: string;

  @IsOptional()
  @IsIn(['ongoing', 'complete', 'completed'])
  status?: string;

  @IsOptional()
  @IsString()
  year?: string; // e.g. "2023"

  @IsOptional()
  @IsBoolean()
  hasSub?: boolean;

  @IsOptional()
  @IsNumberString()
  limit?: string = '10';

  @IsOptional()
  @IsNumberString()
  skip?: string = '0';
}
