import { MediaRepository } from '@app/common';
import { CloudStorageProviderFactory } from '@app/common/cloud_storage_provider';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadFileDto } from './dtos/upload-file.dto';
import * as fs from 'fs';
import * as path from 'path';
import { Types } from 'mongoose';

@Injectable()
export class MediaService {
  constructor(
    private readonly cloudStorageProviderFactory: CloudStorageProviderFactory,
    private readonly mediaRepository: MediaRepository,
  ) {}

  async uploadFile(file: Express.Multer.File, uploadFileDto: UploadFileDto) {
    const cloudStorageProvider = this.cloudStorageProviderFactory.getProvider(
      uploadFileDto.provider,
    );

    const uploadedFile = await cloudStorageProvider.uploadFile(
      file,
      uploadFileDto.animeId,
      uploadFileDto.episodeId,
    );

    const media = await this.mediaRepository.create(uploadedFile);

    return {
      name: media.name,
      type: media.type,
      _id: media._id,
      url: media.url,
    };
  }

  async getMediaById(mediaId: string) {
    return await this.mediaRepository.findOne({
      _id: new Types.ObjectId(mediaId),
    });
  }

  async getMediaFile(relativePath: string): Promise<Buffer> {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    const filePath = path.join(uploadsDir, relativePath);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    return fs.promises.readFile(filePath);
  }

  getMediaFilePath(relativePath: string): string {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    return path.join(uploadsDir, relativePath);
  }
}
