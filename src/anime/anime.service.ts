import { AnimeRepository } from '@app/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GetAllAnimeDto } from './dtos/get-all-anime.dto';
import { CreateAnimeDto } from './dtos';

@Injectable()
export class AnimeService {
  constructor(private readonly _animeRepository: AnimeRepository) {}

  async getAllAnime(query: GetAllAnimeDto) {
    const filter = {
      ...(query.search && { title: { $regex: query.search, $options: 'i' } }),
      ...(query.genres &&
        query.genres.length > 0 && { genres: { $in: query.genres } }),
      ...(query.type && { type: query.type }),
      ...(query.status && { status: query.status }),
      ...(query.year && { releaseDate: { $regex: `^${query.year}` } }),
    };

    const skip = Number(query.skip ?? 0);

    const limit = Number(query.limit ?? 10);

    const [results, total] = await Promise.all([
      this._animeRepository
        .findQuery(filter)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this._animeRepository.countDocuments(filter),
    ]);

    return {
      results,
      total,
      page: Math.floor(skip / limit) + 1,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async createAnime(payload: CreateAnimeDto) {
    const slug = payload.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    const existingAnime = await this._animeRepository.findOne({ slug });

    if (existingAnime) {
      throw new BadRequestException('Anime already exists');
    }

    const anime = await this._animeRepository.create({
      ...payload,
      slug,
    });
    return anime;
  }
}
