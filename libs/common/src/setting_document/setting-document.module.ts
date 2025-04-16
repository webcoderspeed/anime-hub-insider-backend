import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { Settings, SettingsSchema } from './setting.schema';
import { SettingsRepository } from './setting.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Settings.name,
        schema: SettingsSchema,
      },
    ]),
  ],
  providers: [SettingsRepository],
  exports: [SettingsRepository],
})
export class SettingsDocumentModule {}
