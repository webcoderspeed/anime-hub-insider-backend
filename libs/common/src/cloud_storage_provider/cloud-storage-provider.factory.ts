import { Injectable } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { GoogleCloudService } from './google-cloud.service';
import { ICloudProvider, ICloudStorageProvider } from '../types';

export const CLOUD_PROVIDERS = {
  AWS_S3: 'AWS_S3',
  GOOGLE_CLOUD: 'GOOGLE_CLOUD',
} as const;

@Injectable()
export class CloudStorageProviderFactory {
  constructor(
    private readonly awsS3Service: AwsS3Service,
    private readonly googleCloudService: GoogleCloudService,
  ) {}

  getProvider(providerFlag: ICloudProvider): ICloudStorageProvider {
    switch (providerFlag) {
      case CLOUD_PROVIDERS.AWS_S3:
        return this.awsS3Service;
      case CLOUD_PROVIDERS.GOOGLE_CLOUD:
        return this.googleCloudService;
      default:
        throw new Error('Invalid Cloud Provider');
    }
  }
}
