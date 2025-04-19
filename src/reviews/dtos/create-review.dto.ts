import { IsString, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  user: string;

  @IsNumber()
  rating: number;

  @IsString()
  comment: string;
}
