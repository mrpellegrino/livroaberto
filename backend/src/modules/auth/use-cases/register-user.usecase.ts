import { ConflictException, Injectable } from '@nestjs/common';
import { Role } from '../../../common/auth/roles.enum';
import { CreateUserUseCase } from '../../users/use-cases/create-user.usecase';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { UserRepository } from '../../users/repositories/user.repository';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async execute(input: RegisterUserDto) {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new ConflictException('Email ja cadastrado.');
    }

    // Self-registration creates student users by default.
    return this.createUserUseCase.execute({
      name: input.name,
      email: input.email,
      password: input.password,
      role: Role.ALUNO,
    });
  }
}
