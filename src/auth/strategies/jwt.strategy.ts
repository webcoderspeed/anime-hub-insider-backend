import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ITokenPayload } from '@app/common/types';
import { AuthService } from '../auth.service';
import { JWT_ACCESS_TOKEN_SECRET } from '@app/common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Authentication,
      ]),
      secretOrKey: configService.getOrThrow(JWT_ACCESS_TOKEN_SECRET),
    });
  }

  async validate(payload: ITokenPayload) {
    return this.authService.getUser({ userId: payload.user });
  }
}
