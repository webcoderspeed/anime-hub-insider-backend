import { Injectable } from '@nestjs/common';
import { CreateRecommendationDto } from './dtos/create-recommendation.dto';
import { RecommendationRepository } from '@app/common';
import { Types } from 'mongoose';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly _recommendationRepository: RecommendationRepository,
  ) {}

  async create(createDto: CreateRecommendationDto) {
    return this._recommendationRepository.create(createDto);
  }

  async findAllByUser(userId: string) {
    return this._recommendationRepository.find({ user: userId });
  }

  async findAllByAnime(animeId: string) {
    return this._recommendationRepository.find({ anime: animeId });
  }

  async remove(id: string) {
    return this._recommendationRepository.deleteOne({
      _id: new Types.ObjectId(id),
    });
  }
}
