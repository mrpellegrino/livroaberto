"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolsModule = void 0;
const common_1 = require("@nestjs/common");
const schools_controller_1 = require("./presentation/controllers/schools.controller");
const school_repository_1 = require("./repositories/school.repository");
const create_school_usecase_1 = require("./use-cases/create-school.usecase");
const list_schools_usecase_1 = require("./use-cases/list-schools.usecase");
let SchoolsModule = class SchoolsModule {
};
exports.SchoolsModule = SchoolsModule;
exports.SchoolsModule = SchoolsModule = __decorate([
    (0, common_1.Module)({
        controllers: [schools_controller_1.SchoolsController],
        providers: [school_repository_1.SchoolRepository, create_school_usecase_1.CreateSchoolUseCase, list_schools_usecase_1.ListSchoolsUseCase],
    })
], SchoolsModule);
//# sourceMappingURL=schools.module.js.map