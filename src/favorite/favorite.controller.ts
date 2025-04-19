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
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dtos/create-favorite.dto';
import { UpdateFavoriteDto } from './dtos/update-favorite.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { Role, USER_ROLES } from '@app/common';

@Controller('v1/favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllFavorites(@Query('user') userId?: string) {
    return this.favoriteService.getAllFavorites(userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getFavoriteById(@Param('id') id: string) {
    return this.favoriteService.getFavoriteById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Role([USER_ROLES.ADMIN])
  async createFavorite(@Body() dto: CreateFavoriteDto) {
    return this.favoriteService.createFavorite(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async updateFavorite(
    @Param('id') id: string,
    @Body() dto: UpdateFavoriteDto,
  ) {
    return this.favoriteService.updateFavorite(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async deleteFavorite(@Param('id') id: string) {
    return this.favoriteService.deleteFavorite(id);
  }
}
