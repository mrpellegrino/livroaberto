import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { UserResponseDto } from '../dtos/user-response.dto';
export declare class CreateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(input: CreateUserDto): Promise<UserResponseDto>;
}
