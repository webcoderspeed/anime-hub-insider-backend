import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Notification } from './notification.schema';

@Injectable()
export class NotificationRepository extends AbstractRepository<Notification> {
  protected readonly logger = new Logger(NotificationRepository.name);

  constructor(
    @InjectModel(Notification.name)
    NotificationModel: Model<Notification>,
    @InjectConnection() connection: Connection,
  ) {
    super(NotificationModel, connection);
  }
}
