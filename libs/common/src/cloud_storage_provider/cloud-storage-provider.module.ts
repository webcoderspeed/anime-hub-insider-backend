import { Module } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { GoogleCloudService } from './google-cloud.service';
import { CloudStorageProviderFactory } from './cloud-storage-provider.factory';
import { LocalStorageService } from './local-storage-service';

@Module({
  providers: [
    AwsS3Service,
    GoogleCloudService,
    LocalStorageService,
    CloudStorageProviderFactory,
  ],
  exports: [
    AwsS3Service,
    GoogleCloudService,
    LocalStorageService,
    CloudStorageProviderFactory,
  ],
})
export class CloudStorageProviderModule {}
