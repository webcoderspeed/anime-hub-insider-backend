import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetAccountTypeByEmailDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
