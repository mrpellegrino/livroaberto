import { AssignBookToStudentDto, CreateActivityDto } from '../../dtos/create-activity.dto';
import { AssignBookToStudentUseCase, CreateActivityUseCase, GetActivityUseCase, ListActivitiesUseCase } from '../../use-cases/activities.usecases';
export declare class ActivitiesController {
    private readonly createActivityUseCase;
    private readonly listActivitiesUseCase;
    private readonly getActivityUseCase;
    private readonly assignBookToStudentUseCase;
    constructor(createActivityUseCase: CreateActivityUseCase, listActivitiesUseCase: ListActivitiesUseCase, getActivityUseCase: GetActivityUseCase, assignBookToStudentUseCase: AssignBookToStudentUseCase);
    create(body: CreateActivityDto): Promise<{
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
    list(classroomId?: string): import("@prisma/client").Prisma.PrismaPromise<({
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
    getById(activityId: string): Promise<{
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
    assignBook(activityId: string, body: AssignBookToStudentDto): Promise<{
        id: string;
        createdAt: Date;
        cycleNo: number;
        activityId: string;
        bookId: string;
        studentId: string;
    }>;
}
