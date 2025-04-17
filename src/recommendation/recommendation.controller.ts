import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { CreateRecommendationDto } from './dtos/create-recommendation.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { AuthInterceptor, Role, USER_ROLES } from '@app/common';

@Controller('v1/recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new AuthInterceptor())
  @Role([USER_ROLES.ADMIN])
  @HttpCode(HttpStatus.OK)
  async create(@Body() dto: CreateRecommendationDto) {
    return this.recommendationService.create(dto);
  }

  @Get('user/:userId')
  async findAllByUser(@Param('userId') userId: string) {
    return this.recommendationService.findAllByUser(userId);
  }

  @Get('anime/:animeId')
  async findAllByAnime(@Param('animeId') animeId: string) {
    return this.recommendationService.findAllByAnime(animeId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.recommendationService.remove(id);
  }
}
