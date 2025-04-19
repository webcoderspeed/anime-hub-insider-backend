import { Injectable, NotFoundException } from '@nestjs/common';
import { RecommendationRepository } from '@app/common';
import { CreateRecommendationDto } from './dtos/create-recommendation.dto';
import { UpdateRecommendationDto } from './dtos/update-recommendation.dto';
import { Types } from 'mongoose';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly _recommendationRepository: RecommendationRepository,
  ) {}

  async getAllRecommendations() {
    return this._recommendationRepository.find({});
  }

  async getRecommendationById(id: string) {
    const recommendation = await this._recommendationRepository.findOne({
      _id: new Types.ObjectId(id),
    });
    if (!recommendation)
      throw new NotFoundException('Recommendation not found');
    return recommendation;
  }

  async createRecommendation(dto: CreateRecommendationDto) {
    return this._recommendationRepository.create({
      user: new Types.ObjectId(dto.user),
      anime: new Types.ObjectId(dto.anime),
      reason: dto.reason,
    });
  }

  async updateRecommendation(id: string, dto: UpdateRecommendationDto) {
    const updated = await this._recommendationRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      dto,
    );
    if (!updated) throw new NotFoundException('Recommendation not found');
    return updated;
  }

  async deleteRecommendation(id: string) {
    const deleted = await this._recommendationRepository.deleteOne({
      _id: new Types.ObjectId(id),
    });
    if (!deleted.deletedCount)
      throw new NotFoundException('Recommendation not found');
    return { deleted: true };
  }
}
