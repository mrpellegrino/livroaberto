import { ActivityMode } from '@prisma/client';
export declare class CreateActivityDto {
    classroomId: string;
    title: string;
    mode: ActivityMode;
    examStartAt: string;
    examEndAt: string;
    bookIds: string[];
    rubricFactualWeight: number;
    rubricCharacterWeight: number;
    rubricInterpretWeight: number;
    rubricConsistencyWeight: number;
    rubricEvidenceWeight: number;
}
export declare class AssignBookToStudentDto {
    studentId: string;
    bookId: string;
    cycleNo?: number;
}
