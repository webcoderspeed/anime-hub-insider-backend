import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Review } from './review.schema';

@Injectable()
export class ReviewRepository extends AbstractRepository<Review> {
  protected readonly logger = new Logger(ReviewRepository.name);

  constructor(
    @InjectModel(Review.name)
    ReviewModel: Model<Review>,
    @InjectConnection() connection: Connection,
  ) {
    super(ReviewModel, connection);
  }
}
