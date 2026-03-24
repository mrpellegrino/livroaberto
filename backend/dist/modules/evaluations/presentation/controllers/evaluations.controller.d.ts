import type { JwtPayload } from '../../../../common/auth/jwt-payload.interface';
import { SendEvaluationMessageDto, StartEvaluationSessionDto } from '../../dtos/evaluation.dto';
import { CompleteEvaluationSessionUseCase, ListEvaluationResultsUseCase, SendEvaluationMessageUseCase, StartEvaluationSessionUseCase } from '../../use-cases/evaluations.usecases';
export declare class EvaluationsController {
    private readonly startEvaluationSessionUseCase;
    private readonly sendEvaluationMessageUseCase;
    private readonly completeEvaluationSessionUseCase;
    private readonly listEvaluationResultsUseCase;
    constructor(startEvaluationSessionUseCase: StartEvaluationSessionUseCase, sendEvaluationMessageUseCase: SendEvaluationMessageUseCase, completeEvaluationSessionUseCase: CompleteEvaluationSessionUseCase, listEvaluationResultsUseCase: ListEvaluationResultsUseCase);
    startSession(body: StartEvaluationSessionDto, user: JwtPayload): Promise<{
        id: string;
        activityId: string;
        bookId: string;
        studentId: string;
        status: import("@prisma/client").$Enums.EvaluationSessionStatus;
        startedAt: Date;
        endedAt: Date | null;
    }>;
    sendMessage(sessionId: string, body: SendEvaluationMessageDto): Promise<{
        role: string;
        id: string;
        createdAt: Date;
        sessionId: string;
        content: string;
    }[]>;
    completeSession(sessionId: string, user: JwtPayload): Promise<{
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
    }>;
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
