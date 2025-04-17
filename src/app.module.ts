import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { LoggerModule, LoggerType } from 'nestjs-logitron';
import { RecommendationModule } from './recommendation/recommendation.module';
import { AnimeModule } from './anime';

@Module({
  imports: [
    LoggerModule.forRoot({
      type: LoggerType.PINO,
      options: {
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
