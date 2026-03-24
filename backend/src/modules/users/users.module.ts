import { Module } from '@nestjs/common';
import { UsersController } from './presentation/controllers/users.controller';
import { UserRepository } from './repositories/user.repository';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { ListUsersUseCase } from './use-cases/list-users.usecase';
import { DeleteStudentUseCase } from './use-cases/delete-student.usecase';

@Module({
  controllers: [UsersController],
  providers: [
    UserRepository,
    CreateUserUseCase,
    ListUsersUseCase,
    DeleteStudentUseCase,
  ],
  exports: [UserRepository, CreateUserUseCase],
})
export class UsersModule {}
