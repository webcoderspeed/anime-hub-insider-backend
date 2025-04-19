import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FavoriteRepository } from '@app/common';
import { CreateFavoriteDto } from './dtos/create-favorite.dto';
import { UpdateFavoriteDto } from './dtos/update-favorite.dto';
import { Types } from 'mongoose';

@Injectable()
export class FavoriteService {
  constructor(private readonly _favoriteRepository: FavoriteRepository) {}

  async getAllFavorites(userId?: string) {
    const filter = userId ? { user: new Types.ObjectId(userId) } : {};
    return this._favoriteRepository.find(filter);
  }

  async getFavoriteById(id: string) {
    const favorite = await this._favoriteRepository.findOne({
      _id: new Types.ObjectId(id),
    });
    if (!favorite) throw new NotFoundException('Favorite not found');
    return favorite;
  }

  async createFavorite(dto: CreateFavoriteDto) {
    const exists = await this._favoriteRepository.findOne({
      user: new Types.ObjectId(dto.user),
      anime: new Types.ObjectId(dto.anime),
    });
    if (exists) throw new BadRequestException('Favorite already exists');
    return this._favoriteRepository.create({
      ...dto,
      user: new Types.ObjectId(dto.user),
      anime: new Types.ObjectId(dto.anime),
    });
  }

  async updateFavorite(id: string, dto: UpdateFavoriteDto) {
    const updated = await this._favoriteRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      dto,
    );
    if (!updated) throw new NotFoundException('Favorite not found');
    return updated;
  }

  async deleteFavorite(id: string) {
    const deleted = await this._favoriteRepository.deleteOne({
      _id: new Types.ObjectId(id),
    });
    if (!deleted.deletedCount)
      throw new NotFoundException('Favorite not found');
    return { deleted: true };
  }
}
