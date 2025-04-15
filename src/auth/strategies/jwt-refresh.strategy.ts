import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { ITokenPayload } from '@app/common/types';
import { JWT_REFRESH_TOKEN_SECRET } from '@app/common/constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Refresh,
      ]),
      secretOrKey: configService.getOrThrow(JWT_REFRESH_TOKEN_SECRET),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: ITokenPayload) {
    return this.authService.veryifyUserRefreshToken(
      request.cookies?.Refresh,
      payload.user,
    );
  }
}
