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
import { StatsService } from './stats.service';
import { CreateStatsDto } from './dtos/create-stats.dto';
import { UpdateStatsDto } from './dtos/update-stats.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { Role, USER_ROLES } from '@app/common';

@Controller('v1/stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async getStatsByUser(@Param('userId') userId: string) {
    return this.statsService.getStatsByUser(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Role([USER_ROLES.ADMIN])
  async createStats(@Body() dto: CreateStatsDto) {
    return this.statsService.createStats(dto);
  }

  @Patch(':userId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async updateStats(
    @Param('userId') userId: string,
    @Body() dto: UpdateStatsDto,
  ) {
    return this.statsService.updateStats(userId, dto);
  }

  @Delete(':userId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async deleteStats(@Param('userId') userId: string) {
    return this.statsService.deleteStats(userId);
  }
}
