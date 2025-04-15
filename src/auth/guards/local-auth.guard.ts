import { ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new ForbiddenException(
        'Missing credentials or user does not exist',
      );
    }
    return user;
  }
}
