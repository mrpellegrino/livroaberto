import { UserRepository } from '../repositories/user.repository';
import { UserResponseDto } from '../dtos/user-response.dto';
export declare class ListUsersUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(): Promise<UserResponseDto[]>;
}
