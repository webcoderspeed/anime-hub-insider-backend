import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { StatsRepository } from '@app/common';
import { CreateStatsDto } from './dtos/create-stats.dto';
import { UpdateStatsDto } from './dtos/update-stats.dto';
import { Types } from 'mongoose';

@Injectable()
export class StatsService {
  constructor(private readonly _statsRepository: StatsRepository) {}

  async getStatsByUser(userId: string) {
    const stats = await this._statsRepository.findOne({
      user: new Types.ObjectId(userId),
    });
    if (!stats) throw new NotFoundException('Stats not found');
    return stats;
  }

  async createStats(dto: CreateStatsDto) {
    const exists = await this._statsRepository.findOne({
      user: new Types.ObjectId(dto.user),
    });
    if (exists)
      throw new BadRequestException('Stats already exist for this user');
    return this._statsRepository.create({
      user: new Types.ObjectId(dto.user),
      totalWatched: dto.totalWatched,
      totalFavorites: dto.totalFavorites,
      totalReviews: dto.totalReviews,
    });
  }

  async updateStats(userId: string, dto: UpdateStatsDto) {
    const updated = await this._statsRepository.findOneAndUpdate(
      { user: new Types.ObjectId(userId) },
      dto,
    );
    if (!updated) throw new NotFoundException('Stats not found');
    return updated;
  }

  async deleteStats(userId: string) {
    const deleted = await this._statsRepository.deleteOne({
      user: new Types.ObjectId(userId),
    });
    if (!deleted.deletedCount) throw new NotFoundException('Stats not found');
    return { deleted: true };
  }
}
