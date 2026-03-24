import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizationService } from './authorization.service';
import { PERMISSIONS_KEY } from './permissions.decorator';
import { Permission } from './permission.types';
import { IS_PUBLIC_KEY } from '../auth/public.decorator';
import { JwtPayload } from '../auth/jwt-payload.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authorizationService: AuthorizationService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{
      method: string;
      route?: { path?: string };
      path: string;
      user?: JwtPayload;
    }>();

    if (!request.user) {
      throw new ForbiddenException('Usuario nao autenticado.');
    }

    const requiredPermissions =
      this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? [];

    const inferredPermission = this.authorizationService.inferPermissionFromRoute(
      request.method,
      request.route?.path ?? request.path,
    );

    const permissionsToCheck =
      requiredPermissions.length > 0 ? requiredPermissions : [inferredPermission];

    const can = permissionsToCheck.every((permission) =>
      this.authorizationService.can(request.user as JwtPayload, permission),
    );

    if (!can) {
      throw new ForbiddenException('Sem permissao para executar esta acao.');
    }

    return true;
  }
}
