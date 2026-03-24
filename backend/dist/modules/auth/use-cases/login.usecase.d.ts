import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dtos/login.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { UserRepository } from '../../users/repositories/user.repository';
export declare class LoginUseCase {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    execute(input: LoginDto): Promise<AuthResponseDto>;
}
