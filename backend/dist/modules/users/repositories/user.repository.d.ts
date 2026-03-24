import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../../common/database/prisma.service';
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    list(): Promise<User[]>;
    deleteById(id: string): Promise<User>;
}
