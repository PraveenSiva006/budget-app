import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let error: Error;

    switch (exception.code) {
      case 'P2002':
        error = new ConflictException('Resource already exists');
        break;

      case 'P2025':
        error = new NotFoundException('Resource not found');
        break;

      case 'P2003':
        error = new BadRequestException('Referenced resource does not exist');
        break;

      default:
        error = new InternalServerErrorException('Internal server error');
    }

    response.status((error as any).status).json({
      statusCode: (error as any).status,
      message: error.message,
    });
  }
}
