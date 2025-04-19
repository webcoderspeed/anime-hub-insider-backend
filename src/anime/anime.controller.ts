import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { GetAllAnimeDto } from './dtos/get-all-anime.dto';
import { CreateAnimeDto } from './dtos';
import { JwtAuthGuard } from 'src/auth/guards';
import { Role, USER_ROLES } from '@app/common';
import { Param, Patch, Delete } from '@nestjs/common';
import { UpdateAnimeDto } from './dtos';

@Controller('v1/anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllAnime(@Query() query: GetAllAnimeDto) {
    return this.animeService.getAllAnime(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getAnimeById(@Param('id') id: string) {
    return this.animeService.getAnimeById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Role([USER_ROLES.ADMIN])
  async createAnime(@Body() dto: CreateAnimeDto) {
    return this.animeService.createAnime(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async updateAnime(@Param('id') id: string, @Body() dto: UpdateAnimeDto) {
    return this.animeService.updateAnime(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async deleteAnime(@Param('id') id: string) {
    return this.animeService.deleteAnime(id);
  }
}
