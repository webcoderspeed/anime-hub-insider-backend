import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Recommendation } from './recommendation.schema';

@Injectable()
export class RecommendationRepository extends AbstractRepository<Recommendation> {
  protected readonly logger = new Logger(RecommendationRepository.name);

  constructor(
    @InjectModel(Recommendation.name)
    _recommendationModel: Model<Recommendation>,
    @InjectConnection() connection: Connection,
  ) {
    super(_recommendationModel, connection);
  }
}
