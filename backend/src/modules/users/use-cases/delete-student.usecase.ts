import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '../../../common/auth/roles.enum';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class DeleteStudentUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuario nao encontrado.');
    }

    if (user.role !== Role.ALUNO) {
      throw new BadRequestException('Apenas usuarios com role ALUNO podem ser excluidos aqui.');
    }

    await this.userRepository.deleteById(userId);
  }
}
