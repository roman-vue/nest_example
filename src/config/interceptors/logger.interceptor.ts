import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    constructor() {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const now = Date.now();
      const httpContext = context.switchToHttp();
      const request = httpContext.getRequest();
  
      const ip = this.getIP(request);
  
      Logger.log(
        `Incoming Request on ${request.path}`,
        `method=${request.method} ip=${ip}`,
      );
  
      return next.handle().pipe(
        tap(() => {
          Logger.log(
            `End Request for ${request.path}`,
            `method=${request.method} ip=${ip} duration=${Date.now() - now}ms`,
          );
        }),
      );
    }
  
    private getIP(request: any): string {
      let ip: string;
      const ipAddr = request.headers['x-forwarded-for'];
      if (ipAddr) {
        const list = ipAddr.split(',');
        ip = list[list.length - 1];
      } else {
        ip = request.connection.remoteAddress;
      }
      return ip.replace('::ffff:', '');
    }
  }