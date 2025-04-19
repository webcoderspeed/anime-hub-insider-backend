import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { UpdateGenreDto } from './dtos/update-genre.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { Role, USER_ROLES } from '@app/common';

@Controller('v1/genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllGenres() {
    return this.genreService.getAllGenres();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getGenreById(@Param('id') id: string) {
    return this.genreService.getGenreById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Role([USER_ROLES.ADMIN])
  async createGenre(@Body() dto: CreateGenreDto) {
    return this.genreService.createGenre(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async updateGenre(@Param('id') id: string, @Body() dto: UpdateGenreDto) {
    return this.genreService.updateGenre(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async deleteGenre(@Param('id') id: string) {
    return this.genreService.deleteGenre(id);
  }
}
