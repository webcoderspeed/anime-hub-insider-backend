import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { Episode, EpisodeSchema } from './episode.schema';
import { EpisodeRepository } from './episode.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Episode.name,
        schema: EpisodeSchema,
      },
    ]),
  ],
  providers: [EpisodeRepository],
  exports: [EpisodeRepository],
})
export class EpisodeDocumentModule {}
