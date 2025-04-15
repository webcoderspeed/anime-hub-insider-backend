import { Module } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { GoogleCloudService } from './google-cloud.service';
import { CloudStorageProviderFactory } from './cloud-storage-provider.factory';

@Module({
  providers: [AwsS3Service, GoogleCloudService, CloudStorageProviderFactory],
  exports: [AwsS3Service, GoogleCloudService, CloudStorageProviderFactory],
})
export class CloudStorageProviderModule {}
