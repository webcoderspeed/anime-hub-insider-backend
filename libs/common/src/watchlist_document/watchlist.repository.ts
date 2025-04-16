import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Watchlist } from './watchlist.schema';

@Injectable()
export class WatchlistRepository extends AbstractRepository<Watchlist> {
  protected readonly logger = new Logger(WatchlistRepository.name);

  constructor(
    @InjectModel(Watchlist.name)
    WatchlistModel: Model<Watchlist>,
    @InjectConnection() connection: Connection,
  ) {
    super(WatchlistModel, connection);
  }
}
