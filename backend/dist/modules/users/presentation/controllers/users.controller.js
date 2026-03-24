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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const permissions_decorator_1 = require("../../../../common/authorization/permissions.decorator");
const create_user_dto_1 = require("../../dtos/create-user.dto");
const create_user_usecase_1 = require("../../use-cases/create-user.usecase");
const list_users_usecase_1 = require("../../use-cases/list-users.usecase");
const delete_student_usecase_1 = require("../../use-cases/delete-student.usecase");
let UsersController = class UsersController {
    createUserUseCase;
    listUsersUseCase;
    deleteStudentUseCase;
    constructor(createUserUseCase, listUsersUseCase, deleteStudentUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.listUsersUseCase = listUsersUseCase;
        this.deleteStudentUseCase = deleteStudentUseCase;
    }
    create(body) {
        return this.createUserUseCase.execute(body);
    }
    list() {
        return this.listUsersUseCase.execute();
    }
    async deleteStudent(userId) {
        await this.deleteStudentUseCase.execute(userId);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.Permissions)({ resource: 'users', action: 'create' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)({ resource: 'users', action: 'read' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "list", null);
__decorate([
    (0, common_1.Delete)(':id/student'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, permissions_decorator_1.Permissions)({ resource: 'users', action: 'delete_student' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteStudent", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [create_user_usecase_1.CreateUserUseCase,
        list_users_usecase_1.ListUsersUseCase,
        delete_student_usecase_1.DeleteStudentUseCase])
], UsersController);
//# sourceMappingURL=users.controller.js.map