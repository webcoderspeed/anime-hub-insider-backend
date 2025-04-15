import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SendMailDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  html: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  cc?: string[];
}
