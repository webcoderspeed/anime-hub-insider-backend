import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { Media, MediaSchema } from './media.schema';
import { MediaRepository } from './media.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Media.name,
        schema: MediaSchema,
      },
    ]),
  ],
  providers: [MediaRepository],
  exports: [MediaRepository],
})
export class MediaDocumentModule {}
