import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Episode } from './episode.schema';

@Injectable()
export class EpisodeRepository extends AbstractRepository<Episode> {
  protected readonly logger = new Logger(EpisodeRepository.name);

  constructor(
    @InjectModel(Episode.name) EpisodeModel: Model<Episode>,
    @InjectConnection() connection: Connection,
  ) {
    super(EpisodeModel, connection);
  }
}
