import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Upload } from '@aws-sdk/lib-storage';
import { S3 } from '@aws-sdk/client-s3';
import { ICloudStorageProvider } from '../types';
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_S3_BUCKET_NAME,
  AWS_S3_ENDPOINT,
  AWS_SECRET_ACCESS_KEY,
} from '../constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsS3Service implements ICloudStorageProvider {
  private s3: S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      endpoint: this.configService.getOrThrow(AWS_S3_ENDPOINT),
      region: this.configService.getOrThrow(AWS_REGION),

      credentials: {
        accessKeyId: this.configService.getOrThrow(AWS_ACCESS_KEY_ID),
        secretAccessKey: this.configService.getOrThrow(AWS_SECRET_ACCESS_KEY),
      },
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    animeId: string,
    episodeId?: string,
  ): Promise<{ name: string; url: string; type: string }> {
    try {
      const urlPath = episodeId
        ? `/uploads/${animeId}/${episodeId}/${file.originalname}`
        : `/uploads/${animeId}/${file.originalname}`;

      const uploadParams = {
        Bucket: this.configService.getOrThrow(AWS_S3_BUCKET_NAME),
        Key: urlPath,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };

      const uploadResult = await new Upload({
        client: this.s3,
        params: {
          Bucket: uploadParams.Bucket,
          Key: uploadParams.Key,
          Body: uploadParams.Body,
          ContentType: uploadParams.ContentType,
          ACL: 'public-read',
        },
      }).done();

      return {
        name: `${Date.now()}_${file.originalname}`,
        url: uploadResult.Location,
        type: file.mimetype,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to upload file: ${file.originalname}. Error: ${error.message}`,
      );
    }
  }

  async deleteFile(fileKey: string): Promise<void> {
    const deleteParams = {
      Bucket: this.configService.getOrThrow(AWS_S3_BUCKET_NAME),
      Key: fileKey,
    };

    try {
      await this.s3.deleteObject(deleteParams);
    } catch (error) {
      throw new Error(
        `Failed to delete file: ${fileKey}. Error: ${error.message}`,
      );
    }
  }
}
