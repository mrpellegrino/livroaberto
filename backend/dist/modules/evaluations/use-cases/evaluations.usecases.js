"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEvaluationResultsUseCase = exports.CompleteEvaluationSessionUseCase = exports.SendEvaluationMessageUseCase = exports.StartEvaluationSessionUseCase = void 0;
const common_1 = require("@nestjs/common");
const roles_enum_1 = require("../../../common/auth/roles.enum");
const prisma_service_1 = require("../../../common/database/prisma.service");
const evaluation_repository_1 = require("../repositories/evaluation.repository");
let StartEvaluationSessionUseCase = class StartEvaluationSessionUseCase {
    evaluationRepository;
    prisma;
    constructor(evaluationRepository, prisma) {
        this.evaluationRepository = evaluationRepository;
        this.prisma = prisma;
    }
    async execute(input, user) {
        const activity = await this.prisma.activity.findUnique({
            where: { id: input.activityId },
            include: { studentBooks: true, books: true },
        });
        if (!activity) {
            throw new common_1.NotFoundException('Atividade nao encontrada.');
        }
        const now = new Date();
        if (now < activity.examStartAt || now > activity.examEndAt) {
            throw new common_1.BadRequestException('Atividade fora do periodo de exame.');
        }
        const targetStudentId = user.role === roles_enum_1.Role.ALUNO ? user.sub : input.studentId;
        if (!targetStudentId) {
            throw new common_1.BadRequestException('studentId e obrigatorio para este perfil.');
        }
        let selectedBookId = input.bookId;
        if (!selectedBookId) {
            const assignment = activity.studentBooks.find((item) => item.studentId === targetStudentId);
            selectedBookId = assignment?.bookId ?? activity.books[0]?.bookId;
        }
        if (!selectedBookId) {
            throw new common_1.BadRequestException('Nao foi possivel definir livro para a sessao.');
        }
        return this.evaluationRepository.createSession({
            activityId: activity.id,
            studentId: targetStudentId,
            bookId: selectedBookId,
        });
    }
};
exports.StartEvaluationSessionUseCase = StartEvaluationSessionUseCase;
exports.StartEvaluationSessionUseCase = StartEvaluationSessionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [evaluation_repository_1.EvaluationRepository,
        prisma_service_1.PrismaService])
], StartEvaluationSessionUseCase);
let SendEvaluationMessageUseCase = class SendEvaluationMessageUseCase {
    evaluationRepository;
    constructor(evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }
    async execute(sessionId, input) {
        const session = await this.evaluationRepository.findSessionById(sessionId);
        if (!session) {
            throw new common_1.NotFoundException('Sessao nao encontrada.');
        }
        if (session.status !== 'IN_PROGRESS') {
            throw new common_1.BadRequestException('Sessao encerrada.');
        }
        await this.evaluationRepository.createMessage({
            sessionId,
            role: 'student',
            content: input.content,
        });
        const assistantContent = 'Entendi. Agora me conte um evento especifico do livro e explique por que ele foi importante para a historia.';
        await this.evaluationRepository.createMessage({
            sessionId,
            role: 'assistant',
            content: assistantContent,
        });
        return this.evaluationRepository.listMessages(sessionId);
    }
};
exports.SendEvaluationMessageUseCase = SendEvaluationMessageUseCase;
exports.SendEvaluationMessageUseCase = SendEvaluationMessageUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [evaluation_repository_1.EvaluationRepository])
], SendEvaluationMessageUseCase);
let CompleteEvaluationSessionUseCase = class CompleteEvaluationSessionUseCase {
    evaluationRepository;
    constructor(evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }
    async execute(sessionId, reviewerUserId) {
        const session = await this.evaluationRepository.findSessionById(sessionId);
        if (!session) {
            throw new common_1.NotFoundException('Sessao nao encontrada.');
        }
        const messages = await this.evaluationRepository.listMessages(sessionId);
        const studentMessages = messages.filter((item) => item.role === 'student');
        const avgLen = studentMessages.length > 0
            ? Math.round(studentMessages.reduce((acc, item) => acc + item.content.length, 0) /
                studentMessages.length)
            : 0;
        const base = Math.max(20, Math.min(95, Math.floor(avgLen / 6)));
        const factual = Math.max(0, Math.min(100, base));
        const character = Math.max(0, Math.min(100, base - 5));
        const interpret = Math.max(0, Math.min(100, base - 10));
        const consistency = Math.max(0, Math.min(100, base - 8));
        const evidence = Math.max(0, Math.min(100, base - 4));
        const finalScore = Math.round((factual * session.activity.rubricFactualWeight +
            character * session.activity.rubricCharacterWeight +
            interpret * session.activity.rubricInterpretWeight +
            consistency * session.activity.rubricConsistencyWeight +
            evidence * session.activity.rubricEvidenceWeight) /
            100);
        const confidence = Math.max(40, Math.min(95, studentMessages.length * 10));
        const summary = finalScore >= 85
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
};
exports.CompleteEvaluationSessionUseCase = CompleteEvaluationSessionUseCase;
exports.CompleteEvaluationSessionUseCase = CompleteEvaluationSessionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [evaluation_repository_1.EvaluationRepository])
], CompleteEvaluationSessionUseCase);
let ListEvaluationResultsUseCase = class ListEvaluationResultsUseCase {
    evaluationRepository;
    constructor(evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }
    execute(activityId) {
        return this.evaluationRepository.listResults(activityId);
    }
};
exports.ListEvaluationResultsUseCase = ListEvaluationResultsUseCase;
exports.ListEvaluationResultsUseCase = ListEvaluationResultsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [evaluation_repository_1.EvaluationRepository])
], ListEvaluationResultsUseCase);
//# sourceMappingURL=evaluations.usecases.js.map