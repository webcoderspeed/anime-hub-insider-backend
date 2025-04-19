import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { Role, USER_ROLES } from '@app/common';

@Controller('v1/episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllEpisodes(@Query('anime') animeId?: string) {
    return this.episodeService.getAllEpisodes(animeId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getEpisodeById(@Param('id') id: string) {
    return this.episodeService.getEpisodeById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Role([USER_ROLES.ADMIN])
  async createEpisode(@Body() dto: CreateEpisodeDto) {
    return this.episodeService.createEpisode(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async updateEpisode(@Param('id') id: string, @Body() dto: UpdateEpisodeDto) {
    return this.episodeService.updateEpisode(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async deleteEpisode(@Param('id') id: string) {
    return this.episodeService.deleteEpisode(id);
  }
}
