import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const { method, url, headers, query, params, body } = req;
    const res = context.switchToHttp().getResponse();

    this.logger.log({
      message: `Incoming Request: ${method} ${url}`,
      headers,
      query,
      params,
      body,
    });

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - now;
          this.logger.log({
            message: `Request Completed: ${method} ${url}`,
            status: res.statusCode,
            duration: `${duration}ms`,
          });
        },
        error: (err) => {
          const duration = Date.now() - now;
          this.logger.error({
            message: `Request Error: ${method} ${url}`,
            status: res.statusCode,
            duration: `${duration}ms`,
            error: err?.message || err,
          });
        },
      }),
    );
  }
}
