import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  
  interface IError {
    message: string;
    status: string;
  }
  
  @Catch()
  export class AllExceptionFilter implements ExceptionFilter {
    constructor() {}
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request: any = ctx.getRequest();
  
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        exception instanceof HttpException
          ? (exception.getResponse() as IError)
          : { message: (exception as Error).message, status: null };
  
      const responseData = {
        ...{
          status: status,
          timestamp: new Date().toISOString(),
        },
        ...message,
      };
  
      this.logMessage(request, message, status, exception);
  
      response.status(status).json(responseData);
    }
  
    private logMessage(
      request: any,
      message: IError,
      status: number,
      exception: any,
    ) {
      if (status === 500) {
        Logger.error(
          `End Request for ${request.path}`,
          `method=${request.method} status=${status} code=${
            message.status ? message.status : null
          } message=${message.message ? message.message : null}`,
          status >= 500 ? exception.stack : '',
        );
      } else {
        Logger.warn(
          `End Request for ${request.path}`,
          `method=${request.method} status=${status} code=${
            message.status ? message.status : null
          } message=${message.message ? message.message : null}`,
        );
      }
    }
  }