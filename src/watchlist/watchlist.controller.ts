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
import { WatchlistService } from './watchlist.service';
import { CreateWatchlistDto } from './dtos/create-watchlist.dto';
import { UpdateWatchlistDto } from './dtos/update-watchlist.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { Role, USER_ROLES } from '@app/common';

@Controller('v1/watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllWatchlists(@Query('user') userId?: string) {
    return this.watchlistService.getAllWatchlists(userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getWatchlistById(@Param('id') id: string) {
    return this.watchlistService.getWatchlistById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Role([USER_ROLES.ADMIN])
  async createWatchlist(@Body() dto: CreateWatchlistDto) {
    return this.watchlistService.createWatchlist(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async updateWatchlist(
    @Param('id') id: string,
    @Body() dto: UpdateWatchlistDto,
  ) {
    return this.watchlistService.updateWatchlist(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Role([USER_ROLES.ADMIN])
  async deleteWatchlist(@Param('id') id: string) {
    return this.watchlistService.deleteWatchlist(id);
  }
}
