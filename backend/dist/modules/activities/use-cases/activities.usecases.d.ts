import { PrismaService } from '../../../common/database/prisma.service';
import { CreateActivityDto, AssignBookToStudentDto } from '../dtos/create-activity.dto';
import { ActivityRepository } from '../repositories/activity.repository';
export declare class CreateActivityUseCase {
    private readonly activityRepository;
    private readonly prisma;
    constructor(activityRepository: ActivityRepository, prisma: PrismaService);
    execute(input: CreateActivityDto): Promise<{
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
    }>;
}
export declare class ListActivitiesUseCase {
    private readonly activityRepository;
    constructor(activityRepository: ActivityRepository);
    execute(classroomId?: string): import("@prisma/client").Prisma.PrismaPromise<({
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
}
export declare class GetActivityUseCase {
    private readonly activityRepository;
    constructor(activityRepository: ActivityRepository);
    execute(activityId: string): Promise<{
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
    }>;
}
export declare class AssignBookToStudentUseCase {
    private readonly activityRepository;
    private readonly prisma;
    constructor(activityRepository: ActivityRepository, prisma: PrismaService);
    execute(activityId: string, input: AssignBookToStudentDto): Promise<{
        id: string;
        createdAt: Date;
        cycleNo: number;
        activityId: string;
        bookId: string;
        studentId: string;
    }>;
}
