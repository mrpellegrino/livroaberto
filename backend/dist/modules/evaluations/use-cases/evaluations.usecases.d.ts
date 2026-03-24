import { JwtPayload } from '../../../common/auth/jwt-payload.interface';
import { PrismaService } from '../../../common/database/prisma.service';
import { SendEvaluationMessageDto, StartEvaluationSessionDto } from '../dtos/evaluation.dto';
import { EvaluationRepository } from '../repositories/evaluation.repository';
export declare class StartEvaluationSessionUseCase {
    private readonly evaluationRepository;
    private readonly prisma;
    constructor(evaluationRepository: EvaluationRepository, prisma: PrismaService);
    execute(input: StartEvaluationSessionDto, user: JwtPayload): Promise<{
        id: string;
        activityId: string;
        bookId: string;
        studentId: string;
        status: import("@prisma/client").$Enums.EvaluationSessionStatus;
        startedAt: Date;
        endedAt: Date | null;
    }>;
}
export declare class SendEvaluationMessageUseCase {
    private readonly evaluationRepository;
    constructor(evaluationRepository: EvaluationRepository);
    execute(sessionId: string, input: SendEvaluationMessageDto): Promise<{
        role: string;
        id: string;
        createdAt: Date;
        sessionId: string;
        content: string;
    }[]>;
}
export declare class CompleteEvaluationSessionUseCase {
    private readonly evaluationRepository;
    constructor(evaluationRepository: EvaluationRepository);
    execute(sessionId: string, reviewerUserId?: string): Promise<{
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
}
export declare class ListEvaluationResultsUseCase {
    private readonly evaluationRepository;
    constructor(evaluationRepository: EvaluationRepository);
    execute(activityId?: string): import("@prisma/client").Prisma.PrismaPromise<({
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
