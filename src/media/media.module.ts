import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { CloudStorageProviderModule } from '@app/common/cloud_storage_provider/cloud-storage-provider.module';
import { MediaDocumentModule } from '@app/common';

@Module({
  imports: [CloudStorageProviderModule, MediaDocumentModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
