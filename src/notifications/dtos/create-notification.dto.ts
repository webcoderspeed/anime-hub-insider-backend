import { IsString, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  user: string; // User ID

  @IsString()
  message: string;

  @IsString()
  @IsOptional()
  type?: string; // e.g. 'info', 'warning', 'success'
}
