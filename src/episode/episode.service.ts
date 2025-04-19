import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { EpisodeRepository } from '@app/common';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { Types } from 'mongoose';

@Injectable()
export class EpisodeService {
  constructor(private readonly _episodeRepository: EpisodeRepository) {}

  async getAllEpisodes(animeId?: string) {
    const filter = animeId ? { anime: new Types.ObjectId(animeId) } : {};
    return this._episodeRepository.find(filter);
  }

  async getEpisodeById(id: string) {
    const episode = await this._episodeRepository.findOne({
      _id: new Types.ObjectId(id),
    });
    if (!episode) throw new NotFoundException('Episode not found');
    return episode;
  }

  async createEpisode(dto: CreateEpisodeDto) {
    // Optionally check for duplicate episode number for the same anime
    const exists = await this._episodeRepository.findOne({
      anime: new Types.ObjectId(dto.anime),
      number: dto.number,
    });
    if (exists)
      throw new BadRequestException(
        'Episode already exists for this anime and number',
      );
    return this._episodeRepository.create({
      anime: new Types.ObjectId(dto.anime),
      number: dto.number,
      title: dto.title,
      videoUrl: dto.videoUrl,
      description: dto.description,
    });
  }

  async updateEpisode(id: string, dto: UpdateEpisodeDto) {
    const updated = await this._episodeRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      dto,
    );
    if (!updated) throw new NotFoundException('Episode not found');
    return updated;
  }

  async deleteEpisode(id: string) {
    const deleted = await this._episodeRepository.deleteOne({
      _id: new Types.ObjectId(id),
    });
    if (!deleted.deletedCount) throw new NotFoundException('Episode not found');
    return { deleted: true };
  }
}
