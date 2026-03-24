import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../auth/jwt-payload.interface';
import { Role } from '../auth/roles.enum';
import {
  Permission,
  PermissionAction,
  PermissionResource,
} from './permission.types';

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
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
  [Role.PROFESSOR]: [
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
  [Role.ALUNO]: [{ resource: 'auth', action: 'read' }],
};

@Injectable()
export class AuthorizationService {
  can(user: JwtPayload, permission: Permission): boolean {
    const allowed = ROLE_PERMISSIONS[user.role] ?? [];
    return allowed.some(
      (item) =>
        item.resource === permission.resource && item.action === permission.action,
    );
  }

  inferPermissionFromRoute(method: string, path: string): Permission {
    const actionMap: Record<string, PermissionAction> = {
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
      .filter(Boolean)[0] as PermissionResource | undefined;

    const resource = firstSegment ?? 'system';
    return { resource, action };
  }
}
