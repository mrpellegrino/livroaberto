import { CreateUserUseCase } from '../../users/use-cases/create-user.usecase';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { UserRepository } from '../../users/repositories/user.repository';
export declare class RegisterUserUseCase {
    private readonly userRepository;
    private readonly createUserUseCase;
    constructor(userRepository: UserRepository, createUserUseCase: CreateUserUseCase);
    execute(input: RegisterUserDto): Promise<import("../../users/dtos/user-response.dto").UserResponseDto>;
}
