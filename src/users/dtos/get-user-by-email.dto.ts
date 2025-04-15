import { IsEmail } from 'class-validator';

export class getUserByEmailDto {
  @IsEmail()
  email: string;
}
