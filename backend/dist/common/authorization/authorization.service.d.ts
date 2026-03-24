import { JwtPayload } from '../auth/jwt-payload.interface';
import { Permission } from './permission.types';
export declare class AuthorizationService {
    can(user: JwtPayload, permission: Permission): boolean;
    inferPermissionFromRoute(method: string, path: string): Permission;
}
