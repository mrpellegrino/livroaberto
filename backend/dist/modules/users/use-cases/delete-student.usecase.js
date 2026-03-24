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
exports.DeleteStudentUseCase = void 0;
const common_1 = require("@nestjs/common");
const roles_enum_1 = require("../../../common/auth/roles.enum");
const user_repository_1 = require("../repositories/user.repository");
let DeleteStudentUseCase = class DeleteStudentUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('Usuario nao encontrado.');
        }
        if (user.role !== roles_enum_1.Role.ALUNO) {
            throw new common_1.BadRequestException('Apenas usuarios com role ALUNO podem ser excluidos aqui.');
        }
        await this.userRepository.deleteById(userId);
    }
};
exports.DeleteStudentUseCase = DeleteStudentUseCase;
exports.DeleteStudentUseCase = DeleteStudentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], DeleteStudentUseCase);
//# sourceMappingURL=delete-student.usecase.js.map