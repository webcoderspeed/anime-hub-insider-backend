import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Stats } from './stats.schema';

@Injectable()
export class StatsRepository extends AbstractRepository<Stats> {
  protected readonly logger = new Logger(StatsRepository.name);

  constructor(
    @InjectModel(Stats.name) StatsModel: Model<Stats>,
    @InjectConnection() connection: Connection,
  ) {
    super(StatsModel, connection);
  }
}
