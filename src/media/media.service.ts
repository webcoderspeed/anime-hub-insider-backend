import { ICloudProvider, MediaRepository } from '@app/common';
import { CloudStorageProviderFactory } from '@app/common/cloud_storage_provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaService {
  constructor(
    private readonly cloudStorageProviderFactory: CloudStorageProviderFactory,
    private readonly mediaRepository: MediaRepository,
  ) {}

  async uploadFile(file: Express.Multer.File, provider: ICloudProvider) {
    const cloudStorageProvider =
      this.cloudStorageProviderFactory.getProvider(provider);

    const uploadedFile = await cloudStorageProvider.uploadFile(file);

    const media = await this.mediaRepository.create(uploadedFile);

    return {
      name: media.name,
      type: media.type,
      _id: media._id,
    };
  }
}
