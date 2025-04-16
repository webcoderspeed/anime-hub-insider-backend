import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { Favorite, FavoriteSchema } from './favorite.schema';
import { FavoriteRepository } from './favorite.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Favorite.name,
        schema: FavoriteSchema,
      },
    ]),
  ],
  providers: [FavoriteRepository],
  exports: [FavoriteRepository],
})
export class FavoriteDocumentModule {}
