import { ICloudProvider } from '@app/common';
import { CLOUD_PROVIDERS } from '@app/common/cloud_storage_provider';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UploadFileDto {
  @IsEnum(CLOUD_PROVIDERS)
  @IsNotEmpty()
  provider: ICloudProvider;
}
