import { Module } from '@nestjs/common';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';
import { AnimeDocumentModule } from '@app/common';

@Module({
  imports: [AnimeDocumentModule],
  controllers: [AnimeController],
  providers: [AnimeService],
  exports: [AnimeService],
})
export class AnimeModule {}
