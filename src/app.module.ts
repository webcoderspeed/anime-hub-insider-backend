import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { LoggerModule, LoggerType } from 'nestjs-logitron';
import { RecommendationModule } from './recommendation/recommendation.module';
import { AnimeModule } from './anime';
import { GenreModule } from './genre/genre.module';
import { EpisodeModule } from './episode/episode.module';
import { FavoriteModule } from './favorite/favorite.module';
import { NotificationsModule } from './notifications/notifications.module';
import { RecentActivityModule } from './recent-activity/recent-activity.module';
import { SettingsModule } from './settings/settings.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      type: LoggerType.PINO,
      options: {
        appName: 'animehubinsider',
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              options: {
                destination: 'app.log',
                singleLine: true,
                colorize: false,
                levelFirst: false,
                translateTime: 'dd-mm-yyyy hh:mm:ss TT',
                ignore: 'pid,hostname,level',
              },
            },
            {
              target: 'pino-pretty',
              options: {
                singleLine: true,
                colorize: true,
                levelFirst: false,
                translateTime: 'dd-mm-yyyy hh:mm:ss TT',
                ignore: 'pid,hostname,level',
              },
            },
          ],
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    AuthModule,
    MediaModule,
    RecommendationModule,
    AnimeModule,
    GenreModule,
    EpisodeModule,
    FavoriteModule,
    NotificationsModule,
    RecentActivityModule,
    SettingsModule,
    WatchlistModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
