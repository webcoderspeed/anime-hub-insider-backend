import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Settings } from './setting.schema';

@Injectable()
export class SettingsRepository extends AbstractRepository<Settings> {
  protected readonly logger = new Logger(SettingsRepository.name);

  constructor(
    @InjectModel(Settings.name) RelationModel: Model<Settings>,
    @InjectConnection() connection: Connection,
  ) {
    super(RelationModel, connection);
  }
}
