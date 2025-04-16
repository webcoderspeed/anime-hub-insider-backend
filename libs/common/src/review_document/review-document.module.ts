import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { Review, ReviewSchema } from './review.schema';
import { ReviewRepository } from './review.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Review.name,
        schema: ReviewSchema,
      },
    ]),
  ],
  providers: [ReviewRepository],
  exports: [ReviewRepository],
})
export class ReviewDocumentModule {}
