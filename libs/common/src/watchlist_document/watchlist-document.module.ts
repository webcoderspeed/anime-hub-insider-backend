import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { Watchlist, WatchlistSchema } from './watchlist.schema';
import { WatchlistRepository } from './watchlist.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Watchlist.name,
        schema: WatchlistSchema,
      },
    ]),
  ],
  providers: [WatchlistRepository],
  exports: [WatchlistRepository],
})
export class WatchlistDocumentModule {}
