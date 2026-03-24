import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '../../../common/auth/roles.enum';
import { PrismaService } from '../../../common/database/prisma.service';
import { CreateClassroomDto } from '../dtos/create-classroom.dto';
import { ClassroomRepository } from '../repositories/classroom.repository';

@Injectable()
export class CreateClassroomUseCase {
  constructor(
    private readonly classroomRepository: ClassroomRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(input: CreateClassroomDto) {
    const school = await this.prisma.school.findUnique({ where: { id: input.schoolId } });
    if (!school) {
      throw new NotFoundException('Escola nao encontrada.');
    }

    return this.classroomRepository.create(input);
  }
}

@Injectable()
export class ListClassroomsUseCase {
  constructor(private readonly classroomRepository: ClassroomRepository) {}

  execute(schoolId?: string) {
    return this.classroomRepository.list(schoolId);
  }
}

@Injectable()
export class AssignResponsibleTeacherUseCase {
  constructor(
    private readonly classroomRepository: ClassroomRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(classroomId: string, teacherUserId: string, isResponsible = true) {
    const classroom = await this.classroomRepository.findById(classroomId);
    if (!classroom) {
      throw new NotFoundException('Turma nao encontrada.');
    }

    const teacher = await this.prisma.user.findUnique({ where: { id: teacherUserId } });
    if (!teacher) {
      throw new NotFoundException('Professor nao encontrado.');
    }

    if (teacher.role !== Role.PROFESSOR && teacher.role !== Role.ADMIN) {
      throw new BadRequestException('Usuario informado nao pode ser professor responsavel.');
    }

    return this.classroomRepository.assignTeacher(classroomId, teacherUserId, isResponsible);
  }
}

@Injectable()
export class AddStudentToClassroomUseCase {
  constructor(
    private readonly classroomRepository: ClassroomRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(classroomId: string, studentUserId: string) {
    const classroom = await this.classroomRepository.findById(classroomId);
    if (!classroom) {
      throw new NotFoundException('Turma nao encontrada.');
    }

    const student = await this.prisma.user.findUnique({ where: { id: studentUserId } });
    if (!student) {
      throw new NotFoundException('Aluno nao encontrado.');
    }

    if (student.role !== Role.ALUNO) {
      throw new BadRequestException('Apenas usuario com role ALUNO pode ser matriculado na turma.');
    }

    return this.classroomRepository.addStudent(classroomId, studentUserId);
  }
}
