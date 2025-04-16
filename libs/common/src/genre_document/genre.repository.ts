import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Genre } from './genre.schema';

@Injectable()
export class GenreRepository extends AbstractRepository<Genre> {
  protected readonly logger = new Logger(GenreRepository.name);

  constructor(
    @InjectModel(Genre.name) GenreModel: Model<Genre>,
    @InjectConnection() connection: Connection,
  ) {
    super(GenreModel, connection);
  }
}
