import { CreateUserDto } from '../../dtos/create-user.dto';
import { CreateUserUseCase } from '../../use-cases/create-user.usecase';
import { ListUsersUseCase } from '../../use-cases/list-users.usecase';
import { DeleteStudentUseCase } from '../../use-cases/delete-student.usecase';
import { UserResponseDto } from '../../dtos/user-response.dto';
export declare class UsersController {
    private readonly createUserUseCase;
    private readonly listUsersUseCase;
    private readonly deleteStudentUseCase;
    constructor(createUserUseCase: CreateUserUseCase, listUsersUseCase: ListUsersUseCase, deleteStudentUseCase: DeleteStudentUseCase);
    create(body: CreateUserDto): Promise<UserResponseDto>;
    list(): Promise<UserResponseDto[]>;
    deleteStudent(userId: string): Promise<void>;
}
