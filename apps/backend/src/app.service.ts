import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello() {
    const result = await this.prisma.$queryRaw`SELECT 1 as test`;

    return {
      message: 'Prisma is working 🚀',
      db: result,
    };
  }
}
