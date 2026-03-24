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
exports.EvaluationRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/database/prisma.service");
const client_1 = require("@prisma/client");
let EvaluationRepository = class EvaluationRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    createSession(data) {
        return this.prisma.evaluationSession.create({ data });
    }
    findSessionById(id) {
        return this.prisma.evaluationSession.findUnique({
            where: { id },
            include: { activity: true, messages: true, result: true },
        });
    }
    createMessage(data) {
        return this.prisma.evaluationMessage.create({ data });
    }
    listMessages(sessionId) {
        return this.prisma.evaluationMessage.findMany({
            where: { sessionId },
            orderBy: { createdAt: 'asc' },
        });
    }
    completeSession(sessionId) {
        return this.prisma.evaluationSession.update({
            where: { id: sessionId },
            data: {
                status: client_1.EvaluationSessionStatus.COMPLETED,
                endedAt: new Date(),
            },
        });
    }
    upsertResult(data) {
        return this.prisma.evaluationResult.upsert({
            where: { sessionId: data.sessionId },
            create: data,
            update: data,
        });
    }
    listResults(activityId) {
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
};
exports.EvaluationRepository = EvaluationRepository;
exports.EvaluationRepository = EvaluationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EvaluationRepository);
//# sourceMappingURL=evaluation.repository.js.map