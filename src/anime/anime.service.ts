import { AnimeRepository } from '@app/common';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GetAllAnimeDto } from './dtos/get-all-anime.dto';
import { CreateAnimeDto } from './dtos/create-anime.dto';
import { UpdateAnimeDto } from './dtos/update-anime.dto';
import { PipelineStage, Types } from 'mongoose';

@Injectable()
export class AnimeService {
  constructor(private readonly _animeRepository: AnimeRepository) {}

  async getAllAnime(query: GetAllAnimeDto) {
    const filter = {
      ...(query.search && { title: { $regex: query.search, $options: 'i' } }),
      ...(query.genres &&
        query.genres.length > 0 && {
          genres: { $in: query.genres.map((id) => new Types.ObjectId(id)) },
        }),
      ...(query.type && { type: query.type }),
      ...(query.status && { status: query.status }),
      ...(query.year && { releaseDate: { $regex: `^${query.year}` } }),
    };

    const limit = Number(query.limit ?? 10);
    const skip = Number(query.skip ?? 0);

    const pipeline: PipelineStage[] = [
      { $match: filter },
      {
        $lookup: {
          from: 'genres',
          localField: 'genres',
          foreignField: '_id',
          as: 'genres',
        },
      },
      { $skip: skip },
      { $limit: limit },
    ];

    const [results, total] = await Promise.all([
      this._animeRepository.aggregate(pipeline),
      this._animeRepository.countDocuments(filter),
    ]);

    return {
      results,
      total,
      page: Number(Math.floor(skip / limit) + 1),
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getAnimeById(id: string) {
    const anime = await this._animeRepository.findQuery({
      _id: new Types.ObjectId(id),
    });
    if (!anime) throw new NotFoundException('Anime not found');
    return anime;
  }

  async createAnime(payload: CreateAnimeDto) {
    const slug = payload.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    const existingAnime = await this._animeRepository.findQuery({ slug });

    if (existingAnime) {
      throw new BadRequestException('Anime already exists');
    }

    const anime = await this._animeRepository.create({
      ...payload,
      slug,
    });

    return anime;
  }

  async updateAnime(id: string, dto: UpdateAnimeDto) {
    const updated = await this._animeRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      dto,
    );
    if (!updated) throw new NotFoundException('Anime not found');
    return updated;
  }

  async deleteAnime(id: string) {
    const deleted = await this._animeRepository.deleteOne({
      _id: new Types.ObjectId(id),
    });
    if (!deleted.deletedCount) throw new NotFoundException('Anime not found');
    return { deleted: true };
  }
}
