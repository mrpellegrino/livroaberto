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
exports.AddStudentToClassroomUseCase = exports.AssignResponsibleTeacherUseCase = exports.ListClassroomsUseCase = exports.CreateClassroomUseCase = void 0;
const common_1 = require("@nestjs/common");
const roles_enum_1 = require("../../../common/auth/roles.enum");
const prisma_service_1 = require("../../../common/database/prisma.service");
const classroom_repository_1 = require("../repositories/classroom.repository");
let CreateClassroomUseCase = class CreateClassroomUseCase {
    classroomRepository;
    prisma;
    constructor(classroomRepository, prisma) {
        this.classroomRepository = classroomRepository;
        this.prisma = prisma;
    }
    async execute(input) {
        const school = await this.prisma.school.findUnique({ where: { id: input.schoolId } });
        if (!school) {
            throw new common_1.NotFoundException('Escola nao encontrada.');
        }
        return this.classroomRepository.create(input);
    }
};
exports.CreateClassroomUseCase = CreateClassroomUseCase;
exports.CreateClassroomUseCase = CreateClassroomUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [classroom_repository_1.ClassroomRepository,
        prisma_service_1.PrismaService])
], CreateClassroomUseCase);
let ListClassroomsUseCase = class ListClassroomsUseCase {
    classroomRepository;
    constructor(classroomRepository) {
        this.classroomRepository = classroomRepository;
    }
    execute(schoolId) {
        return this.classroomRepository.list(schoolId);
    }
};
exports.ListClassroomsUseCase = ListClassroomsUseCase;
exports.ListClassroomsUseCase = ListClassroomsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [classroom_repository_1.ClassroomRepository])
], ListClassroomsUseCase);
let AssignResponsibleTeacherUseCase = class AssignResponsibleTeacherUseCase {
    classroomRepository;
    prisma;
    constructor(classroomRepository, prisma) {
        this.classroomRepository = classroomRepository;
        this.prisma = prisma;
    }
    async execute(classroomId, teacherUserId, isResponsible = true) {
        const classroom = await this.classroomRepository.findById(classroomId);
        if (!classroom) {
            throw new common_1.NotFoundException('Turma nao encontrada.');
        }
        const teacher = await this.prisma.user.findUnique({ where: { id: teacherUserId } });
        if (!teacher) {
            throw new common_1.NotFoundException('Professor nao encontrado.');
        }
        if (teacher.role !== roles_enum_1.Role.PROFESSOR && teacher.role !== roles_enum_1.Role.ADMIN) {
            throw new common_1.BadRequestException('Usuario informado nao pode ser professor responsavel.');
        }
        return this.classroomRepository.assignTeacher(classroomId, teacherUserId, isResponsible);
    }
};
exports.AssignResponsibleTeacherUseCase = AssignResponsibleTeacherUseCase;
exports.AssignResponsibleTeacherUseCase = AssignResponsibleTeacherUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [classroom_repository_1.ClassroomRepository,
        prisma_service_1.PrismaService])
], AssignResponsibleTeacherUseCase);
let AddStudentToClassroomUseCase = class AddStudentToClassroomUseCase {
    classroomRepository;
    prisma;
    constructor(classroomRepository, prisma) {
        this.classroomRepository = classroomRepository;
        this.prisma = prisma;
    }
    async execute(classroomId, studentUserId) {
        const classroom = await this.classroomRepository.findById(classroomId);
        if (!classroom) {
            throw new common_1.NotFoundException('Turma nao encontrada.');
        }
        const student = await this.prisma.user.findUnique({ where: { id: studentUserId } });
        if (!student) {
            throw new common_1.NotFoundException('Aluno nao encontrado.');
        }
        if (student.role !== roles_enum_1.Role.ALUNO) {
            throw new common_1.BadRequestException('Apenas usuario com role ALUNO pode ser matriculado na turma.');
        }
        return this.classroomRepository.addStudent(classroomId, studentUserId);
    }
};
exports.AddStudentToClassroomUseCase = AddStudentToClassroomUseCase;
exports.AddStudentToClassroomUseCase = AddStudentToClassroomUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [classroom_repository_1.ClassroomRepository,
        prisma_service_1.PrismaService])
], AddStudentToClassroomUseCase);
//# sourceMappingURL=classrooms.usecases.js.map