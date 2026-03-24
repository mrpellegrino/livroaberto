import { UserRepository } from '../repositories/user.repository';
export declare class DeleteStudentUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(userId: string): Promise<void>;
}
