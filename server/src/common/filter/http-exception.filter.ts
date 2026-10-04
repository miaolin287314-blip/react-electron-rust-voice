import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { ApiResponse } from '../models/api-response.model.js';

@Catch()
export class HttpExceptionFilter
  implements ExceptionFilter {

  catch(
    exception: unknown,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();

    const response =
      ctx.getResponse<Response>();

    const request =
      ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const exceptionResponse =
        exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const data = exceptionResponse as {
          message?: string | string[];
        };

        message = Array.isArray(data.message)
          ? data.message.join(', ')
          : data.message ?? message;
      }
    }

    response.status(status).json(
      new ApiResponse({
        code: status,
        message,
        data: null,
        path: request.url,
      }),
    );
  }
}