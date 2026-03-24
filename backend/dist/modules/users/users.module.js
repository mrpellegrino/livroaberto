"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./presentation/controllers/users.controller");
const user_repository_1 = require("./repositories/user.repository");
const create_user_usecase_1 = require("./use-cases/create-user.usecase");
const list_users_usecase_1 = require("./use-cases/list-users.usecase");
const delete_student_usecase_1 = require("./use-cases/delete-student.usecase");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [
            user_repository_1.UserRepository,
            create_user_usecase_1.CreateUserUseCase,
            list_users_usecase_1.ListUsersUseCase,
            delete_student_usecase_1.DeleteStudentUseCase,
        ],
        exports: [user_repository_1.UserRepository, create_user_usecase_1.CreateUserUseCase],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map