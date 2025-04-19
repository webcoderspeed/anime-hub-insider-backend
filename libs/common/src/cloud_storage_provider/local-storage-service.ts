import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { ICloudStorageProvider } from '../types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BACKEND_URL } from '../constants';

@Injectable()
export class LocalStorageService implements ICloudStorageProvider {
  private baseUploadDir = path.join(__dirname, '..', 'uploads');
  private configService = new ConfigService();
  private readonly _baseUrl = this.configService.get<string>(BACKEND_URL);

  constructor() {
    if (!fs.existsSync(this.baseUploadDir)) {
      fs.mkdirSync(this.baseUploadDir, { recursive: true });
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    animeId: string,
    episodeId?: string,
  ): Promise<{
    name: string;
    url: string;
    type: string;
  }> {
    const fileExt = path.extname(file.originalname);
    const filename = `${uuidv4()}${fileExt}`;

    const dirPath = episodeId
      ? path.join(this.baseUploadDir, animeId, episodeId)
      : path.join(this.baseUploadDir, animeId);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, filename);
    fs.writeFileSync(filePath, file.buffer);

    const urlPath = episodeId
      ? `/uploads/${animeId}/${episodeId}/${filename}`
      : `/uploads/${animeId}/${filename}`;

    return {
      name: filename,
      url: `${
        this._baseUrl?.endsWith('/')
          ? this._baseUrl.slice(0, -1)
          : this._baseUrl
      }${urlPath}`,
      type: file.mimetype,
    };
  }

  async deleteFile(name: string): Promise<void> {
    const filePath = path.join(this.baseUploadDir, name);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
