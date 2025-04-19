import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SettingsRepository } from '@app/common';
import { CreateSettingsDto } from './dtos/create-settings.dto';
import { UpdateSettingsDto } from './dtos/update-settings.dto';
import { Types } from 'mongoose';

@Injectable()
export class SettingsService {
  constructor(private readonly _settingsRepository: SettingsRepository) {}

  async getSettingsByUser(userId: string) {
    const settings = await this._settingsRepository.findOne({
      user: new Types.ObjectId(userId),
    });
    if (!settings) throw new NotFoundException('Settings not found');
    return settings;
  }

  async createSettings(dto: CreateSettingsDto) {
    const exists = await this._settingsRepository.findOne({
      user: new Types.ObjectId(dto.user),
    });
    if (exists)
      throw new BadRequestException('Settings already exist for this user');
    return this._settingsRepository.create({
      ...dto,
      user: new Types.ObjectId(dto.user),
    });
  }

  async updateSettings(userId: string, dto: UpdateSettingsDto) {
    const updated = await this._settingsRepository.findOneAndUpdate(
      { user: new Types.ObjectId(userId) },
      dto,
    );
    if (!updated) throw new NotFoundException('Settings not found');
    return updated;
  }

  async deleteSettings(userId: string) {
    const deleted = await this._settingsRepository.deleteOne({
      user: new Types.ObjectId(userId),
    });
    if (!deleted.deletedCount)
      throw new NotFoundException('Settings not found');
    return { deleted: true };
  }
}
