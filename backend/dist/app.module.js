"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./common/database/prisma.module");
const authorization_module_1 = require("./common/authorization/authorization.module");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const books_module_1 = require("./modules/books/books.module");
const schools_module_1 = require("./modules/schools/schools.module");
const classes_module_1 = require("./modules/classes/classes.module");
const activities_module_1 = require("./modules/activities/activities.module");
const evaluations_module_1 = require("./modules/evaluations/evaluations.module");
const jwt_auth_guard_1 = require("./common/auth/jwt-auth.guard");
const permissions_guard_1 = require("./common/authorization/permissions.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            authorization_module_1.AuthorizationModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            books_module_1.BooksModule,
            schools_module_1.SchoolsModule,
            classes_module_1.ClassesModule,
            activities_module_1.ActivitiesModule,
            evaluations_module_1.EvaluationsModule,
        ],
        providers: [
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: permissions_guard_1.PermissionsGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map