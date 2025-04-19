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
import { RecentActivityService } from './recent-activity.service';
import { CreateRecentActivityDto } from './dtos/create-recent-activity.dto';
import { UpdateRecentActivityDto } from './dtos/update-recent-activity.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { Role, USER_ROLES } from '@app/common';

@Controller('v1/recent-activity')
export class RecentActivityController {
  constructor(private readonly recentActivityService: RecentActivityService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllRecentActivities(@Query('user') userId?: string) {
    return this.recentActivityService.getAllRecentActivities(userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getRecentActivityById(@Param('id') id: string) {
    return this.recentActivityService.getRecentActivityById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Role([USER_ROLES.ADMIN])
  async createRecentActivity(@Body() dto: CreateRecentActivityDto) {
    return this.recentActivityService.createRecentActivity(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async updateRecentActivity(
    @Param('id') id: string,
    @Body() dto: UpdateRecentActivityDto,
  ) {
    return this.recentActivityService.updateRecentActivity(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async deleteRecentActivity(@Param('id') id: string) {
    return this.recentActivityService.deleteRecentActivity(id);
  }
}
