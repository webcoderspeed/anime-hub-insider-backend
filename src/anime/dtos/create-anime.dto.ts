import { Anime } from '@app/common';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateAnimeDto {
  @IsString()
  title: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  genres?: Types.ObjectId[];

  @IsString()
  image: string;

  @IsString()
  cover: string;

  @IsString()
  description: string;

  @IsBoolean()
  hasSub: boolean;

  @IsString()
  status: Anime['status'];

  @IsString()
  type: Anime['type'];

  @IsString()
  releaseDate: string;

  @IsArray()
  @IsString({ each: true })
  studios: string[];
}
