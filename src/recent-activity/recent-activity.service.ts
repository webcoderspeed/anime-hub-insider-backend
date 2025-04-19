import { Injectable, NotFoundException } from '@nestjs/common';
import { RecentActivityRepository } from '@app/common';
import { CreateRecentActivityDto } from './dtos/create-recent-activity.dto';
import { UpdateRecentActivityDto } from './dtos/update-recent-activity.dto';
import { Types } from 'mongoose';

@Injectable()
export class RecentActivityService {
  constructor(
    private readonly _recentActivityRepository: RecentActivityRepository,
  ) {}

  async getAllRecentActivities(userId?: string) {
    const filter = userId ? { user: new Types.ObjectId(userId) } : {};
    return this._recentActivityRepository.find(filter);
  }

  async getRecentActivityById(id: string) {
    const activity = await this._recentActivityRepository.findOne({
      _id: new Types.ObjectId(id),
    });
    if (!activity) throw new NotFoundException('Recent activity not found');
    return activity;
  }

  async createRecentActivity(dto: CreateRecentActivityDto) {
    return this._recentActivityRepository.create({
      user: new Types.ObjectId(dto.user),
      activityType: dto.activityType,
      details: dto.details,
      targetId: dto.targetId,
    });
  }

  async updateRecentActivity(id: string, dto: UpdateRecentActivityDto) {
    const updated = await this._recentActivityRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      dto,
    );
    if (!updated) throw new NotFoundException('Recent activity not found');
    return updated;
  }

  async deleteRecentActivity(id: string) {
    const deleted = await this._recentActivityRepository.deleteOne({
      _id: new Types.ObjectId(id),
    });
    if (!deleted.deletedCount)
      throw new NotFoundException('Recent activity not found');
    return { deleted: true };
  }
}
