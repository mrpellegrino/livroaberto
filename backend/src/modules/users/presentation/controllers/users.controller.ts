import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Permissions } from '../../../../common/authorization/permissions.decorator';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { CreateUserUseCase } from '../../use-cases/create-user.usecase';
import { ListUsersUseCase } from '../../use-cases/list-users.usecase';
import { DeleteStudentUseCase } from '../../use-cases/delete-student.usecase';
import { UserResponseDto } from '../../dtos/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly deleteStudentUseCase: DeleteStudentUseCase,
  ) {}

  @Post()
  @Permissions({ resource: 'users', action: 'create' })
  create(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    return this.createUserUseCase.execute(body);
  }

  @Get()
  @Permissions({ resource: 'users', action: 'read' })
  list(): Promise<UserResponseDto[]> {
    return this.listUsersUseCase.execute();
  }

  @Delete(':id/student')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions({ resource: 'users', action: 'delete_student' })
  async deleteStudent(@Param('id') userId: string): Promise<void> {
    await this.deleteStudentUseCase.execute(userId);
  }
}
