"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationService = void 0;
const common_1 = require("@nestjs/common");
const roles_enum_1 = require("../auth/roles.enum");
const ROLE_PERMISSIONS = {
    [roles_enum_1.Role.ADMIN]: [
        { resource: 'users', action: 'create' },
        { resource: 'users', action: 'read' },
        { resource: 'users', action: 'update' },
        { resource: 'users', action: 'delete' },
        { resource: 'users', action: 'delete_student' },
        { resource: 'auth', action: 'read' },
        { resource: 'books', action: 'create' },
        { resource: 'books', action: 'read' },
        { resource: 'books', action: 'update' },
        { resource: 'books', action: 'delete' },
        { resource: 'schools', action: 'create' },
        { resource: 'schools', action: 'read' },
        { resource: 'schools', action: 'update' },
        { resource: 'schools', action: 'delete' },
        { resource: 'classes', action: 'create' },
        { resource: 'classes', action: 'read' },
        { resource: 'classes', action: 'update' },
        { resource: 'classes', action: 'delete' },
        { resource: 'activities', action: 'create' },
        { resource: 'activities', action: 'read' },
        { resource: 'activities', action: 'update' },
        { resource: 'activities', action: 'delete' },
        { resource: 'evaluations', action: 'create' },
        { resource: 'evaluations', action: 'read' },
        { resource: 'evaluations', action: 'update' },
        { resource: 'evaluations', action: 'delete' },
        { resource: 'system', action: 'read' },
    ],
    [roles_enum_1.Role.PROFESSOR]: [
        { resource: 'users', action: 'create' },
        { resource: 'users', action: 'read' },
        { resource: 'users', action: 'update' },
        { resource: 'users', action: 'delete' },
        { resource: 'auth', action: 'read' },
        { resource: 'books', action: 'create' },
        { resource: 'books', action: 'read' },
        { resource: 'books', action: 'update' },
        { resource: 'books', action: 'delete' },
        { resource: 'schools', action: 'create' },
        { resource: 'schools', action: 'read' },
        { resource: 'schools', action: 'update' },
        { resource: 'schools', action: 'delete' },
        { resource: 'classes', action: 'create' },
        { resource: 'classes', action: 'read' },
        { resource: 'classes', action: 'update' },
        { resource: 'classes', action: 'delete' },
        { resource: 'activities', action: 'create' },
        { resource: 'activities', action: 'read' },
        { resource: 'activities', action: 'update' },
        { resource: 'activities', action: 'delete' },
        { resource: 'evaluations', action: 'create' },
        { resource: 'evaluations', action: 'read' },
        { resource: 'evaluations', action: 'update' },
        { resource: 'evaluations', action: 'delete' },
        { resource: 'system', action: 'read' },
    ],
    [roles_enum_1.Role.ALUNO]: [{ resource: 'auth', action: 'read' }],
};
let AuthorizationService = class AuthorizationService {
    can(user, permission) {
        const allowed = ROLE_PERMISSIONS[user.role] ?? [];
        return allowed.some((item) => item.resource === permission.resource && item.action === permission.action);
    }
    inferPermissionFromRoute(method, path) {
        const actionMap = {
            POST: 'create',
            GET: 'read',
            PUT: 'update',
            PATCH: 'update',
            DELETE: 'delete',
        };
        const action = actionMap[method.toUpperCase()] ?? 'read';
        const firstSegment = path
            .split('?')[0]
            .split('/')
            .filter(Boolean)[0];
        const resource = firstSegment ?? 'system';
        return { resource, action };
    }
};
exports.AuthorizationService = AuthorizationService;
exports.AuthorizationService = AuthorizationService = __decorate([
    (0, common_1.Injectable)()
], AuthorizationService);
//# sourceMappingURL=authorization.service.js.map