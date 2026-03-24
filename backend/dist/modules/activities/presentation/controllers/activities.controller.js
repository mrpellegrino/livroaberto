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
exports.ActivitiesController = void 0;
const common_1 = require("@nestjs/common");
const permissions_decorator_1 = require("../../../../common/authorization/permissions.decorator");
const create_activity_dto_1 = require("../../dtos/create-activity.dto");
const activities_usecases_1 = require("../../use-cases/activities.usecases");
let ActivitiesController = class ActivitiesController {
    createActivityUseCase;
    listActivitiesUseCase;
    getActivityUseCase;
    assignBookToStudentUseCase;
    constructor(createActivityUseCase, listActivitiesUseCase, getActivityUseCase, assignBookToStudentUseCase) {
        this.createActivityUseCase = createActivityUseCase;
        this.listActivitiesUseCase = listActivitiesUseCase;
        this.getActivityUseCase = getActivityUseCase;
        this.assignBookToStudentUseCase = assignBookToStudentUseCase;
    }
    create(body) {
        return this.createActivityUseCase.execute(body);
    }
    list(classroomId) {
        return this.listActivitiesUseCase.execute(classroomId);
    }
    getById(activityId) {
        return this.getActivityUseCase.execute(activityId);
    }
    assignBook(activityId, body) {
        return this.assignBookToStudentUseCase.execute(activityId, body);
    }
};
exports.ActivitiesController = ActivitiesController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.Permissions)({ resource: 'activities', action: 'create' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_activity_dto_1.CreateActivityDto]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)({ resource: 'activities', action: 'read' }),
    __param(0, (0, common_1.Query)('classroomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.Permissions)({ resource: 'activities', action: 'read' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(':id/assign-book'),
    (0, permissions_decorator_1.Permissions)({ resource: 'activities', action: 'update' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_activity_dto_1.AssignBookToStudentDto]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "assignBook", null);
exports.ActivitiesController = ActivitiesController = __decorate([
    (0, common_1.Controller)('activities'),
    __metadata("design:paramtypes", [activities_usecases_1.CreateActivityUseCase,
        activities_usecases_1.ListActivitiesUseCase,
        activities_usecases_1.GetActivityUseCase,
        activities_usecases_1.AssignBookToStudentUseCase])
], ActivitiesController);
//# sourceMappingURL=activities.controller.js.map