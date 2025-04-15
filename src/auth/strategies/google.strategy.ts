import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import {
  GOOGLE_AUTH_CLIENT_ID,
  GOOGLE_AUTH_CLIENT_SECRET,
  GOOGLE_AUTH_REDIRECT_URI,
} from '@app/common/constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.getOrThrow(GOOGLE_AUTH_CLIENT_ID),
      clientSecret: configService.getOrThrow(GOOGLE_AUTH_CLIENT_SECRET),
      callbackURL: configService.getOrThrow(GOOGLE_AUTH_REDIRECT_URI),
      scope: ['profile', 'email'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any) {
    // TODO: add validate google strategy
  }
}
