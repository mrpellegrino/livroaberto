import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/database/prisma.service';
import { School } from '@prisma/client';

@Injectable()
export class SchoolRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(name: string): Promise<School> {
    return this.prisma.school.create({ data: { name } });
  }

  list(): Promise<School[]> {
    return this.prisma.school.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
