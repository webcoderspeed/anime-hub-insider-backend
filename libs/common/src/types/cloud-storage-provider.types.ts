import { CLOUD_PROVIDERS } from '../cloud_storage_provider';

export interface ICloudStorageProvider {
  uploadFile(file: Express.Multer.File): Promise<{
    name: string;
    url: string;
    type: string;
  }>;

  deleteFile(name: string): Promise<void>;
}

export type ICloudProvider = keyof typeof CLOUD_PROVIDERS;
