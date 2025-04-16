import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { Recommendation, RecommendationSchema } from './recommendation.schema';
import { RecommendationRepository } from './recommendation.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Recommendation.name,
        schema: RecommendationSchema,
      },
    ]),
  ],
  providers: [RecommendationRepository],
  exports: [RecommendationRepository],
})
export class RecommendationDocumentModule {}
