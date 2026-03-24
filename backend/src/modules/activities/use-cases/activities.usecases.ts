import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '../../../common/auth/roles.enum';
import { PrismaService } from '../../../common/database/prisma.service';
import { CreateActivityDto, AssignBookToStudentDto } from '../dtos/create-activity.dto';
import { ActivityRepository } from '../repositories/activity.repository';

@Injectable()
export class CreateActivityUseCase {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(input: CreateActivityDto) {
    const classroom = await this.prisma.classroom.findUnique({ where: { id: input.classroomId } });
    if (!classroom) {
      throw new NotFoundException('Turma nao encontrada.');
    }

    const startDate = new Date(input.examStartAt);
    const endDate = new Date(input.examEndAt);
    if (endDate <= startDate) {
      throw new BadRequestException('A data final do exame deve ser maior que a inicial.');
    }

    const totalWeight =
      input.rubricFactualWeight +
      input.rubricCharacterWeight +
      input.rubricInterpretWeight +
      input.rubricConsistencyWeight +
      input.rubricEvidenceWeight;

    if (totalWeight !== 100) {
      throw new BadRequestException('A soma dos pesos da rubrica deve ser exatamente 100.');
    }

    const booksCount = await this.prisma.book.count({ where: { id: { in: input.bookIds } } });
    if (booksCount !== input.bookIds.length) {
      throw new BadRequestException('Um ou mais livros informados nao existem.');
    }

    return this.activityRepository.createWithBooks({
      ...input,
      examStartAt: startDate,
      examEndAt: endDate,
    });
  }
}

@Injectable()
export class ListActivitiesUseCase {
  constructor(private readonly activityRepository: ActivityRepository) {}

  execute(classroomId?: string) {
    return this.activityRepository.list(classroomId);
  }
}

@Injectable()
export class GetActivityUseCase {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async execute(activityId: string) {
    const activity = await this.activityRepository.findById(activityId);
    if (!activity) {
      throw new NotFoundException('Atividade nao encontrada.');
    }
    return activity;
  }
}

@Injectable()
export class AssignBookToStudentUseCase {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(activityId: string, input: AssignBookToStudentDto) {
    const activity = await this.activityRepository.findById(activityId);
    if (!activity) {
      throw new NotFoundException('Atividade nao encontrada.');
    }

    const student = await this.prisma.user.findUnique({ where: { id: input.studentId } });
    if (!student || student.role !== Role.ALUNO) {
      throw new BadRequestException('Aluno invalido para atribuicao de livro.');
    }

    const hasBookInPool = activity.books.some((item) => item.bookId === input.bookId);
    if (!hasBookInPool) {
      throw new BadRequestException('Livro nao pertence ao pool da atividade.');
    }

    return this.activityRepository.assignBookToStudent({
      activityId,
      studentId: input.studentId,
      bookId: input.bookId,
      cycleNo: input.cycleNo ?? 1,
    });
  }
}
