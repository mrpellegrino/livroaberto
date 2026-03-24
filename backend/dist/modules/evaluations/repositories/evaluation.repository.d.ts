import { PrismaService } from '../../../common/database/prisma.service';
import { EvaluationSession, EvaluationMessage, EvaluationResult } from '@prisma/client';
export declare class EvaluationRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSession(data: {
        activityId: string;
        studentId: string;
        bookId: string;
    }): Promise<EvaluationSession>;
    findSessionById(id: string): import("@prisma/client").Prisma.Prisma__EvaluationSessionClient<({
        activity: {
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
        };
        result: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            factualScore: number;
            characterScore: number;
            interpretScore: number;
            consistencyScore: number;
            evidenceScore: number;
            finalScore: number;
            confidence: number;
            summary: string;
            sessionId: string;
            reviewerUserId: string | null;
        } | null;
        messages: {
            role: string;
            id: string;
            createdAt: Date;
            sessionId: string;
            content: string;
        }[];
    } & {
        id: string;
        activityId: string;
        bookId: string;
        studentId: string;
        status: import("@prisma/client").$Enums.EvaluationSessionStatus;
        startedAt: Date;
        endedAt: Date | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createMessage(data: {
        sessionId: string;
        role: string;
        content: string;
    }): Promise<EvaluationMessage>;
    listMessages(sessionId: string): Promise<EvaluationMessage[]>;
    completeSession(sessionId: string): Promise<EvaluationSession>;
    upsertResult(data: {
        sessionId: string;
        factualScore: number;
        characterScore: number;
        interpretScore: number;
        consistencyScore: number;
        evidenceScore: number;
        finalScore: number;
        confidence: number;
        summary: string;
        reviewerUserId?: string;
    }): Promise<EvaluationResult>;
    listResults(activityId?: string): import("@prisma/client").Prisma.PrismaPromise<({
        session: {
            book: {
                id: string;
                title: string;
            };
            student: {
                name: string;
                email: string;
                id: string;
            };
        } & {
            id: string;
            activityId: string;
            bookId: string;
            studentId: string;
            status: import("@prisma/client").$Enums.EvaluationSessionStatus;
            startedAt: Date;
            endedAt: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        factualScore: number;
        characterScore: number;
        interpretScore: number;
        consistencyScore: number;
        evidenceScore: number;
        finalScore: number;
        confidence: number;
        summary: string;
        sessionId: string;
        reviewerUserId: string | null;
    })[]>;
}
