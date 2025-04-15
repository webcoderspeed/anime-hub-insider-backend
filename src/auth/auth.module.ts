import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  AuthDocumentModule,
  DatabaseModule,
  MailerModule,
  UserDocumentModule,
} from '@app/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import {
  GoogleStrategy,
  JwtRefreshStrategy,
  JwtStrategy,
  LocalStrategy,
} from './strategies';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    DatabaseModule,
    AuthDocumentModule,
    UserDocumentModule,
    PassportModule,
    JwtModule,
    MailerModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
