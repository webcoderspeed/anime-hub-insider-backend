import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Media } from './media.schema';

@Injectable()
export class MediaRepository extends AbstractRepository<Media> {
  protected readonly logger = new Logger(MediaRepository.name);

  constructor(
    @InjectModel(Media.name) MediaModel: Model<Media>,
    @InjectConnection() connection: Connection,
  ) {
    super(MediaModel, connection);
  }
}
