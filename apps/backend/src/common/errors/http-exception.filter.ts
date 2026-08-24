import { Prisma } from '@/generated/prisma/client';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  details?: unknown;
  path: string;
  timestamp: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const error = this.mapException(exception);

    if (error.statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception);
    }

    const body: ErrorResponse = {
      statusCode: error.statusCode,
      message: error.message,
      error: error.error,
      ...(error.details !== undefined && {
        details: error.details,
      }),
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(error.statusCode).json(body);
  }

  private mapException(exception: unknown): {
    statusCode: number;
    message: string;
    error: string;
    details?: unknown;
  } {
    if (exception instanceof HttpException) {
      return this.mapHttpException(exception);
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return this.mapPrismaError(exception);
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      error: 'Internal Server Error',
    };
  }

  private mapHttpException(exception: HttpException): {
    statusCode: number;
    message: string;
    error: string;
    details?: unknown;
  } {
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (typeof exceptionResponse === 'string') {
      return {
        statusCode,
        message: exceptionResponse,
        error: this.getErrorName(statusCode),
      };
    }

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const response = exceptionResponse as {
        message?: unknown;
        error?: unknown;
        details?: unknown;
      };

      return {
        statusCode,
        message:
          typeof response.message === 'string'
            ? response.message
            : 'Request failed',
        error:
          typeof response.error === 'string'
            ? response.error
            : this.getErrorName(statusCode),
        ...(response.details !== undefined && {
          details: response.details,
        }),
      };
    }

    return {
      statusCode,
      message: 'Request failed',
      error: this.getErrorName(statusCode),
    };
  }

  private mapPrismaError(exception: Prisma.PrismaClientKnownRequestError): {
    statusCode: number;
    message: string;
    error: string;
  } {
    switch (exception.code) {
      case 'P2002':
        return {
          statusCode: HttpStatus.CONFLICT,
          message: 'A record with the same value already exists',
          error: 'Conflict',
        };

      case 'P2025':
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Record not found',
          error: 'Not Found',
        };

      case 'P2003':
        return {
          statusCode: HttpStatus.CONFLICT,
          message: 'This record cannot be deleted because it is being used',
          error: 'Conflict',
        };

      default:
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Database operation failed',
          error: 'Internal Server Error',
        };
    }
  }

  private getErrorName(statusCode: number): string {
    const statusNames: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict',
      422: 'Unprocessable Entity',
      500: 'Internal Server Error',
    };

    return statusNames[statusCode] ?? 'Error';
  }
}
