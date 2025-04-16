import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { RecentActivity } from './recent-activity.schema';

@Injectable()
export class RecentActivityRepository extends AbstractRepository<RecentActivity> {
  protected readonly logger = new Logger(RecentActivityRepository.name);

  constructor(
    @InjectModel(RecentActivity.name)
    RecentActivityModel: Model<RecentActivity>,
    @InjectConnection() connection: Connection,
  ) {
    super(RecentActivityModel, connection);
  }
}
