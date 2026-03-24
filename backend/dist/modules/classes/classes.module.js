"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesModule = void 0;
const common_1 = require("@nestjs/common");
const classes_controller_1 = require("./presentation/controllers/classes.controller");
const classroom_repository_1 = require("./repositories/classroom.repository");
const classrooms_usecases_1 = require("./use-cases/classrooms.usecases");
let ClassesModule = class ClassesModule {
};
exports.ClassesModule = ClassesModule;
exports.ClassesModule = ClassesModule = __decorate([
    (0, common_1.Module)({
        controllers: [classes_controller_1.ClassesController],
        providers: [
            classroom_repository_1.ClassroomRepository,
            classrooms_usecases_1.CreateClassroomUseCase,
            classrooms_usecases_1.ListClassroomsUseCase,
            classrooms_usecases_1.AssignResponsibleTeacherUseCase,
            classrooms_usecases_1.AddStudentToClassroomUseCase,
        ],
    })
], ClassesModule);
//# sourceMappingURL=classes.module.js.map