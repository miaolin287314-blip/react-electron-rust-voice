import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../models/api-response.model.js';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      map(
        (data) =>
          new ApiResponse({
            code: context.switchToHttp().getResponse().statusCode,
            message: 'success',
            data,
            path: request.url,
          }),
      ),
    );
  }
}