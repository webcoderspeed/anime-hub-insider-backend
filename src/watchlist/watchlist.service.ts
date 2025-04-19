import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { WatchlistRepository } from '@app/common';
import { CreateWatchlistDto } from './dtos/create-watchlist.dto';
import { UpdateWatchlistDto } from './dtos/update-watchlist.dto';
import { Types } from 'mongoose';

@Injectable()
export class WatchlistService {
  constructor(private readonly _watchlistRepository: WatchlistRepository) {}

  async getAllWatchlists(userId?: string) {
    const filter = userId ? { user: new Types.ObjectId(userId) } : {};
    return this._watchlistRepository.find(filter);
  }

  async getWatchlistById(id: string) {
    const watchlist = await this._watchlistRepository.findOne({
      _id: new Types.ObjectId(id),
    });
    if (!watchlist) throw new NotFoundException('Watchlist not found');
    return watchlist;
  }

  async createWatchlist(dto: CreateWatchlistDto) {
    const exists = await this._watchlistRepository.findOne({
      user: new Types.ObjectId(dto.user),
      anime: new Types.ObjectId(dto.anime),
    });
    if (exists) throw new BadRequestException('Anime already in watchlist');
    return this._watchlistRepository.create({
      user: new Types.ObjectId(dto.user),
      anime: new Types.ObjectId(dto.anime),
      progress: dto.progress,
    });
  }

  async updateWatchlist(id: string, dto: UpdateWatchlistDto) {
    const updated = await this._watchlistRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      dto,
    );
    if (!updated) throw new NotFoundException('Watchlist not found');
    return updated;
  }

  async deleteWatchlist(id: string) {
    const deleted = await this._watchlistRepository.deleteOne({
      _id: new Types.ObjectId(id),
    });
    if (!deleted.deletedCount)
      throw new NotFoundException('Watchlist not found');
    return { deleted: true };
  }
}
