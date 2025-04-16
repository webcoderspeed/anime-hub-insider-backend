import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { Anime, AnimeSchema } from './anime.schema';
import { AnimeRepository } from './anime.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Anime.name,
        schema: AnimeSchema,
      },
    ]),
  ],
  providers: [AnimeRepository],
  exports: [AnimeRepository],
})
export class AnimeDocumentModule {}
