import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '../../../common/auth/roles.enum';
import { JwtPayload } from '../../../common/auth/jwt-payload.interface';
import { PrismaService } from '../../../common/database/prisma.service';
import {
  SendEvaluationMessageDto,
  StartEvaluationSessionDto,
} from '../dtos/evaluation.dto';
import { EvaluationRepository } from '../repositories/evaluation.repository';

@Injectable()
export class StartEvaluationSessionUseCase {
  constructor(
    private readonly evaluationRepository: EvaluationRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(input: StartEvaluationSessionDto, user: JwtPayload) {
    const activity = await this.prisma.activity.findUnique({
      where: { id: input.activityId },
      include: { studentBooks: true, books: true },
    });

    if (!activity) {
      throw new NotFoundException('Atividade nao encontrada.');
    }

    const now = new Date();
    if (now < activity.examStartAt || now > activity.examEndAt) {
      throw new BadRequestException('Atividade fora do periodo de exame.');
    }

    const targetStudentId = user.role === Role.ALUNO ? user.sub : input.studentId;
    if (!targetStudentId) {
      throw new BadRequestException('studentId e obrigatorio para este perfil.');
    }

    let selectedBookId = input.bookId;
    if (!selectedBookId) {
      const assignment = activity.studentBooks.find((item) => item.studentId === targetStudentId);
      selectedBookId = assignment?.bookId ?? activity.books[0]?.bookId;
    }

    if (!selectedBookId) {
      throw new BadRequestException('Nao foi possivel definir livro para a sessao.');
    }

    return this.evaluationRepository.createSession({
      activityId: activity.id,
      studentId: targetStudentId,
      bookId: selectedBookId,
    });
  }
}

@Injectable()
export class SendEvaluationMessageUseCase {
  constructor(private readonly evaluationRepository: EvaluationRepository) {}

  async execute(sessionId: string, input: SendEvaluationMessageDto) {
    const session = await this.evaluationRepository.findSessionById(sessionId);
    if (!session) {
      throw new NotFoundException('Sessao nao encontrada.');
    }

    if (session.status !== 'IN_PROGRESS') {
      throw new BadRequestException('Sessao encerrada.');
    }

    await this.evaluationRepository.createMessage({
      sessionId,
      role: 'student',
      content: input.content,
    });

    // Placeholder de orquestracao do modelo: pergunta adaptativa inicial.
    const assistantContent =
      'Entendi. Agora me conte um evento especifico do livro e explique por que ele foi importante para a historia.';

    await this.evaluationRepository.createMessage({
      sessionId,
      role: 'assistant',
      content: assistantContent,
    });

    return this.evaluationRepository.listMessages(sessionId);
  }
}

@Injectable()
export class CompleteEvaluationSessionUseCase {
  constructor(private readonly evaluationRepository: EvaluationRepository) {}

  async execute(sessionId: string, reviewerUserId?: string) {
    const session = await this.evaluationRepository.findSessionById(sessionId);
    if (!session) {
      throw new NotFoundException('Sessao nao encontrada.');
    }

    const messages = await this.evaluationRepository.listMessages(sessionId);
    const studentMessages = messages.filter((item) => item.role === 'student');

    const avgLen =
      studentMessages.length > 0
        ? Math.round(
            studentMessages.reduce((acc, item) => acc + item.content.length, 0) /
              studentMessages.length,
          )
        : 0;

    // Heuristica inicial para MVP; sera substituida pelo motor de scoring com LLM.
    const base = Math.max(20, Math.min(95, Math.floor(avgLen / 6)));

    const factual = Math.max(0, Math.min(100, base));
    const character = Math.max(0, Math.min(100, base - 5));
    const interpret = Math.max(0, Math.min(100, base - 10));
    const consistency = Math.max(0, Math.min(100, base - 8));
    const evidence = Math.max(0, Math.min(100, base - 4));

    const finalScore = Math.round(
      (factual * session.activity.rubricFactualWeight +
        character * session.activity.rubricCharacterWeight +
        interpret * session.activity.rubricInterpretWeight +
        consistency * session.activity.rubricConsistencyWeight +
        evidence * session.activity.rubricEvidenceWeight) /
        100,
    );

    const confidence = Math.max(40, Math.min(95, studentMessages.length * 10));

    const summary =
      finalScore >= 85
        ? 'Fortes evidencias de leitura e compreensao.'
        : finalScore >= 70
          ? 'Boas evidencias de leitura, com pontos a aprofundar.'
          : finalScore >= 50
            ? 'Evidencias parciais de leitura; respostas superficiais em parte da conversa.'
            : 'Evidencias insuficientes de leitura nesta sessao.';

    await this.evaluationRepository.completeSession(sessionId);

    return this.evaluationRepository.upsertResult({
      sessionId,
      reviewerUserId,
      factualScore: factual,
      characterScore: character,
      interpretScore: interpret,
      consistencyScore: consistency,
      evidenceScore: evidence,
      finalScore,
      confidence,
      summary,
    });
  }
}

@Injectable()
export class ListEvaluationResultsUseCase {
  constructor(private readonly evaluationRepository: EvaluationRepository) {}

  execute(activityId?: string) {
    return this.evaluationRepository.listResults(activityId);
  }
}
