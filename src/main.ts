import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService, TraceIdHandler } from 'nestjs-logitron';
import {
  APP_PORT,
  corsOptions,
  ErrorExceptionFilter,
  ResponseInterceptor,
  ValidationPipe,
  X_TRACE_ID,
} from '@app/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  TraceIdHandler.setTraceIdField(X_TRACE_ID);

  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  app.setGlobalPrefix('api');

  app.useLogger(app.get<LoggerService>(LoggerService));

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ErrorExceptionFilter());
  app.use(cookieParser());

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  const DEV_ORIGINS = configService.getOrThrow<string>('DEV_ORIGINS');
  const PROD_ORIGINS = configService.getOrThrow<string>('PROD_ORIGINS');

  app.enableCors(
    process.env.NODE_ENV === 'development'
      ? corsOptions(DEV_ORIGINS)
      : corsOptions(PROD_ORIGINS),
  );

  await app.listen(configService.getOrThrow(APP_PORT));
}
bootstrap();
