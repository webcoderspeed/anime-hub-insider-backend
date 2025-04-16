import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { RecentActivity, RecentActivitySchema } from './recent-activity.schema';
import { RecentActivityRepository } from './recent-activity.repositoy';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: RecentActivity.name,
        schema: RecentActivitySchema,
      },
    ]),
  ],
  providers: [RecentActivityRepository],
  exports: [RecentActivityRepository],
})
export class RecentActivityDocumentModule {}
