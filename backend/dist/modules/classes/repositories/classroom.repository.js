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
exports.ClassroomRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/database/prisma.service");
let ClassroomRepository = class ClassroomRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.classroom.create({ data });
    }
    list(schoolId) {
        return this.prisma.classroom.findMany({
            where: schoolId ? { schoolId } : undefined,
            orderBy: { createdAt: 'desc' },
        });
    }
    findById(id) {
        return this.prisma.classroom.findUnique({ where: { id } });
    }
    assignTeacher(classroomId, teacherUserId, isResponsible) {
        return this.prisma.classTeacher.upsert({
            where: {
                classroomId_teacherUserId: {
                    classroomId,
                    teacherUserId,
                },
            },
            create: { classroomId, teacherUserId, isResponsible },
            update: { isResponsible },
        });
    }
    addStudent(classroomId, studentUserId) {
        return this.prisma.classStudent.upsert({
            where: {
                classroomId_studentUserId: {
                    classroomId,
                    studentUserId,
                },
            },
            create: { classroomId, studentUserId },
            update: {},
        });
    }
};
exports.ClassroomRepository = ClassroomRepository;
exports.ClassroomRepository = ClassroomRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClassroomRepository);
//# sourceMappingURL=classroom.repository.js.map