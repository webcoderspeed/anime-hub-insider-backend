import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from '@app/common';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { Types } from 'mongoose';

@Injectable()
export class ReviewsService {
  constructor(private readonly _reviewRepository: ReviewRepository) {}

  async getAllReviews(userId?: string) {
    const filter = userId ? { user: new Types.ObjectId(userId) } : {};
    return this._reviewRepository.find(filter);
  }

  async getReviewById(id: string) {
    const review = await this._reviewRepository.findOne({
      _id: new Types.ObjectId(id),
    });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async createReview(dto: CreateReviewDto) {
    return this._reviewRepository.create({
      ...dto,
      user: new Types.ObjectId(dto.user),
    });
  }

  async updateReview(id: string, dto: UpdateReviewDto) {
    const updated = await this._reviewRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      dto,
    );
    if (!updated) throw new NotFoundException('Review not found');
    return updated;
  }

  async deleteReview(id: string) {
    const deleted = await this._reviewRepository.deleteOne({
      _id: new Types.ObjectId(id),
    });
    if (!deleted.deletedCount) throw new NotFoundException('Review not found');
    return { deleted: true };
  }
}
