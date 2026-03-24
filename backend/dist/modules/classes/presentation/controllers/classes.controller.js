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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesController = void 0;
const common_1 = require("@nestjs/common");
const permissions_decorator_1 = require("../../../../common/authorization/permissions.decorator");
const add_student_to_classroom_dto_1 = require("../../dtos/add-student-to-classroom.dto");
const assign_responsible_teacher_dto_1 = require("../../dtos/assign-responsible-teacher.dto");
const create_classroom_dto_1 = require("../../dtos/create-classroom.dto");
const classrooms_usecases_1 = require("../../use-cases/classrooms.usecases");
let ClassesController = class ClassesController {
    createClassroomUseCase;
    listClassroomsUseCase;
    assignResponsibleTeacherUseCase;
    addStudentToClassroomUseCase;
    constructor(createClassroomUseCase, listClassroomsUseCase, assignResponsibleTeacherUseCase, addStudentToClassroomUseCase) {
        this.createClassroomUseCase = createClassroomUseCase;
        this.listClassroomsUseCase = listClassroomsUseCase;
        this.assignResponsibleTeacherUseCase = assignResponsibleTeacherUseCase;
        this.addStudentToClassroomUseCase = addStudentToClassroomUseCase;
    }
    create(body) {
        return this.createClassroomUseCase.execute(body);
    }
    list(schoolId) {
        return this.listClassroomsUseCase.execute(schoolId);
    }
    assignResponsibleTeacher(classId, body) {
        return this.assignResponsibleTeacherUseCase.execute(classId, body.teacherUserId, body.isResponsible ?? true);
    }
    addStudent(classId, body) {
        return this.addStudentToClassroomUseCase.execute(classId, body.studentUserId);
    }
};
exports.ClassesController = ClassesController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.Permissions)({ resource: 'classes', action: 'create' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_classroom_dto_1.CreateClassroomDto]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)({ resource: 'classes', action: 'read' }),
    __param(0, (0, common_1.Query)('schoolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(':id/responsible-teacher'),
    (0, permissions_decorator_1.Permissions)({ resource: 'classes', action: 'update' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_responsible_teacher_dto_1.AssignResponsibleTeacherDto]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "assignResponsibleTeacher", null);
__decorate([
    (0, common_1.Post)(':id/students'),
    (0, permissions_decorator_1.Permissions)({ resource: 'classes', action: 'update' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_student_to_classroom_dto_1.AddStudentToClassroomDto]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "addStudent", null);
exports.ClassesController = ClassesController = __decorate([
    (0, common_1.Controller)('classes'),
    __metadata("design:paramtypes", [classrooms_usecases_1.CreateClassroomUseCase,
        classrooms_usecases_1.ListClassroomsUseCase,
        classrooms_usecases_1.AssignResponsibleTeacherUseCase,
        classrooms_usecases_1.AddStudentToClassroomUseCase])
], ClassesController);
//# sourceMappingURL=classes.controller.js.map