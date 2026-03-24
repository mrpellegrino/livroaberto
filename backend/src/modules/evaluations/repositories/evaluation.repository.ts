import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/database/prisma.service';
import {
  EvaluationSession,
  EvaluationSessionStatus,
  EvaluationMessage,
  EvaluationResult,
} from '@prisma/client';

@Injectable()
export class EvaluationRepository {
  constructor(private readonly prisma: PrismaService) {}

  createSession(data: {
    activityId: string;
    studentId: string;
    bookId: string;
  }): Promise<EvaluationSession> {
    return this.prisma.evaluationSession.create({ data });
  }

  findSessionById(id: string) {
    return this.prisma.evaluationSession.findUnique({
      where: { id },
      include: { activity: true, messages: true, result: true },
    });
  }

  createMessage(data: {
    sessionId: string;
    role: string;
    content: string;
  }): Promise<EvaluationMessage> {
    return this.prisma.evaluationMessage.create({ data });
  }

  listMessages(sessionId: string): Promise<EvaluationMessage[]> {
    return this.prisma.evaluationMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    });
  }

  completeSession(sessionId: string): Promise<EvaluationSession> {
    return this.prisma.evaluationSession.update({
      where: { id: sessionId },
      data: {
        status: EvaluationSessionStatus.COMPLETED,
        endedAt: new Date(),
      },
    });
  }

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
  }): Promise<EvaluationResult> {
    return this.prisma.evaluationResult.upsert({
      where: { sessionId: data.sessionId },
      create: data,
      update: data,
    });
  }

  listResults(activityId?: string) {
    return this.prisma.evaluationResult.findMany({
      where: activityId
        ? {
            session: {
              activityId,
            },
          }
        : undefined,
      include: {
        session: {
          include: {
            student: {
              select: { id: true, name: true, email: true },
            },
            book: {
              select: { id: true, title: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
