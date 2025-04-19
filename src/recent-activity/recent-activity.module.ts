import { Module } from '@nestjs/common';
import { RecentActivityService } from './recent-activity.service';
import { RecentActivityController } from './recent-activity.controller';
import { RecentActivityDocumentModule } from '@app/common';

@Module({
  imports: [RecentActivityDocumentModule],
  controllers: [RecentActivityController],
  providers: [RecentActivityService],
  exports: [RecentActivityService],
})
export class RecentActivityModule {}
