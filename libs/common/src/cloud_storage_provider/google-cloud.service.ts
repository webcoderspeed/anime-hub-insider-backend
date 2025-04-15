import { Injectable } from '@nestjs/common';
import { Bucket, Storage } from '@google-cloud/storage';
import { ICloudStorageProvider } from '../types';
import { ConfigService } from '@nestjs/config';
import { GCLOUD_BUCKET_NAME } from '../constants';

@Injectable()
export class GoogleCloudService implements ICloudStorageProvider {
  private storage: Storage;
  private bucket: Bucket;

  constructor(private readonly configService: ConfigService) {
    this.storage = new Storage();
    this.bucket = this.storage.bucket(
      this.configService.getOrThrow(GCLOUD_BUCKET_NAME),
    );
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ name: string; url: string; type: string }> {
    const fileName = `uploads/${Date.now()}_${file.originalname}`;
    const blob = this.bucket.file(fileName);
    const blobStream = blob.createWriteStream();

    return new Promise((resolve, reject) => {
      blobStream.on('finish', () => {
        resolve({
          name: file.originalname,
          url: `https://storage.googleapis.com/${this.configService.getOrThrow(GCLOUD_BUCKET_NAME)}/${fileName}`,
          type: file.mimetype,
        });
      });

      blobStream.on('error', (err) => {
        reject(err);
      });

      blobStream.end(file.buffer);
    });
  }

  async deleteFile(fileName: string): Promise<void> {
    try {
      await this.bucket.file(fileName).delete();
    } catch (error) {
      if (error.code === 404) {
        throw new Error(`File not found: ${fileName}`);
      }
      throw new Error(
        `Failed to delete file: ${fileName}. Error: ${error.message}`,
      );
    }
  }
}
