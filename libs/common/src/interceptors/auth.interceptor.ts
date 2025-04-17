import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';
import { ITokenPayload } from '../types';
import { USER_ROLES_LABELS } from '../constants';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    try {
      const request = context.switchToHttp().getRequest();

      const authentication = request.cookies['Authentication'];

      if (!authentication) {
        throw new UnauthorizedException(`customHeader is missing`);
      }

      const payload = verify(
        authentication,
        process.env.JWT_ACCESS_TOKEN_SECRET,
      ) as unknown as ITokenPayload;

      request['role'] = payload.role;

      const onlyAllowedRoles = Reflect.getMetadata(
        'roles',
        context.getHandler(),
      );

      const canAccess = this.matchRole(onlyAllowedRoles, payload.role);

      if (canAccess) {
        return next.handle();
      }

      throw new UnauthorizedException(
        `${USER_ROLES_LABELS[payload.role]} is not allowed to access this resource`,
      );
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  matchRole(roles: number[], userRole: number): boolean {
    return roles.some((role) => userRole === role);
  }
}
