import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { Stats, StatsSchema } from './stats.schema';
import { StatsRepository } from './stats.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Stats.name,
        schema: StatsSchema,
      },
    ]),
  ],
  providers: [StatsRepository],
  exports: [StatsRepository],
})
export class StatsDocumentModule {}
