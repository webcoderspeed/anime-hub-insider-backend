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

@Controller('v1/anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllAnime(@Query() query: GetAllAnimeDto) {
    return this.animeService.getAllAnime(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Role([USER_ROLES.ADMIN])
  async createAnime(@Body() dto: CreateAnimeDto) {
    return this.animeService.createAnime(dto);
  }
}
