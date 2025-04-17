import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { DatabaseModule, RecommendationDocumentModule } from '@app/common';

@Module({
  imports: [DatabaseModule, RecommendationDocumentModule],
  providers: [RecommendationService],
  controllers: [RecommendationController],
  exports: [RecommendationService],
})
export class RecommendationModule {}
