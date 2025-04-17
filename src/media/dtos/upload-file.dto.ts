import { ICloudProvider } from '@app/common';
import { CLOUD_PROVIDERS } from '@app/common/cloud_storage_provider';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadFileDto {
  @IsEnum(CLOUD_PROVIDERS)
  @IsNotEmpty()
  provider: ICloudProvider;

  @IsNotEmpty()
  animeId: string;

  @IsOptional()
  episodeId?: string;
}
