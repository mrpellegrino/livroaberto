import { PrismaService } from '../../../common/database/prisma.service';
import { Activity, ActivityMode, ActivityStudentBook, Prisma } from '@prisma/client';
export declare class ActivityRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createWithBooks(data: {
        classroomId: string;
        title: string;
        mode: ActivityMode;
        examStartAt: Date;
        examEndAt: Date;
        rubricFactualWeight: number;
        rubricCharacterWeight: number;
        rubricInterpretWeight: number;
        rubricConsistencyWeight: number;
        rubricEvidenceWeight: number;
        bookIds: string[];
    }): Promise<Activity>;
    list(classroomId?: string): Prisma.PrismaPromise<({
        books: {
            id: string;
            createdAt: Date;
            activityId: string;
            bookId: string;
        }[];
        studentBooks: {
            id: string;
            createdAt: Date;
            cycleNo: number;
            activityId: string;
            bookId: string;
            studentId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        classroomId: string;
        title: string;
        mode: import("@prisma/client").$Enums.ActivityMode;
        examStartAt: Date;
        examEndAt: Date;
        rubricFactualWeight: number;
        rubricCharacterWeight: number;
        rubricInterpretWeight: number;
        rubricConsistencyWeight: number;
        rubricEvidenceWeight: number;
    })[]>;
    findById(id: string): Prisma.Prisma__ActivityClient<({
        books: {
            id: string;
            createdAt: Date;
            activityId: string;
            bookId: string;
        }[];
        studentBooks: {
            id: string;
            createdAt: Date;
            cycleNo: number;
            activityId: string;
            bookId: string;
            studentId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        classroomId: string;
        title: string;
        mode: import("@prisma/client").$Enums.ActivityMode;
        examStartAt: Date;
        examEndAt: Date;
        rubricFactualWeight: number;
        rubricCharacterWeight: number;
        rubricInterpretWeight: number;
        rubricConsistencyWeight: number;
        rubricEvidenceWeight: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    assignBookToStudent(data: {
        activityId: string;
        studentId: string;
        bookId: string;
        cycleNo: number;
    }): Promise<ActivityStudentBook>;
}
