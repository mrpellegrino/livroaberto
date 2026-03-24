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
exports.ActivityRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/database/prisma.service");
let ActivityRepository = class ActivityRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    createWithBooks(data) {
        return this.prisma.activity.create({
            data: {
                classroomId: data.classroomId,
                title: data.title,
                mode: data.mode,
                examStartAt: data.examStartAt,
                examEndAt: data.examEndAt,
                rubricFactualWeight: data.rubricFactualWeight,
                rubricCharacterWeight: data.rubricCharacterWeight,
                rubricInterpretWeight: data.rubricInterpretWeight,
                rubricConsistencyWeight: data.rubricConsistencyWeight,
                rubricEvidenceWeight: data.rubricEvidenceWeight,
                books: {
                    create: data.bookIds.map((bookId) => ({ bookId })),
                },
            },
            include: { books: true },
        });
    }
    list(classroomId) {
        return this.prisma.activity.findMany({
            where: classroomId ? { classroomId } : undefined,
            include: { books: true, studentBooks: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    findById(id) {
        return this.prisma.activity.findUnique({
            where: { id },
            include: { books: true, studentBooks: true },
        });
    }
    assignBookToStudent(data) {
        return this.prisma.activityStudentBook.upsert({
            where: {
                activityId_studentId_cycleNo: {
                    activityId: data.activityId,
                    studentId: data.studentId,
                    cycleNo: data.cycleNo,
                },
            },
            create: data,
            update: { bookId: data.bookId },
        });
    }
};
exports.ActivityRepository = ActivityRepository;
exports.ActivityRepository = ActivityRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ActivityRepository);
//# sourceMappingURL=activity.repository.js.map