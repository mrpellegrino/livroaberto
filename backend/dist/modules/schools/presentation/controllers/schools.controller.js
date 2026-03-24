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
exports.SchoolsController = void 0;
const common_1 = require("@nestjs/common");
const permissions_decorator_1 = require("../../../../common/authorization/permissions.decorator");
const create_school_dto_1 = require("../../dtos/create-school.dto");
const create_school_usecase_1 = require("../../use-cases/create-school.usecase");
const list_schools_usecase_1 = require("../../use-cases/list-schools.usecase");
let SchoolsController = class SchoolsController {
    createSchoolUseCase;
    listSchoolsUseCase;
    constructor(createSchoolUseCase, listSchoolsUseCase) {
        this.createSchoolUseCase = createSchoolUseCase;
        this.listSchoolsUseCase = listSchoolsUseCase;
    }
    create(body) {
        return this.createSchoolUseCase.execute(body);
    }
    list() {
        return this.listSchoolsUseCase.execute();
    }
};
exports.SchoolsController = SchoolsController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.Permissions)({ resource: 'schools', action: 'create' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_school_dto_1.CreateSchoolDto]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)({ resource: 'schools', action: 'read' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "list", null);
exports.SchoolsController = SchoolsController = __decorate([
    (0, common_1.Controller)('schools'),
    __metadata("design:paramtypes", [create_school_usecase_1.CreateSchoolUseCase,
        list_schools_usecase_1.ListSchoolsUseCase])
], SchoolsController);
//# sourceMappingURL=schools.controller.js.map