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
import { RecommendationService } from './recommendation.service';
import { CreateRecommendationDto } from './dtos/create-recommendation.dto';
import { UpdateRecommendationDto } from './dtos/update-recommendation.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { Role, USER_ROLES } from '@app/common';

@Controller('v1/recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllRecommendations() {
    return this.recommendationService.getAllRecommendations();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getRecommendationById(@Param('id') id: string) {
    return this.recommendationService.getRecommendationById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Role([USER_ROLES.ADMIN])
  async createRecommendation(@Body() dto: CreateRecommendationDto) {
    return this.recommendationService.createRecommendation(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async updateRecommendation(
    @Param('id') id: string,
    @Body() dto: UpdateRecommendationDto,
  ) {
    return this.recommendationService.updateRecommendation(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async deleteRecommendation(@Param('id') id: string) {
    return this.recommendationService.deleteRecommendation(id);
  }
}
