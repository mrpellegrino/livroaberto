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
exports.AssignBookToStudentUseCase = exports.GetActivityUseCase = exports.ListActivitiesUseCase = exports.CreateActivityUseCase = void 0;
const common_1 = require("@nestjs/common");
const roles_enum_1 = require("../../../common/auth/roles.enum");
const prisma_service_1 = require("../../../common/database/prisma.service");
const activity_repository_1 = require("../repositories/activity.repository");
let CreateActivityUseCase = class CreateActivityUseCase {
    activityRepository;
    prisma;
    constructor(activityRepository, prisma) {
        this.activityRepository = activityRepository;
        this.prisma = prisma;
    }
    async execute(input) {
        const classroom = await this.prisma.classroom.findUnique({ where: { id: input.classroomId } });
        if (!classroom) {
            throw new common_1.NotFoundException('Turma nao encontrada.');
        }
        const startDate = new Date(input.examStartAt);
        const endDate = new Date(input.examEndAt);
        if (endDate <= startDate) {
            throw new common_1.BadRequestException('A data final do exame deve ser maior que a inicial.');
        }
        const totalWeight = input.rubricFactualWeight +
            input.rubricCharacterWeight +
            input.rubricInterpretWeight +
            input.rubricConsistencyWeight +
            input.rubricEvidenceWeight;
        if (totalWeight !== 100) {
            throw new common_1.BadRequestException('A soma dos pesos da rubrica deve ser exatamente 100.');
        }
        const booksCount = await this.prisma.book.count({ where: { id: { in: input.bookIds } } });
        if (booksCount !== input.bookIds.length) {
            throw new common_1.BadRequestException('Um ou mais livros informados nao existem.');
        }
        return this.activityRepository.createWithBooks({
            ...input,
            examStartAt: startDate,
            examEndAt: endDate,
        });
    }
};
exports.CreateActivityUseCase = CreateActivityUseCase;
exports.CreateActivityUseCase = CreateActivityUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_repository_1.ActivityRepository,
        prisma_service_1.PrismaService])
], CreateActivityUseCase);
let ListActivitiesUseCase = class ListActivitiesUseCase {
    activityRepository;
    constructor(activityRepository) {
        this.activityRepository = activityRepository;
    }
    execute(classroomId) {
        return this.activityRepository.list(classroomId);
    }
};
exports.ListActivitiesUseCase = ListActivitiesUseCase;
exports.ListActivitiesUseCase = ListActivitiesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_repository_1.ActivityRepository])
], ListActivitiesUseCase);
let GetActivityUseCase = class GetActivityUseCase {
    activityRepository;
    constructor(activityRepository) {
        this.activityRepository = activityRepository;
    }
    async execute(activityId) {
        const activity = await this.activityRepository.findById(activityId);
        if (!activity) {
            throw new common_1.NotFoundException('Atividade nao encontrada.');
        }
        return activity;
    }
};
exports.GetActivityUseCase = GetActivityUseCase;
exports.GetActivityUseCase = GetActivityUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_repository_1.ActivityRepository])
], GetActivityUseCase);
let AssignBookToStudentUseCase = class AssignBookToStudentUseCase {
    activityRepository;
    prisma;
    constructor(activityRepository, prisma) {
        this.activityRepository = activityRepository;
        this.prisma = prisma;
    }
    async execute(activityId, input) {
        const activity = await this.activityRepository.findById(activityId);
        if (!activity) {
            throw new common_1.NotFoundException('Atividade nao encontrada.');
        }
        const student = await this.prisma.user.findUnique({ where: { id: input.studentId } });
        if (!student || student.role !== roles_enum_1.Role.ALUNO) {
            throw new common_1.BadRequestException('Aluno invalido para atribuicao de livro.');
        }
        const hasBookInPool = activity.books.some((item) => item.bookId === input.bookId);
        if (!hasBookInPool) {
            throw new common_1.BadRequestException('Livro nao pertence ao pool da atividade.');
        }
        return this.activityRepository.assignBookToStudent({
            activityId,
            studentId: input.studentId,
            bookId: input.bookId,
            cycleNo: input.cycleNo ?? 1,
        });
    }
};
exports.AssignBookToStudentUseCase = AssignBookToStudentUseCase;
exports.AssignBookToStudentUseCase = AssignBookToStudentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_repository_1.ActivityRepository,
        prisma_service_1.PrismaService])
], AssignBookToStudentUseCase);
//# sourceMappingURL=activities.usecases.js.map