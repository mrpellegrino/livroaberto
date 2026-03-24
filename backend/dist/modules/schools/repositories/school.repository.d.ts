import { PrismaService } from '../../../common/database/prisma.service';
import { School } from '@prisma/client';
export declare class SchoolRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(name: string): Promise<School>;
    list(): Promise<School[]>;
}
