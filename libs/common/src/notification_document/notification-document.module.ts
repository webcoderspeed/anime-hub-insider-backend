import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { Notification, NotificationSchema } from './notification.schema';
import { NotificationRepository } from './notification.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
    ]),
  ],
  providers: [NotificationRepository],
  exports: [NotificationRepository],
})
export class NotificationDocumentModule {}
