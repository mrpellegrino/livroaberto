import { RegisterUserUseCase } from '../../use-cases/register-user.usecase';
import { LoginUseCase } from '../../use-cases/login.usecase';
import { RegisterUserDto } from '../../dtos/register-user.dto';
import { LoginDto } from '../../dtos/login.dto';
import { AuthResponseDto } from '../../dtos/auth-response.dto';
import type { JwtPayload } from '../../../../common/auth/jwt-payload.interface';
export declare class AuthController {
    private readonly registerUserUseCase;
    private readonly loginUseCase;
    constructor(registerUserUseCase: RegisterUserUseCase, loginUseCase: LoginUseCase);
    register(body: RegisterUserDto): Promise<import("../../../users/dtos/user-response.dto").UserResponseDto>;
    login(body: LoginDto): Promise<AuthResponseDto>;
    me(user: JwtPayload): JwtPayload;
}
