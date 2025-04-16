import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { Genre, GenreSchema } from './genre.schema';
import { GenreRepository } from './genre.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Genre.name,
        schema: GenreSchema,
      },
    ]),
  ],
  providers: [GenreRepository],
  exports: [GenreRepository],
})
export class GenreDocumentModule {}
