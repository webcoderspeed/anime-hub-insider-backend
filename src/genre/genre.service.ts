import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { GenreRepository } from '@app/common';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { UpdateGenreDto } from './dtos/update-genre.dto';
import { Types } from 'mongoose';

@Injectable()
export class GenreService {
  constructor(private readonly _genreRepository: GenreRepository) {}

  async getAllGenres() {
    return this._genreRepository.find({});
  }

  async getGenreById(id: string) {
    const genre = await this._genreRepository.findOne({
      _id: new Types.ObjectId(id),
    });
    if (!genre) throw new NotFoundException('Genre not found');
    return genre;
  }

  async createGenre(dto: CreateGenreDto) {
    const exists = await this._genreRepository.findOne({ name: dto.name });
    if (exists) throw new BadRequestException('Genre already exists');
    return this._genreRepository.create(dto);
  }

  async updateGenre(id: string, dto: UpdateGenreDto) {
    const updated = await this._genreRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      dto,
    );
    if (!updated) throw new NotFoundException('Genre not found');
    return updated;
  }

  async deleteGenre(id: string) {
    const deleted = await this._genreRepository.deleteOne({
      _id: new Types.ObjectId(id),
    });
    if (!deleted.deletedCount) throw new NotFoundException('Genre not found');
    return { deleted: true };
  }
}
