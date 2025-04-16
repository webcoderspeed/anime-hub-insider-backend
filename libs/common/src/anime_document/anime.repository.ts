import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Anime } from './anime.schema';

@Injectable()
export class AnimeRepository extends AbstractRepository<Anime> {
  protected readonly logger = new Logger(AnimeRepository.name);

  constructor(
    @InjectModel(Anime.name) authModel: Model<Anime>,
    @InjectConnection() connection: Connection,
  ) {
    super(authModel, connection);
  }
}
