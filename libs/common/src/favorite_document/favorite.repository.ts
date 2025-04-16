import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Favorite } from './favorite.schema';

@Injectable()
export class FavoriteRepository extends AbstractRepository<Favorite> {
  protected readonly logger = new Logger(FavoriteRepository.name);

  constructor(
    @InjectModel(Favorite.name) FavoriteModel: Model<Favorite>,
    @InjectConnection() connection: Connection,
  ) {
    super(FavoriteModel, connection);
  }
}
