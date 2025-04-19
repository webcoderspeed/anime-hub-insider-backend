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
import { SettingsService } from './settings.service';
import { CreateSettingsDto } from './dtos/create-settings.dto';
import { UpdateSettingsDto } from './dtos/update-settings.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { Role, USER_ROLES } from '@app/common';

@Controller('v1/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async getSettingsByUser(@Param('userId') userId: string) {
    return this.settingsService.getSettingsByUser(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Role([USER_ROLES.ADMIN])
  async createSettings(@Body() dto: CreateSettingsDto) {
    return this.settingsService.createSettings(dto);
  }

  @Patch(':userId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async updateSettings(
    @Param('userId') userId: string,
    @Body() dto: UpdateSettingsDto,
  ) {
    return this.settingsService.updateSettings(userId, dto);
  }

  @Delete(':userId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async deleteSettings(@Param('userId') userId: string) {
    return this.settingsService.deleteSettings(userId);
  }
}
