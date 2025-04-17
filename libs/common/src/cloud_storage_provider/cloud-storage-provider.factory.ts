import { Injectable } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { GoogleCloudService } from './google-cloud.service';
import { ICloudProvider, ICloudStorageProvider } from '../types';
import { LocalStorageService } from './local-storage-service';

export const CLOUD_PROVIDERS = {
  AWS_S3: 'AWS_S3',
  GOOGLE_CLOUD: 'GOOGLE_CLOUD',
  LOCAL: 'LOCAL',
} as const;

@Injectable()
export class CloudStorageProviderFactory {
  constructor(
    private readonly awsS3Service: AwsS3Service,
    private readonly googleCloudService: GoogleCloudService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  getProvider(providerFlag: ICloudProvider): ICloudStorageProvider {
    switch (providerFlag) {
      case CLOUD_PROVIDERS.AWS_S3:
        return this.awsS3Service;
      case CLOUD_PROVIDERS.GOOGLE_CLOUD:
        return this.googleCloudService;
      case CLOUD_PROVIDERS.LOCAL:
        return this.localStorageService;
      default:
        throw new Error('Invalid Cloud Provider');
    }
  }
}
